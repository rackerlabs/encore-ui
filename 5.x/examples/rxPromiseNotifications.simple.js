angular.module('demoApp')
.controller('rxPromiseNotificationsSimpleCtrl', function ($scope, rxNotify, rxPromiseNotifications, $q) {

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);

        if ($scope.ondismiss.should) {
            messageOptions.ondismiss = _.clone($scope.ondismiss.method);
        }

        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    rxNotify.add('Helpful Information', {
        stack: 'demo'
    });
    rxNotify.add('Additional Helpful Information', {
        stack: 'demo'
    });

    $scope.addPromise = function () {
        $scope.deferred = $q.defer();

        rxPromiseNotifications.add($scope.deferred.promise, {
            loading: 'Loading Service',
            success: 'Service Succesfully Loaded',
            error: 'Error Loading Service'
        }, 'demo');
    };
});
