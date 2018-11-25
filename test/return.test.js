/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedReturnStatement } from '../src/js/util-test';

describe('Function Tests' , () => {
    let testedElementTable;
    let testedElementRows;
    describe('Return literal', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nreturn 5;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(2);
        });
        it('Return Line', () => {
            const expectedReturnLine = createExpectedReturnStatement(2,'5');
            expect(testedElementRows[1]).to.deep.equal(expectedReturnLine);
        });
    });
    describe('Return variable', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nreturn x;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(2);
        });
        it('Return Line', () => {
            const expectedReturnLine = createExpectedReturnStatement(2,'x');
            expect(testedElementRows[1]).to.deep.equal(expectedReturnLine);
        });
    });
    describe('Return expression', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nreturn x === 3;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(2);
        });
        it('Return Line', () => {
            const expectedReturnLine = createExpectedReturnStatement(2,'x===3');
            expect(testedElementRows[1]).to.deep.equal(expectedReturnLine);
        });
    });
});