var _ = require('lodash');

/**
 * rxPaginate exercises.
 * @exports exercise/rxPaginate
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxPaginate} options.instance - Component to exercise.
 * @param {Boolean} [options.isPresent=true] - Whether or not the pagination element is present.
 * @param {Boolean} [options.isDisplayed=true] - Whether or not the pagination element is displayed.
 * @param {String} [options.pages=6] - Estimated page size in the pagination widget.
 * @param {Number[]} [options.pageSizes=[50, 200, 350, 500]] - Page sizes to validate.
 * @param {Number} [options.defaultPageSize=50] - Default page size on page load.
 * @param {Number} [options.invalidPageSize=45] - For testing resizing pagination to invalid items per page.
 * @example
 * describe('default exercises', encore.exercise.rxPaginate({
 *     instance: myPage.pagination, // select one of many pagination instances from your page objects
 *     pages: 20 // will exercise full functionality at 6, limited functionality at 2
 * }));
 */
exports.rxPaginate = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        isPresent: true,
        isDisplayed: true,
        pages: 6,
        pageSizes: [50, 200, 350, 500],
        defaultPageSize: 50,
        invalidPageSize: 45
    });

    return function () {
        var pagination;

        if (!options.isPresent) {
            return;
        }

        before(function () {
            pagination = options.instance;
        });

        beforeEach(function () {
            encore.rxMisc.scrollToElement(pagination.rootElement, {
                positionOnScreen: 'middle'
            });
        });

        it(`should ${options.isDisplayed ? 'be' : 'not be'} displayed`, function () {
            expect(pagination.isDisplayed()).to.eventually.equal(options.isDisplayed);
        });

        if (!options.isDisplayed) {
            return;
        }

        if (options.pages > 1) {
            it('should navigate forward one page at a time', function () {
                pagination.next();
                expect(pagination.page).to.eventually.equal(2);
            });

            it('should navigate backwards one page at a time', function () {
                pagination.previous();
                expect(pagination.page).to.eventually.equal(1);
            });

            it('should navigate to the last page', function () {
                pagination.page.then(function (page) {
                    var firstPage = page;
                    pagination.last();
                    encore.rxMisc.scrollToElement(pagination.rootElement, {
                        positionOnScreen: 'middle'
                    });
                    expect(pagination.page).to.eventually.be.above(firstPage);
                    pagination.first();
                });
            });
        }

        if (options.pages > 5) {
            it('should jump forward to page 6 using pagination', function () {
                pagination.page = 6;
                expect(pagination.page).to.eventually.equal(6);
            });

            it('should jump backward to page 2 using pagination', function () {
                pagination.page = 2;
                expect(pagination.page).to.eventually.equal(2);
                pagination.page = 1;
            });
        }

        it('should not allow navigating `next` the last page', function () {
            expect(pagination.next).to.throw(pagination.NoSuchPageException);
        });

        it('should allow attempting to navigate to the last page when already on the last page', function () {
            pagination.last();
            pagination.page.then(function (page) {
                pagination.last();
                expect(pagination.page).to.eventually.equal(page);
            });
        });

        it('should navigate to the first page', function () {
            pagination.first();
            expect(pagination.page).to.eventually.equal(1);
        });

        it('should not allow navigating `prev` the first page', function () {
            expect(pagination.previous).to.throw(pagination.NoSuchPageException);
        });

        it('should allow attempting to navigate to the first page when already on the first page', function () {
            pagination.first();
            expect(pagination.page).to.eventually.equal(1);
        });

        it('should have all available page sizes', function () {
            expect(pagination.pageSizes).to.eventually.eql(options.pageSizes);
        });

        it('should highlight the current items per page selection', function () {
            expect(pagination.pageSize).to.eventually.equal(options.defaultPageSize);
        });

        it('should list the lower bounds of the shown items currently in the table', function () {
            expect(pagination.shownItems.first).to.eventually.equal(1);
        });

        it('should list the upper bounds of the shown items currently in the table', function () {
            expect(pagination.shownItems.last).to.eventually.not.be.above(options.defaultPageSize);
        });

        it('should know the total number of pages without visiting it', function () {
            pagination.totalPages.then(function (totalPages) {
                pagination.last();
                encore.rxMisc.scrollToElement(pagination.rootElement, {
                    positionOnScreen: 'middle'
                });
                expect(pagination.page).to.eventually.equal(totalPages);
                pagination.first();
            });
        });

        if (options.pageSizes.length > 1) {

            it('should switch to a different items per page', function () {
                pagination.pageSize = options.pageSizes[1];
                expect(pagination.pageSize).to.eventually.equal(options.pageSizes[1]);
                pagination.pageSize = options.pageSizes[0];
            });

            if (options.pages > 1) {
                it('should put the user back on the first page after resizing the items per page', function () {
                    pagination.page = 2;
                    pagination.pageSize = options.pageSizes[1];
                    expect(pagination.page).to.eventually.equal(1);
                    pagination.pageSize = options.pageSizes[0];
                });
            }

        }

        it('should not fail to match the lower bounds of the shown items even if not displayed', function () {
            expect(pagination.shownItems.first).to.eventually.equal(1);
        });

        // execute only if the greatest items per page setting can contain all items
        if (_.head(options.pageSizes) * options.pages < _.last(options.pageSizes)) {

            it('should not fail to match the upper bounds of the shown items even if not displayed', function () {
                pagination.pageSize = _.last(options.pageSizes);
                pagination.shownItems.total.then(function (totalItems) {
                    expect(pagination.shownItems.last).to.eventually.equal(totalItems);
                    pagination.pageSize = options.defaultPageSize;
                });
            });
        }

        if (options.invalidPageSize) {

            it('should not allow selecting an unavailable items per page', function () {
                var fn = function () {
                    var pageSizeFn = pagination.__lookupSetter__('pageSize');
                    return protractor.promise.fulfilled(pageSizeFn.call(pagination, options.invalidPageSize));
                };
                expect(fn()).to.be.rejectedWith(pagination.NoSuchItemsPerPage);
            });

        }

    };
};
