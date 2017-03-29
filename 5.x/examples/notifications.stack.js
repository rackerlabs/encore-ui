angular.module('demoApp')
.controller('notificationsStackCtrl', function ($rootScope, $scope, $window, rxNotify) {
    $scope.message = 'My message';

    $scope.types = [ 'info', 'success', 'warning', 'error' ];

    $scope.options = {
        type: 'info',
        timeout: -1,
        show: 'immediate',
        repeat: true
    };

    $scope.ondismiss = {
        should: false,
        method: function (msg) {
            $window.alert('We are dismissing the message: ' + msg.text);
        }
    };

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);

        if ($scope.ondismiss.should) {
            messageOptions.ondismiss = $scope.ondismiss.method;
        }

        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    // add a default messages (to custom stack so they don't show on the main page)
    rxNotify.add('Helpful Information', {
        stack: 'demo'
    });
    rxNotify.add('Loading', {
        loading: true,
        stack: 'demo'
    });
    rxNotify.add('You did it!', {
        type: 'success',
        stack: 'demo'
    });
    rxNotify.add('Careful now...', {
        type: 'warning',
        stack: 'demo'
    });
    rxNotify.add('Under Attack by Aliens', {
        type: 'error',
        stack: 'custom'
    });

});
