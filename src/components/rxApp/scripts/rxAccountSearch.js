angular.module('encore.ui.rxApp')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name rxApp.directive:rxAccountSearch
 * @restrict E
 * @description [TBD]
 */
.directive('rxAccountSearch', function ($window, $injector, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: rxAccountSearch will be removed in EncoreUI 4.0.0'
        );
    }

    return {
        templateUrl: 'templates/rxAccountSearch.html',
        restrict: 'E',
        link: function (scope) {
            scope.fetchAccount = function (searchValue) {
                if (!_.isEmpty(searchValue)) {
                    var path = '/search?term=' + searchValue;
                    if ($injector.has('oriLocationService')) {
                        $injector.get('oriLocationService').setCanvasURL(path);
                    } else {
                        $window.location = path;
                    }
                }
            };
        }
    };
});
