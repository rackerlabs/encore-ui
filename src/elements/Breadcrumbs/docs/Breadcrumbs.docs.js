(function () {
    angular
        .module('demoApp')
        .config(function (rxStatusTagsProvider) {
            // Define a custom status tag for use in the rxBreadcrumbs demo
            rxStatusTagsProvider.addStatus({
                key: 'demo',
                class: 'alpha-status',
                text: 'Demo Tag'
            });
        });
})();
