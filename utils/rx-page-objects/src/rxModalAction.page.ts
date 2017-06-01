'use strict';
import {browser, ElementFinder, ExpectedConditions as EC} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * By default, every modal will have a title, subtitle, a submit button, a cancel button, and more.
 * However, you will likely have some custom form elements in a modal, and you'll need to define those
 * as a page object ahead of time. Extend rxModalAction to provide additional elements.  [[rxFeedback]] uses
 * rxModal under the hood to provide a few custom form elements on top of this page object, if you need to
 * reference an example.  Note that it is up to you to open the modal before initializing this object.
 *
 * @example
 *
 *     class ChangePasswordModal extends rxModal {
 *         get txtNewPassword() {
 *             return this.element(by.model('fields.password'));
 *         }
 *
 *         get txtErrorMessage: {
 *             return this.$('.error-message');
 *         }
 *
 *         get newPassword() {
 *             return this.txtNewPassword.getAttribute('value');
 *         }
 *         set newPassword(password) {
 *             this.txtNewPassword.clear();
 *             this.txtNewPassword.sendKeys(password);
 *         }
 *     };
 *
 *     // this modal not only has a close button, title, etc...
 *     // but also a couple of form elements for checking an old password and a new password.
 *     myPage.openChangePasswordModal();
 *     let changePasswordModal = new ChangePasswordModal($('.modal'));
 *     changePasswordModal.newPassword = '12345';
 *     changePasswordModal.submit();
 */
export class rxModalAction extends rxComponentElement {

    get btnSubmit(): ElementFinder {
        return this.$('.submit');
    }

    get btnCancel(): ElementFinder {
        return this.$('.cancel');
    }

    /**
     * Whether or not the modal is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed(): Promise<boolean> {
        // Why are we overriding isDisplayed() here to alias isPresent()?
        return this.isPresent();
    }

    /**
     * The modal's title.
     */
    getTitle(): Promise<string> {
        return this.$('.modal-title').getText();
    }

    /**
     * The modal's subtitle.
     */
    getSubtitle(): Promise<string> {
        return this.$('.modal-subtitle').getText();
    }

    /**
     * Closes the modal by clicking the little "x" in the top right corner.
     */
    close(): Promise<void> {
        this.$('.modal-close').click();
        return browser.wait(EC.stalenessOf(this));
    }

    /**
     * Whether or not the modal can be submitted in its current state.
     */
    canSubmit(): Promise<boolean> {
        return this.btnSubmit.isEnabled();
    }

    /**
     * Clicks the "submit" button. This isn't exactly what you think it is in a multi-step modal!
     */
    @OverrideWebdriver
    submit(): Promise<void> {
        this.btnSubmit.click();
        return browser.wait(EC.stalenessOf(this));
    }

    /**
     * Cancels out of the current modal by clicking the "cancel" button.
     */
    cancel(): Promise<void> {
        this.btnCancel.click();
        return browser.wait(EC.stalenessOf(this));
    }

};
