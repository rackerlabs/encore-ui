var rxFieldName = require('./rxFieldName.page').rxFieldName;

/**
 * @namespace rxForm
 */
exports.rxForm = {
    /**
     * @namespace
     */
    textField: {
        /**
         * @function
         * @description
         * Generates a getter and a setter for a text field on your page.
         * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
         * @param {ElementFinder} elem - The ElementFinder for the text field.
         * @returns {Object} A getter and a setter to be applied to a text field in a page object.
         *
         * @example
         * var yourPage = Page.create({
         *     plainTextbox: rxForm.textField.generateAccessor(element(by.model('username')));
         * });
         *
         * it('should fill out the text box', function () {
         *     yourPage.plainTextbox = 'My Username'; // setter
         *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
         * });
         */
        generateAccessor: function (elem) {
            return {
                get: function () {
                    return elem.getAttribute('value');
                },
                set: function (input) {
                    elem.clear();
                    elem.sendKeys(input);
                }
            };
        }
    },

    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     * @param {Object} reference - Context to evaluate under as `this` (typically, `this`).
     * @param {Object} formData - Key-value pairs of deeply-nested form items, and their values to fill.
     *
     * @example
     * var yourPage = Page.create({
     *     form: {
     *         set: function (formData) {
     *             rxForm.fill(this, formData);
     *         }
     *     },
     *
     *     aTextbox: encore.rxForm.textField.generateAccessor(element(by.model('textbox'))),
     *
     *     aRadioButton: encore.rxRadio.generateAccessor(element(by.model('radioButton'))),
     *     anotherRadioButton: encore.rxRadio.generateAccessor(element(by.model('radioButton_1'))),
     *
     *     aSelectDropdown: encore.rxSelect.generateAccessor(element(by.model('dropdown')));
     *
     *     aModule: {
     *         // this is now a namespace within your page object
     *         get hasMethods() {
     *             return encore.rxForm.textField.generateAccessor(element(by.model('internalTextbox')))
     *         },
     *
     *         deepNesting: {
     *             // namespace within a namespace
     *             get might() {
     *                 return encore.rxForm.textField.generateAccessor(element(by.model('nested')))
     *             }
     *         }
     *     }
     *
     * });
     *
     * yourPage.form = {
     *     aTextbox: 'My Name',
     *     aRadioButton: true,
     *     aSelectDropdown: 'My Choice'
     *     aModule: {
     *         hasMethods: 'Can Accept Input Too',
     *         deepNesting: {
     *             might: 'be overkill at this level'
     *         }
     *     }
     * };
     * // executing the above would execute all `setter` methods of your form to equal the values listed above.
     */
    fill: function (reference, formData) {
        var next = this;
        var page = reference;
        _.forEach(formData, function (value, key) {
            if (_.isPlainObject(value)) {
                // There is a deeply-nested function call in the form.
                reference = page[key];
                next.fill(reference, value);
            } else {
                page[key] = value;
            }
        });
    },

    /**
     * @description **ALIASED** Directly uses {@link rxFieldName}.
     */
    fieldName: rxFieldName
};
