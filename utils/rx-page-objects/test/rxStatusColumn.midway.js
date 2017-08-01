var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxStatusColumn = encore.rxStatusColumn;
var rxSortableColumn = encore.rxSortableColumn;

// an anonymous page object to demonstrate table and cell creation
var repeaterString = 'server in servers';
var tablePageObject = Page.create({

    rootElement: {
        get: function () {
            return $('.demo-status-column-table');
        }
    },

    tblServers: {
        get: function () {
            return this.rootElement.all(by.repeater(repeaterString));
        }
    },

    column: {
        value: function (columnName) {
            // Only 'Status' is supported -- 'Title' is unsortable.
            if (columnName === 'Status') {
                var columnElement = this.rootElement.$('rx-sortable-column[sort-property="status"]');
                return rxSortableColumn.initialize(columnElement, repeaterString);
            }
        }
    },

    row: {
        value: function (rowIndex) {
            var rowElement = this.tblServers.get(rowIndex);
            return Page.create({
                // The tests below focus heavily on this table row property
                status: {
                    get: function () {
                        return rxStatusColumn.initialize(rowElement.$('[rx-status-column]'));
                    }
                },

                // goo.gl/OJdysF
                title: {
                    get: function () {
                        return rowElement.$('td+td').getText();
                    }
                }
            });
        }
    }

});

var statuses = rxStatusColumn.statuses;
var icons = rxStatusColumn.icons;
var colors = rxStatusColumn.colors;
describe('rxStatusColumn', function () {

    before(function () {
        demoPage.go('#/elements/Tables');
    });

    describe('rows', function () {
        var status;

        describe('active cell', function () {

            before(function () {
                status = tablePageObject.row(0).status;
            });

            it('should have a status by type', function () {
                expect(status.byType).to.eventually.equal(statuses.active);
            });

            it('should not have a status by icon', function () {
                expect(status.byIcon).to.eventually.be.null;
            });

            it('should have a status by color', function () {
                expect(status.byColor).to.eventually.equal(colors.active);
            });

            it('should not have an api ', function () {
                expect(status.api).to.eventually.be.null;
            });

            it('should not have a tooltip', function () {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', function () {
                expect(status.tooltip.getText()).to.eventually.equal('ACTIVE');
            });

        });

        describe('disabled cell', function () {

            before(function () {
                status = tablePageObject.row(3).status;
            });

            it('should have a status by type', function () {
                expect(status.byType).to.eventually.equal(statuses.disabled);
            });

            it('should not have a status by icon', function () {
                expect(status.byIcon).to.eventually.be.null;
            });

            it('should have a status by color', function () {
                expect(status.byColor).to.eventually.equal(colors.disabled);
            });

            it('should not have an api ', function () {
                expect(status.api).to.eventually.be.null;
            });

            it('should not have a tooltip', function () {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', function () {
                expect(status.tooltip.getText()).to.eventually.equal('DISABLED');
            });

        });

        describe('error cell', function () {

            before(function () {
                status = tablePageObject.row(4).status;
            });

            it('should have a status by type', function () {
                expect(status.byType).to.eventually.equal(statuses.error);
            });

            it('should not have a status by icon', function () {
                expect(status.byIcon).to.eventually.equal(statuses.error);
            });

            it('should have a status by color', function () {
                expect(status.byColor).to.eventually.equal(colors.error);
            });

            it('should have a tooltip', function () {
                expect(status.tooltip.isPresent()).to.eventually.be.true;
            });

            it('should have tooltip text', function () {
                expect(status.tooltip.getText()).to.eventually.equal('ERROR');
            });

        });

        describe('info cells', function () {

            describe('rescue cell', function () {

                before(function () {
                    status = tablePageObject.row(7).status;
                });

                it('should have a status by type', function () {
                    expect(status.byType).to.eventually.equal(statuses.rescue);
                });

                it('should not have a status by icon', function () {
                    expect(status.byIcon).to.eventually.equal(icons.info);
                });

                it('should have a status by color', function () {
                    expect(status.byColor).to.eventually.equal(colors.info);
                });

            });

        });

        describe('pending cells', function () {

            describe('migrating cell', function () {

                before(function () {
                    status = tablePageObject.row(5).status;
                });

                it('should have a status by type', function () {
                    expect(status.byType).to.eventually.equal(statuses.migrating);
                });

                it('should have a status by icon', function () {
                    expect(status.byIcon).to.eventually.be.null;
                });

                it('should have a status by color', function () {
                    expect(status.byColor).to.eventually.equal(colors.pending);
                });

            });

            describe('deleting cell', function () {

                before(function () {
                    status = tablePageObject.row(2).status;
                });

                it('should have a status by type', function () {
                    expect(status.byType).to.eventually.equal(statuses.deleting);
                });

                it('should have a status by icon', function () {
                    expect(status.byIcon).to.eventually.be.null;
                });

                it('should have a status by color', function () {
                    expect(status.byColor).to.eventually.equal(colors.pending);
                });

                it('should be using an api', function () {
                    expect(status.api).to.eventually.equal('fooApi');
                });

                it('should have tooltip text', function () {
                    expect(status.tooltip.getText()).to.eventually.equal('DELETING');
                });

            });

        });

    });

    describe('sorting', function () {
        var column;
        var ascendingOrder = _.values(statuses).sort();

        var statusCellData = function (cellElements) {
            return cellElements.map(function (cellElement) {
                return rxStatusColumn.initialize(cellElement).byType;
            });
        };

        before(function () {
            column = tablePageObject.column('Status');
        });

        it('should support sorting ascending', function () {
            column.sortAscending();
            expect(column.getDataUsing(statusCellData, '[rx-status-column]')).to.eventually.eql(ascendingOrder);
        });

        it('should support sorting descending', function () {
            var descendingOrder = ascendingOrder.reverse();
            column.sortDescending();
            expect(column.getDataUsing(statusCellData, '[rx-status-column]')).to.eventually.eql(descendingOrder);
        });

    });

});
