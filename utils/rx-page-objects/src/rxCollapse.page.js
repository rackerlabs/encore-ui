var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxCollapse = {

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
     * @description Whether or not the component is currently expanded.
     * @returns {Promise<Boolean>}
     */
    isExpanded: {
        value: function () {
            return this.rootElement.$('.expanded').isPresent();
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the component has a custom title.
     * @returns {Boolean}
     */
    hasCustomTitle: {
        value: function () {
            return this.rootElement.$('.collapse-title-wrap').getAttribute('class').then(function (classes) {
                return _.includes(classes.split(' '), 'collapse-title-wrap-custom');
            });
        }
    },

    /**
     * @instance
     * @description Will return the custom title's text if the component uses one. Otherwise, it'll return
     * the default title, found in the `.sml-title` (see-more-less-title) class.
     * @type {String}
     */
    title: {
        get: function () {
            var page = this;
            return this.hasCustomTitle().then(function (hasCustomTitle) {
                if (hasCustomTitle) {
                    return page.rootElement.$('.rx-collapse-title').getText();
                } else {
                    return page.rootElement.$('.sml-title').getText();
                }
            });
        }
    },

    /**
     * @instance
     * @description Will expand the component if collapsed, or will collapse it if it's expanded.
     * @function
     */
    toggle: {
        value: function () {
            var page = this;
            return this.hasCustomTitle().then(function (hasCustomTitle) {
                if (hasCustomTitle) {
                    return page.rootElement.$('.double-chevron').click();
                } else {
                    return page.rootElement.$('.sml-title').click();
                }
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Will toggle the component only if it's currently collapsed.
     */
    expand: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (!expanded) {
                    page.toggle();
                }
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Will toggle the component only if it's currently expanded.
     */
    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.toggle();
                }
            });
        }
    }

};

exports.rxCollapse = {

    /**
     * @function
     * @memberof rxCollapse
     * @description Creates a page object from an `[rx-collapse]` DOM element.
     * @param {ElementFinder} rxCollapseElement -
     * ElementFinder to be transformed into an {@link rxCollapse} object.
     * @returns {rxCollapse}
     */
    initialize: function (rxCollapseElement) {
        rxCollapse.rootElement = {
            get: function () { return rxCollapseElement; }
        };
        return Page.create(rxCollapse);
    }
};
