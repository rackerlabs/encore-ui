angular.module('demoApp')
.controller('formsDisabledExamplesCtrl', function ($scope) {
    $scope.txtDisabled = 'Disabled Text Input';
    $scope.selDisabled = 'disabled';
    $scope.radDisabled = 1;
    $scope.chkDisabledOne = true;
    $scope.chkDisabledTwo = false;
    $scope.togDisabledOn = true;
    $scope.togDisabledOff = false;
    $scope.txtAreaDisabled = 'Disabled Textarea';
});
