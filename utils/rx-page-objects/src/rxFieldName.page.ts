'use strict';
import {rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxFieldName extends rxComponentElement {
    get eleRequiredSymbol() {
        return this.$('.required-symbol');
    }

    get eleContent() {
        return this.$('.rx-field-name-content');
    }

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
}
