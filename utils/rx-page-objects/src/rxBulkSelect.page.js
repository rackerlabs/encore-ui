var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxActionMenu = require('./rxActionMenu.page').rxActionMenu;
var rxCheckbox = require('./rxCheckbox.page').rxCheckbox;

var rxBulkSelectDefaultRowFn = function (rowElement) {
    return rxCheckbox.initialize(rowElement.$('input[type="checkbox"]'));
};

var rxBatchActionMenu = function (rootElement) {
    var actionMenu = rxActionMenu.initialize(rootElement);

    // Need to override several properties styles and the ng-hide attribute
    // compared to what is seen in rxActionMenu.
    Object.defineProperties(actionMenu, {
        isExpanded: {
            value: function () {
                return rootElement.$('.batch-action-menu-container')
                    .getAttribute('class').then(function (className) {
                        return className.indexOf('ng-hide') === -1;
                    });
            }
        },

        icoCog: {
            get: function () {
                return rootElement.$('.fa-cogs');
            }
        },

        isEnabled: {
            value: function () {
                return rootElement.$('.btn-link.header-button').isEnabled();
            }
        },

        isPresent: {
            value: function () {
                return rootElement.isPresent();
            }
        }
    });

    return actionMenu;
};

/**
 * @description Properties for interacting with an rxBulkSelect component.
 * @namespace
*/
var rxBulkSelect = {
    /**
     * @function
     * @instance
     * @description Whether the bulk select component is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the bulk select component is currently enabled.
     * @returns {Boolean}
     */
    isEnabled: {
        value: function () {
            return this.rootElement.element(
                by.cssContainingText('.btn-link', 'Batch Actions')
            ).isEnabled();
        }
    },

    /**
     * @instance
     * @type {rxActionMenu}
     * @description The action menu present in the bulk actions action menu area.
     */
    batchActions: {
        get: function () {
            return rxBatchActionMenu(this.rootElement.$('rx-batch-actions'));
        }
    },

    /**
     * @instance
     * @type {rxCheckbox}
     * @description The checkbox object used to select all rows in the bulk select component.
     */
    selectAllCheckbox: {
        get: function () {
            var eleCheckbox = this.rootElement.$('[rx-bulk-select-header-check]').$('input[type="checkbox"]');
            return rxCheckbox.initialize(eleCheckbox);
        }
    },

    eleBulkMessage: {
        get: function () {
            return this.rootElement.$('.bulk-select-header');
        }
    },

    /**
     * @instance
     * @type {String|null}
     * @description The message appearing above the bulk select table, if present.
     * Only appears when some rows are selected. Otherwise, `null`.
     */
    bulkMessage: {
        get: function () {
            return this.eleBulkMessage.element(by.binding('numSelected')).getText().then(function (text) {
                return _.isEmpty(text) ? null : text;
            });
        }
    },

    /**
     * @instance
     * @function
     * @private
     * @description Clicks the "select all" link that is only present when selected rows exist.
     */
    selectAll: {
        value: function () {
            this.eleBulkMessage.element(by.partialButtonText('Select all')).click();
        }
    },

    /**
     * @instance
     * @function
     * @private
     * @description Clicks the "Clear all" link that is only present when selected rows exist.
     */
    clearSelections: {
        value: function () {
            this.eleBulkMessage.element(by.partialButtonText('Clear')).click();
        }
    },

    tblRows: {
        get: function () {
            return this.rootElement.$$('tbody tr');
        }
    },

    /**
     * @function
     * @instance
     * @description Grab a row by index `i`, then pass that row element to the
     * function `rowFromElement`, which is created at initialization time via an
     * argument passed to {@link rxBulkSelect.initialize}.
     * @returns {*}
     * @example
     * var tableRowFn = function (rootElement) {
     *     return {
     *         get rootElement() { return rootElement; },
     *         get type() {
     *             return rootElement.element(by.binding('status.type')).getText();
     *         },
     *
     *         get checkbox() {
     *             return encore.rxCheckbox.initialize(rootElement.$('input[type="checkbox"]'));
     *         }
     *     };
     * };
     * var table = encore.rxBulkSelect.initialize(undefined, tableRowFn);
     * expect(table.row(1).type).to.eventually.equal('normal');
     */
    row: {
        value: function (i) {
            return this.rowFromElement(this.tblRows.get(i));
        }
    },

    tblSelectedRows: {
        get: function () {
            return this.rootElement.$$('tbody tr.selected');
        }
    },

    /**
     * @function
     * @private
     * @instance
     * @description Whether or not every available row is selected.
     * @returns {Boolean}
     */
    anySelected: {
        value: function () {
            return this.tblSelectedRows.count().then(function (numSelectedRows) {
                return numSelectedRows > 0;
            });
        }
    },

    /**
     * @function
     * @private
     * @instance
     * @description Whether or not every available row is selected.
     * @returns {Boolean}
     */
    allSelected: {
        value: function () {
            var page = this;
            return this.tblRows.count().then(function (numRows) {
                return page.tblSelectedRows.count().then(function (numSelectedRows) {
                    return numRows === numSelectedRows;
                });
            });
        }
    },

    /**
     * @function
     * @param {Number|Number[]} i - The index or indices of the row(s) to select
     */
    selectByIndex: {
        value: function selectRowByIndex (i) {
            if (_.isArray(i)) {
                _.each(i, rowIndex => this.selectByIndex(rowIndex));
            } else {
                rxBulkSelectDefaultRowFn(this.tblRows.get(i)).select();
            }
        }
    },

    /**
     * @function
     * @param {Number|Number[]} i - The index or indices of the row(s) to deselect
     */
    deselectByIndex: {
        value: function deselectRowByIndex (i) {
            if (Array.isArray(i)) {
                _.each(i, rowIndex => this.deselectByIndex(rowIndex));
            } else {
                rxBulkSelectDefaultRowFn(this.tblRows.get(i)).deselect();
            }
        }
    }
};

exports.rxBulkSelect = {
    /**
     * @function
     * @memberof rxBulkSelect
     * @description Creates a page object from an `[rx-bulk-select]` DOM element.
     * @param {ElementFinder} [rxBulkSelectElement=$('[rx-bulk-select]')] -
     * ElementFinder to be transformed into an {@link rxBulkSelect} object.
     * @param {Function} [rxBulkSelectRowFn={@link rxCheckbox}] -
     * Function used to initialize a row object in the table. See {@link rxBulkSelect#row}
     * for more information about this parameter.
     * @returns {rxBulkSelect}
     */
    initialize: function (rxBulkSelectElement, rxBulkSelectRowFn) {
        if (rxBulkSelectElement === undefined) {
            rxBulkSelectElement = $('[rx-bulk-select]');
        }

        rxBulkSelect.rowFromElement = {
            value: rxBulkSelectRowFn || rxBulkSelectDefaultRowFn
        };

        rxBulkSelect.rootElement = {
            get: function () { return rxBulkSelectElement; }
        };
        return Page.create(rxBulkSelect);
    }
};
