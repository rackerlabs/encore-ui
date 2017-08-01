var _ = require('lodash');

/**
 * @function
 * @description rxCharacterCount exercises.
 * @exports exercise/rxCharacterCount
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxCharacterCount} options.instance - Component to exercise.
 * @param {Number} [options.maxCharacters=254] - The total number of characters allowed.
 * @param {Number} [options.nearLimit=10] - The number of remaining characters needed to trigger the "near-limit" class.
 * @param {Boolean} [options.ignoreInsignificantWhitespace=false] - Whether or not the textbox ignores leading and
 * trailing whitespace when calculating the remaining character count.
 * @example
 * describe('default exercises', encore.exercise.rxCharacterCount({
 *     instance: myPage.submission // select one of many widgets from your page objects
 *     maxCharacters: 25,
 *     nearLimit: 12,
 *     ignoreInsignificantWhitespace: false
 * }));
 */
exports.rxCharacterCount = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        maxCharacters: 254,
        nearLimit: 10,
        ignoreInsignificantWhitespace: true
    });

    var belowNearLimitLength = options.maxCharacters - options.nearLimit;
    var atNearLimitLength = options.maxCharacters + 2 - options.nearLimit;
    var overLimit = options.maxCharacters + 1;
    var aboveNearLimitLength = options.maxCharacters + 3 - options.nearLimit;
    var whitespace = '    leading and trailing whitespace    ';
    var whitespaceLength = whitespace.length;
    var trimmedLength = whitespace.trim().length;

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should show element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        describe('with empty value', function () {

            beforeEach(function () {
                component.comment = '';
            });

            it('should not set the near-limit class', function () {
                expect(component.isNearLimit()).to.eventually.be.false;
            });

            it('should have ' + options.maxCharacters + ' remaining characters', function () {
                expect(component.remaining).to.eventually.equal(options.maxCharacters);
            });

            it('should not set the over-limit class', function () {
                expect(component.isOverLimit()).to.eventually.be.false;
            });
        });

        describe('with "Foo" value', function () {

            beforeEach(function () {
                component.comment = 'Foo';
            });

            it('should update the remaining number of characters', function () {
                expect(component.remaining).to.eventually.equal(options.maxCharacters - 3);
            });

            describe('and changed to "Bar"', function () {

                beforeEach(function () {
                    component.comment = 'Bar';
                });

                it('should replace value with new text', function () {
                    expect(component.comment).to.eventually.equal('Bar');
                });
            });
        });


        describe('when ' + belowNearLimitLength + ' characters are entered', function () {

            beforeEach(function () {
                component.comment = 'a'.repeat(belowNearLimitLength);
            });

            it('should not set the near-limit class ', function () {
                expect(component.isNearLimit()).to.eventually.be.false;
            });
        });

        describe('when ' + atNearLimitLength + ' near limit characters are entered', function () {

            beforeEach(function () {
                component.comment = 'b'.repeat(atNearLimitLength);
            });

            it('should set the near-limit class', function () {
                expect(component.isNearLimit()).to.eventually.be.true;
            });
        });


        describe('when ' + aboveNearLimitLength + ' above limit characters are entered', function () {

            beforeEach(function () {
                component.comment = 'c'.repeat(aboveNearLimitLength);
            });

            it('should set the near-limit class', function () {
                expect(component.isNearLimit()).to.eventually.be.true;
            });
        });


        describe('when ' + options.maxCharacters + ' characters are entered', function () {

            beforeEach(function () {
                component.comment = 'd'.repeat(options.maxCharacters);
            });

            it('should not set the over-limit class', function () {
                expect(component.isOverLimit()).to.eventually.be.false;
            });

            it('should have zero remaining characters', function () {
                expect(component.remaining).to.eventually.equal(0);
            });
        });


        describe('when ' + overLimit + ' characters are entered', function () {

            beforeEach(function () {
                component.comment = 'e'.repeat(overLimit);
            });

            it('should set the over-limit class', function () {
                expect(component.isOverLimit()).to.eventually.be.true;
            });

            it('should display a negative number when the over-limit class is reached', function () {
                expect(component.remaining).to.eventually.equal(-1);
            });
        });

        describe('with leading and trailing whitespace', function () {

            beforeEach(function () {
                component.comment = whitespace;
            });


            if (options.ignoreInsignificantWhitespace) {
                it('should count the trimmed length', function () {
                    expect(component.remaining).to.eventually.equal(options.maxCharacters - trimmedLength);
                });
            } else {
                it('should count the full length', function () {
                    expect(component.remaining).to.eventually.equal(options.maxCharacters - whitespaceLength);
                });
            }
        });

        after(function () {
            component.comment = '';
        });
    };
};
