'use strict';

/**
 * @class
 */
class rxFieldName {
    /**
     * @param {ElementFinder} rxFieldNameElement
     * ElementFinder to be transformed into an rxFieldName object
     */
    constructor (rxFieldNameElement) {
        this.rootElement = rxFieldNameElement;

        this.eleRequiredSymbol = this.rootElement.$('.required-symbol');
        this.eleContent = this.rootElement.$('.rx-field-name-content');
    }//constructor

    /**
     * @description Whether or not a required field currently displays a red asterisk next to it.
     * @returns {Boolean}
     */
    isSymbolDisplayed () {
        return this.eleRequiredSymbol.isDisplayed();
    }

    /**
     * @description Whether the required symbol is present in the DOM.
     * @returns {Boolean}
     */
    isSymbolPresent () {
        return this.eleRequiredSymbol.isPresent();
    }

    /**
     * @description Whether the field is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed () {
        return this.rootElement.isDisplayed();
    }

    /**
     * @description Whether the field is currently present on the page.
     * @returns {Boolean}
     */
    isPresent () {
        return this.rootElement.isPresent();
    }
}

/**
 * @param {ElementFinder} rxFieldNameElement -
 * ElementFinder to be transformed into an rxFieldNameElement object.
 * @returns {rxFieldName} Page object representing the rxFieldName object.
 */
rxFieldName.initialize = function (rxFieldNameElement) {
    return new rxFieldName(rxFieldNameElement);
};

exports.rxFieldName = rxFieldName;
