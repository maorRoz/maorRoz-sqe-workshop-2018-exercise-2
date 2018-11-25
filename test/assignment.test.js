/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableTable, createExpectedAssignmentStatement } from '../src/js/util-test';

describe('Loop Tests' , () => {
    let testedElementTable;
    let testedElementRows;

    const expectedAssignmentX = createExpectedAssignmentStatement(2,'x','1');
    const expectedAssignmentY = createExpectedAssignmentStatement(3,'y','x');
    const expectedAssignmentZ = createExpectedAssignmentStatement(3,'z','x>2');
    describe('One Assignment', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nx = 1;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(2);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedAssignmentX);
        });
    });
    describe('Two Assignment', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nx = 1;\ny = x;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedAssignmentX);
            expect(testedElementRows[2]).to.deep.equal(expectedAssignmentY);
        });
    });
    describe('Two assignment, assignment of binary expression', () => {
        beforeEach(() => {
            testedElementTable = makeTestableTable('function hello(){\nx = 1;\nz = x > 2;\n}');
            testedElementRows = testedElementTable.elementRows;
        });
        it('Element Table length', () => {
            expect(testedElementRows).to.have.lengthOf(3);
        });
        it('If Line', () => {
            expect(testedElementRows[1]).to.deep.equal(expectedAssignmentX);
            expect(testedElementRows[2]).to.deep.equal(expectedAssignmentZ);
        });
    });
});