'use strict';

import {expect} from 'chai';
import {$, by} from 'protractor';

import {AccessorPromiseString, rxModalAction, rxNotify} from '../index';

let demoPage = require('../../demo.page');

class ChangePasswordModal extends rxModalAction {
    get txtNewPassword() {
        return this.element(by.model('fields.password'));
    }

    get txtErrorMessage() {
        return this.$('.error-message');
    }

    get newPassword(): AccessorPromiseString {
        return this.txtNewPassword.getAttribute('value');
    }
    set newPassword(password: AccessorPromiseString) {
        this.txtNewPassword.clear();
        this.txtNewPassword.sendKeys(password);
    }
}

describe('rxModalAction', () => {
    let changePasswordModal: ChangePasswordModal;

    let triggerModal = () => {
        $('#modChangePassword .modal-link').click();
    };

    before(() => {
        demoPage.go('#/elements/Modals');

        changePasswordModal = new ChangePasswordModal($('.modal'));
    });

    it('should not display the modal unless triggered', () => {
        expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
    });

    describe('when triggered', () => {
        before(() => {
            triggerModal();
        });

        it('should display the modal', () => {
            expect(changePasswordModal.isDisplayed()).to.eventually.be.true;
        });

        it('should have a title', () => {
            expect(changePasswordModal.getTitle()).to.eventually.equal('Change hey_dude Admin Password');
        });

        it('should have a subtitle', () => {
            expect(changePasswordModal.getSubtitle()).to.eventually.equal('Please read instructions below');
        });

        it('should have a custom submit button', () => {
            expect(changePasswordModal.btnSubmit.getText()).to.eventually.equal('Submit Password');
        });

        it('should have a custom cancel button', () => {
            expect(changePasswordModal.btnCancel.getText()).to.eventually.equal('Cancel Request');
        });

        it('should not let me submit the modal by default', () => {
            expect(changePasswordModal.canSubmit()).to.eventually.be.false;
        });

        it('should show a validation error message by default', () => {
            expect(changePasswordModal.txtErrorMessage.isDisplayed()).to.eventually.be.true;
        });

        it('should let me submit the modal when a new password is entered', () => {
            changePasswordModal.newPassword = 'hunter2';
            expect(changePasswordModal.canSubmit()).to.eventually.be.true;
        });

        it('should hide the validation error message when a new password is entered', () => {
            expect(changePasswordModal.txtErrorMessage.isDisplayed()).to.eventually.be.false;
        });

        it('should submit', () => {
            changePasswordModal.submit();
            expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
        });
    }); // when triggered

    describe('when triggered and closed', () => {
        beforeEach(() => {
            triggerModal();
        });

        afterEach(() => {
            rxNotify.all.dismiss();
        });

        describe('when closed with the little X in the corner', () => {
            beforeEach(() => {
                changePasswordModal.close();
            });

            it('should close the modal', () => {
                expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
            });

            it('should display an info notification', () => {
                expect(rxNotify.all.hasNotification('Password Unchanged', 'info')).to.eventually.be.true;
            });
        }); // when closed with "X"

        describe('when closed via the "cancel" button', () => {
            beforeEach(() => {
                changePasswordModal.cancel();
            });

            it('should close the modal', () => {
                expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
            });

            it('should display an info notification', () => {
                expect(rxNotify.all.hasNotification('Password Unchanged', 'info')).to.eventually.be.true;
            });
        }); // when closed via "cancel"
    }); // when triggered and closed

    describe('default modal behavior', () => {
        let defaultModal: rxModalAction;

        before(() => {
            defaultModal = new rxModalAction($('.modal'));
        });

        it('should support basic functionality without supplying any arguments', () => {
            triggerModal();
            expect(defaultModal.getTitle()).to.eventually.equal('Change hey_dude Admin Password');
            defaultModal.cancel();
        });
    });

    describe('when disabled', () => {
        let defaultModal: rxModalAction;

        before(() => {
            defaultModal = new rxModalAction($('.modal'));
        });

        it('should not open modal', () => {
            $('#btnDisabledModal .modal-link').click();
            expect(defaultModal.isDisplayed()).to.eventually.be.false;
        });

    });
});
