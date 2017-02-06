angular.module('encore.ui.utilities')
/**
 * @ngdoc parameters
 * @name utilities.constant:rxUtcOffsets
 *
 * @description
 * List of known UTC Offset Values
 * See https://en.wikipedia.org/wiki/List_of_UTC_time_offsets
 *
 * Utility service used by {@link elements.directive:rxTimePicker rxTimePicker}.
 */
.constant('rxUtcOffsets', [
    '-12:00',
    '-11:00',
    '-10:00',
    '-09:30',
    '-09:00',
    '-08:00',
    '-07:00',
    '-06:00',
    '-05:00',
    '-04:30',
    '-04:00',
    '-03:30',
    '-03:00',
    '-02:00',
    '-01:00',
    '+00:00',
    '+01:00',
    '+02:00',
    '+03:00',
    '+03:30',
    '+04:00',
    '+04:30',
    '+05:00',
    '+05:30',
    '+05:45',
    '+06:00',
    '+06:30',
    '+07:00',
    '+08:00',
    '+08:30',
    '+08:45',
    '+09:00',
    '+09:30',
    '+10:00',
    '+10:30',
    '+11:00',
    '+12:00',
    '+12:45',
    '+13:00',
    '+14:00',
])

/**
 * @deprecated
 * Please use rxUtcOffsets instead. This item will be removed on the 4.0.0 release.
 * @ngdoc parameters
 * @name utilities.constant:UtcOffsets
 * @requires utilities.constant:rxUtcOffsets
 */
.service('UtcOffsets', function (rxUtcOffsets) {
    console.warn (
        'DEPRECATED: UtcOffsets - Please use rxUtcOffsets. ' +
        'UtcOffsets will be removed in EncoreUI 4.0.0'
    );
    return rxUtcOffsets;
});
