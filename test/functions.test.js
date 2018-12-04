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
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });
        it('Function Line', () => {
            const expectedFunctionLine = createExpectedFunction('hello');
            expect(functionElements[0]).to.deep.equal(expectedFunctionLine);
        });
    });

    describe('Function Arguments', () => {
     //   const expectedVariableLineN = createExpectedAssignmentStatement('n');
     //   const expectedVariableLineM = createExpectedAssignmentStatement('m');
        describe('Function with one argument', () => {
            beforeEach(() => {
       //          const { lineBody } = makeTestableFunction('function hello(n){}');
        //         functionElements = lineBody;
            });
            it('Function body length', () => {
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
            it('Function body length', () => {
                expect(functionElements).to.have.lengthOf(3);
            });
            it('Variable Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedVariableLineN);
                expect(functionElements[2]).to.deep.equal(expectedVariableLineM);
            });
        });
    });
});