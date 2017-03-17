angular.module('encore.ui.rxApp')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name rxApp.directive:rxAtlasSearch
 * @restrict E
 * @description
 * Used to search accounts for Cloud Atlas
 */
.directive('rxAtlasSearch', function ($window, $injector, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: rxAtlasSearch will be removed in EncoreUI 4.0.0'
        );
    }

    return {
        template: '<rx-app-search placeholder="Search by username..." submit="searchAccounts"></rx-app-search>',
        restrict: 'E',
        link: function (scope) {
            scope.searchAccounts = function (searchValue) {
                if (!_.isEmpty(searchValue)) {
                    var path = '/cloud/' + searchValue + '/servers/';
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
