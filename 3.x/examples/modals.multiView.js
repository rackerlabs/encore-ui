angular.module('demoApp')
.controller('modalMultiViewCtrl', function ($scope, $modalInstance, $timeout, rxNotify) {
    var complete = function () {
        $scope.loaded = true;
        $scope.setState('complete');
        rxNotify.add('Operation Success!', {
            stack: 'modal',
            type: 'success'
        });
    };

    $scope.submit = function () {
        $scope.setState('confirm');
    };

    $scope.confirm = function () {
        $scope.loaded = false;
        $scope.setState('pending');
        rxNotify.add('Performing Operation...', {
            stack: 'modal',
            loading: true,
            dismiss: [$scope, 'loaded']
        });
        $timeout(complete, 2000);
    };

    $scope.cancel = function () {
        rxNotify.clear('modal');

        /*
         * You may place custom dismiss logic here,
         * if you do not wish to use a `dismiss-hook` function.
         **/

        // This must be called to dismiss the modal.
        $modalInstance.dismiss();
    };
});
