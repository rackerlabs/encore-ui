var Page = require('astrolabe').Page;

/**
 * This is a shared function for getting one column's sort direction, and all columns' sort directions.
 * @private
 */
var currentSortDirection = function (columnElement) {
    var spanSortDirection = columnElement.$('.sort-direction-icon');

    return spanSortDirection.isPresent().then(function (isPresent) {
        if (isPresent) {
            return spanSortDirection.getAttribute('class').then(function (klass) {
                return (klass.indexOf('ascending') > -1 ? 1 : -1);
            });
        } else {
            return 0;
        }
    });
};

/**
 * @namespace
 * @description Functions for interacting with sortable columns. See the example below for a typical
 * pattern you can use in your page objects for generating sortable columns. All examples in the function
 * documentation below will assume that this example has been set up and executed.
 * @example
 * var myTable = {
 *     get eleTableContainer() { return $('#my-table'); },
 *
 *     column: function (name) {
 *         var column = this.eleTableContainer.element(by.cssContainingText($('rx-sortable-column'), name));
 *         return encore.rxSortableColumn.initialize(column, 'item in repeaterString');
 *     }
 * };
 */
var rxSortableColumn = {

    btnSort: {
        get: function () {
            return this.rootElement.$('.sort-action');
        }
    },

    /**
     * @instance
     * @type {String}
     * @description The name of the column.
     * @example
     *
     * it('should have the right name', function () {
     *     expect(myTable.column('Start Date').name).to.eventually.equal('Start Date');
     * });
     */
    name: {
        get: function () {
            return this.rootElement.$('.sort-action .display-value').getText();
        }
    },

    /**
     * @description Will repeatedly click the sort button until the column is sorted ascending.
     * @instance
     * @function
     * @example
     * it('should sort the column ascending', function () {
     *     var column = myTable.column('Stuff');
     *     column.sortAscending();
     *     column.data.then(function (data) {
     *         expect(data.sort()).to.eventually.eql(data);
     *     });
     * });
     */
    sortAscending: {
        value: function () {
            this.sort({ sortValue: 1 });
        }
    },

    /**
     * @description Will repeatedly click the sort button until the column is sorted descending.
     * @instance
     * @function
     * @example
     * it('should sort the column descending', function () {
     *     var column = myTable.column('Stuff');
     *     column.sortDescending();
     *     column.data.then(function (data) {
     *         expect(data.sort().reverse()).to.eventually.eql(data);
     *     });
     * });
     */
    sortDescending: {
        value: function () {
            this.sort({ sortValue: -1 });
        }
    },

    /**
     * @function
     * @instance
     * @private
     * @description Prefer using {@link rxSortableColumn.sortAscending}
     * and {@link rxSortableColumn.sortDescending} over this.
     */
    sort: {
        value: function (namedParams, attempts) {
            var page = this;
            // this can get stuck if sorting isn't hooked up correctly and doesn't respond to clicks to sort
            if (attempts === undefined) {
                attempts = 0;
            }

            return this.currentSortDirection.then(function (sortDirection) {
                if (attempts > 3) {
                    return page.name.then(page.ColumnSortRequestUnresponsiveError.thro);
                }

                // Coercing -1 to Boolean results in -1 === true. We don't want that.
                // It's easier to leave as is since -1 != true and -1 != false.
                // Meaning we'll always sort the list at least once if it's currently unsorted.
                if (sortDirection != namedParams.sortValue) { // eslint-disable-line eqeqeq
                    page.btnSort.click();
                    attempts += 1;
                    page.sort(namedParams, attempts);
                }
            });
        }
    },

    /**
     * @private
     */
    sortProperty: {
        get: function () {
            return this.rootElement.getAttribute('sort-property');
        }
    },

    /**
     * @instance
     * @type {String[]}
     * @description Return the result of calling `.getText()` on each cell in the column.
     * You must provide a repeater string parameter to {@link rxSortableColumn.initialize}
     * in order to take advantage of this functionality.
     * @example
     * it('should have the expected data in the column', function () {
     *     var data = ['Here', 'is', 'some' 'data'];
     *     expect(myTable.column('Stuff').data).to.eventually.eql(data);
     * });
     */
    data: {
        get: function () {
            var defaultFn = function (cellElements) {
                return cellElements.getText();
            };

            return this.getDataUsing(defaultFn);
        }
    },

    /**
     * @description Return a list of all cell contents in this column.
     * Passes all cell elements to `customFn`, or if undefined, will return just the text of each cell.
     * The second argument, `allByCssSelectorString` is used when your column's binding
     * (which is used by `by.repeater().column`) is for some reason unreachable by protractor.
     * A common reason why this wouldn't be the case is because the binding is not used as text
     * within an ElementFinder, but instead used within the tag's attrs. An example of this is illustrated here:
     * [Binding inside of a tag's attributes.]{@link http://goo.gl/HPjLU7}
     * In these cases, you should specify a css selector that will select each element in the column you
     * care about, since `by.binding` is not an option. You must provide a repeater string parameter to
     * {@link rxSortableColumn.initialize} in order to take advantage of this functionality.
     * @param {function} [customFn] - Specific work that must occur to all column cell elements.
     * @param {String} [allByCssSelectorString] - Fallback `$$('.all-by-css')`-style call to select column cells.
     * @returns {Array} Dependent on the return value of `customFn`.
     * @instance
     * @function
     * @example
     * it('should have the correct sum listed for current usage', function () {
     *     var sumCurrency = function (columnElements) {
     *         return columnElements.getText().then(encore.rxMisc.currencyToPennies);
     *     };
     *
     *     var sum = myTable.column('Usage Charges').getDataUsing(sumCurrency);
     *     expect(sum).to.eventually.equal(14133);
     * });
     */
    getDataUsing: {
        value: function (customFn, allByCssSelectorString) {
            if (customFn === undefined) {
                return this.data;
            }

            var page = this;
            return this.sortProperty.then(function (sortProperty) {
                if (page.repeaterString === undefined) {
                    page.CellUndiscoverableError.thro('data');
                }

                if (allByCssSelectorString === undefined) {
                    return customFn(element.all(by.repeater(page.repeaterString).column(sortProperty)));
                } else {
                    var elements = element.all(by.repeater(page.repeaterString));
                    return customFn(elements.$$(allByCssSelectorString));
                }
            });
        }
    },

    /**
     * @instance
     * @description The current sort direction of the column. Returns 1, 0, or -1 based on direction.
     * - Ascending sort:  (1)  means the arrow is pointed down. [0-9, a-z]
     * - Not sorted:      (0)  means there is no arrow for this column.
     * - Descending sort: (-1) means the arrow is pointed up.   [z-a, 9-0]
     * Use {@link encore.module:rxSortableColumn.sortDirections} when testing your columns.
     * @type {Integer}
     * @see rxSortableColumn.sortDirections
     */
    currentSortDirection: {
        get: function () {
            return currentSortDirection(this.rootElement);
        }
    },

    /**
     * @instance
     * @type {Exception}
     * @description This exception is thrown whenever you attempt to access the data in a column's
     * cells without specifying a repeater string for the functions {@link rxSortableColumn#data} and
     * {@link rxSortableColumn#getDataUsing} to use. Including a `repeaterString` argument to
     * {@link rxSortableColumn.initialize} is required in order to take advantage of this functionality.
     * @example
     * it('should throw an exception when trying to get column data', function () {
     *     var repeaterString = undefined;
     *     var column = encore.rxSortableColumn.initialize($$('rx-sortable-column').first(), repeaterString);
     *     expect(column.data).to.eventually.eql(['Does', 'not', 'matter', 'exception', 'was', 'thrown']);
     * });
     */
    CellUndiscoverableError: {
        get: function () { return this.exception('repeaterString required at initialization to use'); }
    },

    /**
     * @instance
     * @type {Exception}
     * @description This exception is thrown whenever the sort icon never changes direction after clicking it.
     * After three attempts to sort the column by clicking the sort icon, this exception
     * is thrown. This usually happens because there's a typo somewhere in the controller or HTML, causing
     * the sort functionality in the directive not do anything after clicking the sort icon.
     */
    ColumnSortRequestUnresponsiveError: {
        get: function () { return this.exception('no sort activity after clicking multiple times for column'); }
    }

};

/**
 * @namespace
 * @description Functions for interacting with a table's worth of sortable column data.
 * @see rxSortableColumn
 */
var rxSortableColumns = {

    tblColumns: {
        get: function () {
            return this.rootElement.$$('rx-sortable-column');
        }
    },

    /**
     * @instance
     * @description Return all column names in in the table as an array of strings.
     * @type {String[]}
     * @example
     * it('should have every column present in the table', function () {
     *     var columns = ['Name', 'Manager', 'Start Date', 'End Date'];
     *     expect(encore.rxSortableColumn.byTable($('#my-table').names)).to.eventually.equal(columns);
     * });
     */
    names: {
        get: function () {
            return this.getNamesUsing(function (columnElement) {
                return columnElement.$('.sort-action .display-value').getText();
            });
        }
    },

    /**
     * @function
     * @instance
     * @private
     * @deprecated Not used very often. Should be pulled in 2.0
     * @description Return all column names, using a special function to alter the names
     * to something more uniform for testing purposes.
     */
    getNamesUsing: {
        value: function (mapFn) {
            return this.tblColumns.map(mapFn);
        }
    },

    /**
     * @type {Number[]}
     * @instance
     * @description Return a list of integers representing {@link rxSortableColumn#currentSortDirection} values.
     * These values map to each column, in the order they appear (left to right).
     * @see rxSortableColumn#currentSortDirection
     * @example
     * it('should have every column in the correct default sorting position', function () {
     *     var sortDirections = encore.rxSortableColumn.sortDirections;
     *     var sorts = [
     *         sortDirections.notSorted,
     *         sortDirections.notSorted,
     *         sortDirections.ascending,
     *         sortDirections.notSorted
     *     ];
     *
     *     expect(encore.rxSortableColumn.byTable($('#my-table')).sorts).to.eventually.eql(sorts);
     * });
     */
    sorts: {
        get: function () {
            return this.tblColumns.map(currentSortDirection);
        }
    }

};

exports.rxSortableColumn = {

    /**
     * @function
     * @memberof rxSortableColumn
     * @param {ElementFinder} rxSortableColumnElement - ElementFinder to be transformed into an rxSortableColumn object.
     * @param {String} [repeaterString] - Repeater string from the table. Required for {@link rxSortableColumn#data}
     * and {@link rxSortableColumn#getDataUsing}.
     * @returns {Page} Page object representing the {@link rxSortableColumn} object.
     */
    initialize: function (rxSortableColumnElement, repeaterString) {
        rxSortableColumn.rootElement = {
            get: function () { return rxSortableColumnElement; }
        };

        rxSortableColumn.repeaterString = {
            get: function () { return repeaterString; }
        };

        return Page.create(rxSortableColumn);
    },

    /**
     * @function
     * @description Entry point for the {@link rxSortableColumns} namespace. Used to return information
     * about an entire table's worth of columns.
     * @memberof rxSortableColumn
     * @param {ElementFinder} tableElement - ElementFinder of the entire `<table>` node.
     * @returns {rxSortableColumns} Page object representing the {@link rxSortableColumns} object.
     */
    byTable: function (tableElement) {
        rxSortableColumns.rootElement = {
            get: function () { return tableElement; }
        };

        return Page.create(rxSortableColumns);
    },

    /**
     * @memberof rxSortableColumn
     * @description A lookup for comparing sort directions against hard coded values, instead of integers.
     * @returns {Object} sortDirections Lookup of integer codes for sort directions from human-readable ones.
     * @property {Number} ascending - The numeral value one. Means the arrow is pointed down. [0-9, a-z]
     * @property {Number} notSorted - The numeral value zero. Means there is no arrow for this column.
     * @property {Number} descending - The numeral value negative one. Means the arrow is pointed up. [z-a, 9-0]
     * @see rxSortableColumn#currentSortDirection
     * @example
     * var sorts = encore.rxSortableColumn.sorts;
     * // ...
     * it('should sort the column ascending by default', function () {
     *     expect(column.currentSortDirection).to.eventually.equal(sorts.ascending);
     * });
     */
    sortDirections: {
        ascending: 1,
        notSorted: 0,
        descending: -1
    }

};
