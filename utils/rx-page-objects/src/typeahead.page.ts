'use strict';
import {by} from 'protractor';
import {rxComponentElement} from './rxComponent';

export class Typeahead extends rxComponentElement {
    get eleMenu() {
        return this.element(by.xpath('../..')).$('.dropdown-menu');
    }

    /**
     * Whether or not the menu is open.
     */
    isOpen() {
        return this.eleMenu.isDisplayed();
    }
}
