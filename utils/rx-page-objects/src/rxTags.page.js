var Page = require('astrolabe').Page;

var tag = function (tagElement) {
    /**
     * @namespace rxTags.tag
     * @description Functionality around a single tag object.
     * @see rxTags
     */
    return Page.create({

        /**
         * @function
         * @instance
         * @memberof rxTags.tag
         * @description Clicks the tag instance.
         * @example
         * it('should focus on the tag on click', function () {
         *     encore.rxTags.initialize().addTag('Banana').then(function (tag) {
         *         expect(tag.isFocused()).to.eventually.be.false;
         *         tag.click();
         *         expect(tag.isFocused()).to.eventually.be.true;
         *     });
         * });
         */
        click: {
            value: function () {
                tagElement.click();
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxTags.tag
         * @description Whether or not the tag exists.
         * @example
         * it('should have a tag present after creating it', function () {
         *     expect(encore.rxTags.initialize().addTag('Foo').isPresent()).to.eventually.be.true;
         * });
         * @returns {Promise<Boolean>}
         */
        isPresent: {
            value: function () {
                return tagElement.isPresent();
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxTags.tag
         * @description Whether or not the tag is currently focused.
         * @returns {Boolean}
         * @example
         * it('should focus on the last tag when clicking it', function () {
         *     encore.rxTags.initialize().addTag('Banana').then(function (tag) {
         *         expect(tag.isFocused()).to.eventually.be.false;
         *         tag.click();
         *         expect(tag.isFocused()).to.eventually.be.true;
         *     });
         * });
         */
        isFocused: {
            value: function () {
                return browser.driver.switchTo().activeElement().getId().then(function (activeId) {
                    return tagElement.getId().then(function (tagId) {
                        return _.isEqual(activeId, tagId);
                    });
                });
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxTags.tag
         * @description Removes the tag by clicking on it, then sending the backspace key.
         * @example
         * it('should show a warning when deleting an existing tag with backspace', function () {
         *     encore.rxTags.initialize().byText('Enterprise').sendBackspace();
         *     var warning = 'Warning: Deleting tag "Enterprise" will notify some very angry sysadmins';
         *     expect(encore.rxNotify.all.isPresent(warning, 'warning')).to.eventually.be.true;
         * });
         */
        sendBackspace: {
            value: function () {
                this.click();
                tagElement.sendKeys(protractor.Key.BACK_SPACE);
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxTags.tag
         * @description The text within the tag. Does not include the text in {@link rxTags.tag#category}.
         * @example
         * it('should have "Enterprise" as the exact tag name', function () {
         *     expect(encore.rxTags.initialize().byText('Banana').getText()).to.eventually.equal('Banana');
         * });
         * @returns {Promise<String>}
         */
        getText: {
            value: function () {
                return tagElement.$('.text').getText();
            }
        },

        /**
         * @instance
         * @type {String}
         * @memberof rxTags.tag
         * @description The category text of a tag. This appears in parentheses, after the normal text.
         * @example
         * it('should have the right category', function () {
         *     expect(encore.rxTags.initialize().byText('Banana').category).to.eventually.equal('fruit');
         * });
         */
        category: {
            get: function () {
                return tagElement.$('.category').getText().then(function (text) {
                    // Strip the bounding parens
                    return text.slice(1, -1);
                });
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxTags.tag
         * @description Close the tag by clicking the little "x" button on the right side of the tag.
         * @example
         * it('should show a warning when deleting an existing tag with the close button', function () {
         *     encore.rxTags.initialize().byText('Enterprise').remove();
         *     var warning = 'Warning: Deleting tag "Enterprise" will notify some very angry sysadmins';
         *     expect(encore.rxNotify.all.isPresent(warning, 'warning')).to.eventually.be.true;
         * });
         */
        remove: {
            value: function () {
                tagElement.$('.fa-times').click();
            }
        }

    });
};

/**
 * @namespace
 * @description Functions for interacting with a group of existing tags, creating new ones,
 * or deleting existing ones.
 */
var rxTags = {

    /**
     * @instance
     * @function
     * @description Whether the root element is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @instance
     * @function
     * @description The number of tags that exist in the group of tags.
     * @example
     * it('should have three tags', function () {
     *     expect(encore.rxTags.initialize().count()).to.eventually.equal(3);
     * });
     */
    count: {
        value: function () {
            return this.rootElement.$$('.tag').count();
        }
    },

    txtNewTag: {
        get: function () {
            return this.rootElement.element(by.model('newTag'));
        }
    },

    /**
     * @private
     */
    newTag: {
        set: function (text) {
            this.txtNewTag.clear();
            this.txtNewTag.sendKeys(text, protractor.Key.ENTER);
        }
    },

    /**
     * @instance
     * @function
     * @description Adds a new tag with text `text` to the group of tags.
     * Returns the newly created tag, should you need to interact with it.
     * @param {String} text - The desired text of the tag to be created.
     * @returns {rxTags.tag}
     * @example
     * it('should show an warning notification when adding the "Enterprise" tag', function () {
     *     encore.rxTags.initialize().addTag('Enterprise');
     *     expect(encore.rxNotify.all.isPresent('Warning: "Enterprise"', 'warning')).to.eventually.be.true;
     * });
     */
    addTag: {
        value: function (text) {
            this.newTag = text;
            this.txtNewTag.clear();
            return this.byText(text);
        }
    },

    /**
     * @private
     */
    sendBackspace: {
        value: function () {
            /*
             * Protractor isn't properly trapping the `BACK_SPACE = navigate back`
             * functionality so we have to use SHIFT + BACK_SPACE as a workaround.
             *
             * Initially, changing ng-keydown to ng-keypress in the template seemed
             * to work, but this only corrected the issue with Firefox. Chrome doesn't
             * seem to recognize ng-keypress functionality.
             */
            var chordBackspace = protractor.Key.chord(
                protractor.Key.SHIFT,
                protractor.Key.BACK_SPACE
            );
            this.txtNewTag.sendKeys(chordBackspace);
        }
    },

    /**
     * @function
     * @instance
     * @returns {rxTags.tag}
     * @description Return an {@link rxTags.tag} object that matches the `text` passed in.
     * This function uses a partial text match function to find the tag, so make sure there
     * are no duplicates. If there are, the first matching tag will be returned.
     * @param {String} text - The text of the tag to look for and return as a {@link rxTags.tag} object.
     * @example
     * it('should have the correct category for the "Strawberry" tag', function () {
     *     expect(encore.rxTags.initialize().byText('Strawberry').category).to.eventually.equal('fruit');
     * });
     */
    byText: {
        value: function (text) {
            return tag(this.rootElement.element(by.cssContainingText('.tag', text)));
        }
    }

};

exports.rxTags = {

    /**
     * @function
     * @memberof rxTags
     * @param {ElementFinder} [rxTagsElement=$('rx-tags')] -
     * ElementFinder to be transformed into an rxTagsElement object.
     * @returns {rxTags} Page object representing the rxTags object.
     */
    initialize: function (rxTagsElement) {
        if (rxTagsElement === undefined) {
            rxTagsElement = $('rx-tags');
        }

        rxTags.rootElement = {
            get: function () { return rxTagsElement; }
        };
        return Page.create(rxTags);
    }
};
