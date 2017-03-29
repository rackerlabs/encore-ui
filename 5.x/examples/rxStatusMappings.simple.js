angular.module('demoApp')
.controller('rxStatusMappingsSimpleCtrl', function ($scope, rxStatusMappings) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'DISABLED', title: 'DISABLED status' },
        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },
        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },
        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },
        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },
        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },
        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'PENDING'
    });
    rxStatusMappings.mapToInfo('RESCUE');
    rxStatusMappings.mapToWarning('SUSPENDED');
    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);
    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);
    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });
    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');
});
