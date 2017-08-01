var _ = require('lodash');

/**
 * @description rxToggleSwitch exercises.
 * @see rxToggleSwitch
 * @exports exercise/rxToggleSwitch
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxToggleSwitch} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Determines if the switch can be toggled.
 * @param {Boolean} [options.toggledAtStart=null] -
 * Beginning state of toggle switch. The value will be detected automatically if not given.
 * @param {Boolean} [options.toggledAtEnd=null]
 * End state of toggle switch. The value will be detected automatically if not given.
 * @example
 * describe('default exercises', encore.exercise.rxToggleSwitch({
 *     instance: myPage.emailPreference // select one of many widgets from your page objects
 * }));
 */
exports.rxToggleSwitch = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        enabled: true,
        toggledAtStart: null, // begins 'OFF'
        toggledAtEnd: null // ends 'ON'
    });

    return function () {
        var component;
        var toggledAtStart;
        var toggledAtEnd;

        var positionAsText = function (isEnabled) {
            return isEnabled ? 'ON' : 'OFF';
        };

        var toggle = function () {
            encore.rxMisc.scrollToElement(component.rootElement, {
                positionOnScreen: 'middle'
            });
            return component.isToggled().then(function (toggled) {
                toggled ? component.toggleOff() : component.toggleOn();
            });
        };

        before(function () {
            component = options.instance;
            component.isToggled().then(function (isToggled) {
                // use option if available, otherwise use detected state
                toggledAtStart = _.isNull(options.toggledAtStart) ? isToggled : options.toggledAtStart;

                // use option if available, otherwise use inverse of toggledAtStart
                toggledAtEnd = _.isNull(options.toggledAtEnd) ? !toggledAtStart : options.toggledAtEnd;
            });
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should' + (options.enabled ? '' : ' not') + ' be enabled', function () {
            expect(component.isEnabled()).to.eventually.equal(options.enabled);
        });

        if (!options.enabled) {
            it('should not change state when clicked', function () {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtStart);
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtStart));
            });
        } else {
            it('should begin in the ' + positionAsText(toggledAtStart) + ' state', function () {
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtStart));
            });

            it('should change to ' + positionAsText(toggledAtEnd) + ' when clicked', function () {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtEnd);
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtEnd));
            });

            it('should return to the ' + positionAsText(toggledAtStart) + ' when clicked again', function () {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtStart);
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtStart));
            });
        }

    };
};
