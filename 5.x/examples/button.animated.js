angular.module('demoApp')
.controller('buttonAnimatedExampleCtrl', function ($scope, $timeout) {
    $scope.status = {
        loading: false,
        disable: false
    };

    $scope.clickMe = function () {
        $scope.status.loading = true;
        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };
});
