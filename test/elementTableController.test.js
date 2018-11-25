/* eslint-disable max-lines-per-function */
import {expect} from 'chai';
import {createElementTable, implementElementTableUI} from '../src/js/controller/elementsTableController';
import ElementsTable from '../src/js/model/ElementsTable';

describe('Element Table Controller Tests', () => {
    it('createElementTable', () => {
        const parsedCode = { body: []};
        const expectedElementsTableModel = new ElementsTable();
        expect(createElementTable(parsedCode)).to.deep.equal(expectedElementsTableModel);
    });

    it('createElementTable with fake type', () => {
        const parsedCode = { body: [{type: 'fake' }]};
        const expectedElementsTableModel = new ElementsTable();
        expect(createElementTable(parsedCode)).to.deep.equal(expectedElementsTableModel);
    });

    it('implementElementTableUI', () => {
        const mockedUI = {
            clean: () => null,
            createTable: () => null
        };
        expect(implementElementTableUI(mockedUI)).to.equal(undefined);
    });
});