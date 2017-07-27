var _ = require('lodash');

/**
 * @description rxRadio exercises
 * @exports exercise/rxRadio
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxRadio} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Whether or not the radio button is disabled at the start of the exercise.
 * @param {Boolean} [options.selected=false] - Whether or not the radio button is selected at the start of the exercise.
 * @param {Boolean} [options.visible=true] - Whether or not the radio button is visible at the start of the exercise.
 * @param {Boolean} [options.valid=true] - Whether or not the radio button is valid at the start of the exercise.
 */
exports.rxRadio = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        selected: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should be a radio button', function () {
            expect(component.isRadio()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isEnabled()).to.eventually.eq(!options.disabled);
        });

        it('should ' + (options.selected ? 'be' : 'not be') + ' selected', function () {
            expect(component.isSelected()).to.eventually.eq(options.selected);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
