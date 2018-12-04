/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedIfStatement, createExpectedElseIfStatement,
     createExpectedElseStatement, createExpectedReturnStatement } from '../src/js/util-test';

describe('Condition Tests' , () => {
    let functionElements;

    const expectedIfLine = createExpectedIfStatement('x===1');
    const expectedReturnY = createExpectedReturnStatement(3,'y');
    const expectedFirstElseIfLine = createExpectedElseIfStatement('x===2');
    const expectedReturnZ = createExpectedReturnStatement(5,'z');
    const expectedSecondElseIfLine = createExpectedElseIfStatement('x===3');
    const expectedElseLine = createExpectedElseStatement(9);
    describe('Only If', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(functionElements[1]).to.deep.equal(expectedIfLine);
            expect(functionElements[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('Else Tests', () => {
        describe('One Else If', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(5);
            });
            it('If Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedIfLine);
                expect(functionElements[2]).to.deep.equal(expectedReturnY);
                expect(functionElements[3]).to.deep.equal(expectedFirstElseIfLine);
                expect(functionElements[4]).to.deep.equal(expectedReturnZ);
            });
        });
        describe('Two Else If', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\nelse if(x === 3)\nreturn t;\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(7);
            });
            it('If Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedIfLine);
                expect(functionElements[3]).to.deep.equal(expectedFirstElseIfLine);
                expect(functionElements[5]).to.deep.equal(expectedSecondElseIfLine);
            });
        });
        describe('Two Else If and Else', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\nelse if(x === 3)\nreturn t;\nelse\nreturn h;\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(9);
            });
            it('If Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedIfLine);
                expect(functionElements[3]).to.deep.equal(expectedFirstElseIfLine);
                expect(functionElements[5]).to.deep.equal(expectedSecondElseIfLine);
                expect(functionElements[7]).to.deep.equal(expectedElseLine);
            });
        });
        describe('wtf', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn 5;\nelse{\nreturn h;\n}\n}');
                functionElements = lineBody;
            });
            it('Element Table length', () => {
                expect(functionElements).to.have.lengthOf(5);
            });
            it('If Line', () => {
                expect(functionElements[1]).to.deep.equal(expectedIfLine);
                expect(functionElements[3]).to.deep.equal(createExpectedElseStatement(4));
            });
        });
    });
    describe('If inside If', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nif( x > 2)\nreturn x;\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(4);
        });
        it('If Line', () => {
            const expectedSecondIfLine = createExpectedIfStatement('x>2');
            expect(functionElements[1]).to.deep.equal(expectedIfLine);
            expect(functionElements[2]).to.deep.equal(expectedSecondIfLine);
        });
    });
    describe('If body', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1){\nreturn y;\n}\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(functionElements[1]).to.deep.equal(expectedIfLine);
            expect(functionElements[2]).to.deep.equal(expectedReturnY);
        });
    });
});