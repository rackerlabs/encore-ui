angular.module('demoApp')
.controller('formsInvalidExamplesCtrl', function ($scope) {
    $scope.txtInvalid = 'Invalid text input';
    $scope.selInvalid = 'invalid';
    $scope.radInvalid = 1;
    $scope.chkInvalidOne = true;
    $scope.chkInvalidTwo = false;
    $scope.togInvalidOn = true;
    $scope.togInvalidOff = false;
    $scope.txtAreaInvalid = 'Invalid Value';
});
