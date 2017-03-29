angular.module('demoApp')
.controller('formsManualSaveExampleController', function ($scope, $timeout, rxNotify) {
    $scope.saving = false;
    $scope.save = function () {
        $scope.saving = true;
        rxNotify.clear('page');
        $timeout(function () {
            $scope.saving = false;
            $scope.lastSaved = Date.now();
            rxNotify.add('Data successfully saved!', {
                type: 'success'
            });
        }, 1000);
    };
});
