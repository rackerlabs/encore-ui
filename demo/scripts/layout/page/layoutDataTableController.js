angular.module('demoApp')
.controller('layoutDataTableCtrl', function ($scope, rxPageTracker) {
    $scope.pager = rxPageTracker.createInstance();
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain', number: 1, status: 'ACTIVE' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover', number: 2, status: 'DISABLED' },
        { name: 'Kevin Lamping', occupation: 'Framework Father', number: 3, status: 'ERROR' },
        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff', number: 4, status: 'INFO' },
        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane', number: 5, status: 'WARNING' },
        { name: 'Chris Cantu', occupation: 'Texan Tornado', number: 6, status: 'PENDING' },
    ];
});
