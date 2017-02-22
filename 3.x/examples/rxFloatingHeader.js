angular.module('demoApp')
.controller('rxFloatingHeaderCtrl', function ($scope) {
    $scope.data = [
        { name: 'First', value: 1 },
        { name: 'A', value: 2 },
        { name: 'B', value: 3 },
        { name: 'C', value: 4 },
        { name: 'D', value: 5 },
        { name: 'E', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'Middle', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'G', value: 2 },
        { name: 'H', value: 3 },
        { name: 'I', value: 4 },
        { name: 'J', value: 5 },
        { name: 'K', value: 1 },
        { name: 'Last', value: 2 }
    ];
});
