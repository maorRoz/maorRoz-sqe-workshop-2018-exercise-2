import { parseCode } from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController';

export const makeTestableFunction = (code) => {
    const parsedCode = parseCode(code);
    return createMethodAndArguments(parsedCode);
};

const createExpectedObject = (objectProperties) =>
{
   const { lineType, lineName='', lineCondition='', lineValue='', lineBody=[] } = objectProperties;
   return { lineType, lineName, lineCondition, lineValue, lineBody}; 
}

export const createExpectedFunction = (lineName) => 
    createExpectedObject({ lineType: 'functionDeclaration', lineName });

export const createExpectedReturnStatement = (lineValue) => 
    createExpectedObject({ lineType: 'returnStatement', lineValue });

export const createExpectedIfStatement = (lineCondition) => 
    createExpectedObject({ lineType: 'ifStatement', lineCondition });

export const createExpectedElseIfStatement = (lineCondition) => 
    createExpectedObject({ lineType: 'elseIfStatement', lineCondition });

export const createExpectedElseStatement = () =>  
    createExpectedObject({ lineType: 'elseStatement' });

export const createExpectedWhileStatement = (lineCondition) => 
    createExpectedObject({ lineType: 'whileStatement', lineCondition });

export const createExpectedAssignmentStatement = (lineName,lineValue) => 
    createExpectedObject({ lineType: 'assignmentExpression', lineName, lineValue });
