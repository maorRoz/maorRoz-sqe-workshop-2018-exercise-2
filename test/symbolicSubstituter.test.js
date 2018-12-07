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

        it('if and 2 else if and else', () => {
            const expectedReturn1 = createExpectedReturnStatement('((((x)+((x)+5))+(5))+0)');
            const expectedElse = createExpectedElseStatement([expectedReturn1]);
            const expectedReturn2 = createExpectedReturnStatement('(5)');
            const expectedElseIf1 = createExpectedElseIfStatement('x===3', [expectedReturn2], expectedElse);
            const expectedReturn3 = createExpectedReturnStatement('((x)+5)');
            const expectedElseIf2 = createExpectedElseIfStatement('x===2', [expectedReturn3], expectedElseIf1);
            const expectedReturn4 = createExpectedReturnStatement('(x)');
            const expectedIf = createExpectedIfStatement('x===1',[expectedReturn4], expectedElseIf2);
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nlet z = y + 5; let m = 5; let n = y + z + m + 0\nif(x === 1){\n return y;\n} else if(x === 2){\nreturn z\n} else if(x === 3){\nreturn m\n} else {\nreturn n\n}\n}');
            
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('if inside if', () => {
            const expectedReturn1 = createExpectedReturnStatement('((x)+5)');
            const expectedIf1 = createExpectedIfStatement('x===2', [expectedReturn1], null);
            const expectedReturn2 = createExpectedReturnStatement('(x)');
            const expectedIf2 = createExpectedIfStatement('x===1',[expectedReturn2], null);
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf2, expectedIf1]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet y = x;\nlet z = y + 5;\nif(x === 1){\n return y;\n}\nif(x === 2){\nreturn z\n}\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });
    });

    describe('while', () => {
        it('no assignments', () => {
            const expectedAssignmentStatement = createExpectedAssignmentStatement('x','x+1');
            const expectedWhile = createExpectedWhileStatement('x<5',[expectedAssignmentStatement]);
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedWhile]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nwhile(x < 5){\n x = x + 1;\n}\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('with assignments', () => {
            const expectedWhile = createExpectedWhileStatement('(x)<5');
            const expectedFunction = createExpectedFunction('hello',['x'], [expectedWhile]);

            const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet i = x;\nwhile(i < 5){\n i = i + 1;\n}\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });
    });

    it('while + if + return', () => {
        const expectedReturn = createExpectedReturnStatement('(x)');
        const expectedIf = createExpectedIfStatement('(x)<0', [expectedReturn], null);
        const expectedWhile = createExpectedWhileStatement('(x)<5',[expectedIf]);
        const expectedFunction = createExpectedFunction('hello',['x'], [expectedWhile]);

        const testFunction = makeTestableSubstitutedFunction('function hello(x){\nlet i = x;\nwhile(i < 5){\nif(i < 0){\nreturn i\n}\ni = i + 1;\n}\n}');
        expect(testFunction).to.deep.equal(expectedFunction);
    });

    describe('Examples', () => {
        it('Example1', () => {
            const expectedReturn1 = createExpectedReturnStatement('((x+y)+z)+(((0)+z)+5)');
            const expectedElse = createExpectedElseStatement([expectedReturn1]);
            const expectedReturn2 = createExpectedReturnStatement('((x+y)+z)+(((0)+x)+5)');
            const expectedElseIf = createExpectedElseIfStatement('((x+1)+y)<(z*2)', [expectedReturn2], expectedElse);
            const expectedReturn3 = createExpectedReturnStatement('((x+y)+z)+((0)+5)');
            const expectedIf = createExpectedIfStatement('((x+1)+y)<z',[expectedReturn3], expectedElseIf);
            const expectedFunction = createExpectedFunction('foo',['x','y','z'], [expectedIf]);

            const testFunction = makeTestableSubstitutedFunction('function foo(x,y,z){\nlet a = x + 1;\nlet b = a + y;\nlet c = 0;\n\nif(b < z){\nc = c + 5;\n return x + y + z + c;\n}\nelse if(b < z * 2){\nc = c + x + 5;\nreturn x + y + z + c\n} else {\nc = c + z + 5;\nreturn x + y + z + c;\n}\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });

        it('Example2', () => {

            const expectedReturn = createExpectedReturnStatement('z');
            const expectedAssignment = createExpectedAssignmentStatement('z','((x+1)+((x+1)+y))*2');
            const expectedWhile = createExpectedWhileStatement('(x+1)<z',[expectedAssignment]);
            const expectedFunction = createExpectedFunction('foo',['x','y','z'], [expectedWhile, expectedReturn]);

            const testFunction = makeTestableSubstitutedFunction('function foo(x,y,z){\nlet a = x + 1;\nlet b = a + y;\nlet c = 0;\n\nwhile(x + 1 < z){\nc = a + b;\nz = c * 2;\n}\n\n return z;\n}');
            expect(testFunction).to.deep.equal(expectedFunction);
        });
    });

});