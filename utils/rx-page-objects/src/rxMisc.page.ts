'use strict';

import * as _ from 'lodash';
import {browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';
import {ILocation} from 'selenium-webdriver';
import {Promise} from './rxComponent';

/**
 * @interface
 */
interface IScrollToElementOptions {
    elementTargetPoint?: string;
    positionOnScreen?: string;
}

type rxMiscLocationSubject = ElementFinder | ElementArrayFinder | ILocation;

/**
 * @class
 */
export namespace rxMisc {
    /**
     * @description Equivalent to `browser.actions().mouseDown(elem).mouseUp().perform();`.
     * This function should be used when dealing with odd or unusual behavior while interacting with click events
     * that don't seem to work right. Either the element does not appear to respond to a normal `.click()` call, or
     * the element is responding to more than one click event. This typically happens more often in Firefox than
     * in other browsers.
     * @example
     * it('should click the crazy custom HTML thing that looks like a button but isn\'t', function () {
     *     var crazyButton = $('.button-wrapper[id="userId_"' + browser.params.userId + '"]');
     *     crazyButton.click(); // didn't work!
     *     expect(encore.rxNotify.all.isPresent('You will be redirected', 'success')).to.eventually.be.false;
     *     encore.rxMisc.slowClick(crazyButton);
     *     expect(encore.rxNotify.all.isPresent('You will be redirected', 'success')).to.eventually.be.true;
     * });
     */
    export function slowClick(elem: ElementFinder): void {
        browser.actions().mouseDown(elem).mouseUp().perform();
    }

    /**
     * @description Accepts an ElementFinder, or an ElementArrayFinder, which can have several locations.
     * Should the list of elements be stacked vertically (say, in a list of table rows),
     * the element with the smallest Y coordinate will be scrolled to.
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
    export function scrollToElement(elem: ElementFinder | ElementArrayFinder, options?: IScrollToElementOptions) {
        if (options === undefined) {
            options = {};
        }

        options = _.defaults(options, {
            elementTargetPoint: 'top', // 'middle', 'bottom'
            positionOnScreen: 'top', // 'middle', 'bottom'
        });

        return promise.all<any>([elem.getSize(), elem.getLocation()]).then(info => {
            // Using 'any' type because TypeScript doesn't understand that info[0] and info[1] might be arrays.
            let size: any = info[0];
            let loc: any = info[1];

            if (_.isArray(size)) {
                size = _.minBy(size, 'height');
            }

            if (_.isArray(loc)) {
                loc = _.minBy(loc, 'y');
            }

            return browser.executeScript('return window.innerHeight;').then(height => {
                let positionOnScreen = {
                    top: 0,
                    middle: height / 2,
                    bottom: height,
                }[options.positionOnScreen];

                let elementTargetPoint = {
                    top: loc.y,
                    middle: loc.y + size.height / 2,
                    bottom: loc.y + size.height,
                }[options.elementTargetPoint];

                let yLocation = elementTargetPoint - positionOnScreen;

                let command = ['window.scrollTo(0, ', yLocation.toString(), ');'].join('');
                browser.executeScript(command);
            });
        });
    }

    /**
     * @description
     * Unify input from either a location object or an ElementFinder into a promise
     * representing the location attribute (x or y) of either input.
     * Both `transformLocation($('.element'), 'y')` and `transformLocation({x: 20, y: 0}, 'y')`
     * return a promise representing the y value of the resulting (or provided) location object.
     */
    export function transformLocation(elementOrLocation: rxMiscLocationSubject, attribute: string): Promise<any> {
        if (elementOrLocation instanceof ElementArrayFinder) {
            elementOrLocation = elementOrLocation.first();
        }

        if (elementOrLocation instanceof ElementFinder) {
            let elem = elementOrLocation;
            return elem.getLocation().then(loc => {
                return loc[attribute];
            });
        } else {
            let location = <ILocation> elementOrLocation;
            if (_.has(location, attribute)) {
                return promise.fulfilled(location[attribute]);
            } else {
                return promise.fulfilled(location);
            }
        }
    }

};
