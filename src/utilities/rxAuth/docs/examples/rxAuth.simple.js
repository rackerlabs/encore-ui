angular.module('demoApp')
.controller('rxAuthSimpleCtrl', function ($scope, $window, rxAuth) {
    $scope.hasRole = function () {
        $window.alert('Has "superhero" Role? : ' + rxAuth.hasRole('superhero'));
    };

    $scope.isAuthenticated = function () {
        $window.alert('Is Authenticated? : ' + rxAuth.isAuthenticated());
    };
});
