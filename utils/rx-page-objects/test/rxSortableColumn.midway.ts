'use strict';

import {expect} from 'chai';
import {$, by} from 'protractor';

import {rxComponentElement, rxSortableColumn, SORT_TYPE} from '../index';

let demoPage = require('../../demo.page');

class Table extends rxComponentElement {
    column(columnName: string) {
        let columnElement = this.element(by.cssContainingText('rx-sortable-column', columnName));
        return new rxSortableColumn(columnElement);
    };

    getNameData() {
        return this.all(by.exactRepeater('resource in talentPool').column('name')).getText();
    }
}

describe('rxSortableColumn', () => {
    let table: Table;
    let nameColumn: rxSortableColumn;
    let roleColumn: rxSortableColumn;

    before(() => {
        demoPage.go('#/elements/Tables');
        table = new Table($('#sortable-column-testing-table'));
        nameColumn = table.column('Name');
        roleColumn = table.column('Occupation');
    });
    // https://github.com/rackerlabs/encore-ui/issues/694 -- End odd behavior.

    it('should display some sortable columns', () => {
        expect(nameColumn.isDisplayed()).to.eventually.be.true;
        expect(roleColumn.isDisplayed()).to.eventually.be.true;
    });

    it('should have an ascending sort shown by default for the name column', () => {
        expect(nameColumn.getSortDirection()).to.eventually.eq(SORT_TYPE.ASCENDING);
    });

    it('should have no sort shown by default for the job title column', () => {
        expect(roleColumn.getSortDirection()).to.eventually.eq(SORT_TYPE.UNSORTED);
    });

    it('should support sorting columns ascending', () => {
        nameColumn.sortAscending();
        expect(nameColumn.getSortDirection()).to.eventually.eq(SORT_TYPE.ASCENDING);
    });

    it('should have empty names appearing at the top in ascending sort', () => {
        let names = ['', '', 'Andrew Yurisich', 'Hussam Dawood', 'Kerry Bowley', 'Patrick Deuley'];
        nameColumn.sortAscending();
        expect(table.getNameData()).to.eventually.eql(names);
    });

    it('should support sorting columns descending', () => {
        nameColumn.sortDescending();
        expect(nameColumn.getSortDirection()).to.eventually.eq(SORT_TYPE.DESCENDING);
    });

    it('should have empty names appearing at the bottom in descending sort', () => {
        nameColumn.sortDescending();
        let names = ['Patrick Deuley', 'Kerry Bowley', 'Hussam Dawood', 'Andrew Yurisich', '', ''];
        expect(table.getNameData()).to.eventually.eql(names);
    });

    it('should remove all other sorts when sorting an unsorted column', () => {
        roleColumn.sortAscending();
        expect(nameColumn.getSortDirection()).to.eventually.eq(SORT_TYPE.UNSORTED);
    });

    it('should have a name', () => {
        expect(nameColumn.getName()).to.eventually.eq('Name');
        expect(roleColumn.getName()).to.eventually.eq('Occupation');
    });
});
