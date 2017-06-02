'use strict';
import {ElementFinder} from 'protractor';
import {Promise, rxComponentElement} from './rxComponent';

export class Typeahead extends rxComponentElement {
    get eleMenu(): ElementFinder {
        return this.parent.parent.$('.dropdown-menu');
    }

    /**
     * Whether or not the menu is open.
     */
    isOpen(): Promise<boolean> {
        return this.eleMenu.isDisplayed();
    }
}
