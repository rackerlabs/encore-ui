var Page = require('astrolabe').Page;

/**
 * @namespace
 * @deprecated rxApp will be removed in a future release of rxPageObjects.
 */
var rxApp = {
    cssCollapseButtonSelector: {
        /**
          Keep just the css string available for both the button element
          and the check made in `isCollapsible()`, which uses findAllBy.
        */
        get: function () { return '.collapsible-toggle'; }
    },

    btnCollapseToggle: {
        get: function () { return this.rootElement.$(this.cssCollapseButtonSelector); }
    },

    /**
     * @instance
     * @type {String}
     * @description The rightmost text in the uppermost location. Typically, this is "Encore".
     */
    title: {
        get: function () { return this.rootElement.$('.site-title').getText(); }
    },

    sectionTitle: {
        get: function () { return this.rootElement.$('.nav-section-title').getText(); }
    },

    /**
     * @instance
     * @function
     * @description Expand the navigation menu, if it is collapsible.
     */
    expand: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (!expanded) {
                    page.btnCollapseToggle.click();
                }
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Collapse the navigation menu, if it is collapsible.
     */
    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.btnCollapseToggle.click();
                }
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the navigation section is expanded. If the navigation section is
     * not expandable, it will throw an {@link rxApp#NotCollapsibleException}.
     * @returns {Promise<Boolean>}
     */
    isExpanded: {
        value: function () {
            var page = this;
            return this.isCollapsible().then(function (isCollapsible) {
                if (!isCollapsible) {
                    return page.title.then(function (siteTitle) {
                        page.NotCollapsibleException.thro(siteTitle);
                    });
                }

                return page.rootElement.$('.rx-app').getAttribute('class').then(function (classNames) {
                    return !(classNames.indexOf('collapsed') >= 0);
                });
            });
        }
    },

    /**
     * @instance
     * @function
     * @returns {Boolean}
     * @description Whether or not the navigation component is collapsible.
     */
    isCollapsible: {
        value: function () {
            return this.btnCollapseToggle.isPresent();
        }
    },

    logout: {
        value: function () {
            this.rootElement.$('.site-logout').click();
        }
    },

    /**
     * @instance
     * @type {Exception}
     * @description Thrown by functions that may attempt to expand or collapse a navigation
     * menu that it not designed to support such interactions.
     */
    NotCollapsibleException: {
        get: function () {
            return this.exception('Navigation menu not collapsible');
        }
    }
};

exports.rxApp = {
    /**
     * @function
     * @memberof rxApp
     * @description Creates a page object from an `rx-app` DOM element.
     * @deprecated rxApp will be removed in a future release of rxPageObjects.
     * @param {ElementFinder} [rxFeedbackElement=$('rx-app')] -
     * ElementFinder to be transformed into an {@link rxApp} object.
     * @returns {rxApp}
     */
    initialize: function (rxAppElement) {
        console.warn(
            'DEPRECATED: rxApp will be removed in a future release of rxPageObjects.'
        );
        if (rxAppElement === undefined) {
            rxAppElement = $('rx-app');
        }

        rxApp.rootElement = {
            get: function () { return rxAppElement; }
        };
        return Page.create(rxApp);
    }
};
