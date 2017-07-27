var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxCharacterCount = {

    eleParent: {
        get: function () {
            return this.rootElement.element(by.xpath('../..'));
        }
    },

    lblRemaining: {
        get: function () {
            return this.eleParent.element(by.binding('remaining'));
        }
    },

    txtComment: {
        get: function () {
            return this.rootElement;
        },
    },

    /**
     * @function
     * @instance
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
     * @description Get and set the comment's textual content. Will erase the current text when setting new text.
     * @type {String}
     * @example
     * it('should erase all text and replace it with new text on update', function () {
     *     myPage.comment = 'Bar';
     *     expect(myPage.comment).to.eventually.equal('Bar');
     * });
     */
    comment: {
        get: function () {
            return this.txtComment.getAttribute('value');
        },

        set: function (text) {
            this.txtComment.clear();
            this.txtComment.sendKeys(text);
        }
    },

    /**
     * @instance
     * @type {Number}
     * @description The remaining number of characters that can be entered.
     * @returns {Number}
     */
    remaining: {
        get: function () {
            return this.lblRemaining.getText().then(parseInt);
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the 'near-limit' class is displayed.
     * @returns {Boolean}
     */
    isNearLimit: {
        value: function () {
            return this.lblRemaining.getAttribute('class').then(function (classNames) {
                return classNames.indexOf('near-limit') > -1;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the 'over-limit' class is displayed.
     * @returns {Boolean}
     */
    isOverLimit: {
        value: function () {
            return this.lblRemaining.getAttribute('class').then(function (classNames) {
                return classNames.indexOf('over-limit') > -1;
            });
        }
    },

    /**
     * @instance
     * @type {String}
     * @description The characters that are over the limit.
     * @returns {String}
     * @example
     * // in this example, the limit of characters is 3
     * myPage.comment = 'Anda Apine';
     * expect(myPage.overLimitText).to.eventually.equal('a Apine');
     */
    overLimitText: {
        get: function () {
            return this.eleParent.$('.over-limit-text').getText();
        }
    }

};

exports.rxCharacterCount = {

    /**
     * @function
     * @memberof rxCharacterCount
     * @description Creates a page object from an `[rx-bulk-select]` DOM element.
     * @param {ElementFinder} rxCharacterCountElement -
     * ElementFinder to be transformed into an {@link rxCharacterCount} object.
     * @returns {rxCharacterCount}
     */
    initialize: function (rxCharacterCountElement) {
        rxCharacterCount.rootElement = {
            get: function () { return rxCharacterCountElement; }
        };
        return Page.create(rxCharacterCount);
    }
};
