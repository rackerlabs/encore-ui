angular.module('encore.ui.utilities')
/**
 * @ngdoc parameters
 * @name utilities.value:rxFeedbackTypes
 * @description
 * Provides default feedback types with placeholder text.
 */
.value('rxFeedbackTypes', [
    {
        label: 'Software Bug',
        prompt: 'Bug Description',
        placeholder: 'Please be as descriptive as possible so we can track it down for you.'
    },
    {
        label: 'Incorrect Data',
        prompt: 'Problem Description',
        placeholder: 'Please be as descriptive as possible so we can figure it out for you.'
    },
    {
        label: 'Feature Request',
        prompt: 'Feature Description',
        placeholder: 'Please be as descriptive as possible so we can make your feature awesome.'
    },
    {
        label: 'Kudos',
        prompt: 'What made you happy?',
        placeholder: 'We love to hear that you\'re enjoying Encore! Tell us what you like, and what we can do ' +
            'to make it even better'
    }
])

/**
 * @deprecated
 * Please use rxFeedbackTypes instead. This item will be removed on the 4.0.0 release.
 * @ngdoc parameters
 * @name utilities.value:feedbackTypes
 * @requires utilities.value:rxFeedbackTypes
 */
.service('feedbackTypes', function (rxFeedbackTypes) {
    console.warn (
        'DEPRECATED: feedbackTypes - Please use rxFeedbackTypes. ' +
        'feedbackTypes will be removed in EncoreUI 4.0.0'
    );
    return rxFeedbackTypes;
});
