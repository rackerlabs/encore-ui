'use strict';

import * as _ from 'lodash';
import {ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * Functions for interacting with a single checkbox element.
 */
export class rxCheckbox extends rxComponentElement {

    get eleFakeCheckbox(): ElementFinder {
        return this.parent.$('.fake-checkbox');
    }

    /**
     * Whether or not the element in question is a checkbox.
     */
    isCheckbox(): Promise<Boolean> {
        return this.getAttribute('type').then(type => {
            return type === 'checkbox';
        });
    }

    /**
     * whether or not the checkbox is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed(): Promise<boolean> {
        return this.eleFakeCheckbox.isPresent().then(isFakeCheckbox => {
            return isFakeCheckbox ? this.eleFakeCheckbox.isDisplayed() : this._originalElement.isDisplayed();
        });
    }

    /**
     * Whether or not the checkbox is enabled.
     */
    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.eleFakeCheckbox.isPresent().then(isFakeCheckbox => {
            if (isFakeCheckbox) {
                return this.parent.getAttribute('class').then(classes => {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this._originalElement.isEnabled();
        });
    }

    /**
     * Whether or not the checkbox is present on the page.
     */
    @OverrideWebdriver
    isPresent(): Promise<boolean> {
        return this.eleFakeCheckbox.isPresent().then(isFakeCheckbox => {
            return isFakeCheckbox || this._originalElement.isPresent();
        });
    }

    /**
     * whether or not the checkbox is valid.
     */
    isValid(): Promise<boolean> {
        return this.getAttribute('class').then(classes => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }

    /**
     * @instance
     * @function
     * Make sure checkbox is selected/checked.
     */
    select(): Promise<void> {
        return this.isSelected().then(selected => {
            if (!selected) {
                this.click();
            }
        });
    }

    /**
     * @instance
     * @function
     * Make sure checkbox is deselected.
     */
    deselect(): Promise<void> {
        return this.isSelected().then(selected => {
            if (selected) {
                this.click();
            }
        });
    }
}

export function rxCheckboxAccessor(elem: ElementFinder) {
    return (target, propertyKey): any => {
        let checkbox = new rxCheckbox(elem);
        return {
            get: () => {
                return checkbox.isSelected();
            },
            set: enable => {
                enable ? checkbox.select() : checkbox.deselect();
            },
        };
    };
}
