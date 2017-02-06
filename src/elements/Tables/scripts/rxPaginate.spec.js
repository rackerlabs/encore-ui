describe('Pagination', function () {
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
        pageTracking;

    describe('Directive: rxPaginate (UI-pagination)', function () {
        // TODO redo these tests to use class names for finding first, prev, next, last, etc items

        var el, items, scope, compile,
            validTemplate = '<rx-paginate page-tracking="pager"></rx-paginate>';

        beforeEach(function () {
            // Load the directive's module
            module('encore.ui.elements');
            module('templates/rxPaginate.html');

            // Inject in angular constructs
            inject(function ($rootScope, $compile, rxPageTracker) {
                scope = $rootScope.$new();
                pageTracking = rxPageTracker;
                scope.pager = rxPageTracker.createInstance(angular.copy(mockPageTracker));
                compile = $compile;
            });

            el = $(helpers.createDirective(angular.element(validTemplate), compile, scope));

            items = el.find('.page-links > div');
        });

        afterEach(function () {
            // zero out link element
            el = null;
            items = null;
        });

        it('should link to "first" link non-first page', function () {
            var item = items.filter('.pagination-first');
            var link = item.find('a').eq(0);

            scope.pager.goToPage(3);

            scope.$digest();

            expect(item.hasClass('disabled'), 'disabled').to.be.false;
            expect(link.hasClass('ng-hide'), 'link ng-hide').to.be.false;

            // clicking link should move to first page
            helpers.clickElement(link);

            expect(scope.pager.isFirstPage()).to.be.true;
        });

        it('should disable "first" link on first page', function () {
            var item = items.filter('.pagination-first');
            var link = item.find('a').eq(0);

            expect(item.hasClass('disabled')).to.be.true;
            expect(link.hasClass('ng-hide')).to.be.true;
        });

        it('should link to "prev" link when previous page available', function () {
            var item = items.filter('.pagination-prev');
            var link = item.find('a').eq(0);

            scope.pager.goToPage(3);

            scope.$digest();

            expect(item.hasClass('disabled')).to.be.false;
            expect(link.hasClass('ng-hide')).to.be.false;

            // clicking link should move to first page
            helpers.clickElement(link);

            expect(scope.pager.isPage(2)).to.be.true;
        });

        it('should disable "prev" link on first page', function () {
            var item = items.filter('.pagination-prev');
            var link = item.find('a').eq(0);

            expect(item.hasClass('disabled'), 'disabled').to.be.true;
            expect(link.hasClass('ng-hide'), 'link ng-hide').to.be.true;
        });

        it('should link to individual page numbers', function () {
            var item = items.filter('.pagination-page').eq(0);
            var link = item.find('a').eq(0);

            expect(item.hasClass('pagination-page'), 'should be on pagination-page link').to.be.true;
            expect(item.hasClass('active'), 'link should be active').to.be.true;

            expect(link.text()).to.equal('1');

            // now try with second page link
            item = items.filter('.pagination-page').eq(1);
            link = item.find('a').eq(0);

            expect(item.hasClass('pagination-page'), 'should be on pagination-page link').to.be.true;
            expect(item.hasClass('active'), 'link should be inactive').to.be.false;

            expect(link.text()).to.equal('2');

            // clicking link should move to first page
            helpers.clickElement(link);

            scope.$apply();

            expect(scope.pager.isPage(1)).to.be.true;
            expect(item.hasClass('active'), 'link for page 2 should be active').to.be.true;
        });

        it('should have # of page numbers as configured', function () {
            var pagesShowing = el[0].getElementsByClassName('pagination-page');
            expect(pagesShowing).to.have.length(scope.pager.pagesToShow);
        });

        it('should link to "next" link when next page available', function () {
            var item = items.filter('.pagination-next');
            var link = item.find('a').eq(0);

            expect(item.hasClass('disabled'), 'disabled').to.be.false;
            expect(link.hasClass('ng-hide'), 'link ng-hide').to.be.false;

            // clicking link should move to first page
            helpers.clickElement(link);

            expect(scope.pager.isPage(1)).to.be.true;
        });

        it('should disable "next" link on last page', function () {
            scope.pager.goToLastPage();

            scope.$digest();

            var item = items.filter('.pagination-next');
            var link = item.find('a').eq(0);

            expect(item.hasClass('disabled'), 'item is disabled').to.be.true;
            expect(link.hasClass('ng-hide'), 'link has ng-hide').to.be.true;
        });

        it('should link to "last" link non-last page', function () {
            var item = items.filter('.pagination-last');
            var link = item.find('a').eq(0);

            // make sure we're on the "last" item
            expect(item.hasClass('pagination-last'));

            expect(item.hasClass('disabled'), 'item is disabled').to.be.false;
            expect(link.hasClass('ng-hide'), 'link is disabled').to.be.false;

            // clicking link should move to last page
            helpers.clickElement(link);

            expect(scope.pager.isLastPage()).to.be.true;
        });

        it('should disable "last" link on last page', function () {
            scope.pager.goToLastPage();

            scope.$digest();

            var item = items.filter('.pagination-last');
            var link = item.find('a').eq(0);

            expect(item.hasClass('disabled')).to.be.true;
            expect(link.hasClass('ng-hide')).to.be.true;
        });

        it('should disable the selected itemsPerPage button', function () {
            var buttons = el.find('.pagination-per-page button');

            var firstButton = buttons.eq(0);
            var secondButton = buttons.eq(1);

            expect(firstButton.prop('disabled'), 'first button disabled').to.be.true;
            expect(secondButton.prop('disabled'), 'second button disabled').to.be.false;

            // clicking link should move to first page
            helpers.clickElement(secondButton);
            expect(firstButton.prop('disabled'), 'first button disabled').to.be.false;
            expect(secondButton.prop('disabled'), 'second button disabled').to.be.true;

        });

        it('should update the global itemsPerPage when a user selects an itemsPerPage', function () {
            var buttons = el.find('.pagination-per-page button');

            var firstButton = buttons.eq(0);
            var thirdButton = buttons.eq(2);
            helpers.clickElement(firstButton);
            expect(firstButton.prop('disabled'), 'first button disabled').to.be.true;
            expect(thirdButton.prop('disabled'), 'second button not disabled').to.be.false;

            var thirdButtonValue = _.parseInt(thirdButton.text());

            helpers.clickElement(thirdButton);

            var newPagination = pageTracking.createInstance();

            expect(newPagination.itemsPerPage).to.equal(thirdButtonValue);

        });
    });

    describe('rxPaginate (API-pagination)', function () {
        var el, items, item, link, scope, overlayScope, compile, deferred, ul, $timeout,
            validTemplate = '<div rx-loading-overlay>' +
                                '<rx-paginate ' +
                                    'page-tracking="pager" ' +
                                    'server-interface="api" ' +
                                    'filter-text="d.filter" ' +
                                    'selections="selected" ' +
                                    'sort-column="sort.predicate" ' +
                                    'sort-direction="sort.reverse" ' +
                                '></rx-paginate>' +
                            '</div>',
            api = {};

        var response = {
            items: [
                { name: 'Some Name', os: 'Some OS' },
                { name: 'Some Name2', os: 'Some OS2' },
                { name: 'Some Name3', os: 'Some OS3' },
                { name: 'Some Name4', os: 'Some OS4' },
                { name: 'Some Name5', os: 'Some OS5' },

            ],
            totalNumberOfItems: 5,
            pageNumber: 0
        };

        beforeEach(function () {
            // Load the directive's module
            module('encore.ui.elements');
            module('templates/rxPaginate.html');

            // Inject in angular constructs
            inject(function ($rootScope, $compile, $q, _$timeout_, rxPageTracker) {
                $timeout = _$timeout_;
                scope = $rootScope.$new();
                scope.api = api;
                scope.d = { filter: '' };
                scope.selected = {
                    os: _.map(response.items, 'os')
                };
                scope.sort = {
                    predicate: 'Name',
                    reverse: false
                };
                api.getItems = function () {
                    deferred = $q.defer();
                    return deferred.promise;
                };
                sinon.spy(api, 'getItems');
                pageTracking = rxPageTracker;
                scope.pager = rxPageTracker.createInstance(angular.copy(mockPageTracker));
                compile = $compile;
            });

            el = $(helpers.createDirective(angular.element(validTemplate), compile, scope));
            deferred.resolve(response);
            scope.$apply();
            api.getItems.reset();

            ul = el.find('ul');
            items = el.find('.page-links > div');
            overlayScope = el.children().eq(-1).scope();
        });

        it('should show the loading overlay and hide on resolve', function () {
            // click second page link
            item = items.filter('.pagination-page').eq(1);
            link = item.find('a').eq(0);

            expect(item.hasClass('pagination-page'), 'should be on pagination-page link').to.be.true;
            expect(item.hasClass('active'), 'link should be inactive').to.be.false;

            expect(link.text()).to.equal('2');
            expect(ul.hasClass('loading-row')).to.be.false;
            // clicking link should move to first page
            helpers.clickElement(link);

            scope.$apply();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.true;

            deferred.resolve(response);

            scope.$apply();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.false;
        });

        it('should show the loading overlay and hide on reject', function () {
            // click second page link
            item = items.filter('.pagination-page').eq(1);
            link = item.find('a').eq(0);

            // clicking link should move to first page
            helpers.clickElement(link);

            scope.$apply();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.true;

            deferred.reject(response);

            scope.$apply();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.false;
        });

        it('should show the loading overlay when filterText changes', function () {
            scope.d.filter = 'some search';
            scope.$apply();
            $timeout.flush();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.true;

            deferred.resolve(response);

            scope.$apply();
            $timeout.flush();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.false;
        });

        it('should show the loading overlay when selections changes', function () {
            scope.selected.os = _.head(scope.selected.os);
            scope.$apply();
            $timeout.flush();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.true;

            deferred.resolve(response);

            scope.$apply();
            $timeout.flush();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.false;
        });

        it('should show the loading overlay when sortColumn changes', function () {
            scope.sort.predicate = 'os';
            scope.$apply();
            $timeout.flush();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.true;

            deferred.resolve(response);

            scope.$apply();
            $timeout.flush();
            expect(overlayScope._rxLoadingOverlayVisible).to.be.false;
        });

        it('should pass the current filter and sort values to getItems', function () {
            // Enter some filter text
            scope.d.filter = 'some search';
            scope.$apply();
            $timeout.flush();

            // click second page link
            item = items.filter('.pagination-page').eq(1);
            link = item.find('a').eq(0);

            // clicking link should move to first page
            helpers.clickElement(link[0]);

            scope.$apply();

            var opts = api.getItems.getCall(0).args[2];
            expect(opts.filterText).to.equal('some search');
            expect(opts.sortColumn).to.equal('Name');
            expect(opts.sortDirection).to.equal('ASCENDING');
        });

        it('should send DESCENDING after changing column sort', function () {
            scope.sort.reverse = !scope.sort.reverse;
            scope.$apply();
            $timeout.flush();
            var opts = api.getItems.getCall(0).args[2];
            expect(opts.sortDirection).to.equal('DESCENDING');
        });

        it('should send new column name when changing sort column', function () {
            scope.sort.predicate = 'os';
            scope.$apply();
            $timeout.flush();
            var opts = api.getItems.getCall(0).args[2];
            expect(opts.sortColumn).to.equal('os');
        });
    });
});
