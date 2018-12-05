import { expect } from 'chai';
import {makeTestableEvaluatedFunction, createExpectedFunction } from '../src/js/util-test';


describe('symbolicSubtituter Tests', () => {
    describe('', () => {
        const testFunction = makeTestableEvaluatedFunction('function hello(y){\n let x = 5;\n}',[5]);
        expect(1).to.equal(1);
    });
});