'use strict';

import {browser} from 'protractor';
import {OverrideWebdriver, rxComponentElement} from './rxComponent';
import {Tooltip} from './tooltip.page';

/* CSS HIERARCHY
 * ----------------------------------------
 * rx-copy <-- rxCopyElement for constructor
 *   div.rxCopy__wrapper
 *     span.rxCopy__text
 *     div.rxCopy__action (ng-click, tooltip anchor)
 *       i.fa-clipboard (waiting)
 *       i.fa-check (success)
 *       i.fa-times (fail)
 *
 * STATES:
 * ----------------------------------------
 * - waiting
 * - success/fail
 */

/**
 * @class
 */
export class rxCopy extends rxComponentElement {
    // "Private" (undocumented) selectors
    private get eleText() { return this.$('.rxCopy__text'); }
    private get eleTooltip() { return this.$('.rxCopy__tooltip'); }
    private get icoCheck() { return this.$('.fa-check'); }
    private get icoClipboard() { return this.$('.fa-clipboard'); }
    private get icoTimes() { return this.$('.fa-times'); }

    /**
     * @description (READ-ONLY) Tooltip associated with rxCopy element.
     */
    get tooltip() {
        this._hoverOverAction();
        // instantiate a new Tooltip from the newly added DOM element
        return new Tooltip(this.eleTooltip);
    }// tooltip()

    /**
     * @description (READ-ONLY) The copy icon ElementFinder.
     */
    get icon() {
        return this.$('.rxCopy__action');
    }

    /**
     * @description (READ-ONLY) Plain text to copy.
     */
    @OverrideWebdriver
    getText() {
        return this.eleText.getText();
    }// getTeixt()

    /**
     * @description Will click the "copy" icon. Attempts to copy the contents of the rxCopy instance
     * to the clipboard. You may experience issues attempting to do this in unsupported browsers.
     * @example
     * var element = new encore.rxCopy($('.myCopyText'));
     * element.copy();
     */
    copy() {
        this._hoverOverAction();
        return this.icon.click();
    }// copy()

    /**
     * @description Whether or not the element is waiting for interaction.
     */
    isWaiting() {
        return this.icoClipboard.isPresent();
    }// isWaiting()

    /**
     * @description Whether or not the copy succeeded.
     */
    isSuccessful() {
        return this.icoCheck.isPresent();
    }// isSuccessful()

    /**
     * @description Whether or not the copy failed.
     */
    isFailure () {
        return this.icoTimes.isPresent();
    }// isFailure()

    /**
     * @description Perform a mouse hover over the clickable action element.
     */
    private _hoverOverAction () {
        browser.actions().mouseMove(this.icon).perform();
        // I know what you're thinking -- don't. Just leave it.
        // Otherwise, tooltips in tables in Chrome will not actually appear.
        browser.actions().mouseMove(this.icon).perform();
    }// _hoverOverAction()
}// rxCopy
