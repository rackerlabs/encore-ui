angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxMultiMap
 * @description
 * A helper, internal data structure that stores all references attached to key
 */
.factory('rxMultiMap', function () {
    return {
        createNew: function () {
            var map = {};

            return {
                entries: function () {
                    return Object.keys(map).map(function (key) {
                        return {
                            key: key,
                            value: map[key]
                        };
                    });
                },
                get: function (key) {
                    return map[key];
                },
                hasKey: function (key) {
                    return !!map[key];
                },
                keys: function () {
                    return Object.keys(map);
                },
                put: function (key, value) {
                    if (!map[key]) {
                        map[key] = [];
                    }

                    map[key].push(value);
                },
                remove: function (key, value) {
                    var values = map[key];

                    if (!values) {
                        return;
                    }

                    var idx = values.indexOf(value);

                    if (idx !== -1) {
                        values.splice(idx, 1);
                    }

                    if (!values.length) {
                        delete map[key];
                    }
                }
            };
        }
    };
});
