angular.module('demoApp')
.controller('rxPermissionSimpleCtrl', function ($scope, rxAuth, rxNotify) {
    rxNotify.add('Respect My Authority!!', {
        stack: 'permission',
        type: 'warning'
    });

    $scope.storeToken = function () {
        rxAuth.storeToken({
            access: {
                user: {
                    roles: [{ name: 'test' }]
                }
            }
        });
    };

    $scope.clearToken = function () {
        rxAuth.logout();
    };
});
