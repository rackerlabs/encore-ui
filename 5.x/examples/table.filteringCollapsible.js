angular.module('demoApp')
.controller('tableFilteringCollapsibleExampleCtrl', function ($scope) {
    $scope.filter = { region: '' };

    $scope.regions = [
        { name: 'DFW', city: 'Dallas-Fort Worth' }, { name: 'ORD', city: 'Chicago' },
        { name: 'IAD', city: 'Northern Virginia' }, { name: 'LON', city: 'London' },
        { name: 'HKG', city: 'Hong Kong' }, { name: 'SYD', city: 'Sydney' }
    ];

    $scope.servers = [
        { name: 'General1-1', ram: '1 GB', cpu: 1, disk: '20GB SSD', region: 'DFW' },
        { name: 'General1-2', ram: '2 GB', cpu: 2, disk: '40GB SSD', region: 'ORD' },
        { name: 'General1-4', ram: '4 GB', cpu: 4, disk: '80GB SSD', region: 'IAD' },
        { name: 'General1-8', ram: '8 GB', cpu: 8, disk: '160GB SSD', region: 'LON' },
        { name: 'I/O1-15', ram: '15 GB', cpu: 4, disk: '40GB SSD', region: 'HKG' },
        { name: 'I/O1-30', ram: '30 GB', cpu: 8, disk: '40GB SSD', region: 'SYD' }
    ];
});
