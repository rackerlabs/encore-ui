'use strict';

import * as _ from 'lodash';
import {ElementFinder} from 'protractor';
import {by} from 'protractor';
import {OverrideWebdriver, rxComponentElement} from './rxComponent';

/**
 * @class
 */

export class rxRadio extends rxComponentElement {
    get eleWrapper() {
        return this.element(by.xpath('..'));
    }

    get eleFakeRadio() {
        return this.eleWrapper.$('.fake-radio');
    }

    /**
     * @description Whether or not the element in question is a radio button.
     * Useful for situations where input types might change in the future, ensuring that the expected one is being used.
     */
    isRadio() {
        return this.getAttribute('type').then(type => {
            return type === 'radio';
        });
    }

    /**
     * @description Whether the radio button is valid.
     */
    isValid() {
        return this.getAttribute('class').then(classes => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }

    /**
     * @description Whether the radio element is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed() {
        return this.eleFakeRadio.isPresent().then(isFakeRadio => {
            return isFakeRadio ? this.eleFakeRadio.isDisplayed() : this.originalElement.isDisplayed();
        });
    }

    /**
     * @description Whether or not the radio element is enabled.
     */
    @OverrideWebdriver
    isEnabled() {
        return this.eleFakeRadio.isPresent().then(isFakeRadio => {
            if (isFakeRadio) {
                return this.eleWrapper.getAttribute('class').then(classes => {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this.originalElement.isEnabled();
        });
    }

    /**
     * @description Makes sure that the radio button is selected. If the radio button is already
     * selected, this function will do nothing.
     */
    select() {
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
