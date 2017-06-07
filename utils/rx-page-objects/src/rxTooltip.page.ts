'use strict';

import {$, browser} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/* CSS HIERARCHY
 * ----------------------------------------
 * div.rxTooltip <-- tooltipElement for constructor
 *   div.rxTooltip__arrow
 *   div.rxTooltip__inner
 */

/**
 * @class
 */
export class rxTooltip extends rxComponentElement {
    /**
     * (READ-ONLY) Text value of tooltip (if present).
     *
     * Warning: This property is known to be unstable in many
     * Selenium end to end test runs in EncoreUI. Returns the tooltip text.
     * Automatically dismisses the tooltip by moving the mouse.
     * If there is no tooltip present on hover, returns `null`.
     *
     * @example
     *
     *     it('should have the correct tooltip text', function () {
     *         expect(myTooltip.getText()).to.eventually.equal('Some Value');
     *     });
     */
    @OverrideWebdriver
    getText(): Promise<string>|Promise<null> {
        // Tooltips, when left open, can obscure other hover/click
        // events on the page. Avoid this by getting the text, stop
        // hovering, then return the text value back to the user.
        let inner = this.$('.rxTooltip__inner');
        let text = inner.getText();
        browser.actions().mouseMove($('body')).perform();
        return text;
    }// get text()

}// rxTooltip
