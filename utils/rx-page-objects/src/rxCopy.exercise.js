var _ = require('lodash');

/**
 * @description rxCopy exercises.
 * @see rxCopy
 * @exports exercise/rxCopy
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxSelect} options.instance - Component to exercise.
 * @param {Boolean} [options.isPresent=true] - Determines if the component is present.
 * @param {Boolean} [options.isDisabled=false] - Determines if the component is disabled.
 * @param {Boolean} [options.isDisplayed=true] - Determines if the component is displayed.
 * @param {ElementFinder} [testCopyArea=] - An input element somewhere that rxCopy contents can be pasted to.
 * @param {String|Regex} [expectedText=] - The expected text content inside the input element to be copied.
 * Can be a regular expression if the text content is very large.
 */
exports.rxCopy = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        isPresent: true,
        isEnabled: true,
        isDisplayed: true
    });

    return function () {
        var component;

        /**
         * @returns {Promise<String>}
         */
        function getPastedValue () {
            return options.testCopyArea
                .clear()
                .sendKeys(protractor.Key.chord(
                    (process.platform === 'darwin' ? protractor.Key.META : protractor.Key.CONTROL),
                    'v'
                ))
                .getAttribute('value');
        }

        before(function () {
            component = options.instance;
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.eq(options.isPresent);
        });

        if (!options.isPresent) {
            return;
        }

        it(`should ${options.isDisplayed ? 'be' : 'not be'} displayed`, function () {
            expect(component.isDisplayed()).to.eventually.eq(options.isDisplayed);
        });

        if (!options.isDisplayed) {
            return;
        }

        it(`should ${options.isEnabled ? 'be' : 'not be'} enabled`, function () {
            expect(component.isEnabled()).to.eventually.eq(options.isEnabled);
        });

        if (!options.isEnabled) {
            return;
        }

        describe('before copying', function () {

            it('should be waiting', function () {
                expect(component.isWaiting()).to.eventually.be.true;
            });

            it('should not be successful', function () {
                expect(component.isSuccessful()).to.eventually.be.false;
            });

            it('should not have failed', function () {
                expect(component.isFailure()).to.eventually.be.false;
            });

            if (options.expectedText) {
                if (_.isString(options.expectedText)) {
                    it('should have the expected text', function () {
                        expect(component.getText()).to.eventually.eq(options.expectedText);
                    });
                }

                if (_.isRegExp(options.expectedText)) {
                    it('should match the expected text', function () {
                        expect(component.getText()).to.eventually.match(options.expectedText);
                    });
                }
            }

            it('should have a tooltip informing users to click to copy', function () {
                expect(component.rxTooltip.getText()).to.eventually.eq('Click to Copy');
            });

            // Skip on Chrome for Mac: CMD-V is not working to paste clipboard contents
            if (options.testCopyArea && !(isMac && isChrome)) {
                it('should copy text to clipboard', function () {
                    component.copy();
                    getPastedValue().then(function (pastedValue) {
                        expect(component.getText()).to.eventually.eq(pastedValue);
                    });
                });
            }

            describe('after copy', function () {
                before(function () {
                    component.copy();
                });

                it('should not be waiting', function () {
                    expect(component.isWaiting()).to.eventually.be.false;
                });

                it('should be successful', function () {
                    expect(component.isSuccessful()).to.eventually.be.true;
                });

                it('should not have failed', function () {
                    expect(component.isFailure()).to.eventually.be.false;
                });

                it ('should have success tooltip', function () {
                    expect(component.rxTooltip.getText()).to.eventually.eq('Copied!');
                });

                describe('and after a short wait', function () {
                    before(function () {
                        browser.sleep(3000);
                    });

                    it('should be waiting', function () {
                        expect(component.isWaiting()).to.eventually.be.true;
                    });

                    it('should not be successful', function () {
                        expect(component.isSuccessful()).to.eventually.be.false;
                    });

                    it('should not have failed', function () {
                        expect(component.isFailure()).to.eventually.be.false;
                    });

                    it('should have default tooltip', function () {
                        expect(component.rxTooltip.getText()).to.eventually.eq('Click to Copy');
                    });
                });
            });
        });
    };
};
