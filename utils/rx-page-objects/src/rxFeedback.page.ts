'use strict';

import {$, by, ElementFinder} from 'protractor';
import {AccessorPromiseString, Promise} from './rxComponent';

import {rxModalAction} from './rxModalAction.page';
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

    get selReportType(): rxSelect {
        return new rxSelect($('#selFeedbackType'));
    }

    get txtFeedback(): ElementFinder {
        return this.element(by.model('fields.description'));
    }

    /**
     * @description Opens the feedback modal.
     */
    open(): Promise<void> {
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
    getTypes(): Promise<string> {
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
    getDescriptionPlaceholder(): Promise<string> {
        return this.txtFeedback.getAttribute('placeholder');
    }

    /**
     * @description The label above the description text box.
     */
    getDescriptionLabel(): Promise<string> {
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
    send(feedbackType: string, feedbackText: string): Promise<void> {
        this.open();
        this.type = feedbackType;
        this.description = feedbackText;
        return this.submit();
    }
}// rxFeedback
