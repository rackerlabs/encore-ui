angular.module('demoApp')
.controller('modalRegularCtrl', function ($scope, rxNotify) {
    $scope.password = 'guest';

    $scope.populate = function (modalScope) {
        modalScope.user = 'hey_dude';
    };

    $scope.changePass = function (fields) {
        $scope.password = fields.password;
        rxNotify.add('Password Updated!', {
            type: 'success'
        });
    };

    $scope.notifyDismissal = function () {
        rxNotify.add('Password Unchanged', {
            type: 'info'
        });
    };
});
