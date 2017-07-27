var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxRadio = {
    eleWrapper: {
        get: function () {
            return this.rootElement.element(by.xpath('..'));
        }
    },

    eleFakeRadio: {
        get: function () {
            return this.eleWrapper.$('.fake-radio');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the element in question is a radio button.
     * Useful for situations where input types might change in the future, ensuring that the expected one is being used.
     * @returns {Boolean}
     */
    isRadio: {
        value: function () {
            return this.rootElement.getAttribute('type').then(function (type) {
                return type === 'radio';
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the radio button is valid.
     * @returns {Boolean}
     */
    isValid: {
        value: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return _.includes(classes.split(' '), 'ng-valid');
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the radio element is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            var page = this;
            return this.eleFakeRadio.isPresent().then(function (isFakeRadio) {
                return isFakeRadio ? page.eleFakeRadio.isDisplayed() : page.rootElement.isDisplayed();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the radio button is present.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the radio element is enabled.
     * @return {Promise<Boolean>}
     */
    isEnabled: {
        value: function () {
            var page = this;
            return this.eleFakeRadio.isPresent().then(function (isFakeRadio) {
                if (isFakeRadio) {
                    return page.eleWrapper.getAttribute('class').then(function (classes) {
                        return !_.includes(classes.split(' '), 'rx-disabled');
                    });
                }
                return page.rootElement.isEnabled();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the radio button is currently selected.
     * @returns {Boolean}
     */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @function
     * @instance
     * @description Makes sure that the radio button is selected. If the radio button is already
     * selected, this function will do nothing.
     */
    select: {
        value: function () {
            var radio = this.rootElement;
            return this.isSelected().then(function (selected) {
                if (!selected) {
                    radio.click();
                }
            });
        }
    }
};

exports.rxRadio = {
    /**
     * @function
     * @memberof rxRadio
     * @description Creates a page object representing the rxRadio element.
     * @param {ElementFinder} rxRadioElement - ElementFinder to be transformed into an rxRadio page object.
     * @returns {rxRadio}
     */
    initialize: function (rxRadioElement) {
        rxRadio.rootElement = {
            get: function () { return rxRadioElement; }
        };
        return Page.create(rxRadio);
    },

    /**
     * @function
     * @memberof rxRadio
     * @description Generates a getter and a setter for an rxRadio element on your page.
     * The getter maps to the value returned from the instance's {@link rxRadio#isSelected},
     * whereas the setter will apply the given value against {@link rxRadio#select}.
     * @param {ElementFinder} elem - The ElementFinder for the rxRadio.
     * @returns {Object}
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.rxRadio.initialize(elem).isSelected();
            },
            // passing `false` to this will do nothing.
            set: function (enable) {
                if (enable) {
                    exports.rxRadio.initialize(elem).select();
                }
            }
        };
    }
};
