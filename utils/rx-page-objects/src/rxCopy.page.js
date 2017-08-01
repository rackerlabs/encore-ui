'use strict';

var rxTooltip = require('./rxTooltip.page').rxTooltip;

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
class rxCopy {
    /**
     * @param {ElementFinder} rxCopyElement
     * ElementFinder to be transformed into an rxCopy page object
     */
    constructor (rxCopyElement) {
        this.rootElement = rxCopyElement;

        // "Private" (undocumented) selectors
        this.eleAction = this.rootElement.$('.rxCopy__action');
        this.eleText = this.rootElement.$('.rxCopy__text');
        this.icoCheck = this.rootElement.$('.fa-check');
        this.icoClipboard = this.rootElement.$('.fa-clipboard');
        this.icoTimes = this.rootElement.$('.fa-times');
    }//constructor

    /**
     * @description (READ-ONLY)
     * rxTooltip associated with rxCopy element
     * @type {rxTooltip}
     */
    get rxTooltip () {
        this._hoverOverAction();
        // instantiate a new Tooltip from the newly added DOM element
        return new rxTooltip(this.rootElement.$('.rxCopy__tooltip'));
    }//get tooltip()

    /**
     * @description (READ-ONLY) Plain text to copy.
     * @returns {Promise<String>}
     */
    getText () {
        return this.eleText.getText();
    }

    /**
     * @description Whether or not the rxCopy instance is present.
     * @returns {Promise<Boolean>}
     */
    isPresent () {
        return this.rootElement.isPresent();
    }

    /**
     * @description Whether or not the rxCopy instance is visible.
     * @returns {Promise<Boolean>}
     */
    isDisplayed () {
        return this.rootElement.isDisplayed();
    }

    /**
     * @description Whether or not the rxCopy instance is enabled.
     * @returns {Promise<Boolean>}
     */
    isEnabled () {
        return this.rootElement.isEnabled();
    }

    /**
     * @description Will click the "copy" icon. Attempts to copy the contents of the rxCopy instance
     * to the clipboard. You may experience issues attempting to do this in unsupported browsers.
     * @example
     * var element = new encore.rxCopy($('.myCopyText'));
     * element.copy();
     *
     * @returns {Promise}
     */
    copy () {
        this._hoverOverAction();
        return this.eleAction.click();
    }//copy()

    /**
     * @description Whether or not the element is waiting for interaction
     * @returns {Promise<Boolean>}
     */
    isWaiting () {
        return this.icoClipboard.isPresent();
    }

    /**
     * @description Whether or not the copy succeeded.
     * @returns {Promise<Boolean>}
     */
    isSuccessful () {
        return this.icoCheck.isPresent();
    }

    /**
     * @description Whether or not the copy failed.
     * @returns {Promise<Boolean>}
     */
    isFailure () {
        return this.icoTimes.isPresent();
    }

    /**
     * @private
     * @description Perform a mouse hover over the clickable action element.
     */
    _hoverOverAction () {
        browser.actions().mouseMove(this.eleAction).perform();
        // I know what you're thinking -- don't. Just leave it.
        // Otherwise, tooltips in tables in Chrome will not actually appear.
        browser.actions().mouseMove(this.eleAction).perform();
    }
}//rxCopy

exports.rxCopy = rxCopy;
