angular.module('demoApp')
.controller('notificationsRouteCtrl', function ($rootScope, $scope, rxNotify) {

    $scope.routeChange = function (stack) {
        $rootScope.$broadcast('$routeChangeStart', {});
        $rootScope.$broadcast('$routeChangeSuccess', {});

        rxNotify.add('Route Changed', {
            stack: stack
        });
    };

});
