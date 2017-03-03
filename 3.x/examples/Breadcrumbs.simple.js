angular.module('demoApp')
.controller('breadcrumbsSimpleCtrl', function ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '#/elements',
        name: 'Elements',
    }, {
        name: '<strong>All Elements</strong>',
        status: 'demo'
    }]);
});
