angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxFloatingHeader
 * @restrict A
 * @description
 *
 *`rxFloatingHeader` is an attribute directive that turns a tableheader into a floating persistent header so that names
 * of columns are still visible, even as a user scrolls down the page. This is based off of the example at
 * http://css-tricks.com/persistent-headers/
 *
 * * To use it, add an `rx-floating-header` attribute to a `table` element.
 *
 * * A common pattern in our products is to place an `<input>` filter at the top of the table, to restrict the items
 * that are displayed. We support this as well, by placing the `<input>` directly inside of the `<thead>` in its
 * own `<tr><th></th></tr>`.
 *
 * * Make sure you set the `colspan` attribute on the filter's `<th>`, to match the number of columns you have.
 *
 * * `rxFloatingHeader` is also fully compatible with {@link elements.directive:rxSortableColumn rxSortableColumn}
 * * and {@link elements.directive:rxPaginate}.
 *
 * @example
 * <pre>
 * <table rx-floating-header>
 *   <thead>
 *     <tr>
 *       <td colspan="2">
 *         <rx-search-box
 *             ng-model="searchText"
 *             rx-placeholder="'Filter by any...'">
 *         </rx-search-box>
 *       </td>
 *     </tr>
 *     <tr>
 *       <th>Column One Header</th>
 *       <th>Column Two Header</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     ...
 *   </tbody>
 * </table>
 * </pre>
 *
 */
.directive('rxFloatingHeader', function ($window, $timeout, rxDOMHelper, debounce) {
    return {
        restrict: 'A',
        controller: function ($scope) {
            this.update = function () {
                // It's possible for a child directive to try to call this
                // before the rxFloatingHeader link function has been run,
                // meaning $scope.update won't have been configured yet
                if (_.isFunction($scope.update)) {
                    $scope.update();
                }
            };

            this.reapply = function () {
                $scope.reapply();
            };
        },
        link: function (scope, table) {
            var header; // thead as angular.element
            var isFloating = false;
            var _window = angular.element($window);
            var _resizeHandler;

            /**
             * @function
             * @description Apply floating elements
             */
            function applyFloat () {
                isFloating = true;
                var fillerRows = [];

                var topOffset = 0;
                _.each(header.find('tr'), function (tr) {
                    var row = angular.element(tr);

                    // Ensure that the rows are offset so they
                    // don't overlap while floating.
                    row.css({ 'top': topOffset.toString() + 'px' });
                    topOffset += parseInt(rxDOMHelper.height(row));

                    // explicitly apply current geometry to all cells in the row
                    _.each(row.find('th'), function (th) {
                        var cell = angular.element(th);

                        var _width = rxDOMHelper.width(cell);
                        if (_width !== 'auto') {
                            cell.css({ 'width': _width });
                        }

                        var _height = rxDOMHelper.height(cell);
                        if (_height !== 'auto') {
                            cell.css({ 'height': _height });
                        }
                    });

                    // generate filler row
                    var fillerRow = row.clone();
                    _.each(fillerRow.find('th'), function (th) {
                        var cell = angular.element(th);
                        // Ensure we're not duplicating header content by
                        // replacing the cell content. The cell inherits
                        // the explicit geometry determined above.
                        cell.html('~');
                    });
                    fillerRows.push(fillerRow);

                    /* float the ORIGINAL row */
                    // Must happen after cloning, or else all header rows would float.
                    row.addClass('rx-floating-header');
                });

                // append filler rows to header to reserve geometry
                _.each(fillerRows, function (row) {
                    header.append(row);
                });
            }//applyFloat()

            /**
             * @function
             * @description Remove floating elements
             * Handles cleanup of unnecessary styles, classes, and elements.
             */
            function removeFloat () {
                isFloating = false;

                _.each(header.find('tr'), function (tr) {
                    var row = angular.element(tr);

                    if (row.hasClass('rx-floating-header')) {
                        // Cleanup classes/CSS
                        row.removeClass('rx-floating-header');
                        row.css({ top: null });

                        _.each(row.find('th'), function (th) {
                            var cell = angular.element(th);
                            cell.css({ width: null });
                        });
                    } else {
                        /* Filler Row */
                        row.remove();
                    }
                });
            }//removeFloat()

            /**
             * @function
             * @description Reapply float for certain scenarios
             *
             * This function is the key to recalculating floating header
             * geometry for various scenarios while headers are already
             * floating.
             */
            function reapplyFloat () {
                if (isFloating) {
                    removeFloat();
                    applyFloat();
                }
            }//reapplyFloat()

            /**
             * @function
             * @description Applys/Removes floating headers
             *
             * **NOTE**: This will not work inside of scrollable elements.
             * It will only float to the top of the page.
             */
            function update () {
                var maxHeight = table[0].offsetHeight;

                if (rxDOMHelper.shouldFloat(table, maxHeight)) {
                    // If we're not floating, start floating
                    if (!isFloating) {
                        applyFloat();
                    }
                } else {
                    // If we're floating, stop floating
                    if (isFloating) {
                        removeFloat();
                    }
                }
            }//update()

            // added to scope to call from controller (if needed)
            scope.reapply = reapplyFloat;
            scope.update = update;

            /* Event Handlers */
            _resizeHandler = debounce(reapplyFloat, 500);
            _window.bind('scroll', update);
            _window.bind('resize', _resizeHandler);

            scope.$on('$destroy', function () {
                _window.unbind('scroll', update);
                _window.unbind('resize', _resizeHandler);
            });

            /*
             * Prepare the table for floating.
             *
             * We have to wrap the setup logic in a $timeout so that
             * rxFloatingHeader can find compiled <input> elements in the header
             * rows to apply dynamic classes. Otherwise, it'll only see the
             * uncompiled markup, and the classes won't be added.
             */
            $timeout(function () {
                header = angular.element(table.find('thead'));

                _.each(header.find('tr'), function (tr) {
                    var row = angular.element(tr);

                    _.each(row.find('th'), function (th) {
                        var cell = angular.element(th);

                        // This has to run on the next digest cycle to
                        // find compiled <input> elements in other directives.
                        var input = cell.find('input');

                        if (input.length) {
                            var type = input.attr('type');
                            if (!type || type === 'text') {
                                cell.addClass('filter-header');
                                input.addClass('filter-box');
                            }
                        }
                    });
                });

                update();
            });//setup logic
        },
    };
});
