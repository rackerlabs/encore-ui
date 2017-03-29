angular.module('demoApp')
.controller('formsAutoSaveExampleController', function ($scope, rxAutoSave) {
    $scope.forms = { autosave: '' };
    rxAutoSave($scope, 'forms');
});
