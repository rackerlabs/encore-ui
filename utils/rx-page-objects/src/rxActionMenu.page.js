var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxModalAction = require('./rxModalAction.page').rxModalAction;

/**
 * @description Clicking an action menu item will trigger this function.
 * By default, it returns the page object outlined below.
 * @namespace rxActionMenu.action
 */
var action = function (actionElement) {

    return Page.create({

        /**
         * @instance
         * @memberof rxActionMenu.action
         * @type {ElementFinder}
         * @description The root element of the action menu item.
         */
        rootElement: {
            get: function () {
                return actionElement;
            }
        },

        /**
         * @function
         * @instance
         * @memberof rxActionMenu.action
         * @description Returns a modal object to manipulate later, with given `customFunctionality`.
         * See {@link rxModalAction.initialize} for more information about what `customFunctionality` means here.
         * Using a modal object is the default action since many instances of the action menu serve to launch
         * modals. If you're not using rxActionMenu to launch modals, over-ride this entire section
         * when calling <a href="#encore.module_rxActionMenu.initialize">rxActionMenu.initialize</a>,
         * where you can pass in a custom `actionConstructorFn`.
         * @param {Object} customFunctionality - Custom functionality of the modal, should you use one.
         * @returns {rxModalAction} A modal that gets opened by clicking the action menu item.
         */
        openModal: {
            value: function (customFunctionality) {
                actionElement.$('.modal-link').click();
                return rxModalAction.initialize(customFunctionality);
            }
        },

        /**
         * @instance
         * @function
         * @description The trimmed text of the action menu item.
         * @memberof rxActionMenu.action
         * @returns {Promise<String>}
         */
        getText: {
            value: function () {
                return actionElement.getText();
            }
        }

    });
};

/**
 * @description Functions for querying actions in an action menu, and launching those actions.
 * @namespace
 */
var rxActionMenu = {

    icoCog: {
        get: function () {
            return this.rootElement.$('.fa-cog');
        }
    },

    /**
     * @description This selector will grab any top-level child elements under `.actions-area`, one level deep.
     * Since action menus allow for free-form html entry, there is no guarantee that any
     * particular structure will appear inside the action menu. However, we can be sure
     * that they'll use the `.actions-area` class to style it, and inside of it will be some
     * sort of element list. This exposes a hook into the html for matching text or counting nodes.
     * @private
     */
    cssFirstAny: {
        get: function () {
            return '.actions-area > *';
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the action menu is present on the DOM.
     * @return {Promise<Boolean>}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the action cog is showing its underlying menu.
     * @returns {Promise<Boolean>}
     */
    isExpanded: {
        value: function () {
            return this.rootElement.$('.action-list').getAttribute('class').then(function (className) {
                return className.indexOf('ng-hide') === -1;
            });
        }
    },

    /**
     * @description Clicks the action cog to expand the action menu, unless it's already open.
     * @function
     * @instance
     */
    expand: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (!expanded) {
                    page.icoCog.click();
                }
            });
        }
    },

    /**
     * @description Clicks the action cog to collapse the action menu, unless it's already closed.
     * @function
     * @instance
     */
    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.icoCog.click();
                }
            });
        }
    },

    /**
     * @description Whether or not the action menu has an item matching the text `actionName`.
     * Will expand the action menu to determine if the action is available.
     * @function
     * @instance
     * @param {String} actionName - The name of the action menu item to check for existence.
     * @returns {Promise<Boolean>}
     */
    hasAction: {
        value: function (actionName) {
            this.expand();
            var actionElement = this.rootElement.element(by.cssContainingText(this.cssFirstAny, actionName));
            return actionElement.isPresent().then(function (present) {
                return present ? actionElement.isDisplayed() : present;
            });
        }
    },

    /**
     * @instance
     * @function
     * @description Defaults to returning an {@link rxActionMenu.action} object if none was specified at
     * initialization. See {@link rxActionMenu.initialize} for more details about passing in a custom action item
     * function.
     * @param {String} actionName - Name of the action item to return an {@link rxActionMenu.action.action} object for.
     * @returns {ElementFinder}
     */
    action: {
        value: function (actionName) {
            this.expand();
            var actionElement = this.rootElement.element(by.cssContainingText(this.cssFirstAny, actionName));
            return this.actionConstructorFn(actionElement);
        }
    },

    /**
     * @description The number of action items present in the action menu.
     * Does not expand the action menu to determine the count of menu items.
     * @function
     * @instance
     * @returns {Promise<Number>}
     */
    actionCount: {
        value: function () {
            return this.rootElement.$$(this.cssFirstAny).count();
        }
    }

};

exports.rxActionMenu = {

    /**
     * @function
     * @memberOf rxActionMenu
     * @description Passing in an `actionConstructorFn` will default to calling that for any
     * calls made to `rxActionMenu.action('Action Name')`. If it's not defined, it defaults to a function
     * that creates a page object represented by {@link rxActionMenu.action}.
     * Most times you'll want to use the default option.
     * @param {ElementFinder} rxActionMenuElement - ElementFinder to be transformed into an {@link rxActionMenu} object
     * @param {Function} [actionConstructorFn={@link rxActionMenu.action}] -
     * Function to invoke on calling {@link rxActionMenu#action}.
     * @returns {rxActionMenu} Page object representing the rxActionMenu object.
     */
    initialize: function (rxActionMenuElement, actionConstructorFn) {
        rxActionMenu.rootElement = {
            get: function () {
                return rxActionMenuElement;
            }
        };

        rxActionMenu.actionConstructorFn = {
            get: function () {
                if (_.isFunction(actionConstructorFn)) {
                    return actionConstructorFn;
                }
                return action;
            }
        };

        return Page.create(rxActionMenu);
    }

};
