'use strict';
import {OverrideWebdriver, rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxFieldName extends rxComponentElement {
    get symbol() {
        return this.$('.required-symbol');
    }

    @OverrideWebdriver
    getText() {
        return this.$('.rx-field-name-content').getText();
    }
}
