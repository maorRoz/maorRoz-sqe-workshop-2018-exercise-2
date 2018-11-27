import $ from 'jquery';

const functionCodeTextToSpan = (functionObject) => {
    const text = `function ${functionObject.lineName}(){`
    const span = $('<span />').attr('id', 'codeLine').html(text);
    return span;
}

const typeCodeTextToSpan = {
}

const codeTextToSpan = (element) => {
    const methodCodeTextToSpan = typeCodeTextToSpan[element.lineType] || (() => null);
    methodCodeTextToSpan(element);
}

const createFunctionBodySpans = (functionBody) =>{
    functionBody.forEach(element=> codeTextToSpan(element));
}


const createOutputFunction = (method, outputBox ) => {
    const functionSpan = functionCodeTextToSpan(method)
    outputBox.append(functionSpan);
    createFunctionBodySpans(method.lineBody);
    outputBox.append($('<span />').attr('id', 'codeLine').html('}'));
}

export default createOutputFunction;