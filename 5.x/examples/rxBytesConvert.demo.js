angular.module('demoApp')
.controller('rxBytesConvertCtrl', function ($scope) {
    $scope.sizeGB = 42e10; // 420 GB
    $scope.sizeTB = 125e12; // 125 TB
    $scope.sizePB = 17134e13; // 171.34 PB
});
