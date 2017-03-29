angular.module('demoApp')
.controller('rxCompileDemoCtrl', function ($scope) {
    $scope.world = 'wrrrld';
    $scope.myExpression = 'Hello {{world}}';
});
