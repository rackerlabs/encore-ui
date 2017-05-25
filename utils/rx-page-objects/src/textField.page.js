'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
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
function textFieldAccessor (elem) {
    return function () {
        return {
            get: function () {
                return elem.getAttribute('value');
            },
            set: function (input) {
                elem.clear();
                elem.sendKeys(input);
            },
        };
    };
}
exports.textFieldAccessor = textFieldAccessor;
