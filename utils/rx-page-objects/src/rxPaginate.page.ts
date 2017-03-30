'use strict';

import * as _ from 'lodash';
import {by, ElementArrayFinder, ElementFinder} from 'protractor';
import {Promise, rxComponentElement} from './rxComponent';
import {rxMisc} from './rxMisc.page';

/**
 * @class
 */
export class rxPaginate extends rxComponentElement {

    get lnkCurrentPage(): ElementFinder {
        return this.$('.pagination .active a');
    }

    get lnkFirst(): ElementFinder {
        return this.$('.pagination-first a');
    }

    get lnkNext(): ElementFinder {
        return this.$('.pagination-next a');
    }

    get lnkPrev(): ElementFinder {
        return this.$('.pagination-prev a');
    }

    get lnkLast(): ElementFinder {
        return this.$('.pagination-last a');
    }

    get pages(): ElementArrayFinder {
        return this.$$('.pagination .pagination-page a');
    }

    get pageSize(): ElementFinder {
        return this.$('.pagination-per-page button[disabled="disabled"]');
    }

    get pageSizes(): ElementArrayFinder {
        return this.all(by.repeater('i in pageTracking.itemSizeList'));
    }

    /**
     * @description The ElementFinder for the "Showing x-y of z items" text.
     * @example
     * it('should always show that there are 50 states', () => {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.shownItems.getText()).to.eventually.eql('Showing 1-20 of 50 items');
     *     pagination.changePageSize(50);
     *     expect(pagination.shownItems.getText()).to.eventually.eql('Showing 50 items');
     * });
     */
    get shownItems(): ElementFinder {
        return this.element(by.binding('pageTracking'));
    }

    getPage(): Promise<number> {
        return this.lnkCurrentPage.getText().then(numString => parseInt(numString, 10));
    }

    /**
     * @description The tables that rxPaginate operates on tend to be squirly, and elements change position
     * frequently, especially when the number of items in the table changes due to page size.  This protected
     * utility function will help ensure elements are clickable before clicking them.
     */
    protected scrollAndClickIfDisplayed(elem: ElementFinder): Promise<void> {
        return elem.isDisplayed().then(displayed => {
            if (displayed) {
                rxMisc.scrollToElement(elem, {positionOnScreen: 'middle'});
                return elem.click();
            }
        });
    }

    /**
     * @description Jump to a specific page, navigating backwards or forwards if necessary.
     * @example
     * it('should navigate to the tenth page', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     pagination.jumpToPage(10);
     *     expect(pagination.getPage()).to.eventually.eql(10);
     * });
     */
    jumpToPage(page: number): Promise<void> {
        return this.getPages().then(pages => {
            let index = pages.indexOf(page);
            // If not found, we need to either click the min or max available page.
            if (index === -1) {
                // If the page is less than min visible pages, we need to click the first link,
                // otherwise we should click the last.
                index = _.min(pages) > page ? 0 : pages.length - 1;
                this.scrollAndClickIfDisplayed(this.pages.get(index));
                // Then call this function recursively.
                return this.jumpToPage(page);
            }
            this.scrollAndClickIfDisplayed(this.pages.get(index));
        });
    }

    /**
     * @description Visit the first page in the paginated table by clicking the "First" link,
     * unless the user is already on the first page. In that case, do nothing.
     * @example
     * it('should put the newly created resource at the top of the list', () => {
     *     new rxPaginate($('rx-pagination')).first();
     *     expect(myPage.someTable.row(0).name).to.eventually.contain('Created by Automated Test');
     * });
     */
    first(): Promise<void> {
        return this.scrollAndClickIfDisplayed(this.lnkFirst);
    }

    /**
     * @description Go back one page from the current position in the table.
     * @example
     * it('should go back a page', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     expect(pagination.getPage()).to.eventually.equal(3);
     *     pagination.previous();
     *     expect(pagination.getPage()).to.eventually.equal(2);
     * });
     */
    previous(): Promise<void> {
        return this.scrollAndClickIfDisplayed(this.lnkPrev);
    }

    /**
     * @description Go forward one page from the current position in the table.
     * @example
     * it('should go forward a page', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     expect(pagination.getPage()).to.eventually.equal(1);
     *     pagination.next();
     *     expect(pagination.getPage()).to.eventually.equal(2);
     * });
     */
    next(): Promise<void> {
        return this.scrollAndClickIfDisplayed(this.lnkNext);
    }

    /**
     * @description Visit the last page in the paginated table by clicking the "Last" link,
     * unless the user is already on the last page. In that case, do nothing.
     * @example
     * it('should put the newly created resource at the bottom of the list', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     pagination.last();
     *     expect(myPage.someTable.row(-1).name).to.eventually.contain('Created by Automated Test');
     * });
     */
    last(): Promise<void> {
        return this.scrollAndClickIfDisplayed(this.lnkLast);
    }

    /**
     * @description A list of all available page numbers that can be
     * paginated to directly. Click the last page number in this list
     * to cycle through to the next group of pages, and continue forward
     * to the desired page number. Internal function that supports {@link rxPaginate#jumpToPage}.-*;p
     * @example
     * it('should support jumping to page five directly, without cycling', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     expect(encore.rxPaginate.initialize().getPages()).to.eventually.equal([1, 2, 3, 4, 5]);
     * });
     */
    getPages(): Promise<number[]> {
        return this.pages.getText().then(pageNumbers => {
            return _.map(pageNumbers, pageNumber => parseInt(pageNumber, 10));
        });
    }

    /**
     * @description A list of available page sizes that can be queried and adjusted
     * by using {@link rxPaginate#pageSize}.
     * @example
     * it('should show all 50 states without paginating', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     expect(pagination.getPageSizes()).to.eventually.equal([20, 50, 100, 200]);
     * });
     */
    getPageSizes(): Promise<number[]> {
        return this.pageSizes.getText().then(pageSizes => {
            return _.map(pageSizes, pageSize => parseInt(pageSize, 10));
        });
    }

    /**
     * @description The current number of visible items on a single page in the table.
     * @example
     * it('should change the page size to make it easier to find things', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     expect(pagination.getPageSize()).to.eventually.equal(20);
     * });
     * @see {@link rxPaginate#changePageSize}
     */
    getPageSize(): Promise<number> {
        return this.pageSize.getText().then(parseInt);
    }

    /**
     * @description Change the number of visible items on a single page in the table.
     * @example
     * it('should change the page size to make it easier to find things', () => {
     *     let pagination = new rxPaginate($('rx-pagination'));
     *     expect(pagination.getPageSize()).to.eventually.equal(20);
     *     expect(statesTable.count()).to.eventually.equal(20);
     *     pagination.changePageSize(200);
     *     expect(pagination.getPageSize()).to.eventually.equal(200);
     *     expect(statesTable.count()).to.eventually.equal(118);
     *     // you can now search the table for all values without paginating
     * });
     * @see {@link rxPaginate#getPageSize}
     */
    changePageSize(pageSize: number): Promise<void> {
        let lnkPage = this.pageSizes.filter(elem => {
            return elem.getText().then(text => (parseInt(text, 10) === pageSize));
        }).first();
        return this.scrollAndClickIfDisplayed(lnkPage);
    }
}
