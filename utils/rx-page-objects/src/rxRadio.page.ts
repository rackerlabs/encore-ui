'use strict';

import * as _ from 'lodash';
import {ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * @class
 */

export class rxRadio extends rxComponentElement {

    get eleFakeRadio(): ElementFinder {
        return this.parent.$('.fake-radio');
    }

    /**
     * @description Whether or not the element in question is a radio button.
     * Useful for situations where input types might change in the future, ensuring that the expected one is being used.
     */
    isRadio(): Promise<boolean> {
        return this.getAttribute('type').then(type => {
            return type === 'radio';
        });
    }

    /**
     * @description Whether the radio button is valid.
     */
    isValid(): Promise<boolean> {
        return this.getAttribute('class').then(classes => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }

    /**
     * @description Whether the radio element is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed(): Promise<boolean> {
        return this.eleFakeRadio.isPresent().then(isFakeRadio => {
            return isFakeRadio ? this.eleFakeRadio.isDisplayed() : this._originalElement.isDisplayed();
        });
    }

    /**
     * @description Whether or not the radio element is enabled.
     */
    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.eleFakeRadio.isPresent().then(isFakeRadio => {
            if (isFakeRadio) {
                return this.parent.getAttribute('class').then(classes => {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this._originalElement.isEnabled();
        });
    }

    /**
     * @description Makes sure that the radio button is selected. If the radio button is already
     * selected, this function will do nothing.
     */
    select(): Promise<void> {
        return this.isSelected().then(selected => {
            if (!selected) {
                this.click();
            }
        });
    }
}

export function rxRadioAccessor(elem: ElementFinder): PropertyDecorator {
    return (target, propertyKey): PropertyDescriptor => {
        let radio = new rxRadio(elem);
        return {
            get() {
                return radio.isSelected();
            },
            // passing `false` to this will do nothing.
            set(enable: boolean) {
                if (enable) {
                    radio.select();
                }
            },
        };
    };
};
