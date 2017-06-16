var _ = require('lodash');

/**
 * @namespace
 * @description Utilities for getting the current or original environment. Can compare either to a list of default
 * environment names, or custom ones of your choosing.
 * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
 */
exports.rxEnvironment = {
    /**
     * @function
     * @description The current environment the user sees. The default is set to something simple and reasonable,
     * but should you find a need to supply your own environments, be sure to have `environments` defined in
     * your protractor conf's params section.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @returns {String}
     * @example
     * browser.get('localhost:9000/home');
     * expect(encore.rxEnvironment.current()).to.eventually.equal('localhost');
     * browser.get('staging.encore.rackspace.com/home');
     * expect(encore.rxEnvironment.current()).to.eventually.equal('staging');
     * browser.get('encore.rackspace.com/home');
     * expect(encore.rxEnvironment.current()).to.eventually.equal('production');
     */
    current: function () {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        var component = this;
        return browser.getCurrentUrl().then(function (url) {
            return component.compare(url);
        });
    },

    /**
     * @function
     * @description The original environment, as defined in the current protractor conf file.
     * Returns a promise to keep the usage consistent with {@link rxEnvironment.current}.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @example
     * browser.get('localhost:9000/home');
     * expect(encore.rxEnvironment.original()).to.eventually.equal('localhost');
     * browser.get('staging.encore.rackspace.com/home');
     * expect(encore.rxEnvironment.original()).to.eventually.equal('localhost');
     */
    original: function () {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        return protractor.promise.fulfilled(this.compare(browser.baseUrl));
    },

    /**
     * @private
     * @function
     * @see rxEnvironment.environments
     * @description Compare the url passed in to the list of environments that exist. This is either the hard coded
     * defaults found in {@link rxEnvironment.environments}, or the ones you choose to include in your conf file
     * under `browser.params.environments`.
     * Many parts of this documentation implicitly accept and return promises, since they are so commonly used.
     * This is not one of those. This needs a string, not a promise. Resolve your own promise first before calling this.
     * @param {String} url - The url, as a string.
     */
    compare: function (url) {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        return _.find(this.environments, function findEnvironment (envName, env) {
            if (_.includes(url, env)) {
                return envName;
            }
        }) || 'production';
    },

    /**
     * @type {Object}
     * @description The default environments used in nearly all encore applications. You can provide your own
     * environments by setting your own in your protractor configuration file as `browser.params.environments`.
     * This object clones the environments found there before filling in any missing entries with reasonable defaults.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @property {String} localhost - 'localhost'
     * @property {String} staging - 'staging'
     * @property {String} preprod - 'preprod'
     * @example
     * // protractor.conf.js
     * params: {
     *     environments: { staging: 'http://198.51.100.24' }
     * }
     * // test.js
     * browser.get('http://198.51.100.24/home');
     * expect(rxEnvironment.isStaging()).to.eventually.be.true;
     */
    environments: _.extend({
        localhost: 'localhost',
        staging: 'staging',
        preprod: 'preprod'
    }, browser.params.environments),

    /**
     * @function
     * @description Whether or not the current environment is in a localhost environment.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @param {Object} [options] - Named arguments.
     * @param {Boolean} [options.useBaseUrl=false] - Set this to `true` to not use the browser's current
     * environment when comparing, instead it will compare it to `protractor.baseUrl`.
     * @returns {Boolean}
     */
    isLocalhost: function (options) {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        return this.confirmEnvironment(options, 'localhost');
    },

    /**
     * @function
     * @description Whether or not the current environment is in a staging environment.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @param {Object} [options] - Named arguments.
     * @param {Boolean} [options.useBaseUrl=false] - Set this to `true` to not use the browser's current
     * environment when comparing, instead it will compare it to `protractor.baseUrl`.
     * @returns {Boolean}
     */
    isStaging: function (options) {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        return this.confirmEnvironment(options, 'staging');
    },

    /**
     * @function
     * @description Whether or not the current environment is in a preproduction environment.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @param {Object} [options] - Named arguments.
     * @param {Boolean} [options.useBaseUrl=false] - Set this to `true` to not use the browser's current
     * environment when comparing, instead it will compare it to `protractor.baseUrl`.
     * @returns {Boolean}
     */
    isPreprod: function (options) {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        return this.confirmEnvironment(options, 'preprod');
    },

    /**
     * @function
     * @description Whether or not the current environment is in a production environment.
     * @deprecated rxEnvironment will be removed in a future release of rxPageObjects.
     * @param {Object} [options] - Named arguments.
     * @param {Boolean} [options.useBaseUrl=false] - Set this to `true` to not use the browser's current
     * environment when comparing, instead it will compare it to `protractor.baseUrl`.
     * @returns {Boolean}
     */
    isProd: function (options) {
        console.warn(
            'DEPRECATED: rxEnvironment will be removed in a future release of rxPageObjects.'
        );
        return this.confirmEnvironment(options, 'production');
    },

    /**
     * @private
     * @description `options` only supports { useBaseUrl: true }. If { useBaseUrl: false }, just leave undefined.
     */
    confirmEnvironment: function (options, environment) {
        var component = this;
        if (options === undefined) {
            options = { useBaseUrl: false };
        }

        return browser.getCurrentUrl().then(function (url) {
            return _.isEqual(component.compare(options.useBaseUrl ? protractor.baseUrl : url), environment);
        });
    }
};
