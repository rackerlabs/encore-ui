angular.module('demoApp')
.controller('rxLocalStorageSimpleCtrl', function ($scope, $window, rxLocalStorage) {
    $scope.setSideKick = function () {
        rxLocalStorage.setObject('joker', { name: 'Harley Quinn' });
    };

    $scope.getSideKick = function () {
        var sidekick = rxLocalStorage.getObject('joker');
        $window.alert(sidekick.name);
    };
});
