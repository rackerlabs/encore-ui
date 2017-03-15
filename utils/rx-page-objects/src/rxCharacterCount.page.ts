'use strict';
import {by} from 'protractor';
import {AccessorPromiseString, rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxCharacterCount extends rxComponentElement {
    get eleParent() {
        return this.element(by.xpath('../..'));
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
     * @description Get and set the comment's textual content. Will erase the current text when setting new text.
     * @example
     * it('should erase all text and replace it with new text on update', () => {
     *     myPage.comment = 'Bar';
     *     expect(myPage.comment).to.eventually.equal('Bar');
     * });
     */
    get comment(): AccessorPromiseString {
        return this.getAttribute('value');
    }
    set comment(text) {
        this.clear();
        this.sendKeys(text);
    }

    /**
     * @description The remaining number of characters that can be entered.
     */
    get remaining() {
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
