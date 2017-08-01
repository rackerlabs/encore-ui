var rxMultiSelect = require('./rxMultiSelect.page').rxMultiSelect;

/**
 * rxMultiSelect exercises.
 * @exports exercise/rxMultiSelect
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxMultiSelect} [options.instance={@link rxMultiSelect.initialize}] - Component to exercise.
 * @param {Object} [options.inputs=[]] - The options of the select input.
 * @param {Object} [options.disabled=false] - Determines if the multiselect is disabled.
 * @param {Object} [options.valid=true] - Determines if the multiselect is valid.
 * @example
 * describe('default exercises', encore.exercise.rxMultiSelect({
 *     instance: myPage.subscriptionList, // select one of many widgets from your page objects
 *     inputs: ['Texas', 'California', 'Virginia', 'Georgia']
 * }));
 */
exports.rxMultiSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxMultiSelect.initialize(),
        inputs: [],
        disabled: false,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should hide the menu initially', function () {
            expect(component.isOpen()).to.eventually.be.false;
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });

        if (options.disabled) {
            it('should not show the menu when clicked', function () {
                component.openMenu();
                expect(component.isOpen()).to.eventually.be.false;
            });
        } else {
            it('should show the menu when clicked', function () {
                component.openMenu();
                expect(component.isOpen()).to.eventually.be.true;
            });

            it('should select all options', function () {
                component.select(['Select All']);
                expect(component.selectedOptions).to.eventually.eql(['Select All'].concat(options.inputs));
                expect(component.preview).to.eventually.equal('All Selected');
            });

            it('should select no options', function () {
                component.deselect(['Select All']);
                expect(component.selectedOptions).to.eventually.be.empty;
                expect(component.preview).to.eventually.equal('None');
            });

            it('should select a single option', function () {
                var input = _.head(options.inputs);
                component.select([input]);
                expect(component.selectedOptions).to.eventually.eql([input]);
                expect(component.preview).to.eventually.equal(input);
            });

            if (options.inputs.length > 2) {
                it('should select multiple options', function () {
                    var inputs = options.inputs.slice(0, 2);
                    component.select(inputs);
                    expect(component.selectedOptions).to.eventually.eql(inputs);
                    expect(component.preview).to.eventually.equal('2 Selected');
                });
            }

            it('should select all options', function () {
                component.select(['Select All']);
                expect(component.selectedOptions).to.eventually.eql(['Select All'].concat(options.inputs));
                expect(component.preview).to.eventually.equal('All Selected');
            });

            it('should deselect all options', function () {
                component.deselect(['Select All']);
                expect(component.selectedOptions).to.eventually.be.empty;
                expect(component.preview).to.eventually.equal('None');
            });
        }//if options.disabled

        it('hides the menu when another element is clicked', function () {
            $('body').click();
            expect(component.isOpen()).to.eventually.be.false;
        });
    };
};
