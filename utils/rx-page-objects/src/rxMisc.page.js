var _ = require('lodash');
var ElementFinder = require('protractor/built/element').ElementFinder;
var ElementArrayFinder = require('protractor/built/element').ElementArrayFinder;

/**
 * @namespace
 */
exports.rxMisc = {
    /**
     * @function
     * @description Equivalent to `browser.actions().mouseDown(elem).mouseUp().perform();`.
     * This function should be used when dealing with odd or unusual behavior while interacting with click events
     * that don't seem to work right. Either the element does not appear to respond to a normal `.click()` call, or
     * the element is responding to more than one click event. This typically happens more often in Firefox than
     * in other browsers.
     * @param {ElementFinder} elem - Element to "slow click".
     * @example
     * it('should click the crazy custom HTML thing that looks like a button but isn\'t', function () {
     *     var crazyButton = $('.button-wrapper[id="userId_"' + browser.params.userId + '"]');
     *     crazyButton.click(); // didn't work!
     *     expect(encore.rxNotify.all.isPresent('You will be redirected', 'success')).to.eventually.be.false;
     *     encore.rxMisc.slowClick(crazyButton);
     *     expect(encore.rxNotify.all.isPresent('You will be redirected', 'success')).to.eventually.be.true;
     * });
     */
    slowClick: function (elem) {
        browser.actions().mouseDown(elem).mouseUp().perform();
    },

    /**
     * @description Accepts an ElementFinder, or an ElementArrayFinder, which can have several locations.
     * Should the list of elements be stacked vertically (say, in a list of table rows),
     * the element with the smallest Y coordinate will be scrolled to.
     * @function
     * @param {ElementFinder|ElementArrayFinder} elem - An element, or a list of elements to scroll to.
     * @param {Object} [options={}] - The options for scrolling to the element.
     * @param {String} [options.elementTargetPoint='top'] -
     * Which point in the element to position when scrolling to it.
     *
     * - **top** : targets the top of the element
     * - **middle** : targets the middle of the element
     * - **bottom** : targets the bottom of the element
     *
     * @param {String} [options.positionOnScreen='top'] -
     * Where to place the point in the element on the screen when scrolling to it.
     *
     * - **top**: position the element target point at the top of the screen
     * - **middle** : position the element target point in the middle of the screen
     * - **bottom** : position the element target point at the bottom of the screen
     *
     * @example
     * var tablePage = {
     *     get tblRows() {
     *         return element.all(by.repeater('row in rows'));
     *     },
     *
     *     isLoading: function () {
     *         return $('.infinite-scrolling.loading');
     *     },
     *
     *     triggerLoad: function () {
     *         // will attempt to put the top of the last row in the middle of the screen
     *         encore.rxMisc.scrollToElement(this.tblRows.get(-1), { positionOnScreen: 'middle' });
     *     }
     * };
     *
     * it('should scroll to the bottom of the table and load more stuff', function () {
     *    browser.ignoreSynchronization = true;
     *    tablePage.triggerLoad();
     *    expect(tablePage.isLoading()).to.eventually.equal(true);
     *    browser.ignoreSynchronization = false;
     * });
     */
    scrollToElement: function (elem, options) {
        if (options === undefined) {
            options = {};
        }

        options = _.defaults(options, {
            elementTargetPoint: 'top', // 'middle', 'bottom'
            positionOnScreen: 'top', // 'middle', 'bottom'
        });

        return protractor.promise.all([elem.getSize(), elem.getLocation()]).then(function (info) {
            var size = info[0];
            var loc = info[1];

            if (_.isArray(loc)) {
                loc = _.minBy(loc, 'y');
            }

            if (_.isArray(size)) {
                size = _.minBy(size, 'height');
            }

            return browser.executeScript('return window.innerHeight;').then(function (height) {
                var positionOnScreen = {
                    top: 0,
                    middle: height / 2,
                    bottom: height
                }[options.positionOnScreen];

                var elementTargetPoint = {
                    top: loc.y,
                    middle: loc.y + size.height / 2,
                    bottom: loc.y + size.height
                }[options.elementTargetPoint];

                var yLocation = elementTargetPoint - positionOnScreen;

                var command = ['window.scrollTo(0, ', yLocation.toString(), ');'].join('');
                browser.executeScript(command);
            });
        });
    },

    /**
     * @function
     * @private
     * @description
     * Unify input from either a location object or an ElementFinder into a promise
     * representing the location attribute (x or y) of either input.
     * Both `transformLocation($('.element'), 'y')` and `transformLocation({x: 20, y: 0}, 'y')`
     * return a promise representing the y value of the resulting (or provided) location object.
     */
    transformLocation: function (elementOrLocation, attribute) {
        if (elementOrLocation instanceof ElementArrayFinder) {
            elementOrLocation = elementOrLocation.first();
        }

        if (elementOrLocation instanceof ElementFinder) {
            var elem = elementOrLocation;
            return elem.getLocation().then(function (loc) {
                return loc[attribute];
            });
        } else {
            var location = elementOrLocation;
            if (_.has(location, attribute)) {
                return protractor.promise.fulfilled(location[attribute]);
            } else {
                return protractor.promise.fulfilled(location);
            }
        }
    }

};
