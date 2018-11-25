import { parseCode } from './code-analyzer';
import { createElementTable } from './controller/elementsTableController';

export const makeTestableTable = (code) => {
    const parsedCode = parseCode(code);
    return createElementTable(parsedCode);
};

export const createExpectedFunction = (lineNum,lineName) => {
    return {
        lineNum,
        lineType: 'function declaration',
        lineName,
        lineCondition: '',
        lineValue: ''
    };
};

export const createExpectedVariable = (lineNum,lineName) => {
    return {
        lineNum,
        lineType: 'variable declaration',
        lineName,
        lineCondition: '',
        lineValue: ''
    };
};

export const createExpectedReturnStatement = (lineNum,lineValue) => {
    return {
        lineNum,
        lineType: 'return statement',
        lineName: '',
        lineCondition: '',
        lineValue
    };
};

export const createExpectedIfStatement = (lineNum,lineCondition) => {
    return {
        lineNum,
        lineType: 'if statement',
        lineName: '',
        lineCondition,
        lineValue: ''
    };
};

export const createExpectedElseIfStatement = (lineNum,lineCondition) => {
    return {
        lineNum,
        lineType: 'else if statement',
        lineName: '',
        lineCondition,
        lineValue: ''
    };
};

export const createExpectedElseStatement = (lineNum) => {
    return {
        lineNum,
        lineType: 'else statement',
        lineName: '',
        lineCondition: '',
        lineValue: ''
    };
};

export const createExpectedWhileStatement = (lineNum,lineCondition) => {
    return {
        lineNum,
        lineType: 'while statement',
        lineName: '',
        lineCondition,
        lineValue: ''
    };
};

export const createExpectedForStatement = (lineNum,lineCondition) => {
    return {
        lineNum,
        lineType: 'for statement',
        lineName: '',
        lineCondition,
        lineValue: ''
    };
};

export const createExpectedAssignmentStatement = (lineNum,lineName,lineValue) => {
    return {
        lineNum,
        lineType: 'assignment expression',
        lineName,
        lineCondition: '',
        lineValue
    };
};
