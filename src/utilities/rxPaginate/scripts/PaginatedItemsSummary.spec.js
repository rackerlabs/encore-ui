describe('Pagination', function () {
    describe('Filter: PaginatedItemsSummary', function () {
        var summary;

        beforeEach(function () {
            module('encore.ui.elements');
            module('encore.ui.utilities');

            inject(function ($filter) {
                summary = $filter('PaginatedItemsSummary');
            });
        });

        it('should show first-last if number of items is less than itemsPerPage', function () {
            var pager = {
                showAll: false,
                itemsPerPage: 10,
                total: 100,
                currentPage: function () { return 0; }
            };

            expect(summary(pager)).to.equal('1-10 of 100');
        });

        it('should show the total number of items when itemsPerPage > total', function () {
            var pager = {
                showAll: false,
                itemsPerPage: 50,
                total: 10,
                currentPage: function () { return 0; }
            };

            expect(summary(pager)).to.equal('10');
        });

        it('should show the total number of items when showAll is true', function () {
            var pager = {
                showAll: true,
                itemsPerPage: 1,
                total: 10,
                currentPage: function () { return 0; }
            };

            expect(summary(pager)).to.equal('10');
        });
    });
});
