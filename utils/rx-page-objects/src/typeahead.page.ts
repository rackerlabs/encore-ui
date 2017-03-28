'use strict';
import {rxComponentElement} from './rxComponent';

export class Typeahead extends rxComponentElement {
    get eleMenu() {
        return this.parent.parent.$('.dropdown-menu');
    }

    /**
     * Whether or not the menu is open.
     */
    isOpen() {
        return this.eleMenu.isDisplayed();
    }
}
