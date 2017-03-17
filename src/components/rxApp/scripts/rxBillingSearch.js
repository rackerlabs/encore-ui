angular.module('encore.ui.rxApp')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name rxApp.directive:rxBillingSearch
 * @restrict E
 * @description [TBD]
 */
.directive('rxBillingSearch', function ($location, $window, $injector, encoreRoutes, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: rxBillingSearch will be removed in EncoreUI 4.0.0'
        );
    }

    return {
        templateUrl: 'templates/rxBillingSearch.html',
        restrict: 'E',
        link: function (scope) {
            scope.searchType = 'bsl';
            scope.$watch('searchType', function () {
                scope.placeholder = scope.searchType === 'bsl' ? 'Transaction or Auth ID' : 'Account or Contact Info';
            });
            scope.fetchAccounts = function (searchValue) {
                if (!_.isEmpty(searchValue)) {
                    // Assuming we are already in /billing, we should use $location to prevent a page refresh
                    encoreRoutes.isActiveByKey('billing').then(function (isBilling) {
                        var path = '/search?q=' + searchValue + '&type=' + scope.searchType;
                        if ($injector.has('oriLocationService')) {
                            $injector.get('oriLocationService').setCanvasURL('/billing' + path);
                        } else if (isBilling) {
                            $location.url(path);
                        } else {
                            $window.location = '/billing' + path;
                        }
                    });
                }
            };
        }
    };
});
