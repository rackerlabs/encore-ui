'use strict';

import * as _ from 'lodash';
import {ElementFinder} from 'protractor';
import {by} from 'protractor';
import {OverrideWebdriver, rxComponentElement} from './rxComponent';

/**
 * @description Functions for interacting with a single checkbox element.
 * @class
 */
export class rxCheckbox extends rxComponentElement {
    get eleWrapper() {
        return this.element(by.xpath('..'));
    }

    get eleFakeCheckbox() {
        return this.eleWrapper.$('.fake-checkbox');
    }

    /**
     * @description Whether or not the element in question is a checkbox.
     */
    isCheckbox() {
        return this.getAttribute('type').then(type => {
            return type === 'checkbox';
        });
    }

    /**
     * @description Whether the checkbox is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed() {
        return this.eleFakeCheckbox.isPresent().then(isFakeCheckbox => {
            return isFakeCheckbox ? this.eleFakeCheckbox.isDisplayed() : this.originalElement.isDisplayed();
        });
    }

    /**
     * @description Whether or not the checkbox is enabled.
     */
    @OverrideWebdriver
    isEnabled() {
        return this.eleFakeCheckbox.isPresent().then(isFakeCheckbox => {
            if (isFakeCheckbox) {
                return this.eleWrapper.getAttribute('class').then(classes => {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this.originalElement.isEnabled();
        });
    }

    /**
     * @description Whether or not the checkbox is present on the page.
     */
    @OverrideWebdriver
    isPresent() {
        return this.eleFakeCheckbox.isPresent().then(isFakeCheckbox => {
            return isFakeCheckbox || this.originalElement.isPresent();
        });
    }

    /**
     * @description Whether the checkbox is valid.
     */
    isValid() {
        return this.getAttribute('class').then(classes => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }

    /**
     * @instance
     * @function
     * @description Make sure checkbox is selected/checked.
     */
    select() {
        return this.isSelected().then(selected => {
            if (!selected) {
                this.click();
            }
        });
    }

    /**
     * @instance
     * @function
     * @description Make sure checkbox is deselected.
     */
    deselect() {
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
