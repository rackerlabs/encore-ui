var _ = require('lodash');

/**
 * @function
 * @description rxCheckbox exercises
 * @exports exercise/rxCheckbox
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxCheckbox} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Whether the checkbox is disabled at the start of the exercise
 * @param {Boolean} [options.selected=false] - Whether the checkbox is selected at the start of the exercise
 * @param {Boolean} [options.visible=true] - Whether the checkbox is visible at the start of the exercise
 * @param {Boolean} [options.valid=true] - Whether the checkbox is valid at the start of the exercise
 */
exports.rxCheckbox = function (options) {
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

        it('should be a checkbox', function () {
            expect(component.isCheckbox()).to.eventually.be.true;
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

        if (options.disabled) {
            it('should not respond to selecting and unselecting', function () {
                component.isSelected().then(function (selected) {
                    selected ? component.deselect() : component.select();
                    expect(component.isSelected()).to.eventually.equal(selected);
                    // even though it "doesn't respond to selecting and unselecting"
                    // attempt to put it back anyway in case it did actually respond.
                    // that way nobody accidentally submits a swapped checkbox after
                    // running these exercises.
                    selected ? component.select() : component.deselect();
                    expect(component.isSelected()).to.eventually.equal(selected);
                });
            });
        } else {
            it('should respond to selecting and unselecting', function () {
                component.isSelected().then(function (selected) {
                    selected ? component.deselect() : component.select();
                    expect(component.isSelected()).to.eventually.not.equal(selected);
                    // exercises should never alter the state of a page.
                    // always put it back when you're done.
                    selected ? component.select() : component.deselect();
                    expect(component.isSelected()).to.eventually.equal(selected);
                });
            });
        }

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
