angular.module('encore.ui', [
    'encore.ui.tpls',
    'ngMessages',
    <%= _.uniq(config.srcModules).join(',\n    ') %>
])
.config(function ($locationProvider) {
    // Angular 1.6 changes the default value of the prefix to '!', this reverts to previous behavior
    // https://github.com/angular/angular.js/commit/aa077e81129c740041438688dff2e8d20c3d7b52
    $locationProvider.hashPrefix('');
});

angular.module('encore.ui.tpls', [
    <%= _.sortBy(_.flatten(config.tplModules)).join(',\n    ') %>
]);
