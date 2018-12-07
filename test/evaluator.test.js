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
        const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet z = x;\n}', [1]);

        const expectedFunction = createExpectedFunction('hello',['x']);
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    it('Return Eval', () => {
        const expectedReturn = createExpectedReturnStatement('(x)');
        const expectedFunction = createExpectedFunction('hello',['x'], [expectedReturn]);

        const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet z = x;\nreturn z;\n}', [1]);
        
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    it('While Eval', () => {
        const expectedWhile = createExpectedWhileStatement('(x)<5');
        const expectedFunction = createExpectedFunction('hello',['x'], [expectedWhile]);

        const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet i = x;\nwhile(i < 5){\n i = i + 1;\n}\n}', [1]);
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    describe('If Eval', () => {
        describe('only If', () => {
            it('If is green', () =>{
                const expectedReturn = createExpectedReturnStatement('(x)');
                const expectedIf = createExpectedIfStatement('x===true',[expectedReturn], null, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(x === true){\n return y;\n}\n}',[true]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('If is red', () => {
                const expectedReturn = createExpectedReturnStatement('(x)');
                const expectedIf = createExpectedIfStatement('x===\'good\'',[expectedReturn], null, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(x === \'good\'){\n return y;\n}\n}',['"not good"']);
                expect(testFunction).to.deep.equal(expectedFunction);
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

    it('Examples', () => {
        const expectedReturn1 = createExpectedReturnStatement('((x+y)+z)+(((0)+z)+5)');
        const expectedElse = createExpectedElseStatement([expectedReturn1]);
        const expectedReturn2 = createExpectedReturnStatement('((x+y)+z)+(((0)+x)+5)');
        const expectedElseIf = createExpectedElseIfStatement('((x+1)+y)<(z*2)', [expectedReturn2], expectedElse, 'green');
        const expectedReturn3 = createExpectedReturnStatement('((x+y)+z)+((0)+5)');
        const expectedIf = createExpectedIfStatement('((x+1)+y)<z',[expectedReturn3], expectedElseIf, 'red');
        const expectedFunction = createExpectedFunction('foo',['x','y','z'], [expectedIf]);

        const testFunction = makeTestableEvaluatedFunction('function foo(x,y,z){\nlet a = x + 1;\nlet b = a + y;\nlet c = 0;\n\nif(b < z){\nc = c + 5;\n return x + y + z + c;\n}\nelse if(b < z * 2){\nc = c + x + 5;\nreturn x + y + z + c\n} else {\nc = c + z + 5;\nreturn x + y + z + c;\n}\n}',[1,2,3]);
        expect(testFunction).to.deep.equal(expectedFunction);
    });
});