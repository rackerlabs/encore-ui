'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$, by} from 'protractor';

import {rxSortableColumn, rxStatusColumn, STATUS_COLORS, STATUS_ICONS} from '../index';

let demoPage = require('../../demo.page');

// a pair of page objects to demonstrate table and cell creation
class Row {
    constructor(readonly rootElement) {
    }

    // The tests below focus heavily on this table row property
    get status() {
        return new rxStatusColumn(this.rootElement.$('[rx-status-column]'));
    }

    // goo.gl/OJdysF
    getTitle() {
        return this.rootElement.$('td+td').getText();
    }
}

class Table {
    get rootElement() {
        return $('.demo-status-column-table');
    }

    get tblServers() {
        return this.rootElement.all(by.repeater('server in servers'));
    }

    get statusColumn() {
        let columnElement = this.rootElement.$('rx-sortable-column[sort-property="status"]');
        return new rxSortableColumn(columnElement);
    }

    getStatuses() {
        return this.tblServers.map(elem => {
            return new Row(elem).status.getStatus();
        });
    }

    row(rowIndex) {
        let rowElement = this.tblServers.get(rowIndex);
        return new Row(rowElement);
    }
}

let tablePageObject = new Table();

/**
 * @description Lookup of human-readable status strings from the ones featured in the HTML templates.
 */
let STATUS_TYPES = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
    DELETED: 'DELETED',
    DELETING: 'DELETING',
    ERROR: 'ERROR',
    MIGRATING: 'MIGRATING',
    REBUILD: 'REBUILD',
    RESCUE: 'RESCUE',
    RESIZE: 'RESIZE',
    SUSPENDED: 'SUSPENDED',
    UNKNOWN: 'UNKNOWN',
};

describe('rxStatusColumn', () => {
    before(() => {
        demoPage.go('#/elements/Tables');
    });

    describe('rows', () => {
        let status: rxStatusColumn;

        describe('active cell', () => {

            before(() => {
                status = tablePageObject.row(0).status;
            });

            it('should have a status by type', () => {
                expect(status.getStatus()).to.eventually.equal(STATUS_TYPES.ACTIVE);
            });

            it('should not have a status by icon', () => {
                expect(status.getIcon()).to.eventually.be.null;
            });

            it('should have a status by color', () => {
                expect(status.getColor()).to.eventually.equal(STATUS_COLORS.ACTIVE);
            });

            it('should not have an api ', () => {
                expect(status.getApi()).to.eventually.be.null;
            });

            it('should have a tooltip', () => {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', () => {
                expect(status.tooltip.getText()).to.eventually.equal('ACTIVE');
            });

        });

        describe('disabled cell', () => {

            before(() => {
                status = tablePageObject.row(3).status;
            });

            it('should have a status by type', () => {
                expect(status.getStatus()).to.eventually.equal(STATUS_TYPES.DISABLED);
            });

            it('should not have a status by icon', () => {
                expect(status.getIcon()).to.eventually.be.null;
            });

            it('should have a status by color', () => {
                expect(status.getColor()).to.eventually.equal(STATUS_COLORS.DISABLED);
            });

            it('should not have an api ', () => {
                expect(status.getApi()).to.eventually.be.null;
            });

            it('should have a tooltip', () => {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', () => {
                expect(status.tooltip.getText()).to.eventually.equal('DISABLED');
            });

        });

        describe('error cell', () => {

            before(() => {
                status = tablePageObject.row(4).status;
            });

            it('should have a status by type', () => {
                expect(status.getStatus()).to.eventually.equal(STATUS_TYPES.ERROR);
            });

            it('should not have a status by icon', () => {
                expect(status.getIcon()).to.eventually.equal(STATUS_ICONS.ERROR);
            });

            it('should have a status by color', () => {
                expect(status.getColor()).to.eventually.equal(STATUS_COLORS.ERROR);
            });

            it('should have a tooltip', () => {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', () => {
                expect(status.tooltip.getText()).to.eventually.equal('ERROR');
            });

        });

        describe('info cells - rescue cell', () => {
            before(() => {
                status = tablePageObject.row(7).status;
            });

            it('should have a status by type', () => {
                expect(status.getStatus()).to.eventually.equal(STATUS_TYPES.RESCUE);
            });

            it('should not have a status by icon', () => {
                expect(status.getIcon()).to.eventually.equal(STATUS_ICONS.INFO);
            });

            it('should have a status by color', () => {
                expect(status.getColor()).to.eventually.equal(STATUS_COLORS.INFO);
            });
        });

        describe('pending cells - migrating cell', () => {
            before(() => {
                status = tablePageObject.row(5).status;
            });

            it('should have a status by type', () => {
                expect(status.getStatus()).to.eventually.equal(STATUS_TYPES.MIGRATING);
            });

            it('should have a status by icon', () => {
                expect(status.getIcon()).to.eventually.be.null;
            });

            it('should have a status by color', () => {
                expect(status.getColor()).to.eventually.equal(STATUS_COLORS.PENDING);
            });
        });

        describe('pending cells - deleting cell', () => {
            before(() => {
                status = tablePageObject.row(2).status;
            });

            it('should have a status by type', () => {
                expect(status.getStatus()).to.eventually.equal(STATUS_TYPES.DELETING);
            });

            it('should have a status by icon', () => {
                expect(status.getIcon()).to.eventually.be.null;
            });

            it('should have a status by color', () => {
                expect(status.getColor()).to.eventually.equal(STATUS_COLORS.PENDING);
            });

            it('should be using an api', () => {
                expect(status.getApi()).to.eventually.equal('fooApi');
            });

            it('should have a tooltip', () => {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', () => {
                expect(status.tooltip.getText()).to.eventually.equal('DELETING');
            });
        });
    });

    describe('sorting', () => {
        let orderedStatuses = _.values(STATUS_TYPES).sort();

        it('should support sorting ascending', () => {
            tablePageObject.statusColumn.sortAscending();
            expect(tablePageObject.getStatuses()).to.eventually.eql(orderedStatuses);
        });

        it('should support sorting descending', () => {
            tablePageObject.statusColumn.sortDescending();
            expect(tablePageObject.getStatuses()).to.eventually.eql(orderedStatuses.reverse());
        });

    });

});
