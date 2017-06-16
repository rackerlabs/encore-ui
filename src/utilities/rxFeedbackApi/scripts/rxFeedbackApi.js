angular.module('encore.ui.utilities')
/**
 * @ngdoc parameters
 * @name utilities.constant:rxFeedbackApi
 * @description
 * Provides the feedback URL.
 */
.constant('rxFeedbackApi', '/api/encore/feedback')

/**
 * @deprecated
 * Please use rxFeedbackApi instead. This item will be removed in a future release of EncoreUI.
 * @ngdoc parameters
 * @name utilities.constant:feedbackApi
 * @requires utilities.constant:rxFeedbackApi
 */
.service('feedbackApi', function (rxFeedbackApi, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn (
            'DEPRECATED: feedbackApi - Please use rxFeedbackApi. ' +
            'feedbackApi will be removed in a future release of EncoreUI.'
        );
    }
    return rxFeedbackApi;
});
