'use strict';

import * as _ from 'lodash';
import {browser, ElementArrayFinder, ElementFinder, promise} from 'protractor';
import {ILocation} from 'selenium-webdriver';
import {Promise} from './rxComponent';

/**
 * @interface
 */
export interface IScrollToElementOptions {
    elementTargetPoint?: string;
    positionOnScreen?: string;
}

export type rxMiscLocationSubject = ElementFinder | ElementArrayFinder | ILocation;
export type rxMiscLocationResult = ILocation | number;

/**
 * @class
 */
export namespace rxMisc {
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
    export function scrollToElement(elem: ElementFinder | ElementArrayFinder,
                                    options?: IScrollToElementOptions): Promise<void> {
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

                let command = `window.scrollTo(0, ${yLocation});`;
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
    export function transformLocation(elementOrLocation: rxMiscLocationSubject,
                                      attribute: string): Promise<rxMiscLocationResult> {
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
