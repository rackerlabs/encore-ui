var Page = require('astrolabe').Page;
var rxTooltip = require('./rxTooltip.page').rxTooltip;

var classNameToStatus = function (iconClassName) {
    iconClassName = iconClassName.replace(/fa fa-lg/, '').trim();
    return {
        'fa-ban': 'ERROR',
        'fa-exclamation-triangle': 'WARNING',
        'fa-info-circle': 'INFO'
    }[iconClassName] || null;
};

/**
 * @namespace
 * @description Functionality for interacting with and query the values in a status column. When
 * used in conjunction with {@link rxSortableColumn}, these functions will allow you to interact
 * with a single cell in that sortable column as a "status column". Status columns have use a mix
 * of colors and icons to represent a status. Many of these statuses are free-form. It'll be up to
 * you to map what each color and symbol combination means in your app, but some basic ones are
 * included in this namespace via {@link rxStatusColumn.statuses}, {@link rxStatusColumn.icons}, and
 * {@link rxStatusColumn.colors}.
 *
 * All examples in this documentation will assume that you're using code similar to what's shown
 * in the example below.
 * @see rxSortableColumn
 * @example
 * var repeaterString = 'server in servers';
 * var myTable = {
 *     get rootElement() {
 *         return $('.demo-status-column-table');
 *     },
 *
 *     get tblServers() {
 *         return this.rootElement.all(by.repeater(repeaterString));
 *     },
 *
 *     column: function (columnName) {
 *         var columnElement = this.rootElement.$('rx-sortable-column[sort-property="status"]');
 *         return rxSortableColumn.initialize(columnElement, repeaterString);
 *     },
 *
 *     row: function (rowIndex) {
 *         var rowElement = this.tblServers.get(rowIndex);
 *         return {
 *             // The tests below focus heavily on this table row property
 *             get status() {
 *                 return rxStatusColumn.initialize(rowElement.$('[rx-status-column]'));
 *             },
 *
 *             // just for the sake of having another example present
 *             get title() {
 *                 return rowElement.$('td+td').getText();
 *             }
 *
 *         });
 *     }
 *
 * });
 */
var rxStatusColumn = {
    /**
     * @todo Rename this to just `type`, or make it a function `byType()`.
     * @instance
     * @see rxStatusColumn.statuses
     * @description Represents the custom defined status type.
     * This has no relation to the tooltip text, the icon chosen, or the color used to represent it.
     * @type {String}
     * @example
     * it('should have an active status for the first row', function () {
     *     var statuses = encore.rxStatusColumn.statuses;
     *     expect(myTable.row(0).status.byType).to.eventually.equal(statuses.active);
     *     // or, you could manually type out the 'ACTIVE' string yourself
     *     expect(myTable.row(0).status.byType).to.eventually.equal('ACTIVE');
     * });
     */
    byType: {
        get: function () {
            return this.rootElement.getAttribute('status');
        }
    },

    /**
     * @todo Rename this to just `icon`, or make it a function `byIcon()`.
     * @instance
     * @rxStatusColumn.icons
     * @description Represents the status as summarized by the icon selection alone.
     * Extracted from the font-awesome icon used.
     * @type {String}
     * @example
     * it('should have a warning icon for the 10th row', function () {
     *     var icons = encore.rxStatusColumn.icons;
     *     expect(myTable.row(10).status.byIcon).to.eventually.equal(icons.warning);
     *     // or, you could manually type out the 'WARNING' string yourself
     *     expect(myTable.row(9).status.byIcon).to.eventually.equal('WARNING');
     * });
     */
    byIcon: {
        get: function () {
            return this.rootElement.$('i').getAttribute('class').then(classNameToStatus);
        }
    },

    /**
     * @todo Rename this to just `color`, or make it a function `byColor()`.
     * @instance
     * @see rxStatusColumn.colors
     * @description Represents the status as summarized by the color selection alone. Extracted from the class name.
     * @type {String}
     * @example
     * it('should have the red "error" color class for the second row', function () {
     *     var colors = encore.rxStatusColumn.colors;
     *     expect(myTable.row(1)).to.eventually.equal(colors.error);
     *     // or, you could manually type out the 'ERROR' string yourself
     *     expect(myTable.row(1).status.byColor).to.eventually.equal('ERROR');
     * });
     */
    byColor: {
        get: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return classes.match(/status-(\w+)/)[1];
            });
        }
    },

    /**
     * @instance
     * @type {String|null}
     * @description The custom HTML attribute `api`, added to the status column by `rxStatusMappings.mapToAPI`.
     * For more information about this functionality, consult the developer's documentation for `rxStatusMappings`,
     * or look at the rxStatusColumn component demo. This attribute is not typical used by most projects.
     */
    api: {
        get: function () {
            return this.rootElement.getAttribute('api').then(function (api) {
                return api ? api : null;
            });
        }
    },

    /**
     * @instance
     * @description Will appear on hover. Exposes the functions contained within {@link rxStatusColumn.tooltip}.
     * @type {rxTooltip}
     */
    tooltip: {
        get: function () {
            var cellElement = this.rootElement;
            // Hover over cell element to trigger tooltip addition to DOM
            browser.actions().mouseMove(cellElement.$('i')).perform();
            // Create a new Tooltip with new DOM element as rootElement
            return new rxTooltip(cellElement.$('.rxTooltip'));
        }
    }

};

exports.rxStatusColumn = {

    /**
     * @function
     * @param {ElementFinder} rxStatusCellElement - Status cell element from a table row.
     * @returns {rxStatusColumn} Page object representing an {@link rxStatusColumn}.
     */
    initialize: function (rxStatusCellElement) {
        rxStatusColumn.rootElement = {
            get: function () { return rxStatusCellElement; }
        };
        return Page.create(rxStatusColumn);
    },

    /**
     * @description Lookup of human-readable status strings from the ones featured in the HTML templates.
     * @property {String} active - Maps to the string 'ACTIVE'
     * @property {String} disabled - Maps to the string 'DISABLED'
     * @property {String} deleted - Maps to the string 'DELETED'
     * @property {String} deleting - Maps to the string 'DELETING'
     * @property {String} error - Maps to the string 'ERROR'
     * @property {String} migrating - Maps to the string 'MIGRATING'
     * @property {String} rebuild - Maps to the string 'REBUILD'
     * @property {String} rescue - Maps to the string 'RESCUE'
     * @property {String} resize - Maps to the string 'RESIZE'
     * @property {String} suspended - Maps to the string 'SUSPENDED'
     * @property {String} unknown - Maps to the string 'UNKNOWN'
     * @type {Object}
     */
    statuses: {
        active: 'ACTIVE',
        disabled: 'DISABLED',
        deleted: 'DELETED',
        deleting: 'DELETING',
        error: 'ERROR',
        migrating: 'MIGRATING',
        rebuild: 'REBUILD',
        rescue: 'RESCUE',
        resize: 'RESIZE',
        suspended: 'SUSPENDED',
        unknown: 'UNKNOWN'
    },

    /**
     * @description Lookup of human-readable versions of the icon class names used in the HTML templates.
     * @property {String} error - Maps to the string 'ERROR'
     * @property {String} info - Maps to the string 'INFO'
     * @property {String} warning - Maps to the string 'WARNING'
     * @type {Object}
     */
    icons: {
        error: 'ERROR',
        info: 'INFO',
        warning: 'WARNING'
    },

    /**
     * @description Lookup of human-readable versions of the color class names used in the HTML templates.
     * @property {String} active - Maps to the string 'ACTIVE'
     * @property {String} disabled - Maps to the string 'DISABLED'
     * @property {String} error - Maps to the string 'ERRO'
     * @property {String} info - Maps to the string 'INFO'
     * @property {String} pending - Maps to the string 'PENDING'
     * @property {String} warning - Maps to the string 'WARNING'
     * @type {Object}
     */
    colors: {
        active: 'ACTIVE',
        disabled: 'DISABLED',
        error: 'ERROR',
        info: 'INFO',
        pending: 'PENDING',
        warning: 'WARNING'
    }

};
