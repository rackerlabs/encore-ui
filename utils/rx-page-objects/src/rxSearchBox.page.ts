'use strict';
import {OverrideWebdriver, rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxSearchBox extends rxComponentElement {

    get txtSearch() {
        return this.$('.rxSearchBox-input');
    }

    get btnClear() {
        return this.$('.rxSearchBox-clear');
    }

    /**
     * @description Getthe search value.
     * @example
     * it('should update the search term', function () {
     *     var searchBox = new rxSearchBox($('searchBox'));
     *     searchBox.search('Some query');
     *     expect(searchBox.getTerm()).to.eventually.equal('Some query');
     * });
     */
    getTerm () {
        return this.txtSearch.getAttribute('value');
    }

    /**
     * @description search for the given value.
     * @example
     * it('should update the search term', function () {
     *     var searchBox = new rxSearchBox($('searchBox'));
     *     searchBox.search('Some query');
     *     expect(searchBox.getTerm()).to.eventually.equal('Some query');
     * });
     */
    search(searchTerm: string) {
        this.txtSearch.clear();
        return this.txtSearch.sendKeys(searchTerm);
    }

    /**
     * @description The placeholder value that exists in the search box before
     * a user has typed in some text into it.
     * @example
     * it('should instruct users to search for users via the placeholder', function () {
     *     var searchBox = new rxSearchBox($('searchBox'));
     *     expect(searchBox.getPlaceholder()).to.eventually.equal('Search for a user...');
     * });
     */
    getPlaceholder() {
        return this.txtSearch.getAttribute('placeholder');
    }

    /**
     * @description Whether or not the search box is clearable. To be clearable is determined
     * by the existence of the clear button next to the search box.
     */
    isClearable() {
        return this.btnClear.isPresent();
    }

    /**
     * @description Whether or not the search box is enabled.
     */
    @OverrideWebdriver
    isEnabled() {
        return this.txtSearch.isEnabled();
    }

    /**
     * @description Clear the value of the search box using the clear button.
     * If no clear button is present with the search box, then nothing will happen.
     * @example
     * it('should only clear the textbox if it is explicitly clearable', function () {
     *     var searchBox = new rxSearchBox($('searchBox'));
     *     expect(searchBox.isClearable()).to.eventually.be.false;
     *     searchBox.search('Some query');
     *     searchBox.clear();
     *     // there is no clear button, so nothing happens
     *     expect(searchBox.getTerm()).to.eventually.equal('Some query');
     *     // this will always work, however
     *     searchBox.search('');
     *     expect(searchBox.getTerm()).to.eventually.equal('');
     * });
     */
    @OverrideWebdriver
    clear() {
        return this.isClearable().then(clearable => clearable && this.btnClear.click());
    }

}
