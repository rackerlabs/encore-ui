angular.module('demoApp')
.controller('rxSessionSimpleCtrl', function ($scope, $window, rxSession) {
    $scope.hasRole = function () {
        $window.alert('Has "superhero" Role? : ' + rxSession.hasRole('superhero'));
    };

    $scope.isAuthenticated = function () {
        $window.alert('Is Authenticated? : ' + rxSession.isAuthenticated());
    };
});
