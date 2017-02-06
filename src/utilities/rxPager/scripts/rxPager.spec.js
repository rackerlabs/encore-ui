describe('Pagination', function () {
    describe('filter:rxPager', function () {
        var page;

        beforeEach(function () {
            module('encore.ui.utilities');

            inject(function ($filter) {
                page = $filter('rxPager');
            });
        });

        it('should return an array of pages to be displayed by', function () {
            // Test only one page
            expect(page({ pageNumber: 1, totalPages: 1 })).to.eql([0]);

            // Test first page when below pagesToShow limit
            expect(page({ pageNumber: 1, totalPages: 3 })).to.eql([0, 1, 2]);

            // Test last page of when below pagesToShow limit
            expect(page({ pageNumber: 3, totalPages: 3 })).to.eql([0, 1, 2]);

            // Test first page when above pagesToShow limit
            expect(page({ pageNumber: 1, totalPages: 20 })).to.eql([0, 1, 2, 3, 4]);

            // Test last page of when above pagesToShow limit
            expect(page({ pageNumber: 10, totalPages: 10 })).to.eql([5,6,7,8,9]);

            // Test a page that's deep within a total number of pages
            expect(page({ pageNumber: 15, totalPages: 102 })).to.eql([13,14,15,16,17]);
        });

        it('should allow for custom number of pages to show', function () {
            // Test a page that has odd # of custom pagesToShow
            expect(page({ pageNumber: 15, totalPages: 102, pagesToShow: 3 })).to.eql([14,15,16]);

            // Test first page that has even # of custom pagesToShow and is below pagesToShowLimit
            expect(page({ pageNumber: 1, totalPages: 4, pagesToShow: 4 })).to.eql([0,1,2,3]);

            // Test middle page that has even # of custom pagesToShow and is below pagesToShowLimit
            expect(page({ pageNumber: 2, totalPages: 4, pagesToShow: 4 })).to.eql([0,1,2,3]);

            // Test last page that has even # of custom pagesToShow and is below pagesToShowLimit
            expect(page({ pageNumber: 4, totalPages: 4, pagesToShow: 4 })).to.eql([0,1,2,3]);

            // Test first page that has even # of custom pagesToShow and is above pagesToShowLimit
            expect(page({ pageNumber: 1, totalPages: 102, pagesToShow: 4 })).to.eql([0,1,2,3]);

            // Test middle page that has even # of custom pagesToShow and is above pagesToShowLimit
            expect(page({ pageNumber: 15, totalPages: 102, pagesToShow: 4 })).to.eql([14,15,16,17]);

            // Test last page that has even # of custom pagesToShow and is above pagesToShowLimit
            expect(page({ pageNumber: 102, totalPages: 102, pagesToShow: 4 })).to.eql([98,99,100,101]);
        });
    });
});

describe('filter:Page (DEPRECATED)', function () {
    var page;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            page = $filter('Page');
        });
    });

    it('should return an array of pages to be displayed by', function () {
        // Test only one page
        expect(page({ pageNumber: 1, totalPages: 1 })).to.eql([0]);

        // Test first page when below pagesToShow limit
        expect(page({ pageNumber: 1, totalPages: 3 })).to.eql([0, 1, 2]);

        // Test last page of when below pagesToShow limit
        expect(page({ pageNumber: 3, totalPages: 3 })).to.eql([0, 1, 2]);

        // Test first page when above pagesToShow limit
        expect(page({ pageNumber: 1, totalPages: 20 })).to.eql([0, 1, 2, 3, 4]);

        // Test last page of when above pagesToShow limit
        expect(page({ pageNumber: 10, totalPages: 10 })).to.eql([5,6,7,8,9]);

        // Test a page that's deep within a total number of pages
        expect(page({ pageNumber: 15, totalPages: 102 })).to.eql([13,14,15,16,17]);
    });

    it('should allow for custom number of pages to show', function () {
        // Test a page that has odd # of custom pagesToShow
        expect(page({ pageNumber: 15, totalPages: 102, pagesToShow: 3 })).to.eql([14,15,16]);

        // Test first page that has even # of custom pagesToShow and is below pagesToShowLimit
        expect(page({ pageNumber: 1, totalPages: 4, pagesToShow: 4 })).to.eql([0,1,2,3]);

        // Test middle page that has even # of custom pagesToShow and is below pagesToShowLimit
        expect(page({ pageNumber: 2, totalPages: 4, pagesToShow: 4 })).to.eql([0,1,2,3]);

        // Test last page that has even # of custom pagesToShow and is below pagesToShowLimit
        expect(page({ pageNumber: 4, totalPages: 4, pagesToShow: 4 })).to.eql([0,1,2,3]);

        // Test first page that has even # of custom pagesToShow and is above pagesToShowLimit
        expect(page({ pageNumber: 1, totalPages: 102, pagesToShow: 4 })).to.eql([0,1,2,3]);

        // Test middle page that has even # of custom pagesToShow and is above pagesToShowLimit
        expect(page({ pageNumber: 15, totalPages: 102, pagesToShow: 4 })).to.eql([14,15,16,17]);

        // Test last page that has even # of custom pagesToShow and is above pagesToShowLimit
        expect(page({ pageNumber: 102, totalPages: 102, pagesToShow: 4 })).to.eql([98,99,100,101]);
    });
});
