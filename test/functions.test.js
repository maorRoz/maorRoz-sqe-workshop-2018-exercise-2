/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedFunction } from '../src/js/util-test';

describe.skip('Function Tests' , () => {
    let testedElementTable;
    let functionElements;
    describe('Function with no arguments', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){}');
            functionElements = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });
        it('Function Line', () => {
            const expectedFunctionLine = createExpectedFunction('hello');
            expect(functionElements[0]).to.deep.equal(expectedFunctionLine);
        });
    });
});