const evalCondition = (valueMapper, condition) => {
    let toEvalCondition = condition;
    valueMapper.forEach(entry => toEvalCondition = toEvalCondition.replace(new RegExp(entry.name, 'g'), entry.value));
    const result = eval(toEvalCondition);
    return result ? 'green' : 'red';


};

const toEvalObject = (valueMapper, object) => {
    const { lineCondition : condition, lineBody, alternate } = object;
    object.conditionColor = condition ? evalCondition(valueMapper, condition) : undefined;
    object.lineBody = lineBody.length > 0 ? toEvalBody(valueMapper, lineBody) : []; 
    object.alternate = alternate ? toEvalObject(valueMapper, alternate) : undefined;
    return object; 
};

const toEvalBody = (valueMapper, body) => body.map(statement => toEvalObject(valueMapper, statement));

const toEvalParsedMethod = (subtitutedMethod, argumentsValues) => {
    const method = subtitutedMethod;
    const valueMapper = method.parameters
        .map((parameter, index) => ({name: parameter, value: argumentsValues[index]}));
    method.lineBody = toEvalBody(valueMapper, method.lineBody); 
    return method;
};


export default toEvalParsedMethod;