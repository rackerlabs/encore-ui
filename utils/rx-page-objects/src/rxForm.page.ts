'use strict';

import * as _ from 'lodash';
import {ElementFinder} from 'protractor';

/**
 * @description
 * Generates a getter and a setter for a text field on your page.
 * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
 * @example
 * class YourPage {
 *     @textFieldAccessor(element(by.model('username'))) plainTextbox;
 * });
 *
 * it('should fill out the text box', function () {
 *     yourPage.plainTextbox = 'My Username'; // setter
 *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
 * });
 */
export function textFieldAccessor(elem: ElementFinder): PropertyDecorator {
    return (target, propertyKey): PropertyDescriptor => {
        return {
            get() {
                return elem.getAttribute('value');
            },
            set(input) {
                elem.clear();
                elem.sendKeys(input);
            },
        };
    };
}

/**
 * @class rxForm
 */
export class rxForm {

    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     *
     * @example
     * class YourPage {
     *     form(formData) {
     *         rxForm.fill(this, formData);
     *     }
     *
     *     @textFieldAccessor(element(by.model('textbox'))) aTextbox;
     *
     *     @rxRadioAccessor(element(by.model('radioButton'))) aRadioButton;
     *
     *     @rxRadioAccessor(element(by.model('radioButton_1'))) anotherRadioButton;
     *
     *     @rxSelectAccessor(element(by.model('dropdown'))) aSelectDropdown;
     * });
     *
     * yourPage.form({
     *     aTextbox: 'My Name',
     *     aRadioButton: true,
     *     aSelectDropdown: 'My Choice'
     * });
     * // executing the above would execute all `setter` methods of your form to equal the values listed above.
     */
    static fill(reference, formData) {
        _.forEach(formData, (value, key) => {
            if (_.isPlainObject(value)) {
                this.fill(reference[key], value);
            } else {
                reference[key] = value;
            }
        });
    }
};
