/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedFunction } from '../src/js/util-test';

describe('Function Tests' , () => {
    let testedElementTable;
    let testedElementRows;
    describe('Function with no arguments', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(1);
        });
        it('Function Line', () => {
            const expectedFunctionLine = createExpectedFunction(1,'hello');
            expect(testedElementRows[0]).to.deep.equal(expectedFunctionLine);
        });
    });
    describe('Two functions with no arguments', () => {
        before(() => {
            testedElementTable = makeTestableTable('function hello(){}\nfunction helloAgain(){}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(2);
        });
        it('Two Functions Line', () => {
            const expectedFirstFunctionLine = createExpectedFunction(1,'hello');
            const expectedSecondFunctionLine = createExpectedFunction(2,'helloAgain');
            expect(testedElementRows[0]).to.deep.equal(expectedFirstFunctionLine);
            expect(testedElementRows[1]).to.deep.equal(expectedSecondFunctionLine);
        });
    });
});