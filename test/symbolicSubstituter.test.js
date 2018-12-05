/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableSubstitutedFunction, createExpectedFunction, createExpectedIfStatement, createExpectedWhileStatement, createExpectedAssignmentStatement, createExpectedReturnStatement, createExpectedElseIfStatement, createExpectedElseStatement } from '../src/js/util-test';


describe('symbolicSubtituter Tests', () => {
    describe('eliminate assignments', () => {
        const expectedFunction = createExpectedFunction('hello',['x']);

        it('eliminate assignment of parameter', () => {
            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet z = x;\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('eliminate assignment of literal', () => {
            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet z = 5;\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('eliminate assignment of literal and parameter', () => {
            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet z = 5 + x;\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });
    });

    describe('return' , () => {

        it('eliminate assignment of literal and parameter', () => {
            const expectedReturn = createExpectedReturnStatement('(x)');
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedReturn]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet z = x;\nreturn z;\n}');
            
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('eliminate assignment of literal and parameter', () => {
            const expectedReturn = createExpectedReturnStatement('(5)');
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedReturn]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet z = 5;\nreturn z;\n}');
            
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('eliminate assignment of literal and parameter', () => {
            const expectedReturn = createExpectedReturnStatement('(x+5)');
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedReturn]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet z = x + 5;\nreturn z;\n}');
            
            expect(testFunction).to.deep.equal(expectedFunction);
        });
    });

    describe('If', () => {
        describe('only if', () => {
            it('no assignments', () => {
                const expectedReturn = createExpectedReturnStatement('x');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn], null);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nif(x === 1){\n return x;\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('with assignment', () => {
                const expectedReturn = createExpectedReturnStatement('(x)');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn], null);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nif(x === 1){\n return y;\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('with two assignment', () => {
                const expectedReturn = createExpectedReturnStatement('((x)+5)');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn], null);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nlet z = y + 5;\nif(x === 1){\n return z;\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        describe('if and else if', () => {
            it('no assignments', () => {
                const expectedReturn1 = createExpectedReturnStatement('x+5');
                const expectedElseIf = createExpectedElseIfStatement('x===2', [expectedReturn1], null);
                const expectedReturn2 = createExpectedReturnStatement('x');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn2], expectedElseIf);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nif(x === 1){\n return x;\n} else if(x === 2){\nreturn x + 5\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('with assignments', () => {
                const expectedReturn1 = createExpectedReturnStatement('((x)+5)');
                const expectedElseIf = createExpectedElseIfStatement('x===2', [expectedReturn1], null);
                const expectedReturn2 = createExpectedReturnStatement('(x)');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn2], expectedElseIf);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nlet z = y + 5;\nif(x === 1){\n return y;\n} else if(x === 2){\nreturn z\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        describe('if and else', () => {
            it('no assignments', () => {
                const expectedReturn1 = createExpectedReturnStatement('x+5');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('x');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn2], expectedElse);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nif(x === 1){\n return x;\n} else{\nreturn x + 5\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('with assignments', () => {
                const expectedReturn1 = createExpectedReturnStatement('((x)+5)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)');
                const expectedIf = createExpectedIfStatement('x===1',[expectedReturn2], expectedElse);
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nlet z = y + 5;\nif(x === 1){\n return y;\n} else{\nreturn z\n}\n}');
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        it.skip('if and 2 else if and else', () => {
            const expectedReturn1 = createExpectedReturnStatement('((x)+5)');
            const expectedElseIf = createExpectedElseIfStatement('x===2', [expectedReturn1], null);
            const expectedReturn2 = createExpectedReturnStatement('(x)');
            const expectedIf = createExpectedIfStatement('x===1',[expectedReturn2], expectedElseIf);
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nlet z = y + 5;\nif(x === 1){\n return y;\n} else if(x === 2){\nreturn z\n}\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        describe('if inside if', () => {

        });
    });

    describe('while', () => {

    });

    describe('while + if + return', () => {

    });

});