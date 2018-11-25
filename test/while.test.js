/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedWhileStatement, createExpectedReturnStatement } from '../src/js/util-test';

describe('Loop Tests' , () => {
    let testedElementTable;
    let testedElementRows;

    const expectedWhileLine = createExpectedWhileStatement(2,'x===1');
    const expectedSecondWhile = createExpectedWhileStatement(3,'t===1');
    const expectedReturnY = createExpectedReturnStatement(3,'y');
    describe('While with one line', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nwhile(x === 1)\nreturn y;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedWhileLine);
            expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('While Body', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nwhile(x === 1){\nreturn y;\n}\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedWhileLine);
            expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('While Inside While', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nwhile(x === 1)\nwhile(t === 1)\nreturn y;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(4);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedWhileLine);
            expect(testedElementRows[2]).to.deep.equal(expectedSecondWhile);
        });
    });
});