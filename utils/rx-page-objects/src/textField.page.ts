'use strict';

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
