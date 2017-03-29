angular.module('demoApp')
.controller('rxPermissionSimpleCtrl', function ($scope, rxSession, rxNotify) {
    rxNotify.add('Respect My Authority!!', {
        stack: 'permission',
        type: 'warning'
    });

    $scope.storeToken = function () {
        rxSession.storeToken({
            access: {
                user: {
                    roles: [{ name: 'test' }]
                }
            }
        });
    };

    $scope.clearToken = function () {
        rxSession.logout();
    };
});
