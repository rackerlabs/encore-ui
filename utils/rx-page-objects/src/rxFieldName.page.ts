'use strict';
import {ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

export class rxFieldName extends rxComponentElement {
    get symbol(): ElementFinder {
        return this.$('.required-symbol');
    }

    @OverrideWebdriver
    getText(): Promise<string> {
        return this.$('.rx-field-name-content').getText();
    }
}
