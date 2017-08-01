var Page = require('astrolabe').Page;
var _ = require('lodash');

/**
 * @namespace
 */
var rxPaginate = {

    lnkCurrentPage: {
        get: function () { return this.rootElement.$('.pagination .active a'); }
    },

    tblPages: {
        get: function () { return this.rootElement.$$('.pagination .pagination-page a'); }
    },

    tblPageSizes: {
        get: function () {
            return this.rootElement.all(by.repeater('i in pageTracking.itemSizeList'));
        }
    },

    /**
     * @function
     * @instance
     * @private
     * @param {Number} pageNumber - The page number to paginate to.
     * @description Paginate through groups of pages until the desired page number becomes visible.
     * Once it is, click that page number and return control back to the test. If an invalid page
     * number is passed in, a {@link rxPaginate#NoSuchPageException} will be thrown. Use {@link rxPaginate#page}'s
     * setter functionality instead.
     */
    jumpToPage: {
        value: function (pageNumber) {
            var page = this;
            if (pageNumber < 1) {
                page.NoSuchPageException.thro('Page number must be >= 1');
            }

            return this.pages.then(function (pageNumbers) {
                var pageIndex = _.indexOf(pageNumbers, pageNumber);
                if (pageIndex === -1) {
                    // The page is not on the current page numbers list.
                    // Let's navigate around and try again.
                    if (_.min(pageNumbers) > pageNumber) {
                        // The lowest available page is still too big.
                        page.jumpToLowestAvailablePage();
                        // Try again.
                        page.jumpToPage(pageNumber);
                    } else {
                        page.checkForInvalidLastPage(pageNumber);
                        page.jumpToHighestAvailablePage();
                        // Try again.
                        page.jumpToPage(pageNumber);
                    }
                } else {
                    // Our target page is somewhere in the available pages list.
                    return page.tblPages.get(pageIndex).click();
                }
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Visit the first page in the paginated table by clicking the "First" link,
     * unless the user is already on the first page. In that case, do nothing.
     * @example
     * it('should put the newly created resource at the top of the list', function () {
     *     encore.rxPaginate.initialize().first();
     *     expect(myPage.someTable.row(0).name).to.eventually.contain('Created by Automated Test');
     * });
     */
    first: {
        value: function () {
            var page = this;
            return this.page.then(function (pageNumber) {
                if (pageNumber > 1) {
                    page.rootElement.$('.pagination-first a').click();
                }
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Go back one page from the current position in the table.
     * @example
     * it('should go back a page', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.page).to.eventually.equal(3);
     *     pagination.previous();
     *     expect(pagination.page).to.eventually.equal(2);
     * });
     */
    previous: {
        value: function () {
            this.checkForInvalidFirstPage();
            this.rootElement.$('.pagination-prev a').click();
        }
    },

    /**
     * @function
     * @instance
     * @description Go forward one page from the current position in the table.
     * @example
     * it('should go forward a page', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.page).to.eventually.equal(1);
     *     pagination.previous();
     *     expect(pagination.page).to.eventually.equal(2);
     * });
     */
    next: {
        value: function () {
            this.checkForInvalidLastPage();
            this.rootElement.$('.pagination-next a').click();
        }
    },

    /**
     * @function
     * @instance
     * @description Visit the last page in the paginated table by clicking the "Last" link,
     * unless the user is already on the last page. In that case, do nothing.
     * @example
     * it('should put the newly created resource at the bottom of the list', function () {
     *     encore.rxPaginate.initialize().last();
     *     expect(myPage.someTable.row(-1).name).to.eventually.contain('Created by Automated Test');
     * });
     */
    last: {
        value: function () {
            var page = this;
            var css = '.pagination-last a';
            return this.rootElement.$(css).isDisplayed().then(function (isDisplayed) {
                if (isDisplayed) {
                    page.rootElement.$(css).click();
                }
            });
        }
    },

    /**
     * @instance
     * @description A getter and setter for changing page numbers.
     * Will paginate through groups of pages until the desired page number becomes visible.
     * Once it is, click that page number and return control back to the test. If an invalid page
     * number is passed in, a {@link rxPaginate#NoSuchPageException} will be thrown.
     * @type {Number}
     * @example
     * it('should always have the same data on page 8', function () {
     *     var table = encore.rxPaginate.initialize();
     *     table.page = 8;
     *     expect(table.page).to.eventually.equal(8);
     *     // some tests that run on page 8 here...
     * });
     */
    page: {
        get: function () {
            return this.lnkCurrentPage.getText().then(function (text) {
                return parseInt(text, 10);
            });
        },
        set: function (pageNumber) {
            return this.jumpToPage(pageNumber);
        }
    },

    /**
     * @type {Number[]}
     * @instance
     * @private
     * @description A list of all available page numbers that can be
     * paginated to directly. Click the last page number in this list
     * to cycle through to the next group of pages, and continue forward
     * to the desired page number. Internal function that supports {@link rxPaginate#jumpToPage}.-*;p
     * @example
     * it('should support jumping to page five directly, without cycling', function () {
     *     expect(encore.rxPaginate.initialize().pages).to.eventually.equal([1, 2, 3, 4, 5]);
     * });
     */
    pages: {
        get: function () {
            return this.tblPages.map(function (pageNumber) {
                return pageNumber.getText().then(function (n) {
                    return parseInt(n, 10);
                });
            });
        }
    },

    /**
     * @instance
     * @type {Number[]}
     * @description A list of available page sizes that can be queried and adjusted
     * by using the {@link rxPaginate#pageSize} getter and setter.
     * @see rxPaginate#pageSize
     * @example
     * it('should show all 50 states without paginating', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.pageSizes).to.eventually.equal([20, 50, 100, 200]);
     *     expect(pagination.pageSize).to.eventually.equal(20);
     *     expect(statesTable.count()).to.eventually.equal(20);
     *     pagination.pageSize = 100;
     *     expect(pagination.pageSize).to.eventually.equal(100);
     *     expect(statesTable.count()).to.eventually.equal(50);
     * });
     */
    pageSizes: {
        get: function () {
            return this.tblPageSizes.map(function (pageSizeElement) {
                return pageSizeElement.getText().then(parseInt);
            });
        }
    },

    /**
     * @instance
     * @description Getter and setter for updating the number of visible items on a single page in the table.
     * If you attempt to set the page size something not listed in {@link rxPaginate#pageSizes}, a
     * {@link rxPaginate#NoSuchItemsPerPage} exception.
     * @type {Number}
     * @example
     * it('should change the page size to make it easier to find things', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.pageSizes).to.eventually.equal([20, 50, 100, 200]);
     *     expect(pagination.pageSize).to.eventually.equal(20);
     *     expect(statesTable.count()).to.eventually.equal(20);
     *     pagination.pageSize = 200;
     *     expect(pagination.pageSize).to.eventually.equal(200);
     *     expect(statesTable.count()).to.eventually.equal(118);
     *     // you can now search the table for all values without paginating
     * });
     */
    pageSize: {
        get: function () {
            var css = '.pagination-per-page button[disabled="disabled"]';
            return this.rootElement.$(css).getText().then(parseInt);
        },

        set: function (itemsPerPage) {
            var page = this;
            return this.pageSizes.then(function (pageSizes) {
                if (_.indexOf(pageSizes, itemsPerPage) === -1) {
                    page.NoSuchItemsPerPage(itemsPerPage);
                }

                // Using cssContainingText here can throw ugly warnings if
                // the page sizes include both "50" and "500" (a common occurrence).
                // Instead, filter out any that don't match, and click it (there's only one).
                return page.tblPageSizes.filter(function (pageSizeElement) {
                    return pageSizeElement.getText().then(function (text) {
                        return text === itemsPerPage.toString();
                    });
                }).then(function (matchingPageSizeElements) {
                    matchingPageSizeElements[0].$('button').click();
                    encore.rxMisc.scrollToElement(page.rootElement, {
                        positionOnScreen: 'middle'
                    });
                });
            });
        }
    },

    /**
     * @type {rxPaginate.shownItems}
     * @instance
     * @description Entry point for the {@link rxPaginate.shownItems} namespace.
     * Contains properties that are represented by the text "Showing j-k of n items", which is typically
     * found in the bottom left corner of the pagination element, next to the "Back to Top" link.
     * @example
     * it('should always show that there are 50 states', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.pageSize).to.eventually.equal(20);
     *     expect(pagination.shownItems.first).to.eventually.equal(1);
     *     expect(pagination.shownItems.last).to.eventually.equal(20);
     *     expect(pagination.shownItems.total).to.eventually.equal(50);
     *     pagination.next();
     *     expect(pagination.shownItems.first).to.eventually.equal(21);
     *     expect(pagination.shownItems.last).to.eventually.equal(40);
     *     expect(pagination.shownItems.total).to.eventually.equal(50);
     * });
     */
    shownItems: {
        get: function () {
            var rootElement = this.rootElement;
            var indexesRegex = /Showing (\d+)-(\d+) of (\d+) items/;
            // If the items per page exceeds total items, the `indexesRegex` won't match.
            // Catch this edge case and coerce the text into something that will match.
            var testThenMatch = function (text, matchIndex) {
                if (!indexesRegex.test(text)) {
                    var indexRegex = /Showing (\d+) items/;
                    var totalItems = text.match(indexRegex)[1];
                    text = 'Showing 1-' + totalItems + ' of ' + totalItems + ' items';
                }
                return parseInt(text.match(indexesRegex)[matchIndex], 10);
            };

            /**
             * @namespace rxPaginate.shownItems
             * @see rxPaginate
             */
            return Page.create({

                lblIndexes: {
                    get: function () {
                        return rootElement.element(by.binding('pageTracking'));
                    }
                },

                /**
                 * @type {Number}
                 * @memberof rxPaginate.shownItems
                 * @instance
                 * @description The index of the first item that sits at the top position of the table.
                 * @example
                 * it('should roll over to the 51st item on page two', function () {
                 *     var pagination = encore.rxPaginate.initialize();
                 *     expect(pagination.page).to.eventually.equal(1);
                 *     expect(pagination.pageSize).to.eventually.equal(50);
                 *     expect(pagination.shownItems.first).to.eventually.equal(1);
                 *     pagination.page = 2;
                 *     expect(pagination.shownItems.first).to.eventually.equal(51);
                 * });
                 */
                first: {
                    get: function () {
                        return this.lblIndexes.getText().then(function (text) {
                            return testThenMatch(text, 1);
                        });
                    }
                },

                /**
                 * @type {Number}
                 * @memberof rxPaginate.shownItems
                 * @instance
                 * @description The index of the last item that sits at the bottom position of the table.
                 * @example
                 * it('should show item number 100 on page two', function () {
                 *     var pagination = encore.rxPaginate.initialize();
                 *     expect(pagination.page).to.eventually.equal(1);
                 *     expect(pagination.pageSize).to.eventually.equal(50);
                 *     expect(pagination.shownItems.last).to.eventually.equal(50);
                 *     pagination.page = 2;
                 *     expect(pagination.shownItems.last).to.eventually.equal(100);
                 * });
                 */
                last: {
                    get: function () {
                        return this.lblIndexes.getText().then(function (text) {
                            return testThenMatch(text, 2);
                        });
                    }
                },

                /**
                 * @type {Number}
                 * @memberof rxPaginate.shownItems
                 * @instance
                 * @description The total number of items in the table, according to the Angular controller
                 * that is handling the data. This number should never change as you move from page to page.
                 * @example
                 * it('should always show that there are 50 states', function () {
                 *     var pagination = encore.rxPaginate.initialize();
                 *     expect(pagination.pageSize).to.eventually.equal(20);
                 *     expect(pagination.shownItems.first).to.eventually.equal(1);
                 *     expect(pagination.shownItems.last).to.eventually.equal(20);
                 *     expect(pagination.shownItems.total).to.eventually.equal(50);
                 *     pagination.next();
                 *     expect(pagination.shownItems.first).to.eventually.equal(21);
                 *     expect(pagination.shownItems.last).to.eventually.equal(40);
                 *     expect(pagination.shownItems.total).to.eventually.equal(50);
                 * });
                 */
                total: {
                    get: function () {
                        return this.lblIndexes.getText().then(function (text) {
                            return testThenMatch(text, 3);
                        });
                    }
                }

            });
        }
    },

    /**
     * @instance
     * @type {Number}
     * @description The total number of items in the table, according to the Angular
     * controller that is handling the data. This number should never change as you move
     * from page to page. Directly calls {@link rxPaginate.shownItems#total}. See the
     * documentation surrounding that function for an in depth example of its usage.
     * @see rxPaginate.shownItems#total
     */
    totalItems: {
        get: function () {
            return this.shownItems.total;
        }
    },

    /**
     * @instance
     * @type {Number}
     * @description Takes the total number of items and divides it by the current page size. Will
     * apply `Math.ceil` to the result to forcibly round it up to the next integer up.
     * @example
     * it('should have 8 pages worth of data', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     expect(pagination.totalItems).to.eventually.equal(22);
     *     expect(pagination.pageSize).to.eventually.equal(3);
     *     // 22 / 3 -> 7 full pages, and one page with a single item on it.
     *     expect(pagination.totalPages).to.eventually.equal(8);
     * });
     */
    totalPages: {
        get: function () {
            return protractor.promise.all([this.totalItems, this.pageSize]).then(function (results) {
                var totalItems = results[0];
                var pageSize = results[1];
                return Math.ceil(totalItems / pageSize);
            });
        }
    },

    /**
     * @private
     * @see rxPaginate#jumpToPage
     */
    jumpToLowestAvailablePage: {
        value: function () {
            this.tblPages.first().click();
        }
    },

    /**
     * @private
     * @see rxPaginate#jumpToPage
     */
    jumpToHighestAvailablePage: {
        value: function () {
            this.tblPages.last().click();
        }
    },

    /**
     * @function
     * @private
     * @see rxPaginate#jumpToPage
     */
    checkForInvalidFirstPage: {
        value: function () {
            var page = this;
            return this.page.then(function (currentPage) {
                if (currentPage === 1) {
                    page.NoSuchPageException.thro('cannot navigate back past the first page.');
                }
            });
        }
    },

    /**
     * @function
     * @private
     * @see rxPaginate#jumpToPage
     * @description Accepts an optional `pageNumber` argument to print to the exception
     * should the `NoSuchPageException` get triggered during this call.
     * Otherwise, it defaults to a generic invalid page message.
     */
    checkForInvalidLastPage: {
        value: function (pageNumber) {
            var page = this;
            return this.page.then(function (currentPage) {
                pageNumber = pageNumber || 'any higher number';
                return page.pages.then(function (pageNumbers) {
                    if (_.last(pageNumbers) === currentPage) {
                        // We are at the last page, and we still need to go higher.
                        var message = pageNumber + ' exceeds max page of ' + _.last(pageNumbers);
                        page.NoSuchPageException.thro(message);
                    }
                });
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the pagination element is present.
     * @returns {Promise<Boolean>}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the pagination element is displayed.
     * @returns {Promise<Boolean>}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @type {Exception}
     * @instance
     * @description Will be thrown should you attempt to navigate to a page that doesn't exist.
     * @example
     * it('should not pass this test since an exception will be thrown', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     pagination.totalPages.then(function (totalPageCount) {
     *         pagination.page = totalPageCount + 1;
     *         // the above line will throw an exception
     *         expect(pagination).to.never.get.here.so.who.cares.what.you.put;
     *     });
     * });
     */
    NoSuchPageException: {
        get: function () { return this.exception('No such page'); }
    },

    /**
     * @type {Exception}
     * @instance
     * @description Will be thrown should you attempt to update the items per page setter to
     * a value that isn't included in the list of {@link rxPaginate#pageSizes} for your instance.
     * @example
     * it('should not pass this test since an exception will be thrown', function () {
     *     var pagination = encore.rxPaginate.initialize();
     *     pagination.pageSizes.then(function (pageSizes) {
     *         pagination.pageSize = _.last(pageSizes) * 2;
     *         // the above line will throw an exception
     *         expect(pagination).to.never.get.here.so.who.cares.what.you.put;
     *     });
     * });
     */
    NoSuchItemsPerPageException: {
        get: function () { return this.exception('No such itemsPerPage'); }
    }

};

exports.rxPaginate = {

    /**
     * @function
     * @param {ElementFinder} rxPaginateElement - DOM element representing the rxPaginate component.
     * @returns {rxPaginate}
     * @description Creates a page object representing an rxPaginate component on the page.
     */
    initialize: function (rxPaginationElement) {
        rxPaginate.rootElement = {
            get: function () { return rxPaginationElement; }
        };
        return Page.create(rxPaginate);
    }
};
