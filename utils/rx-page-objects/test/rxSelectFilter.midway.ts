'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$, by, element} from 'protractor';

import {rxSelectFilter} from '../index';

let demoPage = require('../../demo.page');

class Table {
    getDataForColumn(column: string) {
        return element.all(by.repeater('ticket in').column(column))
            .map(cell => cell.getText()).then(_.uniq).then(_.sortBy);
    }

    get accounts() {
        return this.getDataForColumn('ticket.account');
    }

    get statuses() {
        return this.getDataForColumn('ticket.status');
    }
}

let table = new Table();

describe('selectFilter', () => {
    let selectFilter: rxSelectFilter;

    before(() => {
        demoPage.go('#/elements/Tables');
        selectFilter = new rxSelectFilter($('[name="selectFilter.simple"] rx-select-filter'));
    });

    it('shows all the table data', () => {
        selectFilter.apply({
            Account: { All: true },
            Status: { All: true },
        });

        expect(table.accounts).to.eventually.eql(['A', 'B']);
        expect(table.statuses).to.eventually.eql(['IN_PROGRESS', 'NEW', 'TRANSFERRED', 'VENDOR']);
    });

    it('filters the table data by the status', () => {
        selectFilter.apply({
            Status: { All: false, Transferred: true },
        });

        expect(table.accounts).to.eventually.eql(['A', 'B']);
        expect(table.statuses).to.eventually.eql(['TRANSFERRED']);
    });

    it('filters the table data by the account', () => {
        selectFilter.apply({
            Account: { All: false, B: true },
            Status: { All: true },
        });

        expect(table.accounts).to.eventually.eql(['B']);
        expect(table.statuses).to.eventually.eql(['TRANSFERRED', 'VENDOR']);
    });
});
