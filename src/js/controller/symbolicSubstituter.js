

const subtituteExpression = (expression, globals, locals) => {
    const variables = expression.split(/!==|==|===|[+-/*]/)
    variables.forEach(variable => {
        const isGlobal = globals.includes(variable);
        const existLocal = isGlobal ? { value: variable } : locals.find(local => local.name === varaible);
        expression = existLocal ? expression.replace(new RegExp(variable, 'g'), existLocal.value) : expression;
        
    })
}

const handleAssignment = (assignment, globals, locals) => {
    const toSubmit = globals.includes(assignment.lineName);
    const extendedLocals = locals.filter(local => local.name !== assignment.lineName);

    const subtitutedExpression = subtituteExpression(assignment.lineValue, globals, locals);
    assignment.lineValue = subtitutedExpression;
    extendedLocals.push({ name: assignment.lineName, value: assignment.lineValue });

    return { extendedLocals, toSubmit, newAssignment: assignment };
}

const typeCodeToSubtitute = {
    ifStatement: handleIf,
    elseIfStatement: handleElseIf,
    elseStatement: handleElse,
    whileStatement: handleWhile,
    returnStatement: handleReturn
}

const handleBody = (body, globals, locals) => {
    const submittedBody = [];
    body.forEach(statement => {
        const type = statement.lineType;
        if(type === 'assignmentExpression'){
            const {extendedLocals, toSubmit, newAssignment } = handleAssignment(statement, globals, locals);
            locals = extendedLocals;
            toSubmit? submittedBody.push(newAssignment) : null;
        } else {
            const methodCodeToSubtitute = typeCodeToSubtitute[type] || (() => null);
            submittedBody.push(methodCodeToSubtitute(statement, globals, locals))
        }
    });

}

export const symbolicSubstitution = ({ method, parameters }) => {
    const locals = [];
    method.lineBody =  handleBody(method.lineBody, parameters, locals);
    return method;
};