angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxStatusTags
 * @description
 * This provider is primarily used for applications to specify custom status
 * tags, for use with the `status` attributes of `rx-page` and of breadcrumb
 * objects.
 *
 * It also contains `getTag` and `hasTag` run time (vs. config time) methods, but
 * these should rarely, if ever, be needed outside of the framework.
 */
.provider('rxStatusTags', function () {
    var allTags = {
        alpha: {
            class: 'alpha-status',
            text: 'Alpha'
        },
        beta: {
            class: 'beta-status',
            text: 'Beta'
        },
    };
    // Takes an object with `key`, `text` and `class` attributes,
    // and adds it to to the existing set of status values
    this.addStatus = function (config) {
        allTags[config.key] = {
            text: config.text,
            'class': config['class']
        };
    };

    this.$get = function () {
        return {
            // Given a status tag key, return the `text` and `class` specified
            // for the tag
            getTag: function (key) {
                if (_.has(allTags, key)) {
                    return allTags[key];
                }
                return { class: '', text: '' };
            },

            hasTag: function (key) {
                return _.has(allTags, key);
            }
        };
    };
});
