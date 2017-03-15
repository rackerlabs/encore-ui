'use strict';
import {browser, ExpectedConditions as EC} from 'protractor';
import {OverrideWebdriver, rxComponentElement} from './rxComponent';

/**
 * @description By default, every modal will have a title, subtitle, a submit button, a cancel button, and more.
 * However, you will likely have some custom form elements in a modal, and you'll need to define those
 * as a page object ahead of time. Extend rxModalAction to provide additional elements.  {@link rxFeedback} uses
 * rxModal under the hood to provide a few custom form elements on top of this page object, if you need to
 * reference an example.  Note that it is up to you to open the modal before initializing this object.
 * @see rxFeedback
 * @example
 * class ChangePasswordModal extends rxModal {
 *     get txtNewPassword() {
 *         return this.rootElement.element(by.model('fields.password'));
 *     }
 *
 *     get txtErrorMessage: {
 *         return this.$('.error-message');
 *     }
 *
 *     get newPassword() {
 *         return this.txtNewPassword.getAttribute('value');
 *     }
 *     set newPassword(password) {
 *         this.txtNewPassword.clear();
 *         this.txtNewPassword.sendKeys(password);
 *     }
 * };
 *
 * // this modal not only has a close button, title, etc...
 * // but also a couple of form elements for checking an old password and a new password.
 * myPage.openChangePasswordModal();
 * let changePasswordModal = new ChangePasswordModal($('.modal'));
 * changePasswordModal.newPassword = '12345';
 * changePasswordModal.submit();
 */
export class rxModalAction extends rxComponentElement {

    get btnSubmit() {
        return this.$('.submit');
    }

    get btnCancel() {
        return this.$('.cancel');
    }

    /**
     * @description Whether or not the modal is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed() {
        // Why are we overriding isDisplayed() here to alias isPresent()?
        return this.isPresent();
    }

    /**
     * @description The modal's title.
     */
    getTitle() {
        return this.$('.modal-title').getText();
    }

    /**
     * @description The modal's subtitle.
     */
    getSubtitle() {
        return this.$('.modal-subtitle').getText();
    }

    /**
     * @description Closes the modal by clicking the little "x" in the top right corner.
     */
    close() {
        this.$('.modal-close').click();
        return browser.wait(EC.stalenessOf(this));
    }

    /**
     * @description Whether or not the modal can be submitted in its current state.
     */
    canSubmit() {
        return this.btnSubmit.isEnabled();
    }

    /**
     * @description Clicks the "submit" button. This isn't exactly what you think it is in a multi-step modal!
     */
    @OverrideWebdriver
    submit() {
        this.btnSubmit.click();
        return browser.wait(EC.stalenessOf(this));
    }

    /**
     * @description Cancels out of the current modal by clicking the "cancel" button.
     */
    cancel() {
        this.btnCancel.click();
        return browser.wait(EC.stalenessOf(this));
    }

};
