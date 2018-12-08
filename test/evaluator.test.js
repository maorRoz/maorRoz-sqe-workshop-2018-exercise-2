/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableEvaluatedFunction, createExpectedFunction, createExpectedIfStatement, createExpectedWhileStatement, createExpectedReturnStatement, createExpectedElseIfStatement, createExpectedElseStatement } from '../src/js/util-test';


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

        describe('If with array', () => {
            it('If is green', () => {
                const expectedReturn = createExpectedReturnStatement('([5,false])[0]');
                const expectedIf = createExpectedIfStatement('([5,false])[0]===x[0]',[expectedReturn], null, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet a = ["hello",true];\na[0] = 5;\n a[1] = false;\nif(a[0] === x[0]){\n return a[0];\n}\n}',[[5]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('If is red', () => {
                const expectedReturn = createExpectedReturnStatement('([5,false])[0]');
                const expectedIf = createExpectedIfStatement('([5,false])[0]===x[0]',[expectedReturn], null, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
    
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet a = ["hello",true];\na[0] = 5;\n a[1] = false;\nif(a[0] === x[0]){\n return a[0];\n}\n}',[[false]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        describe('If and Else If', () =>{
            it('If is green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn1], null, 'red');
                const expectedReturn2 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn2], expectedElseIf, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n}\n}',[['"hello"','"not"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('Else If is green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn1], null, 'green');
                const expectedReturn2 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn2], expectedElseIf, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n}\n}',[['"not"','"world"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('Both green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn1], null, 'green');
                const expectedReturn2 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn2], expectedElseIf, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n}\n}',[['"hello"','"world"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('None Green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn1], null, 'red');
                const expectedReturn2 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn2], expectedElseIf, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n}\n}',[['"not"','"not"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        describe('If and Else', () => {
            it('If is green', () =>{
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn2], expectedElse, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else {\nreturn y;\n}\n}',[['"hello"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('If is red', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn2], expectedElse, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else {\nreturn y;\n}\n}',[['"not"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        describe('If and 2 Else If and Else', () => {
            it('If is green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[2]');
                const expectedElseIf1 = createExpectedElseIfStatement('(x)[2]===5',[expectedReturn2], expectedElse, 'red');
                const expectedReturn3 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf2 = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn3], expectedElseIf1, 'red');
                const expectedReturn4 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn4], expectedElseIf2, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n} else if(y[2] === 5){\n return y[2];\n} else {\nreturn y;\n}\n}',[['"hello"','"not"',6,true]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('First Else If is green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[2]');
                const expectedElseIf1 = createExpectedElseIfStatement('(x)[2]===5',[expectedReturn2], expectedElse, 'red');
                const expectedReturn3 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf2 = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn3], expectedElseIf1, 'green');
                const expectedReturn4 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn4], expectedElseIf2, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n} else if(y[2] === 5){\n return y[2];\n} else {\nreturn y;\n}\n}',[['"not"','"world"',6,true]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('Second Else If is green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[2]');
                const expectedElseIf1 = createExpectedElseIfStatement('(x)[2]===5',[expectedReturn2], expectedElse, 'green');
                const expectedReturn3 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf2 = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn3], expectedElseIf1, 'red');
                const expectedReturn4 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn4], expectedElseIf2, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n} else if(y[2] === 5){\n return y[2];\n} else {\nreturn y;\n}\n}',[['"not"','"not"',5,true]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('All green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[2]');
                const expectedElseIf1 = createExpectedElseIfStatement('(x)[2]===5',[expectedReturn2], expectedElse, 'green');
                const expectedReturn3 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf2 = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn3], expectedElseIf1, 'green');
                const expectedReturn4 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn4], expectedElseIf2, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n} else if(y[2] === 5){\n return y[2];\n} else {\nreturn y;\n}\n}',[['"hello"','"world"',5,true]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('None Green', () => {
                const expectedReturn1 = createExpectedReturnStatement('(x)');
                const expectedElse = createExpectedElseStatement([expectedReturn1]);
                const expectedReturn2 = createExpectedReturnStatement('(x)[2]');
                const expectedElseIf1 = createExpectedElseIfStatement('(x)[2]===5',[expectedReturn2], expectedElse, 'red');
                const expectedReturn3 = createExpectedReturnStatement('(x)[1]');
                const expectedElseIf2 = createExpectedElseIfStatement('(x)[1]===\'world\'',[expectedReturn3], expectedElseIf1, 'red');
                const expectedReturn4 = createExpectedReturnStatement('(x)[0]');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedReturn4], expectedElseIf2, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n return y[0];\n} else if(y[1] === \'world\'){\nreturn y[1];\n} else if(y[2] === 5){\n return y[2];\n} else {\nreturn y;\n}\n}',[['"not"','"not"',false,true]]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });
        });

        describe('If inside If', () => {
            it('Wrapper If is green only', () =>{
                const expectedReturn = createExpectedReturnStatement('(x)[1]');
                const expectedInnerIf = createExpectedIfStatement('(x)[1]===\'world\'',[expectedReturn], null, 'red');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedInnerIf], null, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n if(y[1] === \'world\'){\nreturn y[1];\n}\n}\n}',[['"hello"','"not"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('Inner If is green only', () => {
                const expectedReturn = createExpectedReturnStatement('(x)[1]');
                const expectedInnerIf = createExpectedIfStatement('(x)[1]===\'world\'',[expectedReturn], null, 'green');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedInnerIf], null, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n if(y[1] === \'world\'){\nreturn y[1];\n}\n}\n}',[['"not"','"world"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('Both Green', () => {
                const expectedReturn = createExpectedReturnStatement('(x)[1]');
                const expectedInnerIf = createExpectedIfStatement('(x)[1]===\'world\'',[expectedReturn], null, 'green');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedInnerIf], null, 'green');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n if(y[1] === \'world\'){\nreturn y[1];\n}\n}\n}',[['"hello"','"world"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
            });

            it('None Green', () => {
                const expectedReturn = createExpectedReturnStatement('(x)[1]');
                const expectedInnerIf = createExpectedIfStatement('(x)[1]===\'world\'',[expectedReturn], null, 'red');
                const expectedIf = createExpectedIfStatement('(x)[0]===\'hello\'',[expectedInnerIf], null, 'red');
                const expectedFunction = createExpectedFunction('hello',['x'], [expectedIf]);
        
                const testFunction = makeTestableEvaluatedFunction('function hello(x){\nlet y = x;\nif(y[0] === \'hello\'){\n if(y[1] === \'world\'){\nreturn y[1];\n}\n}\n}',[['"not"','"not"']]);
                expect(testFunction).to.deep.equal(expectedFunction);
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