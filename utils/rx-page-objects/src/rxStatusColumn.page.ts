'use strict';
import {browser} from 'protractor';
import {Promise, rxComponentElement} from './rxComponent';
import {Tooltip} from './tooltip.page';

/**
 * @description Lookup of human-readable versions of the color class names used in the HTML templates.
 */
export const STATUS_COLORS = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
    ERROR: 'ERROR',
    INFO: 'INFO',
    PENDING: 'PENDING',
    WARNING: 'WARNING',
};
export type STATUS_COLORS = keyof typeof STATUS_COLORS;

/**
 * @description Lookup of human-readable versions of the icon class names used in the HTML templates.
 */
export const STATUS_ICONS = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING',
};
export type STATUS_ICONS = keyof typeof STATUS_ICONS;

/**
 * Lookup of icon classes to icon statuses.
 */
const ICON_CLASS_STATUS = {
    'fa-ban': STATUS_ICONS.ERROR,
    'fa-exclamation-triangle': STATUS_ICONS.WARNING,
    'fa-info-circle': STATUS_ICONS.INFO,
};

/**
 * @class
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
 * let STATUS_TYPES = {
 *     ACTIVE: 'ACTIVE',
 *     DISABLED: 'DISABLED',
 *     DELETED: 'DELETED',
 *     DELETING: 'DELETING',
 *     ERROR: 'ERROR',
 *     MIGRATING: 'MIGRATING',
 *     REBUILD: 'REBUILD',
 *     RESCUE: 'RESCUE',
 *     RESIZE: 'RESIZE',
 *     SUSPENDED: 'SUSPENDED',
 *     UNKNOWN: 'UNKNOWN'
 * };
 *
 * class MyRow {
 *     constructor(rootElement) {
 *         this.rootElement = rootElement;
 *     }
 *
 *     // The tests below focus heavily on this table row property
 *     get status() {
 *         return new rxStatusColumn(this.rootElement.$('[rx-status-column]'));
 *     },
 *
 *     // just for the sake of having another example present
 *     get title() {
 *         return this.rootElement.$('td+td').getText();
 *     }
 * }
 *
 * class MyTable {
 *     get rootElement() {
 *         return $('.demo-status-column-table');
 *     },
 *
 *     get tblServers() {
 *         return this.rootElement.all(by.repeater('server in servers'));
 *     },
 *
 *     column(columnName) {
 *         let columnElement = this.rootElement.$('rx-sortable-column[sort-property="status"]');
 *         return new rxSortableColumn(columnElement);
 *     },
 *
 *     row(rowIndex) {
 *         let rowElement = this.tblServers.get(rowIndex);
 *         return new MyRow(rowElement);
 *     }
 * });
 */
export class rxStatusColumn extends rxComponentElement {
    /**
     * @description Represents the custom defined status type.
     * This has no relation to the tooltip text, the icon chosen, or the color used to represent it.
     * @example
     * it('should have an active status for the first row', function () {
     *     expect(myTable.row(0).status.getStatus()).to.eventually.equal(STATUS_TYPES.ACTIVE);
     *
     *     // or, you could manually type out the 'ACTIVE' string yourself
     *     expect(myTable.row(0).status.getStatus()).to.eventually.equal('ACTIVE');
     * });
     */
    getStatus() {
        return this.getAttribute('status');
    }

    /**
     * @description Represents the status as summarized by the icon selection alone.
     * Extracted from the font-awesome icon used.
     * @example
     * it('should have a warning icon for the 10th row', function () {
     *     expect(myTable.row(10).status.getIcon()).to.eventually.equal(STATUS_ICONS.WARNING);
     *     // or, you could manually type out the 'WARNING' string yourself
     *     expect(myTable.row(9).status.getIcon()).to.eventually.equal('WARNING');
     * });
     */
    getIcon(): Promise<STATUS_ICONS> | Promise<null> {
        return this.$('i').getAttribute('class').then(classes => {
            classes = classes.replace(/fa fa-lg/, '').trim();
            return ICON_CLASS_STATUS[classes] || null;
        });
    }

    /**
     * @description Represents the status as summarized by the color selection alone. Extracted from the class name.
     * @example
     * it('should have the red "error" color class for the second row', function () {
     *     expect(myTable.row(1).status.getColor()).to.eventually.equal(STATUS_COLORS.ERROR);
     *     // or, you could manually type out the 'ERROR' string yourself
     *     expect(myTable.row(1).status.getColor()).to.eventually.equal('ERROR');
     * });
     */
    getColor(): Promise<STATUS_COLORS> {
        return this.getAttribute('class').then(classes => {
            classes = classes.match(/status-(\w+)/)[1].toUpperCase();
            return STATUS_COLORS[classes];
        });
    }

    /**
     * @description The custom HTML attribute `api`, added to the status column by `rxStatusMappings.mapToAPI`.
     * For more information about this functionality, consult the developer's documentation for `rxStatusMappings`,
     * or look at the rxStatusColumn component demo. This attribute is not typical used by most projects.
     */
    getApi(): Promise<string> | Promise<null> {
        return this.getAttribute('api').then(api => {
            return (api ? api : null);
        });
    }

    /**
     * @description Will appear on hover. Exposes the functions contained within {@link rxStatusColumn.tooltip}.
     * Note that this function must hover over the tooltip in order to retrieve the underlying element.  This means that
     * other mouse actions after retrieving the tooltip may cause the tooltip to hide.
     */
    get tooltip() {
        // Hover over cell element to trigger tooltip addition to DOM
        browser.actions().mouseMove(this.$('i')).perform();
        // Create a new Tooltip with new DOM element as rootElement
        return new Tooltip(this.$('.tooltip'));
    }
};
