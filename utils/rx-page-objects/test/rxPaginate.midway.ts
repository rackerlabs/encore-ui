'use strict';

import {expect} from 'chai';
import {$, by} from 'protractor';

import {rxPaginate, rxSearchBox, rxSelectFilter, rxSortableColumn} from '../index';
import {exercise, rxComponentElement, rxMisc} from '../index';

let demoPage = require('../../demo.page');

// rowFromElement and table are anonymous page objects to assist with table data
class Row extends rxComponentElement {
    getName() {
        return this.element(by.binding('name')).getText();
    }

    getOS() {
        return this.element(by.binding('os')).getText();
    }
}

class Table extends rxComponentElement {
    private repeaterString = 'server in pagedServers.items';

    get tblResults() {
        return this.all(by.repeater(this.repeaterString));
    }

    row(rowIndex: number) {
        return new Row(this.tblResults.get(rowIndex));
    }

    column(columnName: string) {
        let column = this.element(by.cssContainingText('rx-sortable-column', columnName));
        return new rxSortableColumn(column);
    }

    get searchBox() {
        return new rxSearchBox(this.$$('rx-search-box').first());
    }

    get selectFilter() {
        return new rxSelectFilter(this.$$('rx-select-filter').first());
    }
}

describe('rxPaginate', () => {
    let table: Table;

    before(() => {
        demoPage.go('#/elements/Tables');
        table = new Table($('.table-demo--api-pagination'));
    });

    describe('Non present pagination exercise', exercise.rxPaginate({
        instance: new rxPaginate($('#does-not-exist')),
        present: false,
    }));

    describe('Non displayed pagination exercise', exercise.rxPaginate({
        instance: new rxPaginate($('#rx-paginate-hidden')),
        displayed: false,
    }));

    describe('UI pagination exercises', exercise.rxPaginate({
        pageSizes: [3, 50, 200, 350, 500],
        defaultPageSize: 3,
        totalItems: 21,
        instance: new rxPaginate($('.table-demo--ui-pagination .rx-paginate')),
    }));

    describe('API pagination exercises', exercise.rxPaginate({
        pageSizes: [25, 50, 200, 350, 500],
        defaultPageSize: 25,
        pages: 29,
        totalItems: 701,
        instance: new rxPaginate($('.table-demo--api-pagination .rx-paginate')),
    }));

    describe('Filter and sort tests', () => {
        let nameColumn: rxSortableColumn;
        let osColumn: rxSortableColumn;

        beforeEach(() => {
            nameColumn = table.column('Name');
            osColumn = table.column('OS');

            table.searchBox.search('');
            table.selectFilter.apply({
                Os: { All: true },
            });
            nameColumn.sortAscending();
            rxMisc.scrollToElement(table.tblResults, {
                positionOnScreen: 'middle',
            });
        });

        it('should get new items when filter text is entered', () => {
            table.searchBox.search('Ubuntu');
            expect(table.row(0).getName()).to.eventually.equal('Server 3');
            expect(table.row(0).getOS()).to.eventually.equal('Ubuntu 13.04');
        });

        it('should get new items when the select filter is used', () => {
            table.selectFilter.apply({
                Os: {
                    All: false,
                    Centos: true,
                },
            });
            expect(table.row(0).getName()).to.eventually.equal('Server 2');
            expect(table.row(0).getOS()).to.eventually.equal('CentOS 6.4');
        });

        it('should sort the Name column descending', () => {
            nameColumn.sortDescending();
            expect(table.row(0).getName()).to.eventually.equal('Server 701');
        });

        it('should sort the OS column descending', () => {
            osColumn.sortDescending();
            expect(table.row(0).getOS()).to.eventually.equal('Ubuntu 13.04');
        });
    });
});
