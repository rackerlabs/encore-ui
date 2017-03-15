'use strict';

import * as _ from 'lodash';
import * as moment from 'moment';
import {rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxAge extends rxComponentElement {

    /**
     * @description A moment date object representing the point in time the `rxAgeString` refers to. This value does
     * not come back as a promise, but is instead a direct value.
     * @example
     * // given the current datetime is January 1st, 1970 at noon UTC.
     * var oneMonthOneDayAgo = new Date('1969-11-31T12:00:00z').valueOf();
     * expect(encore.rxAge.toMoment('1m 1d').valueOf()).to.equal(oneMonthOneDayAgo)
     * expect(encore.rxAge.toMoment('1 month, 1 day').valueOf()).to.equal(oneMonthOneDayAgo)
     */
    static toMoment(rxAgeString: string) {
        let rxAgeParts: string[];
        let completeAgePart = /^(\d+)(\s+)?([a-z]+)$/;
        if (!completeAgePart.test(rxAgeString)) {
            // catch both short and long form input. '10 hours, 23 minutes' or '10h 23m'
            if (rxAgeString.indexOf(', ') > -1) {
                rxAgeParts = rxAgeString.split(', ');
            } else {
                rxAgeParts = rxAgeString.split(' ');
            }
        } else {
            // It's a single valid age string.
            rxAgeParts = [rxAgeString];
        }

        let ageParts = _.map(rxAgeParts, agePart => {
            // ['10d'] -> ['10d', '10', undefined, 'd']
            let matches = (<string> agePart).match(completeAgePart);
            // Duration type goes first, then the duration amount.
            return [matches[3], matches[1]];
        });

        let elapsed = _.fromPairs(ageParts);
        return moment().utc().subtract(elapsed);
    }

};
