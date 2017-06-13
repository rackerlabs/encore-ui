angular.module('encore.ui', [
    'ui.bootstrap',
    'encore.ui.tpls',
    'ngMessages',
    <%= _.uniq(config.srcModules).join(',\n    ') %>
])
angular.module('encore.ui.tpls', [
    <%= _.sortBy(_.flatten(config.tplModules)).join(',\n    ') %>
]);
