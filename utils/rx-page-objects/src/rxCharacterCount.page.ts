'use strict';
import {by} from 'protractor';
import {rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxCharacterCount extends rxComponentElement {
    get eleParent() {
        return this.parent.parent;
    }

    get lblRemaining() {
        return this.eleParent.element(by.binding('remaining'));
    }

    /**
     * @description Whether the root element is currently displayed.
     */
    isDisplayed() {
        return this.isDisplayed();
    }

    /**
     * @description The remaining number of characters that can be entered.
     */
    getRemaining() {
        return this.lblRemaining.getText().then(parseInt);
    }

    /**
     * @description Whether or not the 'near-limit' class is displayed.
     */
    isNearLimit() {
        return this.lblRemaining.getAttribute('class').then(classNames => {
            return classNames.indexOf('near-limit') > -1;
        });
    }

    /**
     * @description Whether or not the 'over-limit' class is displayed.
     */
    isOverLimit() {
        return this.lblRemaining.getAttribute('class').then(classNames => {
            return classNames.indexOf('over-limit') > -1;
        });
    }

    /**
     * @description The characters that are over the limit.
     * @example
     * // in this example, the limit of characters is 3
     * myPage.comment = 'Anda Apine';
     * expect(myPage.getOverLimitText()).to.eventually.equal('a Apine');
     */
    getOverLimitText() {
        return this.eleParent.$('.over-limit-text').getText();
    }
}
