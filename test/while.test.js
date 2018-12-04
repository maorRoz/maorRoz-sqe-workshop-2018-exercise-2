/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedWhileStatement, createExpectedReturnStatement } from '../src/js/util-test';

describe('Loop Tests' , () => {
    let functionElements;

    const expectedWhileLine = createExpectedWhileStatement('x===1');
    const expectedSecondWhile = createExpectedWhileStatement('t===1');
    const expectedReturnY = createExpectedReturnStatement('y');
    describe('While with one line', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nwhile(x === 1)\nreturn y;\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(functionElements[1]).to.deep.equal(expectedWhileLine);
            expect(functionElements[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('While Body', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nwhile(x === 1){\nreturn y;\n}\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(functionElements[1]).to.deep.equal(expectedWhileLine);
            expect(functionElements[2]).to.deep.equal(expectedReturnY);
        });
    });
    describe('While Inside While', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nwhile(x === 1)\nwhile(t === 1)\nreturn y;\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(4);
        });
        it('If Line', () => {
            expect(functionElements[1]).to.deep.equal(expectedWhileLine);
            expect(functionElements[2]).to.deep.equal(expectedSecondWhile);
        });
    });
});