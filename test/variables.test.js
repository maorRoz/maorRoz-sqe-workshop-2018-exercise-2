/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedVariable } from '../src/js/util-test';

describe('Variable Tests' , () => {
    let testedElementTable;
    let testedElementRows;
    describe('Function Arguments', () => {
        const expectedVariableLineN = createExpectedVariable(1,'n');
        const expectedVariableLineM = createExpectedVariable(1,'m');
        describe('Function with one argument', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(n){}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(2);
            });
            it('Variable Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedVariableLineN);
            });
        });
        describe('Function with two arguments', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(n,m){}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(3);
            });
            it('Variable Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedVariableLineN);
                expect(testedElementRows[2]).to.deep.equal(expectedVariableLineM);
            });
        });
    });
    describe('Variables Declaration in Body', () => {
        const expectedVariableLineX = createExpectedVariable(2,'x');
        describe('One Variable in Function Body', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(){\nlet x;\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(2);
            });
            it('Variable Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedVariableLineX);
            });
        });
        describe('Two Variables in Function Body', () => {
            const expectedVariableLineX = createExpectedVariable(2,'x');
            describe('Two Variables in Function Body in same line', () => {
                const expectedVariableLineY = createExpectedVariable(2,'y');
                beforeEach(() => {
                    testedElementTable = makeTestableTable('function hello(){\nlet x,y\n}');
                    testedElementRows = testedElementTable.elementRows;
                });
                it('Element Table length', () => {
                    expect(testedElementRows).to.have.lengthOf(3);
                });
                it('Variable Line', () => {
                    expect(testedElementRows[1]).to.deep.equal(expectedVariableLineX);
                    expect(testedElementRows[2]).to.deep.equal(expectedVariableLineY);
                });
            });
            describe('Two Variables in Function Body in seperate line', () => {
                const expectedVariableLineY = createExpectedVariable(3,'y');
                beforeEach(() => {
                    testedElementTable = makeTestableTable('function hello(){\nlet x;\nlet y;\n}');
                    testedElementRows = testedElementTable.elementRows;
                });
                it('Element Table length', () => {
                    expect(testedElementRows).to.have.lengthOf(3);
                });
                it('Variable Line', () => {
                    expect(testedElementRows[1]).to.deep.equal(expectedVariableLineX);
                    expect(testedElementRows[2]).to.deep.equal(expectedVariableLineY);
                });
            });
        });
    });
    describe('Function Arguments & Variables Declaration in Body', () => {
        const expectedVariableLineN = createExpectedVariable(1,'n');
        const expectedVariableLineX = createExpectedVariable(2,'x');
        describe('Function with one argument and one body variable', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(n){\nlet x;\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(3);
            });
            it('Variable Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedVariableLineN);
                expect(testedElementRows[2]).to.deep.equal(expectedVariableLineX);
            });
        });
        describe('Function with two arguments and two body variables', () => {
            const expectedVariableLineM = createExpectedVariable(1,'m');
            const expectedVariableLineY = createExpectedVariable(3,'y');
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(n,m){\nlet x;\nlet y;\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(5);
            });
            it('Variable Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedVariableLineN);
                expect(testedElementRows[2]).to.deep.equal(expectedVariableLineM);
                expect(testedElementRows[3]).to.deep.equal(expectedVariableLineX);
                expect(testedElementRows[4]).to.deep.equal(expectedVariableLineY);
            });
        });
    });
});