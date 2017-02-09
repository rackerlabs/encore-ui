var yDiff = function (e1, e2) {
    var promises = [
        encore.rxMisc.transformLocation(e1, 'y'),
        encore.rxMisc.transformLocation(e2, 'y')
    ];

    return protractor.promise.all(promises).then(function (locations) {
        return locations[0] - locations[1];
    });
};

var singleRowTable = {
    isDisplayed: function () {
        return this.table.isDisplayed();
    },

    get table () {
        return $('table[rx-floating-header].e2e-no-filter');
    },

    get tr () {
        return this.table.$('thead tr:first-of-type');
    },

    get trLocation () {
        return this.tr.getLocation();
    },

    get tableBody () {
        return this.table.$('tbody');
    },

    get tableBodySize () {
        return this.tableBody.getSize();
    },

    rowLocation: function (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getLocation();
    },

    rowSize: function (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getSize();
    }

};

var multiRowTable = {
    isDisplayed: function () {
        return this.table.isDisplayed();
    },

    get table () {
        return $('table[rx-floating-header].e2e-filter');
    },

    get tableBody () {
        return this.table.$('tbody');
    },

    get trs () {
        return this.table.$$('thead tr');
    },

    get trLocation () {
        return this.trs.get(0).getLocation();
    },

    get filtersHeader () {
        return this.trs.get(0);
    },

    get filtersHeaderLocation () {
        return this.filtersHeader.getLocation();
    },

    get filtersHeaderSize () {
        return this.filtersHeader.getSize();
    },

    get titlesHeaderLocation () {
        return this.trs.get(1).getLocation();
    },

    rowLocation: function (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getLocation();
    },

    rowSize: function (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getSize();
    }

};

var calculateTolerance = function (location) {
    return {
        lower: location - 2,
        upper: location + 2
    };
};

var scrollPosition = {
    get x () {
        return browser.executeScript('return window.scrollX;');
    },
    get y () {
        return browser.executeScript('return window.scrollY;');
    }
};

describe('rxFloatingHeader', function () {
    var initialY;

    before(function () {
        demoPage.go('#/elements/Tables');
    });

    describe('Single-row floating header at top of table', function () {
        before(function () {
            singleRowTable.trLocation.then(function (trLocation) {
                initialY = trLocation.y;
            });
        });

        it('should show element', function () {
            expect(singleRowTable.table.isDisplayed()).to.eventually.be.true;
        });

        describe('after scrolling to middle of table', function () {
            before(function () {
                encore.rxMisc.scrollToElement(singleRowTable.tableBody, { elementTargetPoint: 'middle' });
            });

            it('should float header', function () {
                var actual = encore.rxMisc.transformLocation(singleRowTable.trLocation, 'y');
                singleRowTable.rowLocation('middle').then(function (location) {
                    var t = calculateTolerance(location.y);
                    expect(actual).to.eventually.be.within(t.lower, t.upper);
                });
            });

            describe('after scrolling back to top', function () {
                before(function () {
                    encore.rxMisc.scrollToElement($('body'));
                });

                it('should put the header back', function () {
                    var actual = encore.rxMisc.transformLocation(singleRowTable.tr, 'y');
                    var t = calculateTolerance(initialY);
                    expect(actual).to.eventually.be.within(t.lower, t.upper);
                });
            });//after scrolling to top
        });//after scrolling to middle
    });//Single-row header table

    describe('Multi-row floating header at top of table', function () {
        var windowSize;
        var window;
        var innerHeight;

        before(function () {
            multiRowTable.trLocation.then(function (trLocation) {
                initialY = trLocation.y;
            });

            // Set the height smaller so the header can float no matter the screen size
            window = browser.driver.manage().window();
            window.getSize().then(function (size) {
                windowSize = size;
                window.setSize(windowSize.width, 400);
                browser.executeScript('return window.innerHeight').then(function (height) {
                    innerHeight = height;
                });
            });
        });

        it('should show the table', function () {
            expect(multiRowTable.isDisplayed()).to.eventually.be.true;
        });

        describe('after scrolling the middle of table to the top of the screen', function () {
            before(function () {
                encore.rxMisc.scrollToElement(multiRowTable.tableBody, { elementTargetPoint: 'middle' });
            });

            it('should float the header', function () {
                var actual = encore.rxMisc.transformLocation(multiRowTable.filtersHeader, 'y');
                multiRowTable.rowLocation('middle').then(function (location) {
                    var t = calculateTolerance(location.y);
                    expect(actual).to.eventually.be.within(t.lower, t.upper);
                });
            });

            it('should have the correct scrolling location', function () {
                var middleRow = multiRowTable.rowLocation('middle');
                encore.rxMisc.transformLocation(middleRow, 'y').then(function (location) {
                    var t = calculateTolerance(location);
                    expect(scrollPosition.y).to.eventually.be.within(t.lower, t.upper);
                });
            });
        });//after scrolling to middle of table

        describe('after scrolling past the bottom', function () {
            before(function () {
                encore.rxMisc.scrollToElement($('body'), { elementTargetPoint: 'bottom', positionOnScreen: 'bottom' });
            });

            it('should not float the header', function () {
                var actual = encore.rxMisc.transformLocation(multiRowTable.filtersHeader, 'y');
                expect(actual).to.eventually.equal(initialY);
            });
        });

        describe('after scrolling the middle of table to the middle of the screen', function () {
            before(function () {
                encore.rxMisc.scrollToElement(multiRowTable.tableBody, {
                    elementTargetPoint: 'middle',
                    positionOnScreen: 'middle'
                });
            });

            it('should have the row exactly in the middle of the screen', function () {
                var t = calculateTolerance(innerHeight / 2);
                var middleRowLocation = multiRowTable.rowLocation('middle');
                var yDifference = yDiff(middleRowLocation, scrollPosition.y);
                expect(yDifference).to.eventually.be.within(t.lower, t.upper);
            });

        });

        describe('after scrolling the middle of table to the bottom of the screen', function () {
            before(function () {
                encore.rxMisc.scrollToElement(multiRowTable.tableBody, {
                    elementTargetPoint: 'middle',
                    positionOnScreen: 'bottom'
                });
            });

            it('should be in the correct scrolling location', function () {
                var middleRowLocation = multiRowTable.rowLocation('middle');
                var bottomOffset = innerHeight;
                encore.rxMisc.transformLocation(middleRowLocation, 'y').then(function (location) {
                    var t = calculateTolerance(location - bottomOffset);
                    expect(scrollPosition.y).to.eventually.be.within(t.lower, t.upper);
                });
            });

        });

        describe('after scrolling the bottom of table to the bottom of the screen', function () {
            before(function () {
                encore.rxMisc.scrollToElement(multiRowTable.tableBody, {
                    elementTargetPoint: 'bottom',
                    positionOnScreen: 'bottom'
                });
            });

            it('should be in the correct scrolling location', function () {
                var lastRowLocation = multiRowTable.rowLocation('last');
                var bottomOffset = innerHeight;
                encore.rxMisc.transformLocation(lastRowLocation, 'y').then(function (location) {
                    multiRowTable.rowSize('last').then(function (lastRowSize) {
                        var expectedPosition = location + lastRowSize.height - bottomOffset;
                        var t = calculateTolerance(expectedPosition);
                        expect(scrollPosition.y).to.eventually.be.within(t.lower, t.upper);
                    });
                });
            });

        });

        describe('when given an ElementArrayFinder', function () {
            before(function () {
                encore.rxMisc.scrollToElement(multiRowTable.trs);
            });

            it('should scroll to the first element', function () {
                var header = multiRowTable.filtersHeader;
                expect(yDiff(header, multiRowTable.trs)).to.eventually.equal(0);
            });
        });

        after(function () {
            // Return window to original size
            window.setSize(windowSize.width, windowSize.height);
        });
    });//Multi-row header table
});
