angular.module('encore.ui.rxApp')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name rxApp.directive:rxAppSearch
 * @restrict E
 * @scope
 * @description
 * Creates a search input form for navigation
 *
 * @param {String=} placeholder Title of page
 * @param {*=} model Model to tie input form to (via ng-model)
 * @param {Function=} submit Function to run on submit (model is passed as only argument to function)
 */
.directive('rxAppSearch', function (suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: rxAppSearch will be removed in EncoreUI 4.0.0'
        );
    }

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppSearch.html',
        scope: {
            placeholder: '@?',
            model: '=?',
            submit: '=?',
            pattern: '@?'
        }
    };
});
