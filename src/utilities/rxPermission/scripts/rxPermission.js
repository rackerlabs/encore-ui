angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name utilities.directive:rxPermission
 * @restrict E
 * @scope
 * @description
 * Simple directive which will show or hide content based on whether or not the user has the specified role.
 *
 * @requires utilities.service:rxSession
 *
 * @param {String} role Name of required role.
 */
.directive('rxPermission', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            role: '@'
        },
        templateUrl: 'templates/rxPermission.html',
        controller: function ($scope, rxSession) {
            $scope.hasRole = function (roles) {
                return rxSession.hasRole(roles);
            };
        }
    };
});
