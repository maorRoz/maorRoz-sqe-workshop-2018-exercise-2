/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedIfStatement, createExpectedElseIfStatement, createExpectedElseStatement, createExpectedReturnStatement } from '../src/js/util-test';

describe('Condition Tests' , () => {
    let testedElementTable;
    let testedElementRows;

    const expectedIfLine = createExpectedIfStatement(2,'x===1');
    const expectedReturnY = createExpectedReturnStatement(3,'y');
    const expectedFirstElseIfLine = createExpectedElseIfStatement(4,'x===2');
    const expectedReturnZ = createExpectedReturnStatement(5,'z');
    const expectedSecondElseIfLine = createExpectedElseIfStatement(6,'x===3');
    const expectedElseLine = createExpectedElseStatement(9);
    describe('Only If', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nif(x === 1)\nreturn y;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
            expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('Else Tests', () => {
        describe('One Else If', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(5);
            });
            it('If Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
                expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
                expect(testedElementRows[3]).to.deep.equal(expectedFirstElseIfLine);
                expect(testedElementRows[4]).to.deep.equal(expectedReturnZ);
            });
        });
        describe('Two Else If', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\nelse if(x === 3)\nreturn t;\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(7);
            });
            it('If Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
                expect(testedElementRows[3]).to.deep.equal(expectedFirstElseIfLine);
                expect(testedElementRows[5]).to.deep.equal(expectedSecondElseIfLine);
            });
        });
        describe('Two Else If and Else', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\nelse if(x === 3)\nreturn t;\nelse\nreturn h;\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(9);
            });
            it('If Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
                expect(testedElementRows[3]).to.deep.equal(expectedFirstElseIfLine);
                expect(testedElementRows[5]).to.deep.equal(expectedSecondElseIfLine);
                expect(testedElementRows[7]).to.deep.equal(expectedElseLine);
            });
        });
        describe('wtf', () => {
            beforeEach(() => {
                testedElementTable = makeTestableTable('function hello(){\nif(x === 1)\nreturn 5;\nelse{\nreturn h;\n}\n}');
                testedElementRows = testedElementTable.elementRows;
            });
            it('Element Table length', () => {
                expect(testedElementRows).to.have.lengthOf(5);
            });
            it('If Line', () => {
                expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
                expect(testedElementRows[3]).to.deep.equal(createExpectedElseStatement(4));
            });
        });
    });
    describe('If inside If', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nif(x === 1)\nif( x > 2)\nreturn x;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(4);
        });
        it('If Line', () => {
            const expectedSecondIfLine = createExpectedIfStatement(3,'x>2');
            expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
            expect(testedElementRows[2]).to.deep.equal(expectedSecondIfLine);
        });
    });
    describe('If body', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nif(x === 1){\nreturn y;\n}\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedIfLine);
            expect(testedElementRows[2]).to.deep.equal(expectedReturnY);
        });
    });
});