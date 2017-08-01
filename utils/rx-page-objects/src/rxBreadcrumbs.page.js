var Page = require('astrolabe').Page;

/**
 * @description Properties around a single breadcrumb.
 * @see rxBreadcrumbs
 * @namespace rxBreadcrumbs.breadcrumb
 */
var breadcrumb = function (rootElement) {
    return Page.create({

        /**
         * @instance
         * @memberOf rxBreadcrumbs.breadcrumb
         * @type {String}
         * @description The inner text of the breadcrumb.
         */
        name: {
            get: function () {
                return rootElement.element(by.exactBinding('breadcrumb.name')).getText();
            }
        },

        lblTag: {
            get: function () { return rootElement.$('.status-tag'); }
        },

        /**
         * @instance
         * @memberOf rxBreadcrumbs.breadcrumb
         * @type {String|null}
         * @description The label tag's inner text, if present. Otherwise, `null`.
         */
        tag: {
            get: function () {
                var page = this;
                return page.lblTag.isPresent().then(function (present) {
                    if (present) {
                        return page.lblTag.getText();
                    } else {
                        return null;
                    }
                });
            }
        },

        /**
         * @instance
         * @memberOf rxBreadcrumbs.breadcrumb
         * @type {String|null}
         * @description The href present in the breadcrumb, if present. Otherwise, `null`.
         */
        href: {
            get: function () {
                return this.isLink().then(function (isLink) {
                    if (isLink) {
                        return rootElement.$('a').getAttribute('href');
                    } else {
                        return null;
                    }
                });
            }
        },

        /**
         * @instance
         * @function
         * @memberOf rxBreadcrumbs.breadcrumb
         * @description Click the breadcrumb to visit it.
         */
        click: {
            value: function () {
                return rootElement.$('a').click();
            }
        },

        /**
         * @instance
         * @function
         * @memberOf rxBreadcrumbs.breadcrumb
         * @description Whether or not the breadcrumb is the first in a group of breadcrumbs.
         * @returns {Boolean}
         */
        isFirst: {
            value: function () {
                return rootElement.element(by.className('first')).isPresent();
            }
        },

        /**
         * @instance
         * @function
         * @memberOf rxBreadcrumbs.breadcrumb
         * @description Whether or not the breadcrumb is last in a group of breadcrumbs.
         * @returns {Boolean}
         */
        isLast: {
            value: function () {
                return rootElement.element(by.className('last')).isPresent();
            }
        },

        /**
         * @instance
         * @function
         * @memberOf rxBreadcrumbs.breadcrumb
         * @description Whether or not a breadcrumb has an anchor tag in it somewhere.
         * @returns {Boolean}
         */
        isLink: {
            value: function () {
                return rootElement.$('a').isPresent();
            }
        }

    });
};

/**
 * @description Properties around a collection of breadcrumbs.
 * @namespace
 */
var rxBreadcrumbs = {

    tblBreadcrumbs: {
        get: function () {
            return this.rootElement.all(by.repeater('breadcrumb in breadcrumbs.getAll(status)'));
        }
    },

    /**
     * @function
     * @instance
     * @description Select a single breadcrumb by name, case sensitive.
     * If multiple entries exist with the same name, the first will be returned.
     * @param {String} breadcrumbName - The name of the breadcrumb to return.
     * @returns {rxBreadcrumbs.breadcrumb}
     */
    byName: {
        value: function (breadcrumbName) {
            var eleBreadcrumb = this.tblBreadcrumbs.filter(function (breadcrumbElement) {
                return breadcrumbElement.element(by.exactBinding('breadcrumb.name')).getText().then(function (name) {
                    return name === breadcrumbName;
                });
            }).get(0);
            return breadcrumb(eleBreadcrumb);
        }
    },

    /**
     * @function
     * @instance
     * @description Select a single breadcrumb by position (index).
     * @param {String} breadcrumbName - The position of the breadcrumb to return.
     * @returns {rxBreadcrumbs.breadcrumb}
     */
    byPosition: {
        value: function (position) {
            return breadcrumb(this.tblBreadcrumbs.get(position));
        }
    },

    /**
     * @function
     * @instance
     * @description The total number of breadcrumbs present in total.
     * @returns {Number}
     */
    count: {
        value: function () {
            return this.tblBreadcrumbs.count();
        }
    },

    /**
     * @instance
     * @type {String[]}
     * @description A list of all breadcrumbs by name.
     * @returns {rxBreadcrumbs.breadcrumb}
     * @example
     * expect(encore.rxBreadcrumbs.initialize().names).to.eventually.eql(['Home', 'More']);
     */
    names: {
        get: function () {
            return this.tblBreadcrumbs.map(function (breadcrumbElement) {
                return breadcrumbElement.element(by.exactBinding('breadcrumb.name')).getText();
            });
        }
    }

};

exports.rxBreadcrumbs = {
    /**
     * @function
     * @memberof rxBreadcrumbs
     * @description Creates a page object from an `rx-breadcrumbs` DOM element.
     * @param {ElementFinder} [rxBreadcrumbsElement=$('rx-breadcrumbs')] -
     * ElementFinder to be transformed into an {@link rxBreadcrumbs} object.
     * @returns {rxBreadcrumbs}
     */
    initialize: function (rootElement) {
        if (rootElement === undefined) {
            rootElement = $('rx-breadcrumbs');
        }

        rxBreadcrumbs.rootElement = {
            get: function () { return rootElement; }
        };
        return Page.create(rxBreadcrumbs);
    }
};
