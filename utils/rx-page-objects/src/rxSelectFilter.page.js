var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxMultiSelect = require('./rxMultiSelect.page').rxMultiSelect;

/**
   @namespace
 */
var rxSelectFilter = {

    /**
     * @private
     * @function
     * @param {String} label - The label of the rxMultiSelect dropdown.
     * @returns {rxMultiSelect} Page object representing the rxSelectFilter object.
     */
    multiSelectByLabel: {
        value: function (label) {
            var selectWrapper = element(by.cssContainingText('.select-wrapper', label));
            return rxMultiSelect.initialize(selectWrapper.$('rx-multi-select'));
        }
    },

    /**
     * @description From `filterData`'s key-value pairs, select the options contained in the values against
     * the {@link rxMultiSelect} (identified by text) in each key.
     * @see rxMultiSelect
     * @function
     * @param {Object} filterData - Key-value pairs of the rxMultiSelects' labels and their options to select.
     *                              The value is an object, where the keys are the options and the values indicate
     *                              if the option should be selected or deselected.
     * @example
     * it('should select only the US accounts that are still open', function () {
     *     var multiSelect = encore.rxSelectFilter.initialize();
     *     multiSelect.apply({
     *         Account: {
     *             All: false,
     *             US: true
     *         },
     *         Status: {
     *             All: false,
     *             Open: true
     *         }
     *     });
     *
     *     expect(myPage.myTable.column('Account').data.then(_.uniq)).to.eventually.eql(['US']);
     *     expect(myPage.myTable.column('Status').data.then(_.uniq)).to.eventually.eql(['Open']);
     * });
     */
    apply: {
        value: function (filterData) {
            var self = this;
            _.each(filterData, function (options, label) {
                var multiSelect = self.multiSelectByLabel(label);
                multiSelect.openMenu();
                _.each(options, function (shouldSelect, option) {
                    if (shouldSelect) {
                        multiSelect.select([option]);
                    } else {
                        multiSelect.deselect([option]);
                    }
                });
                multiSelect.closeMenu();
            });
        }
    }

};

exports.rxSelectFilter = {

    /**
     * @function
     * @memberof rxSelectFilter
     * @param {ElementFinder} [rxSelectFilterElement=$('rx-select-filter')] -
     * ElementFinder to be transformed into an rxSelectFilterElement object.
     * @returns {rxSelectFilter} Page object representing the rxSelectFilter object.
     */
    initialize: function (rxSelectFilterElement) {
        if (rxSelectFilterElement === undefined) {
            rxSelectFilterElement = $('rx-select-filter');
        }

        rxSelectFilter.rootElement = {
            get: function () { return rxSelectFilterElement; }
        };
        return Page.create(rxSelectFilter);
    }
};
