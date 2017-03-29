angular.module('demoApp')
.controller('rxUnsafeRemoveHTMLSimpleCtrl', function ($scope) {
    $scope.sample = 'Sample string <strong>without</strong> <span>HTML tags</span>.';
});
