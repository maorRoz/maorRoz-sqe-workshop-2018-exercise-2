/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableEvaluatedFunction, createExpectedFunction, createExpectedIfStatement, createExpectedWhileStatement, createExpectedAssignmentStatement, createExpectedReturnStatement, createExpectedElseIfStatement, createExpectedElseStatement } from '../src/js/util-test';


describe('Evaluator Tests', () => {
    it('No Arguments Eval', () => {
        const testFunction = makeTestableEvaluatedFunction('function hello(){\nlet z = 5;\n}');

        const expectedFunction = createExpectedFunction('hello');
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    it('Assignment Eval', () => {
        const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet z = x;\n}', 1);

        const expectedFunction = createExpectedFunction('hello',['x']);
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    it('Return Eval', () => {
        const expectedReturn = createExpectedReturnStatement('(x)');
        const expectedFunction = createExpectedFunction('hello',['x'], [expectedReturn]);

        const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet z = x;\nreturn z;\n}', 1);
        
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    it('While Eval', () => {
        const expectedWhile = createExpectedWhileStatement('(x)<5');
        const expectedFunction = createExpectedFunction('hello',['x'], [expectedWhile]);

        const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet i = x;\nwhile(i < 5){\n i = i + 1;\n}\n}', 1);
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    describe('If Eval', () => {
        describe('only If', () => {
            it('If is green', () =>{

            });

            it('If is red', () => {

            });
        });

        describe('If and Else If', () =>{
            it('If is green', () => {

            });

            it('Else If is green', () => {

            });

            it('Both green', () => {

            });

            it('None Green', () => {

            });
        });

        describe('If and Else', () => {
            it('If is green', () =>{

            });

            it('If is red', () => {

            });
        });

        describe('If and 2 Else If and Else', () => {
            it('If is green', () => {

            });

            it('First Else If is green', () => {

            });

            it('Second Else If is green', () => {

            });

            it('Both green', () => {

            });

            it('None Green', () => {

            });
        });

        describe('If inside If', () => {
            it('Wrapper If is green only', () =>{

            });

            it('Inner If is green only', () => {

            });

            it('Both Green', () => {

            });

            it('None Green', () => {

            });
        });
    });

    describe('Examples', () => {
        it('Example1', () => {

        });

        it('Example2', () => {

        });
    });
});