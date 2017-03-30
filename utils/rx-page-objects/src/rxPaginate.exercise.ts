'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import {rxMisc} from './rxMisc.page';
import * as component from './rxPaginate.page';

export interface IRxPaginateExerciseOptions {
    instance: component.rxPaginate;
    present?: boolean;
    displayed?: boolean;
    pages?: number;
    pageSizes?: number[];
    totalItems?: number;
    valid?: boolean;
    defaultPageSize?: number;
}
/**
 * rxPaginate exercises.
 * @example
 * describe('default exercises', encore.exercise.rxPaginate({
 *     instance: myPage.pagination, // select one of many pagination instances from your page objects
 *     pages: 20 // will exercise full functionality at 6, limited functionality at 2
 *     totalItems: 300 // some tests require the total number of items to be specified in advance.
 * }));
 */
export function rxPaginateExercise (options: IRxPaginateExerciseOptions) {
    options = _.defaults(options, {
        present: true,
        displayed: true,
        pages: 6,
        pageSizes: [50, 200, 350, 500],
        defaultPageSize: 50,
        totalItems: 251,
    });

    return () => {
        let pagination: component.rxPaginate;

        if (!options.present) {
            return;
        }

        before(() => {
            pagination = options.instance;
        });

        it(`should ${options.displayed ? 'be' : 'not be'} displayed`, () => {
            expect(pagination.isDisplayed()).to.eventually.equal(options.displayed);
        });

        if (!options.displayed) {
            return;
        }

        it('should not have `next` link on the last page', () => {
            pagination.last();
            expect(pagination.lnkNext.isDisplayed()).to.eventually.be.false;
        });

        it('should allow attempting to navigate to the next page when already on the last page', () => {
            pagination.last();
            pagination.getPage().then(page => {
                pagination.next();
                expect(pagination.getPage()).to.eventually.equal(page);
            });
        });
        it('should allow attempting to navigate to the last page when already on the last page', () => {
            pagination.last();
            pagination.getPage().then(page => {
                pagination.last();
                expect(pagination.getPage()).to.eventually.equal(page);
            });
        });

        it('should navigate to the first page', () => {
            pagination.first();
            expect(pagination.getPage()).to.eventually.equal(1);
        });

        it('should not have `prev` link on the first page', () => {
            pagination.first();
            expect(pagination.lnkPrev.isDisplayed()).to.eventually.be.false;
        });

        it('should allow attempting to navigate to the previous page when already on the first page', () => {
            pagination.first();
            pagination.previous();
            expect(pagination.getPage()).to.eventually.equal(1);
        });

        it('should allow attempting to navigate to the first page when already on the first page', () => {
            pagination.first();
            expect(pagination.getPage()).to.eventually.equal(1);
        });

        it('should have all available page sizes', () => {
            expect(pagination.getPageSizes()).to.eventually.eql(options.pageSizes);
        });

        it('should highlight the current items per page selection', () => {
            expect(pagination.getPageSize()).to.eventually.equal(options.defaultPageSize);
        });

        if (options.pages > 1) {
            it('should navigate forward one page at a time', () => {
                pagination.next();
                expect(pagination.getPage()).to.eventually.equal(2);
            });

            it('should navigate backwards one page at a time', () => {
                pagination.previous();
                expect(pagination.getPage()).to.eventually.equal(1);
            });

            it('should navigate to the last page', () => {
                pagination.getPage().then(page => {
                    let firstPage = page;
                    pagination.last();
                    rxMisc.scrollToElement(pagination, {
                        positionOnScreen: 'middle',
                    });
                    expect(pagination.getPage()).to.eventually.be.above(firstPage);
                    pagination.first();
                });
            });
        }

        if (options.pages > 5) {
            it('should jump forward to page 6 using pagination', () => {
                pagination.jumpToPage(6);
                expect(pagination.getPage()).to.eventually.equal(6);
            });

            it('should jump backward to page 2 using pagination', () => {
                pagination.jumpToPage(2);
                expect(pagination.getPage()).to.eventually.equal(2);
                pagination.jumpToPage(1);
            });
        }

        if (options.pageSizes.length > 1) {

            it('should switch to a different items per page', () => {
                pagination.changePageSize(options.pageSizes[1]);
                expect(pagination.getPageSize()).to.eventually.equal(options.pageSizes[1]);
                pagination.changePageSize(options.pageSizes[0]);
            });

            if (options.pages > 1) {
                it('should put the user back on the first page after resizing the items per page', () => {
                    pagination.jumpToPage(2);
                    pagination.changePageSize(options.pageSizes[1]);
                    expect(pagination.getPage()).to.eventually.equal(1);
                    pagination.changePageSize(options.pageSizes[0]);
                });
            }
        }

        if (options.totalItems) {
            it('should list have the correct string for the shown items', () => {
                let shownItems = `Showing 1-${options.defaultPageSize} of ${options.totalItems} items`;
                expect(pagination.shownItems.getText()).to.eventually.equal(shownItems);
            });

            // execute only if the greatest items per page setting can contain all items
            if (options.totalItems < _.last(options.pageSizes)) {
                it('should not fail to match the upper bounds of the shown items even if not displayed', () => {
                    let shownItems = `Showing ${options.totalItems} items`;
                    pagination.changePageSize(_.last(options.pageSizes));
                    expect(pagination.shownItems.getText()).to.eventually.equal(shownItems);
                });
            }
        }
    };
};
