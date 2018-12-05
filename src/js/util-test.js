import { parseCode } from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController';
import { symbolicSubstitution } from './controller/symbolicSubstituter';
import toEvalParsedMethod from './controller/evaluator';

export const makeTestableFunction = (code) => {
    const parsedCode = parseCode(code);
    return createMethodAndArguments(parsedCode);
};

export const makeTestableSubstitutedFunction = (code) => {
    const testableFunction = makeTestableFunction(code);
    return symbolicSubstitution(testableFunction);
};

export const makeTestableEvaluatedFunction = (code, parameters) => {
    const testableSubtitutedFunction = makeTestableSubstitutedFunction(code);
    return toEvalParsedMethod(testableSubtitutedFunction, parameters);
};

const createExpectedObject = (objectProperties) =>
{
    const { lineType, lineName='', lineCondition='', lineValue='', lineBody=[], alternate } = objectProperties;
    const testObject = { lineType, lineName, lineCondition, lineValue, lineBody};
   
    if(lineType === 'ifStatement' || lineType === 'elseIfStatement'){
        testObject.alternate = alternate;
    }

    return testObject;
};

export const createExpectedFunction = (lineName, parameters=[], lineBody) => {
    const expectedFunction = createExpectedObject({ lineType: 'functionDeclaration', lineName, lineBody });
    expectedFunction.parameters = parameters;
    return expectedFunction;
};

export const createExpectedReturnStatement = (lineValue) => 
    createExpectedObject({ lineType: 'returnStatement', lineValue });

export const createExpectedIfStatement = (lineCondition, lineBody, alternate) => 
    createExpectedObject({ lineType: 'ifStatement', lineCondition, lineBody, alternate });

export const createExpectedElseIfStatement = (lineCondition, lineBody, alternate) => 
    createExpectedObject({ lineType: 'elseIfStatement', lineCondition, lineBody, alternate });

export const createExpectedElseStatement = (lineBody) =>  
    createExpectedObject({ lineType: 'elseStatement', lineBody });

export const createExpectedWhileStatement = (lineCondition, lineBody) => 
    createExpectedObject({ lineType: 'whileStatement', lineCondition, lineBody });

export const createExpectedAssignmentStatement = (lineName,lineValue) => 
    createExpectedObject({ lineType: 'assignmentExpression', lineName, lineValue });
