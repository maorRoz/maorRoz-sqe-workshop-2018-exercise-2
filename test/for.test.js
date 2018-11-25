/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedForStatement, createExpectedReturnStatement } from '../src/js/util-test';

describe('Loop Tests' , () => {
    let testedElementTable;
    let testedElementRows;

    const expectedForLine = createExpectedForStatement(2,'i=1;x===1;++i');
    const expectedSecondFor = createExpectedForStatement(3,'i=0;t===1;');
    const expectedReturnY = createExpectedReturnStatement(3,'y');
    describe('For with one line', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nfor(i = 1;x === 1; i++)\nreturn y;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedForLine);
            expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('For Body', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nfor(i = 1;x === 1; i++){\nreturn y;\n}\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedForLine);
            expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('For Inside For', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nfor(i = 1;x === 1; i++)\nfor(i= 0;t === 1;)\nreturn y;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(4);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedForLine);
            expect(testedElementRows[2]).to.deep.equal(expectedSecondFor);
        });
    });
});