'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {browser, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';
import * as component from './rxCopy.page';

interface IRxCopyExerciseOptions {
    instance: component.rxCopy;
    displayed?: boolean;
    enabled?: boolean;
    expectedText?: string|RegExp;
    present?: boolean;
    testCopyArea?: ElementFinder;
}
/**
 * @description rxCopy exercises.
 * @see rxCopy
 */
export function rxCopy(options: IRxCopyExerciseOptions) {

    options = _.defaults(options, {
        displayed: true,
        enabled: true,
        present: true,
    });

    return () => {
        let component: component.rxCopy;

        /**
         * pastes a value to `testCopyArea` then returns what was pasted.
         */
        let getPastedValue = () => {
            options.testCopyArea.clear();
            options.testCopyArea.sendKeys(Key.chord(
                (process.platform === 'darwin' ? Key.META : Key.CONTROL),
                'v',
            ));
            return options.testCopyArea.getAttribute('value');
        };

        before(() => {
            component = options.instance;
        });

        it('should be present', () => {
            expect(component.isPresent()).to.eventually.eq(options.present);
        });

        if (!options.present) {
            return;
        }

        it(`should ${options.displayed ? 'be' : 'not be'} displayed`, () => {
            expect(component.isDisplayed()).to.eventually.eq(options.displayed);
        });

        if (!options.displayed) {
            return;
        }

        it(`should ${options.enabled ? 'be' : 'not be'} enabled`, () => {
            expect(component.isEnabled()).to.eventually.eq(options.enabled);
        });

        if (!options.enabled) {
            return;
        }

        describe('before copying', () => {

            it('should be waiting', () => {
                expect(component.isWaiting()).to.eventually.be.true;
            });

            it('should not be successful', () => {
                expect(component.isSuccessful()).to.eventually.be.false;
            });

            it('should not have failed', () => {
                expect(component.isFailure()).to.eventually.be.false;
            });

            if (options.expectedText) {
                if (_.isString(options.expectedText)) {
                    it('should have the expected text', () => {
                        expect(component.getText()).to.eventually.eq(options.expectedText);
                    });
                }

                if (_.isRegExp(options.expectedText)) {
                    it('should match the expected text', () => {
                        expect(component.getText()).to.eventually.match(options.expectedText);
                    });
                }
            }

            it('should have a tooltip informing users to click to copy', () => {
                expect(component.tooltip.getText()).to.eventually.eq('Click to Copy');
            });

            // Skip on Chrome for Mac: CMD-V is not working to paste clipboard contents
            if (options.testCopyArea && !(browser.params.isMac && browser.params.isChrome)) {
                it('should copy text to clipboard', () => {
                    component.copy();
                    getPastedValue().then(pastedValue => {
                        expect(component.getText()).to.eventually.eq(pastedValue);
                    });
                });
            }

            describe('after copy', () => {
                before(() => {
                    component.copy();
                });

                it('should not be waiting', () => {
                    expect(component.isWaiting()).to.eventually.be.false;
                });

                it('should be successful', () => {
                    expect(component.isSuccessful()).to.eventually.be.true;
                });

                it('should not have failed', () => {
                    expect(component.isFailure()).to.eventually.be.false;
                });

                it ('should have success tooltip', () => {
                    expect(component.tooltip.getText()).to.eventually.eq('Copied!');
                });

                describe('and after a short wait', () => {
                    before(() => {
                        browser.sleep(3000);
                    });

                    it('should be waiting', () => {
                        expect(component.isWaiting()).to.eventually.be.true;
                    });

                    it('should not be successful', () => {
                        expect(component.isSuccessful()).to.eventually.be.false;
                    });

                    it('should not have failed', () => {
                        expect(component.isFailure()).to.eventually.be.false;
                    });

                    it('should have default tooltip', () => {
                        expect(component.tooltip.getText()).to.eventually.eq('Click to Copy');
                    });
                });
            });
        });
    };
};
