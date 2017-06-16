angular.module('demoApp')
.controller('radioDocsCtrl', function ($scope) {
    $scope.validEnabled = 1;
    $scope.validDisabled = 1;
    $scope.validNgDisabled = 1;

    $scope.invalidEnabled = 1;
    $scope.invalidDisabled = 1;
    $scope.invalidNgDisabled = 1;

    $scope.plainHtmlRadio = 'isChecked';
});
