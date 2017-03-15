'use strict';

import {$, browser} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/* CSS HIERARCHY
 * ----------------------------------------
 * div.tooltip <-- tooltipElement for constructor
 *   div.tooltip-arrow
 *   div.tooltip-inner
 */

/**
 * @class
 */
export class Tooltip extends rxComponentElement {
    /**
     * @description
     * (READ-ONLY) Text value of tooltip (if present).
     *
     * Warning: This property is known to be unstable in many
     * Selenium end to end test runs in EncoreUI. Returns the tooltip text.
     * Automatically dismisses the tooltip by moving the mouse.
     * If there is no tooltip present on hover, returns `null`.
     *
     * @example
     * it('should have the correct tooltip text', function () {
     *     expect(myTooltip.getText()).to.eventually.equal('Some Value');
     * });
     *
     * @returns {Promise<String|null>}
     */
    @OverrideWebdriver
    getText(): Promise<string>|Promise<null> {
        // Tooltips, when left open, can obscure other hover/click
        // events on the page. Avoid this by getting the text, stop
        // hovering, then return the text value back to the user.
        return this.$('.tooltip-inner').getText().then(txt => {
            browser.actions().mouseMove($('body')).perform();
            return txt;
        }, () => null);
    }// get text()

}// Tooltip
