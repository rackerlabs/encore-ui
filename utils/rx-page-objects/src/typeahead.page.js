var Page = require('astrolabe').Page;

var typeahead = {
    eleMenu: {
        get: function () {
            return this.rootElement.element(by.xpath('../..')).$('.dropdown-menu');
        }
    },

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
       @memberof typeahead
       @function
       @returns {boolean} - Whether or not the menu is visible.
     */
    isOpen: {
        value: function () {
            return this.eleMenu.isDisplayed();
        }
    },

    /**
       Focus the input
       @memberof typeahead
       @function
       @returns {undefined}
     */
    focus: {
        value: function () {
            this.rootElement.click();
        }
    }
};

exports.typeahead = {
    initialize: function (typeaheadElement) {
        typeahead.rootElement = {
            get: function () { return typeaheadElement; }
        };
        return Page.create(typeahead);
    }
};
