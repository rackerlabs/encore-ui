var rxSelect = require('./rxSelect.page').rxSelect;
var rxNotify = require('./rxNotify.page').rxNotify;
var rxModalAction = require('./rxModalAction.page').rxModalAction;

/**
 * @namespace
 * @description Utilities for interacting with an rxFeedback component.
 */
var rxFeedback = {
    selReportType: {
        get: function () {
            return rxSelect.initialize($('#selFeedbackType'));
        }
    },

    txtFeedback: {
        get: function () {
            return this.rootElement.element(by.model('fields.description'));
        }
    },

    /**
     * @instance
     * @function
     * @description Opens the feedback modal.
     */
    open: {
        value: function () {
            var page = this;
            return this.isDisplayed().then(function (isDisplayed) {
                if (!isDisplayed) {
                    page.eleFeedback.$('a').click();
                }
            });
        }
    },

    /**
     * @instance
     * @type {String}
     * @description A getter and setter for changing the type of feedback to be submitted.
     * @example
     * feedback = encore.rxFeedback.initialize();
     * feedback.open();
     * feedback.type = 'Kudos';
     * expect(feedback.type).to.eventually.equal('Kudos');
     */
    type: {
        get: function () {
            return this.selReportType.selectedOption.getText();
        },
        set: function (optionText) {
            var option = this.selReportType.rootElement.element(by.cssContainingText('option', optionText));
            /*
             * For some reason, it seems that the slow click method in combination
             * with an rx-select in the modal will dismiss the modal instead of
             * selecting the dropdown option.
             *
             * Reverted to basic .click() functionality, for the time being.
             */
            option.click();
        }
    },

    /**
     * @instance
     * @type {String[]}
     * @description All feedback types available for submission.
     */
    types: {
        get: function () {
            return this.selReportType.options;
        }
    },

    /**
     * @instance
     * @type {String}
     * @description A getter and setter to get or change the feedback's description text.
     */
    description: {
        get: function () {
            return this.txtFeedback.getAttribute('value');
        },
        set: function (feedback) {
            this.txtFeedback.clear();
            this.txtFeedback.sendKeys(feedback);
        }
    },

    /**
     * @private
     * @instance
     * @type {String}
     * @description The placeholder string that populates the feedback description by default.
     */
    descriptionPlaceholder: {
        get: function () {
            return this.txtFeedback.getAttribute('placeholder');
        }
    },

    /**
     * @private
     * @instance
     * @type {String}
     * @description The label above the description text box.
     */
    descriptionLabel: {
        get: function () {
            return this.rootElement.$('.feedback-description').getText();
        }
    },

    /**
     * @instance
     * @function
     * @description A high-level utility function for quickly submitting feedback.
     * Prepares, writes, and submits feedback.
     * If `confirmSuccessWithin` is defined, a confirmation of submission success must appear
     * within `confirmSuccessWithin` milliseconds.
     * If `confirmSuccessFn` is undefined, the default behavior will look for an rxNotify success
     * message. Otherwise, `confirmSuccessFn` will be attempted until it yields a truthy value,
     * using Protractor's `wait` function.
     * @param {String} feedbackType - The type of feedback to submit.
     * @param {String} feedbackText - The text to include as a feedback description.
     * @param {Number} [confirmSuccessWithin=3000] - Milliseconds to confirm success within.
     * @param {Function} [confirmSuccessFn={@link rxNotify#isPresent}] -
     * Function used to detect whether the feedback submission was successful.
     */
    send: {
        value: function (feedbackType, feedbackText, confirmSuccessWithin, confirmSuccessFn) {
            var page = this;
            return this.isDisplayed().then(function (isDisplayed) {
                if (!isDisplayed) {
                    page.open();
                }
                page.reportType = feedbackType;
                page.description = feedbackText;
                page.submit();
                if (confirmSuccessWithin !== undefined) {
                    page.confirmSuccess(confirmSuccessWithin, confirmSuccessFn);
                }
            });
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description Helper function used to confirm that {@link rxFeedback#send} was confirmed as successful.
     * @see rxFeedback#send
     */
    confirmSuccess: {
        value: function (within, fn) {
            if (fn === undefined) {
                fn = function () {
                    return rxNotify.all.isPresent('feedback', 'success');
                };
            }

            browser.wait(function () {
                return fn();
            }, within, 'feedback submission did not confirm success within ' + within + ' msecs');
        }
    }
};//rxFeedback

exports.rxFeedback = {
    /**
     * @function
     * @memberof rxFeedback
     * @description Creates a page object from a link that launches a feedback modal. Uses {@link rxModalAction} under
     * the hood to provide typical interactions with the feedback modal.
     * @param {ElementFinder} [rxFeedbackElement=$([rx-feedback])] -
     * ElementFinder to be transformed into an {@link rxModalAction} object that is supplemented
     * with additional functionality provided by {@link rxFeedback}
     * @returns {rxFeedback}
     * @see rxModalAction
     */
    initialize: function (rxFeedbackElement) {
        if (rxFeedbackElement === undefined) {
            rxFeedbackElement = $('[rx-feedback]');
        }

        rxFeedback.eleFeedback = {
            get: function () { return rxFeedbackElement; }
        };
        return rxModalAction.initialize(rxFeedback);
    }
};
