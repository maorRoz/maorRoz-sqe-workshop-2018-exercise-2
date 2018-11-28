import $ from 'jquery';

let outputBox;

const returnCodeTextToSpan = (retunObject, identationLevel) => {
    const returnText = `return ${retunObject.lineValue};`;
    const newSpan = $("<span id='codeLine'/>");
    newSpan.css("margin-left",  `${identationLevel * 10}px`);
    newSpan.html(returnText);
    outputBox.append(newSpan);
}

const assignmentTextToSpan = (assignmentObject, identationLevel) => {
    const assignmentText = `${assignmentObject.lineName} = ${assignmentObject.lineValue};`;
    const newSpan = $("<span id='codeLine'/>");
    newSpan.css("margin-left",  `${identationLevel * 10}px`);
    newSpan.html(assignmentText);
    outputBox.append(newSpan);
};

const codeTextToSpanClosingScope = (identationLevel = 0) => {
    const newSpan = $("<span id='codeLine'/>");
    newSpan.css("margin-left", `${identationLevel * 10}px`);
    newSpan.html('}');
    outputBox.append(newSpan);
}

const codeTextToSpanBody = (object, identationLevel) => object.lineBody
    .forEach(element => codeTextToSpan(element, identationLevel));

const codeTextToSpanTest = (objectPrefix, object, identationLevel) => {
    const objectText = `${objectPrefix}(${object.lineCondition}){`;
    const newSpan = $("<span id='codeLine'/>");
    newSpan.css("margin-left",  `${identationLevel * 10}px`);
    newSpan.html(objectText);
    outputBox.append(newSpan);
}

const whileCodeTextToSpan = (whileObject, identationLevel) => {
    codeTextToSpanTest('while', whileObject, identationLevel);

    codeTextToSpanBody(whileObject, identationLevel + 1);

    codeTextToSpanClosingScope(identationLevel);
}

const elseCodeTextToSpan = (elseObject, identationLevel) => {
    const elseText = 'else {';
    const newSpan = $("<span id='codeLine'/>");
    newSpan.css("margin-left",  `${identationLevel * 10}px`);
    newSpan.html(elseText);
    outputBox.append(newSpan);

    codeTextToSpanBody(elseObject, identationLevel + 1);

    codeTextToSpanClosingScope(identationLevel);
}

const elseIfCodeTextToSpan = (elseIfObject, identationLevel) => ifCodeTextToSpan(elseIfObject, identationLevel, true);

const ifCodeTextToSpan = (ifObject, identationLevel, isElse = false) => {
    codeTextToSpanTest(isElse? 'else if' : 'if', ifObject, identationLevel);

    codeTextToSpanBody(ifObject, identationLevel + 1);

    codeTextToSpanClosingScope(identationLevel);

    const { alternate } = ifObject;
    alternate? codeTextToSpan(alternate, identationLevel): null;
}

const typeCodeTextToSpan = {
    ifStatement: ifCodeTextToSpan,
    elseIfStatement: elseIfCodeTextToSpan,
    elseStatement: elseCodeTextToSpan,
    whileStatement: whileCodeTextToSpan,
    returnStatement: returnCodeTextToSpan,
    assignmentExpression: assignmentTextToSpan
}

const codeTextToSpan = (element = {}, identationLevel) => {
    const methodCodeTextToSpan = typeCodeTextToSpan[element.lineType] || (() => null);
    methodCodeTextToSpan(element, identationLevel);
}

const createFunctionSpans = (functionObject, ParameterTableModel) =>{
    const parametersText = ParameterTableModel.parameters.join();

    const functionText = `function ${functionObject.lineName}(${parametersText}){`
    const newSpan = $("<span id='codeLine'/>");
    newSpan.html(functionText);
    outputBox.append(newSpan);

    const identationLevel = 1;
    codeTextToSpanBody(functionObject, identationLevel);

    codeTextToSpanClosingScope();
}


const createOutputFunction = (functionObject, ParameterTableModel, givenOutputBox ) => {
    outputBox = givenOutputBox;
    createFunctionSpans(functionObject, ParameterTableModel);
}

export default createOutputFunction;