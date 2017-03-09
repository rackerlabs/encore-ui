angular.module('demoApp')
.controller('buttonSimpleCtrl', function ($scope, $timeout) {
    $scope.isLoading = false;

    $scope.login = function () {
        $scope.isLoading = true;

        $timeout(function () {
            $scope.isLoading = false;
        }, 4000);
    };//login()
});
