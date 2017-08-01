var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxMisc = require('./rxMisc.page').rxMisc;

/**
 * The specific information about a single select element option.
 * Returned from {@link rxSelect#option}.
 * @namespace rxSelect.option
 */
var rxSelectOptionFromElement = function (rootElement) {
    return Page.create({

        /**
         * @instance
         * @function
         * @memberof rxSelect.option
         * @description The text inside of the `<option>` element.
         * @returns {Promise<String>}
         */
        getText: {
            value: function () {
                return rootElement.getText();
            }
        },

        /**
         * @instance
         * @memberof rxSelect.option
         * @description The "value" attribute for an `<option>` element.
         * @type {String}
         */
        value: {
            get: function () {
                return rootElement.getAttribute('value');
            }
        },

        /**
         * @todo Make this function check if it's already selected before selecting itself.
         * @todo Create a {@link rxCheckbox.option#deselect} function to co-exist with this function.
         * @instance
         * @memberof rxSelect.option
         * @function
         * @description Clicks the `<option>` element within a `<select>`. Note: this will
         * also deselect the checkbox if it is called twice in a row. There is no checking
         * the state of the checkbox before performing this action.
         */
        select: {
            value: function (slowClick) {
                slowClick ? rxMisc.slowClick(rootElement) : rootElement.click();
            }
        },

        /**
         * @instance
         * @memberof rxSelect.option
         * @function
         * @description Whether or not the `<option>` is currently selected.
         * @returns {Boolean}
         */
        isSelected: {
            value: function () {
                return rootElement.isSelected();
            }
        },

        /**
         * @instance
         * @memberof rxSelect.option
         * @function
         * @description Whether or not the `<option>` is currently present.
         * @returns {Boolean}
         */
        isPresent: {
            value: function () {
                return rootElement.isPresent();
            }
        }
    });
};//rxSelectOptionFromElement

/**
 * @namespace
 */
var rxSelect = {
    eleWrapper: {
        get: function () {
            return this.rootElement.element(by.xpath('..'));
        }
    },

    eleFakeSelect: {
        get: function () {
            return this.eleWrapper.$('.fake-select');
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the select element is enabled.
     * @returns {Promise<Boolean>}
     */
    isEnabled: {
        value: function () {
            var page = this;
            return this.eleFakeSelect.isPresent().then(function (isFakeSelect) {
                if (isFakeSelect) {
                    return page.eleWrapper.getAttribute('class').then(function (classes) {
                        return !_.includes(classes.split(' '), 'rx-disabled');
                    });
                }
                return page.rootElement.isEnabled();
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether the select element is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            var page = this;
            return this.eleFakeSelect.isPresent().then(function (isFakeSelect) {
                if (isFakeSelect) {
                    var checks = [page.rootElement.isDisplayed(), page.eleFakeSelect.isDisplayed()];
                    return protractor.promise.all(checks).then(_.every);
                }
                return page.rootElement.isDisplayed();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the select element exists on the page.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            var page = this;
            return this.eleFakeSelect.isPresent().then(function (isFakeSelect) {
                return isFakeSelect || page.rootElement.isPresent();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the `<select>` element is valid.
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
     * @param {String} optionText - The option to find and return an {@link rxSelect.option} object for.
     * @description Partial or total string to match the display value of the desired `<option>` element,
     * creates an {@link rxSelect.option} object representing the option selected.
     * @returns {rxSelect.option}
     * @example
     * it('should grab an individual selection and alter it', function () {
     *     var homeState = encore.rxSelect.initialize($('#states-dropdown')).option('Indiana');
     *     homeState.select();
     *     expect(homeState.isSelected()).to.eventually.be.true;
     * });
     */
    option: {
        value: function (optionText) {
            var optionElement = this.findOptionContaining(optionText);
            return rxSelectOptionFromElement(optionElement);
        }
    },

    /**
     * @instance
     * @description List of each {@link rxSelect.option#getText} values in the dropdown.
     * @type {String[]}
     * @example
     * it('should have every Texas location in the dropdown', function () {
     *     var texasLocations = ['San Antonio', 'Austin'];
     *     var dropdown = encore.rxSelect.initialize(element(by.model('locations')));
     *     expect(dropdown.options).to.eventually.eql(texasLocations);
     * });
     */
    options: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return rxSelectOptionFromElement(optionElement).getText();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description The number of `<option>` elements in the dropdown.
     * @returns {Number}
     * @example
     * it('should have 50 states in the dropdown', function () {
     *     expect(encore.rxSelect.initialize().count()).to.eventually.equal(50);
     * });
     */
    optionCount: {
        value: function () {
            return this.rootElement.$$('option').count();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the option, searched for by partial text match, exists.
     * @param {String} optionText -
     * Partial or total string to match the display value of the desired `<option>` element
     * @returns {Boolean}
     * @example
     * it('should not list a United States territory in the states dropdown', function () {
     *     expect(encore.rxSelect.initialize().optionExists('Guam')).to.eventually.be.false;
     * });
     */
    optionExists: {
        value: function (optionText) {
            return this.findOptionContaining(optionText).isPresent();
        }
    },

    /**
     * @instance
     * @type {String[]}
     * @description List of values for each `<option>` element in the dropdown.
     * @example
     * it('should have a numbered index for each dropdown value', function () {
     *     var dropdown = encore.rxSelect.initialize($('#auto-generated-stuff'));
     *     expect(dropdown.values).to.eventually.eql(_.map(_.range(0, 25), _.toString));
     * });
     */
    values: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return rxSelectOptionFromElement(optionElement).value;
            });
        }
    },

    /**
     * @todo: Stop returning a select option object -- I just want the text!
     * @description {@link rxSelect.option} representing the currently selected `<option>` element.
     * @type {rxSelect.option}
     * @example
     * it('should already have the username populated', function () {
     *     var dropdown = encore.rxSelect.initialize(element(by.model('username')));
     *     expect(dropdown.selectedOption.getText()).to.eventually.equal('Andrew Yurisich');
     * });
     */
    selectedOption: {
        get: function () {
            return rxSelectOptionFromElement(this.rootElement.$('option:checked'));
        }
    },

    /**
     * @instance
     * @private
     * @function
     * @param {String} optionText -
     * Partial or total string to match the display value of the desired `<option>` element.
     * @returns {ElementFinder}
     */
    findOptionContaining: {
        value: function (optionText) {
            return this.rootElement.element(by.cssContainingText('option', optionText));
        }
    },

    /**
     * @instance
     * @function
     * @description High level access to change an rxSelect component's selected option.
     * @param {String} optionText -
     * Partial or total string to match the display value of the desired `<option>` element.
     * @example
     * it('should select the United States for the country', function () {
     *     var dropdown = encore.rxSelect.initialize($('#country-select'));
     *     dropdown.select('United States');
     *     expect(dropdown.selectedOption.getText()).to.eventually.equal('United States');
     * });
     */
    select: {
        value: function (optionText, slowClick) {
            if (slowClick === undefined) {
                slowClick = true;
            }
            return this.option(optionText).select(slowClick);
        }
    }

};//rxSelect

exports.rxSelect = {
    /**
     * @function
     * @memberof rxSelect
     * @description Creates a page object representing a `<select rx-select>` element.
     * @param {ElementFinder} rxSelectElement - ElementFinder to be transformed into an rxSelect page object
     * @returns {rxSelect}
     */
    initialize: function (rxSelectElement) {
        rxSelect.rootElement = {
            get: function () { return rxSelectElement; }
        };
        return Page.create(rxSelect);
    },

    /**
     * @todo Make the `options` parameter less gross. It shouldn't be
     * piled on top of pre-existing functionality like this.
     * @description Generates a getter and a setter for an rxSelect element on your page.
     * An important note: when setting the value of the rxSelect, you can set it to either
     * the text value of the option in the dropdown you'd like selected, or you can pass in
     * an object for configuring details about the interaction with the rxSelect component.
     * See the example below for more information about the differences between these two input types.
     * @function
     * @memberof rxSelect
     * @see rxMisc.slowClick
     * @param {ElementFinder} elem - The ElementFinder for the rxSelect.
     * @param {Object|Boolean} [options=true] - Options for configuring the behavior of the select box at run time.
     * If `options` is not a plain old javascript object containing configuration settings, then the default values
     * for will be used globally, for all configurable interactions.
     * @param {String} options.option - The option to select. Used only in conjunction with `options.slowClick`.
     * @param {Boolean} [options.slowClick=true] -
     * Whether to use {@link rxMisc.slowClick} for this particular accessor interaction.
     * @returns {Object} A getter and a setter to be applied to an rxSelect page object.
     * @example
     * var globalSlowClickPreference = false;
     * var form = Page.create({
     *     state: encore.rxSelect.generateAccessor(element(by.model('states'))),
     *     // you can specify a single dropdown's slow clicking globally this way
     *     county: encore.rxSelect.generateAccessor(element(by.model('county')), globalSlowClickPreference)
     * });
     *
     * it('should select a new state normally', function () {
     *     form.state = 'Indiana';
     *     expect(form.state).to.eventually.equal('Indiana');
     * });
     *
     * it('should select a new state and county without using `rxMisc.slowClick()`', function () {
     *     form.state = { option: 'Texas', slowClick: false }; // will avoid slow clicking for just this call
     *     form.county = 'Bexar'; // automatically uses `false` for slow clicking, see page object definition
     *     expect(form.state).to.eventually.equal('Texas');
     *     expect(form.county).to.eventually.equal('Bexar');
     * });
     */
    generateAccessor: function (elem, slowClick) {
        return {
            get: function () {
                return exports.rxSelect.initialize(elem).selectedOption;
            },
            set: function (options) {
                if (_.isObject(options)) {
                    // More specific requirements for this dropdown have been specified
                    exports.rxSelect.initialize(elem).select(options.option, options.slowClick);
                } else {
                    // Select the option matching text using `slowClick`
                    exports.rxSelect.initialize(elem).select(options, slowClick);
                }
            }
        };
    }
};
