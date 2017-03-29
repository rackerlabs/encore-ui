angular.module('demoApp')
.controller('tableNestedMetadataExampleCtrl', function ($scope) {
    $scope.people = [
        {
            name: 'Patrick Deuley',
            occupation: 'Design Chaplain',
            pet: {
                name: 'Shelly',
                animal: 'Turtle',
                age: 1
            }
        },
        {
            name: 'Hussam Dawood',
            occupation: 'Cat Lover',
            pet: {
                name: 'Sassy',
                animal: 'Cat',
                age: 6
            }
        }
    ];
});
