/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableSubstitutedFunction, createExpectedFunction } from '../src/js/util-test';


describe('symbolicSubtituter Tests', () => {
    describe('', () => {
        const testFunction = makeTestableSubstitutedFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\n}');
        expect(1).to.equal(1);
    });
});