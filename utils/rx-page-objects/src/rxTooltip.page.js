'use strict';

/* CSS HIERARCHY
 * ----------------------------------------
 * div.rxTooltip <-- tooltipElement for constructor
 *   div.rxTooltip__arrow
 *   div.rxTooltip__inner
 */

/**
 * @class
 */
class rxTooltip {
    /**
     * @param {ElementFinder} tooltipElement
     * ElementFinder to be transformed into a rxTooltip page object
     */
    constructor (tooltipElement) {
        this.rootElement = tooltipElement;

        // Private selectors
        this.eleInnerText = this.rootElement.$('.rxTooltip__inner');
    }//constructor

    /**
     * @description
     * (READ-ONLY) Text value of tooltip (if present).
     *
     * Warning: This property is known to be unstable in many
     * Selenium end to end test runs in EncoreUI. Returns the tooltip text.
     * Will automatically hover over the tooltip for you to retrieve the text.
     * If there is no tooltip present on hover, returns `null`.
     *
     * @example
     * it('should have the correct tooltip text', function () {
     *     expect(myTooltip.getText()).to.eventually.equal('Some Value');
     * });
     *
     * @returns {Promise<String|null>}
     */
    getText () {
        return this.isPresent().then((isPresent) => {
            // short circuit if not present
            if (!isPresent) {
                return null;
            }

            // Tooltips, when left open, can obscure other hover/click
            // events on the page. Avoid this by getting the text, stop
            // hovering, then return the text value back to the user.
            return this.eleInnerText.getText().then(function (txt) {
                browser.actions().mouseMove($('body')).perform();
                return txt;
            });
        });
    }//get text()


    /**
     * @description whether or not the tooltip is present
     *
     * @returns {Promise<Boolean>}
     */
    isPresent () {
        return this.rootElement.isPresent();
    }
}//rxTooltip

exports.rxTooltip = rxTooltip;
