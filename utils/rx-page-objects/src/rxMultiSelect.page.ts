'use strict';

import * as _ from 'lodash';
import {$, by, ElementArrayFinder, ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

export class rxMultiSelectOption extends rxComponentElement {
    /**
     * @description The value bound to the option.
     */
    getValue(): Promise<string> {
        return this.getAttribute('value');
    }

    /**
     * @description use underlying checkbox to determine if selected.
     */
    @OverrideWebdriver
    isSelected(): Promise<boolean> {
        return this.$('input').isSelected();
    }

    /**
     * @description Make sure option is selected.
     */
    select(): Promise<void> {
        return this.isSelected().then(selected => {
            if (!selected) {
                this.click();
            }
        });
    }

    /**
     * @description Make sure option is deselected.
     */
    deselect(): Promise<void> {
        return this.isSelected().then(selected => {
            if (selected) {
                this.click();
            }
        });
    }
}

/**
 * @class
 */
export class rxMultiSelect extends rxComponentElement {
    get lblPreview(): ElementFinder {
        return this.$('.preview');
    }

    /**
     * @description Closes the menu.
     */
    close(): Promise<void> {
        return this.isOpen().then(isOpen => {
            if (isOpen) {
                $('body').click();
            }
        });
    }

    /**
     * @description Opens the menu.
     */
    open(): Promise<void> {
        return this.isOpen().then(isOpen => {
            if (!isOpen) {
                this.lblPreview.click();
            }
        });
    }

    /**
     * @description Whether or not the menu is visible.
     */
    isOpen(): Promise<boolean> {
        return this.$('.menu').isDisplayed();
    }

    /**
     * @description The preview text for the dropdown.
     */
    getPreviewText(): Promise<string> {
        return this.lblPreview.getText();
    }

    /**
     * @description The ElementArrayFinder for each element in the dropdown.
     */
    get options(): ElementArrayFinder {
        return this.$$('rx-select-option');
    }

    /**
     * @instance
     * @description Array of the currently selected options. Will return the options
     * in order that they are defined in the multi select.
     * @example
     * it('should select a few options', function () {
     *     var selected = ['Canada', 'Latvia', 'United States of America'];
     *     var multiSelect = new encore.rxMultiSelect(element(by.model('countriesVisited')));
     *     multiSelect.select(selected);
     *     // multi select lists all countries alphabetically
     *     expect(multiSelect.selectedOptions.getText()).to.eventually.eql(selected);
     * });
     */
    get selectedOptions(): ElementArrayFinder {
        this.open();
        return this.$$('rx-select-option').filter((elem: ElementFinder) => {
            return new rxMultiSelectOption(elem).isSelected();
        });
    }

    /**
     * @description The option matching on the partial text in the option's name.
     * @example
     * var multiSelect = new encore.rxMultiSelect(element(by.model('cars')));
     * var option = multiSelect.option('Ford Bronco');
     * option.select();
     * option.deselect();
     * @see rxCheckbox
     */
    option(optionText: string): ElementFinder {
        return this.element(by.cssContainingText('rx-select-option label', optionText));
    }

    /**
     * @description Given a list of options, select each of them. Will add selections to any pre-existing ones..
     * @example
     * it('should select a few options', function () {
     *     var multiSelect = new encore.rxMultiSelect(element(by.model('approvedBy')));
     *     multiSelect.select(['Jack', 'Jill']);
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jack', 'Jill']);
     *     // will not over ride any pre-existing selections
     *     multiSelect.select(['Joe', 'Jane', 'Jack']); // "Jack" selected twice
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jack', 'Jill', 'Joe', 'Jane']);
     * });
     */
    select(optionTexts: string[]): void {
        this.open();
        optionTexts.forEach(optionText => {
            new rxMultiSelectOption(this.option(optionText)).select();
        });
    }

    /**
     * @description Given a list of options, deselect each of them. Will not
     * @example
     * it('should deselect a few options', function () {
     *     var multiSelect = new encore.rxMultiSelect(element(by.model('approvedBy')));
     *     multiSelect.select(['Jack', 'Jill']);
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jack', 'Jill']);
     *     multiSelect.deselect(['Jack']);
     *     expect(multiSelect.selectedOptions).to.eventually.eql(['Jill']);
     * });
     */
    deselect(optionTexts: string[]): void {
        this.open();
        optionTexts.forEach(optionText => {
            new rxMultiSelectOption(this.option(optionText)).deselect();
        });
    }

    /**
     * @description Whether the '<rx-multi-select>' element is valid.
     */
    isValid(): Promise<boolean> {
        return this.getAttribute('class').then(classes => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }
}
