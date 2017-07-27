var rxTags = require('./rxTags.page').rxTags;

/**
 * rxTags exercises
 * @exports exercise/rxTags
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxTags} [options.instance=rxTags.initialize()] - Component to Exercise.
 * @param {string} options.sampleText - A tag that can be added.
 * @example
 * describe('default exercises', encore.exercise.rxTags({
 *     instance: encore.rxTags.initialize('.demo rx-tags') // select one of many widgets on page
 *     sampleText: 'Tag text to use when creating and testing your tags'
 * }));
 */
exports.rxTags = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        sampleText: undefined
    });

    return function () {
        var component, tag, numTags;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxTags.initialize();
            }

            component.count().then(function (num) {
                numTags = num;
            });
        });

        if (!_.isUndefined(options.sampleText)) {
            describe('after adding tag', function () {
                before(function () {
                    tag = component.addTag(options.sampleText);
                });

                it('should have expected value', function () {
                    expect(tag.getText()).to.eventually.equal(options.sampleText);
                });

                it('should increment total tags by 1', function () {
                    expect(component.count()).to.eventually.equal(numTags + 1);
                });

                it('should not focus last tag', function () {
                    expect(tag.isFocused()).to.eventually.be.false;
                });

                describe('and clicking the tag X', function () {
                    before(function () {
                        tag.remove();
                    });

                    it('should no longer exist', function () {
                        expect(tag.isPresent()).to.eventually.be.false;
                    });

                    it('should decrement total tags by 1', function () {
                        expect(component.count()).to.eventually.equal(numTags);
                    });
                });
            });

            describe('after adding temporary tag for removal', function () {
                before(function () {
                    tag = component.addTag(options.sampleText);
                });

                describe('and typing backspace from input', function () {
                    before(function () {
                        component.sendBackspace();
                    });

                    it('should focus the last tag', function () {
                        expect(tag.isFocused()).to.eventually.be.true;
                    });

                    describe('and typing backspace with focused tag', function () {
                        before(function () {
                            tag.sendBackspace();
                        });

                        it('should no longer exist', function () {
                            expect(component.byText(options.sampleText).isPresent()).to.eventually.be.false;
                        });

                        it('should decrement count by 1', function () {
                            expect(component.count()).to.eventually.equal(numTags);
                        });
                    });
                });
            });
        }
    };
};
