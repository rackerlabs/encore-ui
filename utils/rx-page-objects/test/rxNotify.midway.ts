
'use strict';

import {expect} from 'chai';
import {$, browser, by, element, ExpectedConditions} from 'protractor';

import {rxNotification, rxNotify} from '../index';

let demoPage = require('../../demo.page');

describe('rxNotify', () => {
    before(() => {
        demoPage.go('#/elements/Notifications');
    });

    describe('auto dismissal', () => {
        let addToCustomStack = (type, timeout) => {
            let input = $('input[ng-model="options.timeout"]');
            input.clear();
            input.sendKeys(timeout);
            $('input[value="' + type + '"]').click();
            element(by.buttonText('Add to Custom Stack')).click();
        };

        it('should add a new success message that dismisses itself', () => {
            addToCustomStack('success', '.5');
            expect(rxNotify.all.byText('My message').getType()).to.eventually.equal('success');
        });

        it('should remove itself after a little while', () => {
            browser.sleep(1000);
            expect(rxNotify.byStack('custom').hasNotification('My message', 'success')).to.eventually.false;
        });

        it('should add a new success message indefinitely', () => {
            addToCustomStack('success', -1);
            expect(rxNotify.all.byText('My message').getType()).to.eventually.equal('success');
        });
    });

    describe('by stack -- demo', () => {

        it('should have 4 notifications in it', () => {
            expect(rxNotify.byStack('demo').count()).to.eventually.equal(4);
        });

        describe('info type', () => {
            let info: rxNotification;

            before(() => {
                info = rxNotify.byStack('demo').byText('Helpful Information');
            });

            it('should be type "info"', () => {
                expect(info.getType()).to.eventually.equal('info');
            });

            it('should have helpful information', () => {
                expect(info.getText()).to.eventually.equal('Helpful Information');
            });

            it('should be dismissable', () => {
                expect(info.isDismissable()).to.eventually.be.true;
            });

            it('should not have a spinner', () => {
                expect(info.hasSpinner()).to.eventually.be.false;
            });

            it('should have a second spinner on another notification', () => {
                expect(rxNotify.byStack('demo').byText('Loading').hasSpinner()).to.eventually.be.true;
            });

        });

    });

    describe('all notifications', () => {

        it('should have 6 notifications in it', () => {
            expect(rxNotify.all.count()).to.eventually.equal(8);
        });

        describe('by type', () => {
            let success: rxNotification;

            before(() => {
                success = rxNotify.all.byText('You did it!');
            });

            it('should be type "success"', () => {
                expect(success.getType()).to.eventually.equal('success');
            });

            it('should have done it', () => {
                expect(success.getText()).to.eventually.equal('You did it!');
            });

        });
    });

    describe('notifications exist', () => {

        it('should find a notification with no class and a string (all)', () => {
            expect(rxNotify.all.hasNotification('Under Attack by Aliens')).to.eventually.be.true;
        });

        it('should find a notification with no class and a string (custom stack)', () => {
            expect(rxNotify.byStack('custom').hasNotification('Under Attack by Aliens')).to.eventually.be.true;
        });

        it('should find a notification with a class and a string', () => {
            expect(rxNotify.all.hasNotification('Under Attack by Aliens', 'error')).to.eventually.be.true;
        });

        it('should find a notification with a class and no string', () => {
            expect(rxNotify.all.hasNotification('', 'error')).to.eventually.be.true;
        });

        it('should not find a notification with the wrong class and a string', () => {
            expect(rxNotify.all.hasNotification('Under Attack by Aliens', 'success')).to.eventually.be.false;
        });

        it('should not find a notification with the wrong class and no string', () => {
            expect(rxNotify.all.hasNotification('', 'abject_failure')).to.eventually.be.false;
        });

        it('should not find a notification with no class and a wrong string', () => {
            expect(rxNotify.all.hasNotification('Under Attack by Alienists')).to.eventually.be.false;
        });

    });

    describe('dismissing notifications', () => {

        it('should dismiss a single notification', () => {
            rxNotify.all.byText('Careful now...').dismiss();
        });

        it('should have actually dismissed the message', () => {
            expect(rxNotify.all.count()).to.eventually.equal(7);
        });

        describe('by stack', () => {

            it('should dismiss every notification in a stack', () => {
                rxNotify.byStack('custom').dismiss();
            });

            it('should have actually dismissed every message', () => {
                expect(rxNotify.byStack('custom').count()).to.eventually.equal(0);
            });

        });

        describe('with ondismiss function', () => {
            let browserName: string;
            let msgText = 'Testing On Dismiss Method';

            before(() => {
                // https://git.io/vKHN1
                browser.getCapabilities().then(capabilities => {
                    browserName = capabilities.get('browserName');
                    if (browserName !== 'chrome') {
                        let chkOnDismiss = $('input[ng-model="ondismiss.should"]');
                        let txtMessage = $('input[ng-model="message"]');

                        txtMessage.clear();
                        txtMessage.sendKeys(msgText);

                        chkOnDismiss.getAttribute('checked').then(isChecked => {
                            if (!isChecked) {
                                chkOnDismiss.click();
                            }
                        });

                        element(by.buttonText('Add to Custom Stack')).click();
                    }
                });
            });

            it('should have an alert when the message is dismissed', () => {
                // https://git.io/vKHN1
                if (browserName !== 'chrome') {
                    rxNotify.byStack('custom').byText(msgText).dismiss();

                    let EC = ExpectedConditions;
                    browser.wait(EC.alertIsPresent());
                    browser.switchTo().alert().then(alertBox => {
                        let msg = 'We are dismissing the message: Testing On Dismiss Method';
                        expect(alertBox.getText()).to.eventually.equal(msg);
                        alertBox.accept();
                    });
                }
            });
        });

        describe('all', () => {

            it('should dismiss all notifications', () => {
                rxNotify.all.dismiss();
            });

            it('should have actually dismissed every message', () => {
                expect(rxNotify.all.count()).to.eventually.equal(1);
            });

        });

    });

    describe('stackless notifications', () => {
        let notification: rxNotification;

        before(() => {
            notification = new rxNotification($('rx-notification[type="error"] .rx-notification'));
        });

        it('should have a warning type', () => {
            expect(notification.getType()).to.eventually.equal('error');
        });

        it('should say hello', () => {
            expect(notification.getText()).to.eventually.equal('Hello, world! This is a link.');
        });

        it('should not be dismissable', () => {
            expect(notification.isDismissable()).to.eventually.be.false;
        });

        it('should not have a spinner', () => {
            expect(notification.hasSpinner()).to.eventually.be.false;
        });

    });

});
