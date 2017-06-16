var _ = require('lodash');
var rxOptionTable = require('./rxOptionTable.page').rxOptionTable;

/**
 * @description rxOptionTable exercises.
 * @exports exercise/rxOptionTable
 * @deprecated rxOptionTable will be removed in a future release of rxPageObjects.
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxOptionTable} [options.instance={@link rxOptionTable.initialize}] - Component to exercise.
 * @param {string} [options.visible=true] - Determines if the option table is visible
 * @param {string} [options.empty=false] - Determines if the option table is empty
 */
exports.rxOptionTable = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxOptionTable.initialize(),
        visible: true,
        empty: false
    });

    return function () {
        console.warn(
            'DEPRECATED: rxOptionTable will be removed in a future release of rxPageObjects.'
        );
        var component;

        before(function () {
            component = options.instance;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.empty) {
            it('should be empty', function () {
                expect(component.isEmpty()).to.eventually.be.true;
            });

            it('should have a "table empty" error message', function () {
                expect(component.emptyMessage).to.eventually.not.be.null;
            });
        } else {
            it('should not be empty', function () {
                expect(component.isEmpty()).to.eventually.be.false;
            });

            it('should not have a "table empty" error message', function () {
                expect(component.emptyMessage).to.eventually.be.null;
            });
        }
    };
};
