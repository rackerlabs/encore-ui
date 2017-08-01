/**
 * @namespace
 */
exports.rxAge = {

    /**
     * @function
     * @description A moment date object representing the point in time the `rxAgeString` refers to. This value does
     * not come back as a promise, but is instead a direct value.
     * @param {String} rxAgeString - An age string, representing the time that has passed since a certain datetime.
     * @returns {moment}
     * @example
     * // given the current datetime is January 1st, 1970 at noon UTC.
     * var oneMonthOneDayAgo = new Date('1969-11-31T12:00:00z').valueOf();
     * expect(encore.rxAge.toMoment('1m 1d').valueOf()).to.equal(oneMonthOneDayAgo)
     * expect(encore.rxAge.toMoment('1 month, 1 day').valueOf()).to.equal(oneMonthOneDayAgo)
     */
    toMoment: function (rxAgeString) {
        var rxAge;
        var completeAgePart = /^(\d+)(\s+)?([a-z]+)$/;
        if (!completeAgePart.test(rxAgeString)) {
            // catch both short and long form input. '10 hours, 23 minutes' or '10h 23m'
            if (rxAgeString.indexOf(', ') > -1) {
                rxAge = rxAgeString.split(', ');
            } else {
                rxAge = rxAgeString.split(' ');
            }
        } else {
            // It's a single valid age string.
            rxAge = [rxAgeString];
        }

        var ageParts = _.map(rxAge, function (agePart) {
            // ['10d'] -> ['10d', '10', undefined, 'd']
            var matches = agePart.match(completeAgePart);
            // Duration type goes first, then the duration amount.
            return [matches[3], matches[1]];
        });

        var elapsed = _.fromPairs(ageParts);
        return moment().utc().subtract(elapsed);
    }

};
