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
 * Please use rxFeedbackApi instead. This item will be removed on the 4.0.0 release.
 * @ngdoc parameters
 * @name utilities.constant:feedbackApi
 * @requires utilities.constant:rxFeedbackApi
 */
.service('feedbackApi', function (rxFeedbackApi) {
    console.warn (
        'DEPRECATED: feedbackApi - Please use rxFeedbackApi. ' +
        'feedbackApi will be removed in EncoreUI 4.0.0'
    );
    return rxFeedbackApi;
});
