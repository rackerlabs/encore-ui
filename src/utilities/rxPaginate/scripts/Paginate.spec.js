describe('Pagination (DEPRECATED)', function () {
    var originalItems = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        mockPageTracker = {
            itemsPerPage: 3,
            pageNumber: 0,
            totalPages: Math.ceil(originalItems.length / 3),
            total: originalItems.length,
            pagesToShow: 6,
            showAll: false,
            pageInit: false
        },
        items;

    beforeEach(function () {
        items = originalItems.slice(0);
    });

    describe('Filter: Paginate', function () {
        var paginate, pager;

        beforeEach(function () {
            module('encore.ui.utilities');

            inject(function ($filter, rxPageTracker) {
                paginate = $filter('Paginate');
                pager = rxPageTracker.createInstance(angular.copy(mockPageTracker));
            });
        });

        it('should return subset of items based on current page', function () {
            // expect first three pages to be returned from pagination
            expect(paginate(items, pager)).to.eql([0,1,2]);

            // change page and re-paginate
            pager.goToPage(2);
            expect(paginate(items, pager)).to.eql([6,7,8]);

            // last page should return remaining items
            pager.goToLastPage();
            expect(paginate(items, pager)).to.eql([15,16]);
        });

        it('should switch page if item deletion causes us to be past last page', function () {
            // Go to last page
            pager.goToLastPage();
            var lastPageNumber = pager.currentPage();
            expect(paginate(items, pager), 'two items on last page').to.eql([15,16]);

            // Remove the two items on this page, should take us to pageNumber - 1
            items.pop();
            items.pop();
            expect(paginate(items, pager), 'after deleting two items').to.eql([12, 13, 14]);
            expect(pager.currentPage(), 'back one page').to.equal(lastPageNumber - 1);
        });

        it('should correctly switch if two pages worth of items are deleted', function () {
            // Go to last page
            pager.goToLastPage();
            var lastPageNumber = pager.currentPage();
            expect(paginate(items, pager), 'two items on last page').to.eql([15,16]);

            // Remove the last five items, which should remove two pages
            items = items.slice(0, -5);
            expect(paginate(items, pager), 'after deleting five items').to.eql([9, 10, 11]);
            expect(pager.currentPage(), 'back two pages').to.equal(lastPageNumber - 2);
        });

        it('should set pageNumber to 0 if the items list is empty', function () {
            expect(paginate([], pager), 'no items from pager').to.eql([]);
            expect(pager.currentPage()).to.equal(0);
        });
    });
});
