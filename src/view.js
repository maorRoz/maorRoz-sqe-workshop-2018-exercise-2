import $ from 'jquery';

let outputBox;



const returnCodeTextToSpan = (retunObject) => {
    const returnText = `return ${retunObject.lineValue};`;
    outputBox.append($('<span />').attr('id', 'codeLine').html(returnText));
}

const assignmentTextToSpan = (assignmentObject) => {
    const assignmentText = `${assignmentObject.lineName} = ${assignmentObject.lineValue};`;
    outputBox.append($('<span />').attr('id', 'codeLine').html(assignmentText));
};

const codeTextToSpanClosingScope = () => outputBox.append($('<span />').attr('id', 'codeLine').html('}'));

const codeTextToSpanBody = (object) => object.lineBody.forEach(element => codeTextToSpan(element));

const codeTextToSpanTest = (objectPrefix, object) => {
    const objectText = `${objectPrefix}(${object.lineCondition}){`;
    outputBox.append($('<span />').attr('id', 'codeLine').html(objectText));
}

const whileCodeTextToSpan = (whileObject) => {
    codeTextToSpanTest('while', whileObject);

    codeTextToSpanBody(whileObject);

    codeTextToSpanClosingScope();
}

const elseCodeTextToSpan = (elseObject) => {
    const elseText = 'else {';
    outputBox.append($('<span />').attr('id', 'codeLine').html(elseText));

    codeTextToSpanBody(elseObject);

    codeTextToSpanClosingScope();
}

const elseIfCodeTextToSpan = (elseIfObject) => ifCodeTextToSpan(elseIfObject, true);

const ifCodeTextToSpan = (ifObject, isElse = false) => {
    codeTextToSpanTest(isElse? 'else if' : 'if', ifObject);

    codeTextToSpanBody(ifObject);

    codeTextToSpanClosingScope();

    const { alternate } = ifObject;
    alternate? codeTextToSpan(alternate): null;
}

const typeCodeTextToSpan = {
    ifStatement: ifCodeTextToSpan,
    elseIfStatement: elseIfCodeTextToSpan,
    elseStatement: elseCodeTextToSpan,
    whileStatement: whileCodeTextToSpan,
    returnStatement: returnCodeTextToSpan,
    assignmentExpression: assignmentTextToSpan
}

const codeTextToSpan = (element = {}) => {
    const methodCodeTextToSpan = typeCodeTextToSpan[element.lineType] || (() => null);
    methodCodeTextToSpan(element);
}

const createFunctionSpans = (functionObject, ParameterTableModel) =>{
    const parametersText = ParameterTableModel.parameters.join();
    const functionText = `function ${functionObject.lineName}(${parametersText}){`
    outputBox.append($('<span />').attr('id', 'codeLine').html(functionText));

    codeTextToSpanBody(functionObject);

    codeTextToSpanClosingScope();
}


const createOutputFunction = (functionObject, ParameterTableModel, givenOutputBox ) => {
    outputBox = givenOutputBox;
    createFunctionSpans(functionObject, ParameterTableModel);
}

export default createOutputFunction;