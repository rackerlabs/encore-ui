describe('Pagination', function () {
    describe('service:rxPageTracker', function () {
        var tracking;
        var rxLocalStorage;

        beforeEach(function () {
            module('encore.ui.utilities');
            inject(function (rxPageTracker, _rxLocalStorage_) {
                tracking = rxPageTracker;
                rxLocalStorage = _rxLocalStorage_;
                rxLocalStorage.clear();
            });
        });

        afterEach(function () {
            rxLocalStorage.clear();
        });

        it('Should override default showAll when set', function () {
            expect(tracking.createInstance().showAll).to.be.false;
            expect(tracking.createInstance({ showAll: true }).showAll).to.be.true;
            expect(tracking.createInstance({ showAll: false }).showAll).to.be.false;
        });

        it('Should override default itemsPerPage', function () {
            expect(tracking.createInstance().itemsPerPage).to.be.eq(200);
            expect(tracking.createInstance({ itemsPerPage: 15 }).itemsPerPage).to.be.eq(15);
            expect(tracking.createInstance({ itemsPerPage: 55 }).itemsPerPage).to.be.eq(55);
        });

        it('should add itemsPerPage to the itemSizeList if it is not present', function () {
            expect(tracking.createInstance().itemSizeList).to.not.contain(45);
            expect(tracking.createInstance({ itemsPerPage: 45 }).itemSizeList).to.contain(45);
        });

        describe('pager methods -', function () {
            var $q, scope, pager, getItems, spy, lastPage, itemsPerPage;

            beforeEach(function () {
                inject(function (_$q_, $rootScope) {
                    $q = _$q_;
                    scope = $rootScope.$new();
                });

                getItems = function (pageNumber) {
                    return $q.when({
                        items: [{ name: 'abc' }, { name: 'def' }, { name: 'ghi' }, { name: 'jkl' }],
                        pageNumber: pageNumber,
                        totalNumberOfItems: 4
                    });
                };
                itemsPerPage = 1;
                lastPage = 4 / itemsPerPage - 1;
                pager = tracking.createInstance({ itemsPerPage: itemsPerPage });
                spy = sinon.spy(getItems);
                pager.updateItemsFn(spy);
                pager.goToPage(0, { forceCacheUpdate: true });
                scope.$apply();

                // reset the spy here so we don't accidentally catch
                // the goToPage(0);
                spy.reset();
            });

            describe('newItems - ', function () {
                it('should update the pager on response', function () {
                    var updateCache = true;
                    pager.newItems(getItems(0), updateCache);
                    scope.$apply();
                    expect(pager.currentPage(), 'currentPage()').to.equal(0);
                    expect(pager.total, 'total').to.equal(4);
                    expect(pager.items, 'items').to.deep.equal([{ name: 'abc' }]);
                });
            });

            describe('goToPage', function () {
                it('should not call getItems() for cached pages', function () {
                    pager.goToPage(1);
                    scope.$apply();
                    expect(pager.currentPage(), 'currentPage()').to.equal(1);
                    expect(spy.callCount).to.equal(0);
                });

                it('should call getItems() if we request outside of cached pages', function () {
                    pager.goToPage(5);
                    scope.$apply();
                    expect(pager.currentPage(), 'currentPage()').to.equal(5);
                    expect(spy.callCount).to.equal(1);
                });

                it('should use custom itemsPerPage value over the stored one', function () {
                    pager.goToPage(5, { itemsPerPage: 100 });
                    scope.$apply();

                    // SHould not have changed stored itemsPerPage
                    expect(pager.itemsPerPage).to.equal(1);

                    // Should have sent request for 100 items
                    expect(spy.getCall(0).args[1]).to.equal(100);
                });

                it('should force a call to getItems() when forceCacheUpdate is set', function () {
                    pager.goToPage(0, { forceCacheUpdate: true });
                    scope.$apply();
                    expect(spy.callCount).to.equal(1);
                });
            });

            describe('refresh() -', function () {
                it('should go to page 0 with a forced cache update', function () {
                    pager.goToPage(1);
                    scope.$apply();

                    pager.refresh();
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(0);
                    expect(spy.callCount).to.equal(1);
                });

                it('should stay on current page when stayOnCurrentPage is true', function () {
                    pager.goToPage(1);
                    scope.$apply();

                    var stayOnCurrentPage = true;
                    pager.refresh(stayOnCurrentPage);
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(1);
                    expect(spy.callCount).to.equal(1);
                });
            });

            describe('isFirstPage', function () {
                it('should return true on the first page', function () {
                    expect(pager.isFirstPage()).to.be.true;
                });

                it('should return false after going to a different page', function () {
                    pager.goToPage(1);
                    scope.$apply();
                    expect(pager.isFirstPage()).to.be.false;
                });
            });

            describe('isLastPage', function () {
                it('should return false on the first page', function () {
                    expect(pager.isLastPage()).to.be.false;
                });

                it('should return true after going to the last page', function () {
                    pager.goToPage(lastPage);
                    scope.$apply();
                    expect(pager.isLastPage()).to.be.true;
                });
            });

            describe('isPage', function () {
                it('should return true for n=0', function () {
                    expect(pager.isPage(0)).to.be.true;
                });

                it('should return true for n=1', function () {
                    expect(pager.isPage(1)).to.be.false;
                });
            });

            describe('isPageNTheLastPage', function () {
                it('should return false for n=1', function () {
                    expect(pager.isPageNTheLastPage(1)).to.be.false;
                });

                it('should return true for lastPage', function () {
                    expect(pager.isPageNTheLastPage(lastPage)).to.be.true;
                });
            });

            describe('currentPage', function () {
                it('should return 0 before changing pages', function () {
                    expect(pager.currentPage()).to.equal(0);
                });

                it('should return 2 after going to page 2', function () {
                    pager.goToPage(2);
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(2);
                });
            });

            describe('page changes -', function () {
                it('goToFirstPage()', function () {
                    pager.goToPage(2);
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(2);
                    pager.goToFirstPage();
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(0);
                });

                it('goToLastPage()', function () {

                    pager.goToLastPage();
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(lastPage);

                    // If we set itemsPerPage to 4, then the last
                    // page becomes page 0. Check that this works
                    pager.setItemsPerPage(4);
                    scope.$apply();
                    pager.goToLastPage();
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(0);
                });

                it('goToPrevPage()', function () {
                    pager.goToPage(3);
                    scope.$apply();
                    pager.goToPrevPage();
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(2);
                });

                it('goToNextPage()', function () {
                    pager.goToNextPage();
                    scope.$apply();
                    expect(pager.currentPage()).to.equal(1);
                });
            });

            describe('isEmpty()', function () {
                it('should not be empty', function () {
                    expect(pager.isEmpty()).to.be.false;
                });

                it('should be empty when it has no items', function () {
                    // Update the pager to tell it there are no items
                    pager.newItems((function (pageNumber) {
                        return $q.when({
                            items: [],
                            pageNumber: pageNumber,
                            totalNumberOfItems: 0
                        });
                    })());

                    scope.$apply();
                    expect(pager.isEmpty()).to.be.true;
                });
            });

            describe('setItemsPerPage() -', function () {
                it('should go to page 0 when called', function () {
                    pager.goToPage(3);
                    scope.$apply();

                    pager.setItemsPerPage(2);
                    scope.$apply();
                    expect(pager.isFirstPage()).to.be.true;
                });

                it('should update itemsPerPage only after resolving', function () {
                    pager.setItemsPerPage(2);
                    expect(pager.itemsPerPage).to.equal(1);
                    scope.$apply();
                    expect(pager.itemsPerPage).to.equal(2);
                });

                it('should allow for global stickiness of the user selected itemsPerPage', function () {
                    var firstTable = tracking.createInstance();
                    expect(firstTable.itemsPerPage, 'default check').to.be.eq(200);
                    firstTable.setItemsPerPage(50);
                    scope.$apply();

                    var secondTable = tracking.createInstance();
                    expect(secondTable.itemsPerPage, 'checking second table').to.be.eq(50);

                    firstTable.setItemsPerPage(500);
                    scope.$apply();
                    var thirdTable = tracking.createInstance();
                    expect(thirdTable.itemsPerPage, 'checking third table').to.be.eq(500);
                });

                it('should ignore the user selected itemsPerPage if it is not in itemSizeList', function () {
                    var firstTable = tracking.createInstance({ itemsPerPage: 73 });
                    expect(firstTable.itemsPerPage, 'default check').to.be.eq(73);

                    // switch to 200 and then immediately back to 73
                    firstTable.setItemsPerPage(200);
                    scope.$apply();
                    firstTable.setItemsPerPage(73);
                    scope.$apply();

                    // 73 isn't an option in this new pagination, so it should go back
                    // to the default value of 200
                    expect(tracking.createInstance().itemsPerPage, 'new pagination instance').to.equal(200);

                });

                it('should not persist itemsPerPage if persistItemsPerPage is false', function () {
                    var firstTable = tracking.createInstance({ persistItemsPerPage: false });
                    expect(firstTable.itemsPerPage, 'default check').to.be.eq(200);
                    firstTable.setItemsPerPage(50);
                    scope.$apply();

                    var secondTable = tracking.createInstance();
                    expect(secondTable.itemsPerPage, 'checking second table').to.be.eq(200);

                });

                it('should prefer an explicitly specified itemsPerPage over the globally configured one', function () {
                    pager.setItemsPerPage(50);
                    scope.$apply();

                    var table = tracking.createInstance({ itemsPerPage: 350 });
                    expect(table.itemsPerPage, 'options check').to.be.eq(350);
                });
            });

            it('should check isItemsPerPage()', function () {
                expect(pager.isItemsPerPage(1)).to.be.true;
                expect(pager.isItemsPerPage(2)).to.be.false;
            });
        });
    });
});

describe('service:PageTracking (DEPRECATED)', function () {
    var tracking;
    var rxLocalStorage;

    beforeEach(function () {
        module('encore.ui.utilities');
        inject(function (_PageTracking_, _rxLocalStorage_) {
            tracking = _PageTracking_;
            rxLocalStorage = _rxLocalStorage_;
            rxLocalStorage.clear();
        });
    });

    afterEach(function () {
        rxLocalStorage.clear();
    });

    it('Should override default showAll when set', function () {
        expect(tracking.createInstance().showAll).to.be.false;
        expect(tracking.createInstance({ showAll: true }).showAll).to.be.true;
        expect(tracking.createInstance({ showAll: false }).showAll).to.be.false;
    });

    it('Should override default itemsPerPage', function () {
        expect(tracking.createInstance().itemsPerPage).to.be.eq(200);
        expect(tracking.createInstance({ itemsPerPage: 15 }).itemsPerPage).to.be.eq(15);
        expect(tracking.createInstance({ itemsPerPage: 55 }).itemsPerPage).to.be.eq(55);
    });

    it('should add itemsPerPage to the itemSizeList if it is not present', function () {
        expect(tracking.createInstance().itemSizeList).to.not.contain(45);
        expect(tracking.createInstance({ itemsPerPage: 45 }).itemSizeList).to.contain(45);
    });

    describe('pager methods -', function () {
        var $q, scope, pager, getItems, spy, lastPage, itemsPerPage;

        beforeEach(function () {
            inject(function (_$q_, $rootScope) {
                $q = _$q_;
                scope = $rootScope.$new();
            });

            getItems = function (pageNumber) {
                return $q.when({
                    items: [{ name: 'abc' }, { name: 'def' }, { name: 'ghi' }, { name: 'jkl' }],
                    pageNumber: pageNumber,
                    totalNumberOfItems: 4
                });
            };
            itemsPerPage = 1;
            lastPage = 4 / itemsPerPage - 1;
            pager = tracking.createInstance({ itemsPerPage: itemsPerPage });
            spy = sinon.spy(getItems);
            pager.updateItemsFn(spy);
            pager.goToPage(0, { forceCacheUpdate: true });
            scope.$apply();

            // reset the spy here so we don't accidentally catch
            // the goToPage(0);
            spy.reset();
        });

        describe('newItems - ', function () {
            it('should update the pager on response', function () {
                var updateCache = true;
                pager.newItems(getItems(0), updateCache);
                scope.$apply();
                expect(pager.currentPage(), 'currentPage()').to.equal(0);
                expect(pager.total, 'total').to.equal(4);
                expect(pager.items, 'items').to.deep.equal([{ name: 'abc' }]);
            });
        });

        describe('goToPage', function () {
            it('should not call getItems() for cached pages', function () {
                pager.goToPage(1);
                scope.$apply();
                expect(pager.currentPage(), 'currentPage()').to.equal(1);
                expect(spy.callCount).to.equal(0);
            });

            it('should call getItems() if we request outside of cached pages', function () {
                pager.goToPage(5);
                scope.$apply();
                expect(pager.currentPage(), 'currentPage()').to.equal(5);
                expect(spy.callCount).to.equal(1);
            });

            it('should use custom itemsPerPage value over the stored one', function () {
                pager.goToPage(5, { itemsPerPage: 100 });
                scope.$apply();

                // SHould not have changed stored itemsPerPage
                expect(pager.itemsPerPage).to.equal(1);

                // Should have sent request for 100 items
                expect(spy.getCall(0).args[1]).to.equal(100);
            });

            it('should force a call to getItems() when forceCacheUpdate is set', function () {
                pager.goToPage(0, { forceCacheUpdate: true });
                scope.$apply();
                expect(spy.callCount).to.equal(1);
            });
        });

        describe('refresh() -', function () {
            it('should go to page 0 with a forced cache update', function () {
                pager.goToPage(1);
                scope.$apply();

                pager.refresh();
                scope.$apply();
                expect(pager.currentPage()).to.equal(0);
                expect(spy.callCount).to.equal(1);
            });

            it('should stay on current page when stayOnCurrentPage is true', function () {
                pager.goToPage(1);
                scope.$apply();

                var stayOnCurrentPage = true;
                pager.refresh(stayOnCurrentPage);
                scope.$apply();
                expect(pager.currentPage()).to.equal(1);
                expect(spy.callCount).to.equal(1);
            });
        });

        describe('isFirstPage', function () {
            it('should return true on the first page', function () {
                expect(pager.isFirstPage()).to.be.true;
            });

            it('should return false after going to a different page', function () {
                pager.goToPage(1);
                scope.$apply();
                expect(pager.isFirstPage()).to.be.false;
            });
        });

        describe('isLastPage', function () {
            it('should return false on the first page', function () {
                expect(pager.isLastPage()).to.be.false;
            });

            it('should return true after going to the last page', function () {
                pager.goToPage(lastPage);
                scope.$apply();
                expect(pager.isLastPage()).to.be.true;
            });
        });

        describe('isPage', function () {
            it('should return true for n=0', function () {
                expect(pager.isPage(0)).to.be.true;
            });

            it('should return true for n=1', function () {
                expect(pager.isPage(1)).to.be.false;
            });
        });

        describe('isPageNTheLastPage', function () {
            it('should return false for n=1', function () {
                expect(pager.isPageNTheLastPage(1)).to.be.false;
            });

            it('should return true for lastPage', function () {
                expect(pager.isPageNTheLastPage(lastPage)).to.be.true;
            });
        });

        describe('currentPage', function () {
            it('should return 0 before changing pages', function () {
                expect(pager.currentPage()).to.equal(0);
            });

            it('should return 2 after going to page 2', function () {
                pager.goToPage(2);
                scope.$apply();
                expect(pager.currentPage()).to.equal(2);
            });
        });

        describe('page changes -', function () {
            it('goToFirstPage()', function () {
                pager.goToPage(2);
                scope.$apply();
                expect(pager.currentPage()).to.equal(2);
                pager.goToFirstPage();
                scope.$apply();
                expect(pager.currentPage()).to.equal(0);
            });

            it('goToLastPage()', function () {

                pager.goToLastPage();
                scope.$apply();
                expect(pager.currentPage()).to.equal(lastPage);

                // If we set itemsPerPage to 4, then the last
                // page becomes page 0. Check that this works
                pager.setItemsPerPage(4);
                scope.$apply();
                pager.goToLastPage();
                scope.$apply();
                expect(pager.currentPage()).to.equal(0);
            });

            it('goToPrevPage()', function () {
                pager.goToPage(3);
                scope.$apply();
                pager.goToPrevPage();
                scope.$apply();
                expect(pager.currentPage()).to.equal(2);
            });

            it('goToNextPage()', function () {
                pager.goToNextPage();
                scope.$apply();
                expect(pager.currentPage()).to.equal(1);
            });
        });

        describe('isEmpty()', function () {
            it('should not be empty', function () {
                expect(pager.isEmpty()).to.be.false;
            });

            it('should be empty when it has no items', function () {
                // Update the pager to tell it there are no items
                pager.newItems((function (pageNumber) {
                    return $q.when({
                        items: [],
                        pageNumber: pageNumber,
                        totalNumberOfItems: 0
                    });
                })());

                scope.$apply();
                expect(pager.isEmpty()).to.be.true;
            });
        });

        describe('setItemsPerPage() -', function () {
            it('should go to page 0 when called', function () {
                pager.goToPage(3);
                scope.$apply();

                pager.setItemsPerPage(2);
                scope.$apply();
                expect(pager.isFirstPage()).to.be.true;
            });

            it('should update itemsPerPage only after resolving', function () {
                pager.setItemsPerPage(2);
                expect(pager.itemsPerPage).to.equal(1);
                scope.$apply();
                expect(pager.itemsPerPage).to.equal(2);
            });

            it('should allow for global stickiness of the user selected itemsPerPage', function () {
                var firstTable = tracking.createInstance();
                expect(firstTable.itemsPerPage, 'default check').to.be.eq(200);
                firstTable.setItemsPerPage(50);
                scope.$apply();

                var secondTable = tracking.createInstance();
                expect(secondTable.itemsPerPage, 'checking second table').to.be.eq(50);

                firstTable.setItemsPerPage(500);
                scope.$apply();
                var thirdTable = tracking.createInstance();
                expect(thirdTable.itemsPerPage, 'checking third table').to.be.eq(500);
            });

            it('should ignore the user selected itemsPerPage if it is not in itemSizeList', function () {
                var firstTable = tracking.createInstance({ itemsPerPage: 73 });
                expect(firstTable.itemsPerPage, 'default check').to.be.eq(73);

                // switch to 200 and then immediately back to 73
                firstTable.setItemsPerPage(200);
                scope.$apply();
                firstTable.setItemsPerPage(73);
                scope.$apply();

                // 73 isn't an option in this new pagination, so it should go back
                // to the default value of 200
                expect(tracking.createInstance().itemsPerPage, 'new pagination instance').to.equal(200);

            });

            it('should not persist itemsPerPage if persistItemsPerPage is false', function () {
                var firstTable = tracking.createInstance({ persistItemsPerPage: false });
                expect(firstTable.itemsPerPage, 'default check').to.be.eq(200);
                firstTable.setItemsPerPage(50);
                scope.$apply();

                var secondTable = tracking.createInstance();
                expect(secondTable.itemsPerPage, 'checking second table').to.be.eq(200);

            });

            it('should prefer an explicitly specified itemsPerPage over the globally configured one', function () {
                pager.setItemsPerPage(50);
                scope.$apply();

                var table = tracking.createInstance({ itemsPerPage: 350 });
                expect(table.itemsPerPage, 'options check').to.be.eq(350);
            });
        });

        it('should check isItemsPerPage()', function () {
            expect(pager.isItemsPerPage(1)).to.be.true;
            expect(pager.isItemsPerPage(2)).to.be.false;
        });
    });
});
