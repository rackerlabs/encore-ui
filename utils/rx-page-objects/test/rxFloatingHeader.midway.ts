'use strict';

import {expect} from 'chai';
import {$, browser, promise} from 'protractor';
import {ISize, Window} from 'selenium-webdriver';

import {rxMisc} from '../index';

let demoPage = require('../../demo.page');

let yDiff = (e1, e2) => {
    let promises = [
        rxMisc.transformLocation(e1, 'y'),
        rxMisc.transformLocation(e2, 'y'),
    ];

    return promise.all(promises).then(locations => {
        return locations[0] - locations[1];
    });
};

let singleRowTable = {
    isDisplayed () {
        return this.table.isDisplayed();
    },

    get table () {
        return $('rx-example[name="table.floatingHeader"] table');
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

    rowLocation (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getLocation();
    },

    rowSize (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getSize();
    },

};

let multiRowTable = {
    isDisplayed() {
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

    rowLocation (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getLocation();
    },

    rowSize (position) {
        // first, middle or last
        return this.table.$('.' + position + '-row').getSize();
    },

};

let calculateTolerance = location => {
    return {
        lower: location - 2,
        upper: location + 2,
    };
};

let scrollPosition = {
    get x () {
        return browser.executeScript('return window.scrollX;');
    },
    get y () {
        return browser.executeScript('return window.scrollY;');
    },
};

describe('rxFloatingHeader', () => {
    let initialY: number;

    before(() => {
        demoPage.go('#/elements/Tables');
    });

    describe('Single-row floating header at top of table', () => {
        before(() => {
            singleRowTable.trLocation.then(trLocation => {
                initialY = trLocation.y;
            });
        });

        it('should show element', () => {
            expect(singleRowTable.table.isDisplayed()).to.eventually.be.true;
        });

        describe('after scrolling to middle of table', () => {
            before(() => {
                rxMisc.scrollToElement(singleRowTable.tableBody, { elementTargetPoint: 'middle' });
            });

            it('should float header', () => {
                let actual = rxMisc.transformLocation(singleRowTable.trLocation, 'y');
                singleRowTable.rowLocation('middle').then(location => {
                    let t = calculateTolerance(location.y);
                    expect(actual).to.eventually.be.within(t.lower, t.upper);
                });
            });

            describe('after scrolling back to top', () => {
                before(() => {
                    rxMisc.scrollToElement($('body'));
                });

                it('should put the header back', () => {
                    let actual = rxMisc.transformLocation(singleRowTable.tr, 'y');
                    let t = calculateTolerance(initialY);
                    expect(actual).to.eventually.be.within(t.lower, t.upper);
                });
            }); // after scrolling to top
        }); // after scrolling to middle
    }); // Single-row header table

    describe('Multi-row floating header at top of table', () => {
        let windowSize: ISize;
        let window: Window;
        let innerHeight: number;

        before(() => {
            multiRowTable.trLocation.then(trLocation => {
                initialY = trLocation.y;
            });

            // Set the height smaller so the header can float no matter the screen size
            window = browser.driver.manage().window();
            window.getSize().then(size => {
                windowSize = size;
                window.setSize(windowSize.width, 400);
                browser.executeScript('return window.innerHeight').then(height => {
                    innerHeight = height;
                });
            });
        });

        it('should show the table', () => {
            expect(multiRowTable.isDisplayed()).to.eventually.be.true;
        });

        describe('after scrolling the middle of table to the top of the screen', () => {
            before(() => {
                rxMisc.scrollToElement(multiRowTable.tableBody, { elementTargetPoint: 'middle' });
            });

            it('should float the header', () => {
                let actual = rxMisc.transformLocation(multiRowTable.filtersHeader, 'y');
                multiRowTable.rowLocation('middle').then(location => {
                    let t = calculateTolerance(location.y);
                    expect(actual).to.eventually.be.within(t.lower, t.upper);
                });
            });

            it('should have the correct scrolling location', () => {
                let middleRow = multiRowTable.rowLocation('middle');
                rxMisc.transformLocation(middleRow, 'y').then(location => {
                    let t = calculateTolerance(location);
                    expect(scrollPosition.y).to.eventually.be.within(t.lower, t.upper);
                });
            });
        }); // after scrolling to middle of table

        describe('after scrolling past the bottom', () => {
            before(() => {
                rxMisc.scrollToElement($('body'), { elementTargetPoint: 'bottom', positionOnScreen: 'bottom' });
            });

            it('should not float the header', () => {
                let actual = rxMisc.transformLocation(multiRowTable.filtersHeader, 'y');
                expect(actual).to.eventually.equal(initialY);
            });
        });

        describe('after scrolling the middle of table to the middle of the screen', () => {
            before(() => {
                rxMisc.scrollToElement(multiRowTable.tableBody, {
                    elementTargetPoint: 'middle',
                    positionOnScreen: 'middle',
                });
            });

            it('should have the row exactly in the middle of the screen', () => {
                let t = calculateTolerance(innerHeight / 2);
                let middleRowLocation = multiRowTable.rowLocation('middle');
                let yDifference = yDiff(middleRowLocation, scrollPosition.y);
                expect(yDifference).to.eventually.be.within(t.lower, t.upper);
            });

        });

        describe('after scrolling the middle of table to the bottom of the screen', () => {
            before(() => {
                rxMisc.scrollToElement(multiRowTable.tableBody, {
                    elementTargetPoint: 'middle',
                    positionOnScreen: 'bottom',
                });
            });

            it('should be in the correct scrolling location', () => {
                let middleRowLocation = multiRowTable.rowLocation('middle');
                let bottomOffset = innerHeight;
                rxMisc.transformLocation(middleRowLocation, 'y').then(location => {
                    let t = calculateTolerance(location - bottomOffset);
                    expect(scrollPosition.y).to.eventually.be.within(t.lower, t.upper);
                });
            });

        });

        describe('after scrolling the bottom of table to the bottom of the screen', () => {
            before(() => {
                rxMisc.scrollToElement(multiRowTable.tableBody, {
                    elementTargetPoint: 'bottom',
                    positionOnScreen: 'bottom',
                });
            });

            it('should be in the correct scrolling location', () => {
                let lastRowLocation = multiRowTable.rowLocation('last');
                let bottomOffset = innerHeight;
                rxMisc.transformLocation(lastRowLocation, 'y').then(location => {
                    multiRowTable.rowSize('last').then(lastRowSize => {
                        let expectedPosition = location + lastRowSize.height - bottomOffset;
                        let t = calculateTolerance(expectedPosition);
                        expect(scrollPosition.y).to.eventually.be.within(t.lower, t.upper);
                    });
                });
            });

        });

        describe('when given an ElementArrayFinder', () => {
            before(() => {
                rxMisc.scrollToElement(multiRowTable.trs);
            });

            it('should scroll to the first element', () => {
                let header = multiRowTable.filtersHeader;
                expect(yDiff(header, multiRowTable.trs)).to.eventually.equal(0);
            });
        });

        after(() => {
            // Return window to original size
            window.setSize(windowSize.width, windowSize.height);
        });
    }); // Multi-row header table
});
