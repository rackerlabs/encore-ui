angular.module('demoApp')
.controller('toggleSwitchAsyncCtrl', function ($scope, $timeout, rxNotify) {
    $scope.toggle3 = true;
    $scope.toggle5 = true;

    $scope.attemptChange = function () {
        $scope.loading = true;
        rxNotify.clear('page');
        rxNotify.add('Saving...', {
            loading: true
        });

        // Simulate an API request
        $timeout(function () {
            $scope.loading = false;
            rxNotify.clear('page');
            rxNotify.add('Change saved', {
                type: 'success'
            });
        }, 1000);
    };

    $scope.attemptFailedChange = function (value) {
        $scope.loading5 = true;
        rxNotify.clear('page');
        rxNotify.add('Attempting to activate...', {
            loading: true
        });

        // Simulate a failed API request
        $timeout(function () {
            $scope.loading5 = false;
            rxNotify.clear('page');
            rxNotify.add('Asynchronous operation failed', {
                type: 'error',
            });

            // Reset toggle switch to original value to simulate failed async operation
            $scope.toggle5 = !value;
        }, 1000);
    };
});
