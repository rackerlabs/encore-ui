angular.module('demoApp')
.controller('rxSessionStorageSimpleCtrl', function ($scope, $window, rxSessionStorage) {
    $scope.setSideKick = function () {
        rxSessionStorage.setItem('Batman', 'Robin');
    };

    $scope.getSideKick = function () {
        $window.alert(rxSessionStorage.getItem('Batman'));
    };
});
