/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedAssignmentStatement } from '../src/js/util-test';

describe('Variable Tests' , () => {
    let functionElements;

    describe('Function Arguments', () => {
        const expectedVariableLineN = createExpectedAssignmentStatement('n');
        const expectedVariableLineM = createExpectedAssignmentStatement('m');
        describe('Function with one argument', () => {
            beforeEach(() => {
                 const { lineBody } = makeTestableFunction('function hello(n){}');
                 functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(2);
            });
            it('Variable Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedVariableLineN);
            });
        });
        describe('Function with two arguments', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(n,m){}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(3);
            });
            it('Variable Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedVariableLineN);
                expect(functionElements[2]).to.deep.equal(expectedVariableLineM);
            });
        });
    });
    describe('Variables Declaration in Body', () => {
        const expectedVariableLineX = createExpectedAssignmentStatement('x');
        describe('One Variable in Function Body', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nlet x;\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(2);
            });
            it('Variable Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedVariableLineX);
            });
        });
        describe('Two Variables in Function Body', () => {
            const expectedVariableLineX = createExpectedAssignmentStatement('x');
            describe('Two Variables in Function Body in same line', () => {
                const expectedVariableLineY = createExpectedAssignmentStatement('y');
                beforeEach(() => {
                    const { lineBody } = makeTestableFunction('function hello(){\nlet x,y\n}');
                    functionElements = lineBody;
                });
                it('Element Table length', () => {
                    expect(functionElements).to.have.lengthOf(3);
                });
                it('Variable Line', () => {
                    expect(functionElements[1]).to.deep.equal(expectedVariableLineX);
                    expect(functionElements[2]).to.deep.equal(expectedVariableLineY);
                });
            });
            describe('Two Variables in Function Body in seperate line', () => {
                const expectedVariableLineY = createExpectedAssignmentStatement('y');
                beforeEach(() => {
                    const { lineBody } = makeTestableFunction('function hello(){\nlet x;\nlet y;\n}');
                    functionElements = lineBody;
                });
                it('Element Table length', () => {
                    expect(functionElements).to.have.lengthOf(3);
                });
                it('Variable Line', () => {
                    expect(functionElements[1]).to.deep.equal(expectedVariableLineX);
                    expect(functionElements[2]).to.deep.equal(expectedVariableLineY);
                });
            });
        });
    });
    describe('Function Arguments & Variables Declaration in Body', () => {
        const expectedVariableLineN = createExpectedAssignmentStatement('n');
        const expectedVariableLineX = createExpectedAssignmentStatement('x');
        describe('Function with one argument and one body variable', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(n){\nlet x;\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(3);
            });
            it('Variable Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedVariableLineN);
                expect(functionElements[2]).to.deep.equal(expectedVariableLineX);
            });
        });
        describe('Function with two arguments and two body variables', () => {
            const expectedVariableLineM = createExpectedAssignmentStatement('m');
            const expectedVariableLineY = createExpectedAssignmentStatement('y');
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(n,m){\nlet x;\nlet y;\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(5);
            });
            it('Variable Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedVariableLineN);
                expect(functionElements[2]).to.deep.equal(expectedVariableLineM);
                expect(functionElements[3]).to.deep.equal(expectedVariableLineX);
                expect(functionElements[4]).to.deep.equal(expectedVariableLineY);
            });
        });
    });
});