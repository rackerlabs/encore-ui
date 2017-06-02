'use strict';
import {by, ElementFinder} from 'protractor';
import {Promise, rxComponentElement} from './rxComponent';

export class rxCharacterCount extends rxComponentElement {
    get eleParent(): rxComponentElement {
        return this.parent.parent;
    }

    get lblRemaining(): ElementFinder {
        return this.eleParent.element(by.binding('remaining'));
    }

    /**
     * The remaining number of characters that can be entered.
     */
    getRemaining(): Promise<number> {
        return this.lblRemaining.getText().then(parseInt);
    }

    /**
     * Whether or not the 'near-limit' class is displayed.
     */
    isNearLimit(): Promise<boolean> {
        return this.lblRemaining.getAttribute('class').then(classNames => {
            return classNames.indexOf('near-limit') > -1;
        });
    }

    /**
     * Whether or not the 'over-limit' class is displayed.
     */
    isOverLimit(): Promise<boolean> {
        return this.lblRemaining.getAttribute('class').then(classNames => {
            return classNames.indexOf('over-limit') > -1;
        });
    }

    /**
     * The characters that are over the limit.
     *
     * @example
     *
     *     // in this example, the limit of characters is 3
     *     myPage.comment = 'Anda Apine';
     *     expect(myPage.getOverLimitText()).to.eventually.equal('a Apine');
     */
    getOverLimitText(): Promise<string> {
        return this.eleParent.$('.over-limit-text').getText();
    }
}
