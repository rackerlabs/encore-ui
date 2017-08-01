var _ = require('lodash');
var rxMetadata = require('./rxMetadata.page').rxMetadata;

/**
 * rxMetadata exercises
 * @exports exercise/rxMetadata
 * @param {Object} [options] Test options. Used to build valid tests.
 * @param {rxMetadata} [instance={@link rxMetadata.initialize}] Component to exercise.
 * @param {Boolean} [options.present=true] Determines if the metadata is present in the DOM.
 * @param {Boolean} [options.visible=true] Determines if the metadata is visible.
 * @param {Object} [options.transformFns] - Transformation functions to be passed to rxMetadata.
 * @param {Object} [options.terms] The expected label text of each metadata entry.
 * @example
 * describe('metadata', encore.exercise.rxMetadata({
 *     instance: myPage.accountOverviewMetadata,
 *     transformFns: {
 *         'Signup Date': function (elem) {
 *             return elem.getText().then(function (text) {
 *                 return new Date(text).valueOf();
 *             });
 *         },
 *         'Overdue Balance': function (elem) {
 *             return elem.getText().then(encore.rxMisc.currencyToPennies);
 *         },
 *         'Current Due': function (elem) {
 *             return elem.getText().then(encore.rxMisc.currencyToPennies);
 *         },
 *         'Expiration Date' function (elem) {
 *             return elem.getText().then(function (text) {
 *                 return new Date(text).valueOf();
 *             });
 *         }
 *     },
 *     terms: {
 *         'Signup Date': new Date('March 1st, 2011').valueOf(),
 *         'Overdue Balance': 13256,
 *         'Current Due': 64400,
 *         'Expiration Date': new Date('January 1st, 2021').valueOf()
 *     }
 * }));
 */
exports.rxMetadata = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxMetadata.initialize(),
        present: true,
        visible: true,
    });

    return function () {
        var component;

        before(function () {
            component = rxMetadata.initialize(options.instance.rootElement, options.transformFns);
        });

        it('should ' + (options.present ? 'be' : 'not be') + ' present', function () {
            expect(component.isPresent()).to.eventually.eq(options.present);
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should have every term present and in the correct order', function () {
            expect(component.terms).to.eventually.eql(Object.keys(options.terms));
        });

        _.forEach(options.terms, function (definition, term) {
            it('should have the correct definition for ' + term, function () {
                if (_.isObject(definition) || _.isArray(definition)) {
                    expect(component.term(term)).to.eventually.eql(definition);
                } else {
                    expect(component.term(term)).to.eventually.equal(definition);
                }
            });
        });

    };
};
