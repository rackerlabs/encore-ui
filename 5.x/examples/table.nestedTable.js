angular.module('demoApp')
.controller('tableNestedTableExampleCtrl', function ($scope) {
    $scope.people = [
        {
            name: 'Patrick Deuley',
            occupation: 'Design Chaplain',
            pets: [
                {
                    name: 'Shelly',
                    animal: 'Turtle',
                    age: 1
                },
                {
                    name: 'Spike',
                    animal: 'Porcupine',
                    age: 10
                }
            ]
        },
        {
            name: 'Hussam Dawood',
            occupation: 'Cat Lover',
            pets: [
                {
                    name: 'Sassy',
                    animal: 'Cat',
                    age: 6
                }
            ]
        }
    ];
});
