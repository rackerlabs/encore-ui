'use strict';

import {ElementFinder} from 'protractor';
import {$, browser, by} from 'protractor';
import {AccessorPromiseString} from './rxComponent';

import {rxModalAction} from './rxModalAction.page';
import {rxNotify} from './rxNotify.page';
import {rxSelect} from './rxSelect.page';

/**
 * @namespace
 * @description Utilities for interacting with an rxFeedback component.
 */
export class rxFeedback extends rxModalAction {
    lnkFeedback: ElementFinder;

    // Since we're technically an rxModal, we need to change the root element.
    constructor(readonly rootElement: ElementFinder) {
        super($('.modal'));
        this.lnkFeedback = rootElement;
    }

    get selReportType() {
        return new rxSelect($('#selFeedbackType'));
    }

    get txtFeedback() {
        return this.element(by.model('fields.description'));
    }

    /**
     * @description Opens the feedback modal.
     */
    open() {
        return this.isDisplayed().then(isDisplayed => {
            if (!isDisplayed) {
                this.lnkFeedback.$('a').click();
            }
        });
    }

    /**
     * @description A getter and setter for changing the type of feedback to be submitted.
     * @example
     * feedback = new rxFeedback();
     * feedback.open();
     * feedback.type = 'Kudos';
     * expect(feedback.type).to.eventually.equal('Kudos');
     */
    get type(): AccessorPromiseString {
        return this.selReportType.selectedOption.getText();
    }
    set type(optionText) {
        this.selReportType.select(optionText);
    }

    /**
     * @description All feedback types available for submission.
     */
    getTypes() {
        return this.selReportType.options.getText();
    }

    /**
     * @description A getter and setter to get or change the feedback's description text.
     */
    get description(): AccessorPromiseString {
        return this.txtFeedback.getAttribute('value');
    }
    set description(feedback) {
        this.txtFeedback.clear();
        this.txtFeedback.sendKeys(feedback);
    }

    /**
     * @description The placeholder string that populates the feedback description by default.
     */
    getDescriptionPlaceholder() {
        return this.txtFeedback.getAttribute('placeholder');
    }

    /**
     * @description The label above the description text box.
     */
    getDescriptionLabel() {
        return this.$('.feedback-description').getText();
    }

    /**
     * @description A high-level utility function for quickly submitting feedback.
     * Prepares, writes, and submits feedback.
     * If `confirmSuccessWithin` is defined, a confirmation of submission success must appear
     * within `confirmSuccessWithin` milliseconds.
     * If `confirmSuccessFn` is undefined, the default behavior will look for an rxNotify success
     * message. Otherwise, `confirmSuccessFn` will be attempted until it yields a truthy value,
     * using Protractor's `wait` function.  You must also specify a value for `confirmSuccessWithin`.
     */
    send(feedbackType: string, feedbackText: string, confirmSuccessWithin?: number, confirmSuccessFn?: Function) {
        this.open();
        this.type = feedbackType;
        this.description = feedbackText;
        if (confirmSuccessWithin !== undefined) {
            this.submit();
            return this.confirmSuccess(confirmSuccessWithin, confirmSuccessFn);
        }
        return this.submit();
    }

    /**
     * @description Helper function used to confirm that {@link rxFeedback#send} was confirmed as successful.
     * @see rxFeedback#send
     */
    confirmSuccess(within: number, fn?: Function) {
        fn = fn || (() => {
            return rxNotify.all.hasNotification('feedback', 'success');
        });

        return browser.wait(fn, within, 'Feedback submission did not confirm success within ' + within + ' msecs');
    }
}// rxFeedback
