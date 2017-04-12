'use strict';
import {ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

export class rxSearchBox extends rxComponentElement {

    get txtSearch(): ElementFinder {
        return this.$('.rxSearchBox-input');
    }

    get btnClear(): ElementFinder {
        return this.$('.rxSearchBox-clear');
    }

    /**
     * Get the search term.
     *
     * @example
     *
     *     it('should update the search term', function () {
     *         var searchBox = new rxSearchBox($('searchBox'));
     *         searchBox.search('Some query');
     *         expect(searchBox.getTerm()).to.eventually.equal('Some query');
     *     });
     */
    getTerm(): Promise<string> {
        return this.txtSearch.getAttribute('value');
    }

    /**
     * Search for the given term.
     *
     * @example
     *
     *     it('should update the search term', function () {
     *         var searchBox = new rxSearchBox($('searchBox'));
     *         searchBox.search('Some query');
     *         expect(searchBox.getTerm()).to.eventually.equal('Some query');
     *     });
     */
    search(searchTerm: string): Promise<void> {
        this.txtSearch.clear();
        return this.txtSearch.sendKeys(searchTerm);
    }

    /**
     * The placeholder value that exists in the search box before
     * a user has typed in some text into it.
     *
     * @example
     *
     *     it('should instruct users to search for users via the placeholder', function () {
     *         var searchBox = new rxSearchBox($('searchBox'));
     *         expect(searchBox.getPlaceholder()).to.eventually.equal('Search for a user...');
     *     });
     */
    getPlaceholder(): Promise<string> {
        return this.txtSearch.getAttribute('placeholder');
    }

    /**
     * Whether or not the search box is clearable. To be clearable is determined
     * by the existence of the clear button next to the search box.
     */
    isClearable(): Promise<boolean> {
        return this.btnClear.isPresent();
    }

    /**
     * Whether or not the search box is enabled.
     */
    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.txtSearch.isEnabled();
    }

    /**
     * Clear the value of the search box using the clear button.
     * If no clear button is present with the search box, then nothing will happen.
     *
     * @example
     *
     *     it('should only clear the textbox if it is explicitly clearable', function () {
     *         var searchBox = new rxSearchBox($('searchBox'));
     *         expect(searchBox.isClearable()).to.eventually.be.false;
     *         searchBox.search('Some query');
     *         searchBox.clear();
     *         // there is no clear button, so nothing happens
     *         expect(searchBox.getTerm()).to.eventually.equal('Some query');
     *         // this will always work, however
     *         searchBox.search('');
     *         expect(searchBox.getTerm()).to.eventually.equal('');
     *     });
     */
    @OverrideWebdriver
    clear(): Promise<void> {
        return this.isClearable().then(clearable => clearable && this.btnClear.click());
    }

}
