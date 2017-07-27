var Page = require('astrolabe').Page;

/**
 * @namespace
 * @description Functionality around interacting with toggle switches.
 */
var rxToggleSwitch = {
    btnToggleSwitch: {
        get: function () {
            return this.rootElement.$('.rx-toggle-switch');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the toggle switch is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the toggle switch has interaction enabled.
     * @returns {Boolean}
     */
    isEnabled: {
        value: function () {
            return this.btnToggleSwitch.getAttribute('disabled').then(_.isNull);
        }
    },

    /**
     * @function
     * @instance
     * @description Toggles the switch to the "on" position. If the toggle switch is already
     * set to this position, nothing happens.
     * @example
     * it('should enable the switch', function () {
     *     var mySwitch = encore.rxToggleSwitch.initialize();
     *     expect(mySwitch.isToggled()).to.eventually.be.false;
     *     mySwitch.toggleOn();
     *     expect(mySwitch.isToggled()).to.eventually.be.true;
     *     mySwitch.toggleOn(); // does nothing the second time it is called
     *     expect(mySwitch.isToggled()).to.eventually.be.true;
     * });
     */
    toggleOn: {
        value: function () {
            var page = this;
            return this.isToggled().then(function (toggled) {
                if (!toggled) {
                    page.btnToggleSwitch.click();
                }
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Toggles the switch to the "off" position. If the toggle switch is already
     * set to this position, nothing happens.
     * @example
     * it('should disable the switch', function () {
     *     var mySwitch = encore.rxToggleSwitch.initialize();
     *     expect(mySwitch.isToggled()).to.eventually.be.true;
     *     mySwitch.toggleOff();
     *     expect(mySwitch.isToggled()).to.eventually.be.false;
     *     mySwitch.toggleOff(); // does nothing the second time it is called
     *     expect(mySwitch.isToggled()).to.eventually.be.false;
     * });
     */
    toggleOff: {
        value: function () {
            var page = this;
            return this.isToggled().then(function (toggled) {
                if (toggled) {
                    page.btnToggleSwitch.click();
                }
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the switch component is currently set to the "on" position.
     * @returns {Boolean}
     */
    isToggled: {
        value: function () {
            return this.getText().then(function (text) {
                if (text === 'ON') {
                    return true;
                } else if (text === 'OFF') {
                    return false;
                }
                throw 'Toggle switch text was not toggled to either "ON" or "OFF" position';
            });
        }
    },

    /**
     * @instance
     * @function
     * @description The current text of the switch.
     * @example
     * it('should toggle to the "on" position', function () {
     *     var mySwitch = encore.rxToggleSwitch.initialize();
     *     mySwitch.enable();
     *     expect(mySwitch.getText()).to.eventually.equal('ON');
     * });
     * @returns {Promise<String>}
     */
    getText: {
        value: function () {
            return this.btnToggleSwitch.$('span').getText();
        }
    }
};

exports.rxToggleSwitch = {
    /**
     * @function
     * @memberof rxToggleSwitch
     * @param {ElementFinder} rxToggleSwitchElement -
     * ElementFinder to be transformed into an rxToggleSwitchElement object.
     * @returns {rxToggleSwitch} Page object representing the {@link rxToggleSwitch} object.
     */
    initialize: function (rxToggleSwitchElement) {
        rxToggleSwitch.rootElement = {
            get: function () { return rxToggleSwitchElement; }
        };
        return Page.create(rxToggleSwitch);
    }
};
