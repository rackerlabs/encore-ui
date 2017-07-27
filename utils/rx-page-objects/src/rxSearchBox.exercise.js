var _ = require('lodash');

/**
 * @description rxSearchBox exercises.
 * @see rxSearchBox
 * @exports exercise/rxSearchBox
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxSearchBox} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Determines if the search box is disabled at the start of the exercise.
 * @param {String} [options.placeholder='Search...'] - Expected placeholder value.
 * @example
 * describe('default exercises', encore.exercise.rxSearchBox({
 *     instance: myPage.searchText, // select one of many widgets from your page objects
 *     placeholder: 'Filter by name...'
 * }));
 */
exports.rxSearchBox = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        placeholder: 'Search...'
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should ' + (options.disabled ? 'not be' : 'be') + ' enabled', function () {
            expect(component.isEnabled()).to.eventually.eq(!options.disabled);
        });

        if (options.placeholder) {
            it('should have a placeholder', function () {
                expect(component.placeholder).to.eventually.equal(options.placeholder);
            });
        }

        if (options.disabled) {
            describe('when disabled', function () {
                it('should not display the clear button', function () {
                    expect(component.isClearable()).to.eventually.be.false;
                });
            });//when disabled
        } else {
            describe('when enabled', function () {
                it('should update the search term', function () {
                    component.term = 'testing';
                    expect(component.term).to.eventually.equal('testing');
                });

                it('should be clearable', function () {
                    expect(component.isClearable()).to.eventually.be.true;
                });

                it('should clear the search term', function () {
                    component.clear();
                    expect(component.term).to.eventually.equal('');
                });

                it('should not be clearable', function () {
                    expect(component.isClearable()).to.eventually.be.false;
                });
            });//when enabled
        }
    };
};
