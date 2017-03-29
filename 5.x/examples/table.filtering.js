angular.module('demoApp')
.controller('tableFilteringExampleCtrl', function ($scope) {
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover' },
        { name: 'Kevin Lamping', occupation: 'Framework Father' },
        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff' },
        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane' },
        { name: 'Chris Cantu', occupation: 'Texan Tornado' },
    ];
});
