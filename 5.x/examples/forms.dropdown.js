angular.module('demoApp')
.controller('formDropDownDemoCtrl', function ($scope) {
    /* ========== DATA ========== */
    $scope.volumeTypes = [
        {
            'value': 'SATA',
            'label': 'SATA'
        },
        {
            'value': 'SSD',
            'label': 'SSD'
        },
        {
            'value': 'CD',
            'label': 'CD'
        },
        {
            'value': 'DVD',
            'label': 'DVD'
        },
        {
            'value': 'BLURAY',
            'label': 'BLURAY'
        },
        {
            'value': 'TAPE',
            'label': 'TAPE'
        },
        {
            'value': 'FLOPPY',
            'label': 'FLOPPY'
        },
        {
            'value': 'LASERDISC',
            'label': 'LASERDISC'
        },
        {
            'value': 'JAZDRIVE',
            'label': 'JAZDRIVE'
        },
        {
            'value': 'PUNCHCARDS',
            'label': 'PUNCHCARDS'
        },
        {
            'value': 'RNA',
            'label': 'RNA'
        }
    ];

    $scope.services = [
        {
            'value': 'good',
            'label': 'Good Service'
        },
        {
            'value': 'cheap',
            'label': 'Cheap Service'
        },
        {
            'value': 'fast',
            'label': 'Fast Service'
        },
        {
            'value': 'custom',
            'label': 'Custom Service'
        }
    ];
    // select the first type by default
    $scope.volumeType = _.head($scope.volumeTypes).value;
    $scope.selectedServices = [];
});
