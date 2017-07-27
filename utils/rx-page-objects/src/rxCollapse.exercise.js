var _ = require('lodash');

/**
 * @function
 * @description rxCollapse exercises.
 * @return {function} A function to be passed to mocha's `describe`.
 * @exports exercise/rxCollapse
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxCollapse} options.instance - Component to exercise.
 * @param {String} [options.title] - The title of the rxCollapse element.
 * @param {Boolean} [options.expanded=false] - Whether or not the rxCollapse element is currently expanded.
 * @example
 * describe('default exercises', encore.exercise.rxCollapse({
 *     instance: myPage.hiddenSection, // select one of many widgets from your page objects
 *     title: 'My Custom rxCollapse Element',
 *     expanded: true
 * }));
 */
exports.rxCollapse = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        title: undefined,
        expanded: false,
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should expand', function () {
            component.expand();
            expect(component.isExpanded()).to.eventually.be.true;
        });

        it('should not expand again', function () {
            component.expand();
            expect(component.isExpanded()).to.eventually.be.true;
        });

        it('should collapse', function () {
            component.collapse();
            expect(component.isExpanded()).to.eventually.be.false;
        });

        it('should not collapse again', function () {
            component.collapse();
            expect(component.isExpanded()).to.eventually.be.false;
        });

        it('should toggle', function () {
            component.toggle();
            expect(component.isExpanded()).to.eventually.be.true;
        });

        if (!_.isUndefined(options.title)) {
            it('should show a custom title', function () {
                expect(component.title).to.eventually.equal(options.title);
            });
        } else {
            it('should show "See More" for the title', function () {
                component.collapse();
                expect(component.title).to.eventually.equal('See More');
            });

            it('should toggle between "See More" and "See Less"', function () {
                component.expand();
                expect(component.title).to.eventually.equal('See Less');
            });

            it('should toggle between "See Less" and "See More"', function () {
                component.collapse();
                expect(component.title).to.eventually.equal('See More');
            });
        }

        after(function () {
            // put it back according to the options
            options.expanded ? component.expand() : component.collapse();
        });

    };
};
