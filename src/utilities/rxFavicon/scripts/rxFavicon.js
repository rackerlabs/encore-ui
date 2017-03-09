angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name utilities.directive:rxFavicon
 * @restrict A
 * @scope
 * @description
 * This updates the href of an element, and replaces it with the path to a different image based on the environment.
 *
 * @param {Object} rxFavicon
 * This is a congifuration object for each environment.
 * @param {String=} rxFavicon.staging This defines the favicon file for the staging environment.
 * @param {String=} rxFavicon.local This defines the favicon file for the local environment.
 * @example
 * <pre>
 * <link rel="icon"
 *       type="image/png"
 *       href="favicon.png"
 *       rx-favicon="{ staging: 'staging-favicon.png', local: 'local-favicon.png' }" />
 * </pre>
 */
.directive('rxFavicon', function (rxEnvironment, $parse, $log) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, el, attrs) {
            // parse out the object inside of the rx-favicon attribute
            var favicons = $parse(attrs.rxFavicon)(scope);

            // if favicons isn't properly defined, report a warning and exit
            if (!_.isObject(favicons)) {
                $log.warn('rxFavicon: An object must be passed in to this attribute');
                // exit out of the function
                return false;
            }

            // fallbacks in case staging/local isn't defined
            favicons.prod = el.attr('href');
            favicons.staging = favicons.staging || favicons.prod;
            favicons.local = favicons.local || favicons.staging;
            
            var currentEnv;
            if (rxEnvironment.isLocal()) {
                currentEnv = 'local';
            } else if (rxEnvironment.isPreProd() || rxEnvironment.isUnifiedProd()) {
                currentEnv = 'prod';
            } else {
                currentEnv = 'staging';
            }

            // update href to use new path
            el.attr('href', favicons[currentEnv]);
        }
    };
});
