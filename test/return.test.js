/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { makeTestableFunction } from '../src/js/util-test';

describe('Function Tests' , () => {
    let functionElements;
    describe('Return literal', () => {
        beforeEach(() => {
           const { lineBody } = makeTestableFunction('function hello(){\nreturn 5;\n}');
           functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(2);
        });
        it('Return Line', () => {
            const expectedReturnLine = createExpectedReturnStatement('5');
            expect(functionElements[1]).to.deep.equal(expectedReturnLine);
        });
    });
    describe('Return variable', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nreturn x;\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(2);
        });
        it('Return Line', () => {
            const expectedReturnLine = createExpectedReturnStatement('x');
            expect(functionElements[1]).to.deep.equal(expectedReturnLine);
        });
    });
    describe('Return expression', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nreturn x === 3;\n}');
            functionElements = lineBody;
        });
        it('Element Table length', () => {
            expect(functionElements).to.have.lengthOf(2);
        });
        it('Return Line', () => {
            const expectedReturnLine = createExpectedReturnStatement('x===3');
            expect(functionElements[1]).to.deep.equal(expectedReturnLine);
        });
    });
});