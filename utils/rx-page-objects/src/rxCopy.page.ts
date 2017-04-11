'use strict';

import {browser, ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';
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
    private get eleText(): ElementFinder { return this.$('.rxCopy__text'); }
    private get eleTooltip(): ElementFinder { return this.$('.rxCopy__tooltip'); }
    private get icoCheck(): ElementFinder { return this.$('.fa-check'); }
    private get icoClipboard(): ElementFinder { return this.$('.fa-clipboard'); }
    private get icoTimes(): ElementFinder { return this.$('.fa-times'); }

    /**
     * @description (READ-ONLY) Tooltip associated with rxCopy element.
     */
    get tooltip(): Tooltip {
        this._hoverOverAction();
        // instantiate a new Tooltip from the newly added DOM element
        return new Tooltip(this.eleTooltip);
    }// tooltip()

    /**
     * @description (READ-ONLY) The copy icon ElementFinder.
     */
    get icon(): ElementFinder {
        return this.$('.rxCopy__action');
    }

    /**
     * @description (READ-ONLY) Plain text to copy.
     */
    @OverrideWebdriver
    getText(): Promise<string> {
        return this.eleText.getText();
    }// getTeixt()

    /**
     * @description Will click the "copy" icon. Attempts to copy the contents of the rxCopy instance
     * to the clipboard. You may experience issues attempting to do this in unsupported browsers.
     * @example
     * var element = new encore.rxCopy($('.myCopyText'));
     * element.copy();
     */
    copy(): Promise<void> {
        this._hoverOverAction();
        return this.icon.click();
    }// copy()

    /**
     * @description Whether or not the element is waiting for interaction.
     */
    isWaiting(): Promise<boolean> {
        return this.icoClipboard.isPresent();
    }// isWaiting()

    /**
     * @description Whether or not the copy succeeded.
     */
    isSuccessful(): Promise<boolean> {
        return this.icoCheck.isPresent();
    }// isSuccessful()

    /**
     * @description Whether or not the copy failed.
     */
    isFailure(): Promise<boolean> {
        return this.icoTimes.isPresent();
    }// isFailure()

    /**
     * @description Perform a mouse hover over the clickable action element.
     */
    private _hoverOverAction(): void {
        browser.actions().mouseMove(this.icon).perform();
        // I know what you're thinking -- don't. Just leave it.
        // Otherwise, tooltips in tables in Chrome will not actually appear.
        browser.actions().mouseMove(this.icon).perform();
    }// _hoverOverAction()
}// rxCopy
