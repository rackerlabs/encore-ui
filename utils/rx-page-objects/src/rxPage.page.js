var Page = require('astrolabe').Page;

/**
 * @namespace
 * @deprecated rxPage will be removed in a future release of rxPageObjects.
 */
var rxPage = {
    lblTitle: {
        get: function () { return this.rootElement.$('.page-title > span'); }
    },

    lblSubtitle: {
        get: function () { return this.rootElement.$('.page-subtitle'); }
    },

    lblTitleTag: {
        get: function () { return this.rootElement.$('.page-titles .status-tag'); }
    },

    /**
     * @instance
     * @type {String|null}
     * @description The title, as used by rxPage. If it's not present, then `null`.
     */
    title: {
        get: function () {
            var page = this;
            return this.lblTitle.isPresent().then(function (present) {
                return present ? page.lblTitle.getText() : null;
            });
        }
    },

    /**
     * @instance
     * @type {String|null}
     * @description The subtitle, as used by rxPage. If it's not present, then `null`.
     */
    subtitle: {
        get: function () {
            var page = this;
            return this.lblSubtitle.isPresent().then(function (present) {
                return present ? page.lblSubtitle.getText() : null;
            });
        }
    },

    /**
     * @instance
     * @type {String}
     * @description The status label's text. This is located next to the main title.
     * Oftentimes, it says "ALPHA", or "BETA".
     */
    titleTag: {
        get: function () {
            var page = this;
            return this.lblTitleTag.isPresent().then(function (present) {
                return present ? page.lblTitleTag.getText() : null;
            });
        }
    }
};

exports.rxPage = {
    /**
     * @function
     * @memberof rxPage
     * @description Creates a page object from an `rx-page` DOM element.
     * @deprecated rxPage will be removed in a future release of rxPageObjects.
     * @param {ElementFinder} [rxFeedbackElement=$('rx-page')] -
     * ElementFinder to be transformed into an {@link rxPage} object.
     * @returns {rxPage}
     */
    initialize: function (rxPageElement) {
        console.warn(
            'DEPRECATED: rxPage will be removed in a future release of rxPageObjects.'
        );
        if (rxPageElement === undefined) {
            rxPageElement = $('rx-page');
        }

        rxPage.rootElement = {
            get: function () { return rxPageElement; }
        };
        return Page.create(rxPage);
    }
};
