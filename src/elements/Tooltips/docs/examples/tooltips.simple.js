angular.module('demoApp')
.controller('tooltipsSimpleExampleCtrl', function ($scope) {
    $scope.dynamicTooltip = 'I was defined in the controller!';
    $scope.htmlTooltip = '<span class="tooltip-header">A Tooltip Title</span><p>You can use HTML</p>';
});
