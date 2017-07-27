angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:routesCdnPath
 * @description
 * `routesCdnPath` is configured as a `.provider`. This is to allow users to override the URL used when in a
 * local/staging environment.
 *
 * The main reason for that is to let people test local versions of
 * [the encore-ui-nav JSON file](https://github.com/rackerlabs/encore-ui-nav/blob/staging/src/encoreNav.json)
 * before submitting pull requests to that repository.
 *
 * For example, to point to a local `mynav.json` file, put the following into your `app.js`:
 *
 * <pre>
 * .config(function (otherdependencies, ..., routesCdnPathProvider) {
 *     // Other config stuff you need to do
 *     routesCdnPathProvider.customURL = 'mynav.json';
 * });
 * </pre>
 *
 * The `mynav.json` file will likely have to live in your `app/` folder, depending
 * on your configuration.
 *
 * If you do set `customURL` to a non `null` value, then `routesCdnPath.hasCustomURL`
 * will automatically get set to `true`. `hasCustomURL` is intended only for the framework
 * to use, but we are documenting it in case you find your own use case for it.
 *
 */
.provider('routesCdnPath', function () {
    this.customURL = null;

    this.$get = function () {
        var staging = this.customURL ||
            'https://5593626d69acc4cdb66a-521ce2b7cdb9308893eabb7915d88c0c.ssl.cf1.rackcdn.com/encoreNav.json';

        var production =
            'https://d5b31243886503cdda55-92f888f8ef3e8464bcb65f52330fcbfb.ssl.cf1.rackcdn.com/encoreNav.json';

        var preprod =
            'https://b24ad15095637d2f91ee-ae6903de16cd565a74a9a50d287ad33f.ssl.cf1.rackcdn.com/encoreNav.json';

        return {
            production: production,
            staging: staging,
            preprod: preprod,
            hasCustomURL: !_.isEmpty(this.customURL)
        };
    };
});
