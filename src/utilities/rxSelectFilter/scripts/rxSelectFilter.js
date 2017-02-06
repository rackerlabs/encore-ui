angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxSelectFilter
 * @description
 * A prototype for creating objects that can be used for filtering arrays.
 *
 * ## rxSelectFilter
 * This service exposes an object with single method, `create()`, used to
 * create instances of a `rxSelectFilter`. It is configurable via three options:
 * - `properties`: A list of the properties to create a filter control.
 * Assuming the source data is an array of objects, a property is equivalent to
 * an object's key.
 *
 * - `available` (optional): An object that tracks which options are available
 * for a property.
 * Note that the key of the object matches a value in the `properties` array.
 * - `selected` (optional): An object that tracks which options are selected
 * for a property. It has the same form as the `available` object, but the
 * arrays indicate which options are selected, and as such are strict subsets
 * of their `available` counterparts.
 *
 * ### Option Defaults
 * Every property that is listed in `properties` but not provided as a key
 * to `available` will be automatically populated the first time `applyTo()`
 * (see below) is called.
 * <pre>
 * var filter = rxSelectFilter.create({
 *   properties: ['year']
 * });
 *
 * filter.applyTo([{
 *   eventId: 1,
 *   year: 2013
 * }, {
 *   eventId: 2,
 *   year: 2014
 * }, {
 *   eventId: 3,
 *   year: 2013
 * }]);
 * // filter.available is { year: [2013, 2014] }
 * </pre>
 * **Note:** There is an implied requirement that, when relying on the
 * auto-populated filter, the input array will have at least one item for every
 * available option. For example, this may not be the case when used with
 * server-side pagination.
 *
 * Every property that is listed in `properties` but not provided as a key to
 * `selected` is initialized to have all options selected (by looking them up
 * in `available`).  If property is also not provided to `available`, its
 * initialization is delayed until the first call of `applyTo()`.
 *
 * <pre>
 * var filter = rxSelectFilter.create({
 *   properties: ['year'],
 *   available: {
 *       year: [2013, 2014, 2015]
 *   }
 * });
 * // filter.selected is { year: [2013, 2014, 2015] }
 * </pre>
 *
 * ### Instances
 * Instances of `rxSelectFilter` have an `applyTo()` method, which applies the
 * filter's internal state of selected options to the array. This will not
 * often be called directly, but instead used by the
 * {@link utilities.filter:Apply Apply} filter. As stated previously,
 * the first call of `applyTo()` will initialize any
 * `properties` that have not been defined in `available` or `selected`.
 * <pre>
 * var filter = rxSelectFilter.create({
 *   properties: ['year'],
 *   selected: {
 *      year: [2014]
 *     }
 * });
 *
 * var filteredArray = filter.applyTo([{
 *   eventId: 1,
 *   year: 2013
 * }, {
 *   eventId: 2,
 *   year: 2014
 * }, {
 *   eventId: 3,
 *   year: 2013
 * }]);
 * // filteredArray is [{ eventId: 2, year: 2014 }]
 * </pre>
 *
 * The instance will also have all of the constructor options as public
 * properties, so that they can be watched or changed.
 *
 */
.service('rxSelectFilter', function () {
    return {
       /**
        * @ngdoc method
        * @name create
        * @methodOf utilities.service:rxSelectFilter
        * @param {Object} options
        * Options object
        * @param {Object} options.properties
        * A list of the properties to create a filter control. Assuming the
        * source data is an array of objects, a property is equivalent to an
        * object's key.
        * <pre>
        * rxSelectFilter.create({
        *      properties: ['year']
        * });
        * </pre>
        * @param {Object=} options.available
        * An object that tracks which options are available for a property.
        * <pre>
        * rxSelectFilter.create({
        *     // other options...
        *     available: {
        *        year: [2013, 2014, 2015],
        *       }
        * });
        * </pre>
        * @param {Object=} options.selected
        * An object that tracks which options are selected for a property.
        * It has the same form as the `available` object, but the arrays indicate
        * which options are selected, and as such are strict subsets of their
        * `available` counterparts.
        * <pre>
        * rxSelectFilter.create({
        *     // other options...
        *     selected: {
        *         year: [2014],
        *       }
        * });
        * </pre>
        */
        create: function (options) {
            options = _.defaults(options, {
                properties: [],
                available: {},
                selected: _.isUndefined(options.available) ? {} : _.cloneDeep(options.available)
            });

            var filter = _.cloneDeep(options);

            var firstRun = true;

            function init (list) {
                filter.properties.forEach(function (property) {
                    if (_.isUndefined(filter.available[property])) {
                        filter.available[property] = _.uniq(_.map(list, property));
                    }

                    // Check `options.selected` instead of `filter.selected` because the latter
                    // is used as the model for `<rx-multi-select>`, which initializes its
                    // model to an empty array. However, the intent is select all options
                    // initially when left unspecified (preferred default behavior).
                    if (_.isUndefined(options.selected[property])) {
                        filter.selected[property] = _.clone(filter.available[property]);
                    }
                });
            }

            function isItemValid (item) {
                return filter.properties.every(function (property) {
                    return _.includes(filter.selected[property], item[property]);
                });
            }

            filter.applyTo = function (list) {
                if (firstRun) {
                    firstRun = false;
                    init(list);
                }
                return list.filter(isItemValid);
            };

            return filter;
        }
    };
})

/**
 * @deprecated
 * Please use rxSelectFilter instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:SelectFilter
 * @requires utilities.service:rxSelectFilter
 */
.service('SelectFilter', function (rxSelectFilter) {
    console.warn(
        'DEPRECATED: SelectFilter - Please use rxSelectFilter. ' +
        'SelectFilter will be removed in EncoreUI 4.0.0'
    );
    return rxSelectFilter;
});;
