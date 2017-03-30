'use strict';

import {browser, by, ElementFinder, promise} from 'protractor';
import {Key} from 'selenium-webdriver';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * @class
 * @description Functionality around a single tag object.
 */
export class Tag extends rxComponentElement {
    /**
     * @description Whether or not the tag is currently focused.
     * @example
     * it('should focus on the last tag when clicking it', function () {
     *     new rxTags($('rx-tags')).addTag('Banana').then(function (tag) {
     *         expect(tag.isFocused()).to.eventually.be.false;
     *         tag.click();
     *         expect(tag.isFocused()).to.eventually.be.true;
     *     });
     * });
     */
    isFocused(): Promise<boolean> {
        let active = browser.switchTo().activeElement().getId();
        return promise.all([active, this.getId()]).then(ids => ids[0] === ids[1]);
    }

    /**
     * @description Removes the tag by clicking on it, then sending the backspace key.
     * @example
     * it('should show a warning when deleting an existing tag with backspace', function () {
     *     new rxTags($('rx-tags')).byText('Enterprise').backspaceRemove();
     *     var warning = 'Warning: Deleting tag "Enterprise" will notify some very angry sysadmins';
     *     expect(encore.rxNotify.all.isPresent(warning, 'warning')).to.eventually.be.true;
     * });
     */
    backspaceRemove(): void {
        this.click();
        this.sendKeys(Key.BACK_SPACE);
    }

    /**
     * @description The text within the tag. Does not include the text in {@link rxTags.tag#category}.
     * @example
     * it('should have "Enterprise" as the exact tag name', function () {
     *     expect(new rxTags($('rx-tags')).byText('Banana').getText()).to.eventually.equal('Banana');
     * });
     * @returns {Promise<String>}
     */
    @OverrideWebdriver
    getText(): Promise<string> {
        return this.$('.text').getText();
    }

    /**
     * @description The category text of a tag. This appears in parentheses, after the normal text.
     * @example
     * it('should have the right category', function () {
     *     expect(new rxTags($('rx-tags')).byText('Banana').getCategory()).to.eventually.equal('fruit');
     * });
     */
    getCategory(): Promise<string> {
        return this.$('.category').getText().then(text => {
            // Strip the bounding parens
            return text.slice(1, -1);
        });
    }

    /**
     * @description Close the tag by clicking the little "x" button on the right side of the tag.
     * @example
     * it('should show a warning when deleting an existing tag with the close button', function () {
     *     new rxTags($('rx-tags')).byText('Enterprise').remove();
     *     var warning = 'Warning: Deleting tag "Enterprise" will notify some very angry sysadmins';
     *     expect(encore.rxNotify.all.isPresent(warning, 'warning')).to.eventually.be.true;
     * });
     */
    remove(): Promise<void> {
        return this.$('.fa-times').click();
    }
}

/**
 * @class
 * @description Functions for interacting with a group of existing tags, creating new ones,
 * or deleting existing ones.
 */
export class rxTags extends rxComponentElement {

    /**
     * @description The number of tags that exist in the group of tags.
     * @example
     * it('should have three tags', function () {
     *     expect(new rxTags($('rx-tags')).count()).to.eventually.equal(3);
     * });
     */
    @OverrideWebdriver
    count(): Promise<number> {
        return this.$$('.tag').count();
    }

    get newTagInput(): ElementFinder {
        return this.element(by.model('newTag'));
    }

    /**
     * @description Adds a new tag with text `text` to the group of tags.
     * Returns the newly created tag, should you need to interact with it.
     * @example
     * it('should show an warning notification when adding the "Enterprise" tag', function () {
     *     new rxTags($('rx-tags')).addTag('Enterprise');
     *     expect(encore.rxNotify.all.isPresent('Warning: "Enterprise"', 'warning')).to.eventually.be.true;
     * });
     */
    addTag(tagText): Promise<void> {
        this.newTagInput.clear();
        this.newTagInput.sendKeys(tagText, Key.ENTER);
        return this.newTagInput.clear();
    }

    /**
     * @private
     */
    sendBackspace(): Promise<void> {
        /*
            * Protractor isn't properly trapping the `BACK_SPACE = navigate back`
            * functionality so we have to use SHIFT + BACK_SPACE as a workaround.
            *
            * Initially, changing ng-keydown to ng-keypress in the template seemed
            * to work, but this only corrected the issue with Firefox. Chrome doesn't
            * seem to recognize ng-keypress functionality.
            */
        let chordBackspace = Key.chord(
            Key.SHIFT,
            Key.BACK_SPACE,
        );
        return this.newTagInput.sendKeys(chordBackspace);
    }

    /**
     * @description Return an {@link rxTags.tag} object that matches the `text` passed in.
     * This function uses a partial text match function to find the tag, so make sure there
     * are no duplicates. If there are, the first matching tag will be returned.
     * @example
     * it('should have the correct category for the "Strawberry" tag', function () {
     *     expect(new rxTags($('rx-tags')).byText('Strawberry').getCategory()).to.eventually.equal('fruit');
     * });
     */
    byText(tagText): Tag {
        return new Tag(this.element(by.cssContainingText('.tag', tagText)));
    }

}
