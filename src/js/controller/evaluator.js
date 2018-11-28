

const evalCondition = (valueMapper, condition) => {
    let toEvalCondition = condition;
    valueMapper.forEach(entry => toEvalCondition = toEvalCondition.replace(new RegExp(entry.name, 'g'), entry.value));
    const result = eval(toEvalCondition);
    return result ? 'green' : 'red';


}

const toEvalObject = (valueMapper, object, negativePreviousCondition) => {
    const { lineCondition, lineBody, alternate } = object;
    const condition = lineCondition || negativePreviousCondition;
    object.conditionColor = condition ? evalCondition(valueMapper, condition) : undefined;
    object.lineBody = lineBody.length > 0 ? toEvalBody(valueMapper, lineBody) : []; 
    object.alternate = alternate ? toEvalObject(valueMapper, alternate, `!(${condition})`) : undefined;
    return object; 
}

const toEvalBody = (valueMapper, body) => body.map(statement => toEvalObject(valueMapper, statement));

const toEvalParsedMethod = (argumentsValues) => {
    const method = global.subtitutedMethod;
    const valueMapper = method.parameters
        .map((parameter, index) => ({name: parameter, value: argumentsValues[index]}));
    method.lineBody = toEvalBody(valueMapper, method.lineBody); 
}


export default toEvalParsedMethod;