angular.module('demoApp')
.controller('layoutController', function ($scope) {
    $scope.layout = 'row';
    $scope.align = { first: 'center', second: 'middle' };
    $scope.options1 = ['left', 'center', 'right', 'spread', 'justify'];
    $scope.options2 = ['top', 'middle', 'bottom', 'stretch'];

    // Swap the first 3 items in each array and set new value
    $scope.swap = function (option) {

        if ($scope.layout === option) {
            return;
        }

        var swap = $scope.options2.slice(0, 3).concat($scope.options1.slice(3));
        $scope.options2 = $scope.options1.slice(0, 3).concat($scope.options2.slice(3));
        $scope.options1 = swap;
        swap = $scope.options1[$scope.options1.indexOf($scope.align.second)] || 'spread';
        $scope.align.second = $scope.options2[$scope.options2.indexOf($scope.align.first)] || 'stretch';
        $scope.align.first = swap;
    };
});
