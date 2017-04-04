'use strict';

import * as _ from 'lodash';
import {by, ElementArrayFinder, ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

import {rxActionMenu} from './rxActionMenu.page';
import {rxCheckbox} from './rxCheckbox.page';

export class rxBulkSelectRow extends rxComponentElement {
    /**
     * The rxCheckbox used to select/deselect the row.
     */
    get checkbox(): rxCheckbox {
        return new rxCheckbox(this.$('input[type="checkbox"]'));
    }

    /**
     * Selects the row using `this.checkbox`.
     */
    select(): Promise<void> {
        return this.checkbox.select();
    }

    /**
     * Selects the row using `this.checkbox`.
     */
    deselect(): Promise<void> {
        return this.checkbox.deselect();
    }
};

export class rxBatchActionMenu extends rxActionMenu {
    get icoCog(): ElementFinder {
        return this.$('.fa-cogs');
    }

    // Need to override several properties styles and the ng-hide attribute
    // compared to what is seen in rxActionMenu.
    isExpanded(): Promise<boolean> {
        return this.$('.batch-action-menu-container')
            .getAttribute('class').then(className => {
                return className.indexOf('ng-hide') === -1;
            });
    }

    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.$('.btn-link.header-button').isEnabled();
    }
};

/**
 * Properties for interacting with an rxBulkSelect component.
 */
export class rxBulkSelect extends rxComponentElement {
    /**
     * Whether the bulk select component is currently enabled.
     */
    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.element(by.cssContainingText('.btn-link', 'Batch Actions')).isEnabled();
    }

    /**
     * The action menu present in the bulk actions action menu area.
     */
    get batchActions(): rxBatchActionMenu {
        return new rxBatchActionMenu(this.$('rx-batch-actions'));
    }

    /**
     * The checkbox object used to select all rows in the bulk select component.
     */
    get selectAllCheckbox(): rxCheckbox {
        let eleCheckbox = this.$('[rx-bulk-select-header-check]').$('input[type="checkbox"]');
        return new rxCheckbox(eleCheckbox);
    }

    get eleBulkMessage(): ElementFinder {
        return this.$('.bulk-select-header');
    }

    /**
     * The message appearing above the bulk select table, if present.
     * Only appears when some rows are selected. Otherwise, `null`.
     */
    get bulkMessage(): Promise<string> | Promise<null> {
        return this.eleBulkMessage.element(by.binding('numSelected')).getText().then(text => {
            return _.isEmpty(text) ? null : text;
        });
    }

    /**
     * Clicks the "select all" link that is only present when selected rows exist.
     */
    selectAll(): Promise<void> {
        return this.eleBulkMessage.element(by.partialButtonText('Select all')).click();
    }

    /**
     * Clicks the "Clear all" link that is only present when selected rows exist.
     */
    clearSelections(): Promise<void> {
        return this.eleBulkMessage.element(by.partialButtonText('Clear')).click();
    }

    get tblRows(): ElementArrayFinder {
        return this.$$('tbody tr');
    }

    /**
     * returns the row element by index.
     */
    row(index: number): rxBulkSelectRow {
        return new rxBulkSelectRow(this.tblRows.get(index));
    }

    get tblSelectedRows(): ElementArrayFinder {
        return this.$$('tbody tr.selected');
    }

    /**
     * Whether or not every available row is selected.
     */
    anySelected(): Promise<boolean> {
        return this.tblSelectedRows.first().isPresent();
    }

    /**
     * @function
     */
    selectByIndex(indices: number | number[]): void {
        if (!_.isArray(indices)) {
            indices = [indices];
        }
        _.each(indices, index => this.row(index).select());
    }

    /**
     * @function
     */
    deselectByIndex(indices: number | number[]): void {
        if (!_.isArray(indices)) {
            indices = [indices];
        }
        _.each(indices, index => this.row(index).deselect());
    }
}
