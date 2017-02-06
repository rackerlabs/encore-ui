angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxErrorFormatter
 * @description
 * Provides a helper method to parse error objects for `message` and format them
 * as necessary for `rxStatus.setError()`.  See {@link utilities.service:rxStatus rxStatus} Service
 * for more information.
 *
 * # Error Messages Using rxErrorFormatter
 *
 * `rxErrorFormatter` provides a specialized template `error` string
 * with an `object:{}` as the second parameter containing the replacements for
 * the template in the error string.  If in a proper format, the object can be
 * automatically parsed using an `rxErrorFormatter` and displayed to the user.
 *
 * For example:
 *
 * <pre>
 * rxStatus.setError(
 *     'Failed loading browsing history: ${message}',
 *     {
 *         message: 'User has previously cleared their history!'
 *     }
 * );
 * </pre>
 *
 * Please note that the replacement variable `${message}` in the error string
 * maps one-to-one to the keys provided in the the error object.
 *  - One can specify any number of template variables to replace.
 *  - Not providing a balanced list of variables and their replacements will result in a:
 *
 * <pre>
 * ReferenceError: <replacement> is not defined
 * </pre>
 */
.factory('rxErrorFormatter', function () {
    /*
     * formatString is a string with ${message} in it somewhere, where ${message}
     * will come from the `error` object. The `error` object either needs to have
     * a `message` property, or a `statusText` property.
     */
    var buildErrorMsg = function (formatString, error) {
        error = error || {};
        if (!_.has(error, 'message')) {
            error.message = _.has(error, 'statusText') ? error.statusText : 'Unknown error';
        }
        return _.template(formatString)(error);
    };

    return {
        buildErrorMsg: buildErrorMsg
    };
})

/**
 * @deprecated
 * Please use rxErrorFormatter instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:ErrorFormatter
 * @requires utilities.service:rxErrorFormatter
 */
.service('ErrorFormatter', function (rxErrorFormatter) {
    console.warn(
        'DEPRECATED: ErrorFormatter - Please use rxErrorFormatter. ' +
        'ErrorFormatter will be removed in EncoreUI 4.0.0'
    );
    return rxErrorFormatter;
});
