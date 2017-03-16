var Page = require('astrolabe').Page;

var rxCheckbox = require('./rxCheckbox.page').rxCheckbox;
var _ = require('lodash');

var selectOptionFromElement = function (optionElement) {
    /**
     * @private
     * @namespace rxMultiSelect.option
     */
    return Object.create(new rxCheckbox(optionElement.$('input')), {

        /**
         * @function
         * @memberof rxMultiSelect.option
         * @instance
         * @description The text inside of the current option.
         * @returns {Promise<String>}
         */
        getText: {
            value: function () {
                return optionElement.getText();
            }
        },

        /**
         * @memberof rxMultiSelect.option
         * @instance
         * @description The value bound to the option.
         * @type {String}
         */
        value: {
            get: function () {
                return optionElement.getAttribute('value');
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxMultiSelect.option
         * @description Make sure checkbox is selected/checked.
         */
        select: {
            value: function () {
                /**
                 * Since protractor 3.0, you must over-ride anything that interacts with the inherited
                 * checkboxes (since they have a `<label>` tag on top of them). Attempting to click the
                 * underlying `<input>` tag will throw a ElementNotClickableError.
                 */
                var label = optionElement;
                return this.isSelected().then(function (selected) {
                    if (!selected) {
                        label.click();
                    }
                });
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxMultiSelect.option
         * @description Make sure checkbox is deselected.
         */
        deselect: {
            value: function () {
                /**
                 * Since protractor 3.0, you must over-ride anything that interacts with the inherited
                 * checkboxes (since they have a `<label>` tag on top of them). Attempting to click the
                 * underlying `<input>` tag will throw a ElementNotClickableError.
                 */
                var label = optionElement;
                return this.isSelected().then(function (selected) {
                    if (selected) {
                        label.click();
                    }
                });
            }
        }

    });
};

/**
 * @namespace
 */
var rxMultiSelect = {
    lblPreview: {
        get: function () {
            return this.rootElement.$('.preview');
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description Closes the menu.
     */
    closeMenu: {
        value: function () {
            this.isOpen().then(function (isOpen) {
                if (isOpen) {
                    $('body').click();
                }
            });
        }
    },

    /**
     * @private
     * @function
     * @instance
     * @description Opens the menu.
     */
    openMenu: {
        value: function () {
            var self = this;
            this.isOpen().then(function (isOpen) {
                if (!isOpen) {
                    self.lblPreview.click();
                }
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the menu is visible.
     * @returns {Boolean}
     */
    isOpen: {
        value: function () {
            return this.rootElement.$('.menu').isDisplayed();
        }
    },

    /**
     * @instance
     * @description The preview text for the dropdown.
     * @type {String}
     */
    preview: {
        get: function () {
            return this.lblPreview.getText();
        }
    },

    /**
     * @instance
     * @description The text of each option element in the dropdown.
     * @type {String[]}
     */
    options: {
        get: function () {
            return this.rootElement.$$('rx-select-option').map(function (optionElement) {
                return selectOptionFromElement(optionElement).getText();
            });
        }
    },

    /**
     * @instance
     * @description The value of each option element in the dropdown.
     * @type {String[]}
     */
    values: {
        get: function () {
            return this.rootElement.$$('rx-select-option').map(function (optionElement) {
                return selectOptionFromElement(optionElement).value;
            });
        }
    },

    /**
     * @instance
     * @description Array of strings representing the currently selected options. Will return the strings
     * in order that they are defined in the multi select.
     * @type {String[]}
     * @example
     * it('should select a few options', function () {
     *     var multiSelect = encore.rxMultiSelect.initialize(element(by.model('countriesVisited')));
     *     multiSelect.select(['United States of America', 'Canada', 'Latvia']);
     *     // multi select lists all countries alphabetically
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Canada', 'Latvia', 'United States of America']);
     * });
     */
    selectedOptions: {
        get: function () {
            this.openMenu();
            return this.rootElement.$$('rx-select-option').reduce(function (accumulator, optionElement) {
                var option = selectOptionFromElement(optionElement);
                return option.isSelected().then(function (isSelected) {
                    if (isSelected) {
                        return option.getText().then(function (text) {
                            accumulator.push(text);
                            return accumulator;
                        });
                    } else {
                        return accumulator;
                    }
                });
            }, []);
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description {@link rxCheckbox} representing an option, matching on the partial text in the option's name.
     * @param {String} optionText - Partial or total string matching the desired option.
     * @returns {rxMultiSelect.option}
     * @example
     * var multiSelect = encore.rxMultiSelect.initialize(element(by.model('cars')));
     * var option = multiSelect.option('Ford Bronco');
     * option.select();
     * option.deselect();
     * @see rxCheckbox
     */
    option: {
        value: function (optionText) {
            var optionElement = this.rootElement.element(by.cssContainingText('rx-select-option label', optionText));
            return selectOptionFromElement(optionElement);
        }
    },

    /**
     * @instance
     * @function
     * @description Given a list of options, select each of them. Will add selections to any pre-existing ones.
     * @param {String[]} optionTexts - Array of partial or total strings matching the desired options to select.
     * @example
     * it('should select a few options', function () {
     *     var multiSelect = encore.rxMultiSelect.initialize(element(by.model('approvedBy')));
     *     multiSelect.select(['Jack', 'Jill']);
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jack', 'Jill']);
     *     // will not over ride any pre-existing selections
     *     multiSelect.select(['Joe', 'Jane', 'Jack']); // "Jack" selected twice
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jack', 'Jill', 'Joe', 'Jane']);
     * });
     */
    select: {
        value: function (optionTexts) {
            var self = this;
            this.openMenu();
            optionTexts.forEach(function (optionText) {
                self.option(optionText).select();
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Given a list of options, deselect each of them. Will not
     * @param {String[]} optionTexts - Array of partial or total strings matching the desired options to deselect.
     * @example
     * it('should deselect a few options', function () {
     *     var multiSelect = encore.rxMultiSelect.initialize(element(by.model('approvedBy')));
     *     multiSelect.select(['Jack', 'Jill']);
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jack', 'Jill']);
     *     multiSelect.deselect(['Jack']);
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jill']);
     * });
     */
    deselect: {
        value: function (optionTexts) {
            var self = this;
            this.openMenu();
            optionTexts.forEach(function (optionText) {
                self.option(optionText).deselect();
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether the '<rx-multi-select>' element is valid.
     * @returns {Boolean}
     */
    isValid: {
        value: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return _.includes(classes.split(' '), 'ng-valid');
            });
        }
    }
};

exports.rxMultiSelect = {
    /**
     * @function
     * @memberof rxMultiSelect
     * @description Creates a page object from an `rx-multi-select` DOM element.
     * @param {ElementFinder} rxMultiSelectElement -
     * ElementFinder to be transformed into an {@link rxMultiSelect} page object.
     * @returns {rxMultiSelect}
     */
    initialize: function (rxMultiSelectElement) {
        rxMultiSelect.rootElement = {
            get: function () { return rxMultiSelectElement; }
        };
        return Page.create(rxMultiSelect);
    }
};
