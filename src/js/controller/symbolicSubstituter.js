
let globals;

const handleElse = (elseStatement, locals) => {
    const { lineBody } = elseStatement;
    elseStatement.lineBody = handleBody(lineBody, locals);

    return elseStatement;
};

const subtituteExpression = (expression, locals) => {
    const variables = expression.split(/>|<|!==|===|==|]|[[()+-/*]/);
    variables.forEach(variable => {
        const existLocal = locals.find(local => local.name === variable);
        expression = existLocal ? expression
            .replace(new RegExp(variable, 'g'), `(${existLocal.value})`) : expression;
    });

    return expression;
};

const handleAssignment = (assignment, locals) => {
    const extendedLocals = locals.filter(local => local.name !== assignment.lineName);

    const subtitutedExpression = subtituteExpression(assignment.lineValue, locals);
    assignment.lineValue = subtitutedExpression;
    extendedLocals.push({ name: assignment.lineName, value: assignment.lineValue });

    const toSubmit = globals.includes(assignment.lineName);
    return { extendedLocals, newAssignment: toSubmit? assignment : null };
};

const handleReturn = (returnStatemnt, locals) => {
    const { lineValue } = returnStatemnt;
    returnStatemnt.lineValue = subtituteExpression(lineValue, locals);

    return returnStatemnt;
};

const testExpressionToSubstitute = (testExpression, locals) => subtituteExpression(testExpression, locals);

const handleWhile = (whileStatement, locals) => {
    const { lineCondition, lineBody} = whileStatement;

    whileStatement.lineCondition = testExpressionToSubstitute(lineCondition, locals);
    
    whileStatement.lineBody = handleBody(lineBody, locals);

    return whileStatement;
};

const handleAlternate = (alternate, locals) => {
    return alternate.lineType === 'elseStatement' ? handleElse(alternate, locals) : handleIf(alternate, locals);
};

const handleIf = (ifStatement, locals) => {
    const { lineCondition, lineBody, alternate } = ifStatement;

    ifStatement.lineCondition = testExpressionToSubstitute(lineCondition, locals);
    
    ifStatement.lineBody = handleBody(lineBody, locals);

    ifStatement.alternate = alternate? handleAlternate(alternate, locals): null;

    return ifStatement;
};

const typeCodeToSubtitute = {
    ifStatement: handleIf,
    whileStatement: handleWhile,
    returnStatement: handleReturn
};

const handleBody = (body, locals) => {
    const submittedBody = [];
    body.forEach(statement => {
        const type = statement.lineType;
        if(type === 'assignmentExpression'){
            const {extendedLocals, newAssignment } = handleAssignment(statement, locals);
            locals = extendedLocals;
            newAssignment ? submittedBody.push(newAssignment) : null;
        } else {
            const methodCodeToSubtitute = typeCodeToSubtitute[type];
            submittedBody.push(methodCodeToSubtitute(statement, locals));
        }
    });

    return submittedBody;

};

export const symbolicSubstitution = (method) => {
    const locals = [];
    globals = method.parameters;
    method.lineBody =  handleBody(method.lineBody, locals);
    return method;
};