angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:$rxTooltip
 * @description
 * Utility service that creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$rxTooltip', function () {
    // The default options tooltip and popover.
    var defaultOptions = {
        placement: 'top',
        placementClassPrefix: '',
        animation: true,
        popupDelay: 0,
        popupCloseDelay: 0,
        useContentExp: false
    };

    // Default hide triggers for each show trigger
    var triggerMap = {
        'mouseenter': 'mouseleave',
        'click': 'click',
        'outsideClick': 'outsideClick',
        'none': ''
    };

    // The options specified to the provider globally.
    var globalOptions = {};

    /**
     * `options({})` allows global configuration of all tooltips in the
     * application.
     *
     *   var app = angular.module( 'App', ['rxTooltip'], function( $rxTooltipProvider ) {
     *     // place tooltips left instead of top by default
     *     $rxTooltipProvider.options( { placement: 'left' } );
     *   });
     */
    this.options = function (value) {
        angular.extend(globalOptions, value);
    };

    /**
     * This allows you to extend the set of trigger mappings available. E.g.:
     *
     *   $rxTooltipProvider.setTriggers( { 'openTrigger': 'closeTrigger' } );
     */
    this.setTriggers = function setTriggers (triggers) {
        angular.extend(triggerMap, triggers);
    };

    /**
     * This is a helper function for translating camel-case to snakeCase.
     */
    function snakeCase (name) {
        var regexp = /[A-Z]/g;
        var separator = '-';
        return name.replace(regexp, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }

    /**
     * Returns the actual instance of the $rxTooltip service.
     * TODO support multiple triggers
     */
    this.$get = function ($window, $compile, $timeout, $document, $rxPosition,
    $interpolate, $rootScope, $parse, rxStackedMap) {
        var openedTooltips = rxStackedMap.createNew();
        $document.on('keyup', keypressListener);

        $rootScope.$on('$destroy', function () {
            $document.off('keyup', keypressListener);
        });

        function keypressListener (e) {
            if (e.which === 27) {
                var last = openedTooltips.top();
                if (last) {
                    last.value.close();
                    last = null;
                }
            }
        }

        return function $rxTooltip (ttType, prefix, defaultTriggerShow, options) {
            options = angular.extend({}, defaultOptions, globalOptions, options);

            /**
             * Returns an object of show and hide triggers.
             *
             * If a trigger is supplied,
             * it is used to show the tooltip; otherwise, it will use the `trigger`
             * option passed to the `$rxTooltipProvider.options` method; else it will
             * default to the trigger supplied to this directive factory.
             *
             * The hide trigger is based on the show trigger. If the `trigger` option
             * was passed to the `$rxTooltipProvider.options` method, it will use the
             * mapped trigger from `triggerMap` or the passed trigger if the map is
             * undefined; otherwise, it uses the `triggerMap` value of the show
             * trigger; else it will just use the show trigger.
             */
            function getTriggers (trigger) {
                var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
                var hide = show.map(function (trigger) {
                    return triggerMap[trigger] || trigger;
                });
                return {
                    show: show,
                    hide: hide
                };
            }

            var directiveName = snakeCase(ttType);

            var startSym = $interpolate.startSymbol();
            var endSym = $interpolate.endSymbol();
            var template =
                '<div ' + directiveName + '-popup ' +
                  'rx-title="' + startSym + 'title' + endSym + '" ' +
                  (options.useContentExp ?
                    'content-exp="contentExp()" ' :
                    'content="' + startSym + 'content' + endSym + '" ') +
                  'origin-scope="origScope" ' +
                  'class="rx-position-measure ' + prefix + '" ' +
                  'tooltip-animation-class="fade"' +
                  'rx-tooltip-classes ' +
                  'ng-class="{ in: isOpen }" ' +
                  '>' +
                '</div>';

            return {
                compile: function () {
                    var tooltipLinker = $compile(template);

                    return function link (scope, element, attrs) {
                        var tooltip;
                        var tooltipLinkedScope;
                        var transitionTimeout;
                        var showTimeout;
                        var hideTimeout;
                        var positionTimeout;
                        var adjustmentTimeout;
                        var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                        var triggers = getTriggers(undefined);
                        var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
                        var ttScope = scope.$new(true);
                        var repositionScheduled = false;
                        var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ?
                            $parse(attrs[prefix + 'IsOpen']) : false;
                        var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
                        var observers = [];
                        var lastPlacement;

                        var positionTooltip = function () {
                            // check if tooltip exists and is not empty
                            if (!tooltip || !tooltip.html()) { return; }

                            if (!positionTimeout) {
                                positionTimeout = $timeout(function () {
                                    var ttPosition = $rxPosition.positionElements
                                        (element, tooltip, ttScope.placement, appendToBody);
                                    var initialHeight = angular.isDefined
                                        (tooltip.offsetHeight) ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                                    var elementPos = appendToBody ? $rxPosition.offset
                                        (element) : $rxPosition.position(element);
                                    tooltip.css({ top: ttPosition.top + 'px', left: ttPosition.left + 'px' });
                                    var placementClasses = ttPosition.placement.split('-');

                                    if (!tooltip.hasClass(placementClasses[0])) {
                                        tooltip.removeClass(lastPlacement.split('-')[0]);
                                        tooltip.addClass(placementClasses[0]);
                                    }

                                    if (!tooltip.hasClass(options.placementClassPrefix + ttPosition.placement)) {
                                        tooltip.removeClass(options.placementClassPrefix + lastPlacement);
                                        tooltip.addClass(options.placementClassPrefix + ttPosition.placement);
                                    }

                                    adjustmentTimeout = $timeout(function () {
                                        var currentHeight = angular.isDefined(tooltip.offsetHeight)
                                            ? tooltip.offsetHeight : tooltip.prop('offsetHeight');
                                        var adjustment = $rxPosition.adjustTop
                                            (placementClasses, elementPos, initialHeight, currentHeight);
                                        if (adjustment) {
                                            tooltip.css(adjustment);
                                        }
                                        adjustmentTimeout = null;
                                    }, 0, false);

                                    // first time through tt element will have the
                                    // rx-position-measure class or if the placement
                                    // has changed we need to position the arrow.
                                    if (tooltip.hasClass('rx-position-measure')) {
                                        $rxPosition.positionArrow(tooltip, ttPosition.placement);
                                        tooltip.removeClass('rx-position-measure');
                                    } else if (lastPlacement !== ttPosition.placement) {
                                        $rxPosition.positionArrow(tooltip, ttPosition.placement);
                                    }
                                    lastPlacement = ttPosition.placement;
                                    positionTimeout = null;
                                }, 0, false);
                            }
                        };

                        // Set up the correct scope to allow transclusion later
                        ttScope.origScope = scope;

                        // By default, the tooltip is not open.
                        // TODO add ability to start tooltip opened
                        ttScope.isOpen = false;

                        function toggleTooltipBind () {
                            if (!ttScope.isOpen) {
                                showTooltipBind();
                            } else {
                                hideTooltipBind();
                            }
                        }

                        // Show the tooltip with delay if specified, otherwise show it immediately
                        function showTooltipBind () {
                            if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                                return;
                            }

                            cancelHide();
                            prepareTooltip();

                            if (ttScope.popupDelay) {
                                // Do nothing if the tooltip was already scheduled to pop-up.
                                // This happens if show is triggered multiple times before any hide is triggered.
                                if (!showTimeout) {
                                    showTimeout = $timeout(show, ttScope.popupDelay, false);
                                }
                            } else {
                                show();
                            }
                        }

                        function hideTooltipBind () {
                            cancelShow();

                            if (ttScope.popupCloseDelay) {
                                if (!hideTimeout) {
                                    hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                                }
                            } else {
                                hide();
                            }
                        }

                        // Show the tooltip popup element.
                        function show () {
                            cancelShow();
                            cancelHide();

                            // Don't show empty tooltips.
                            if (!ttScope.content) {
                                return angular.noop;
                            }

                            createTooltip();

                            // And show the tooltip.
                            ttScope.$evalAsync(function () {
                                ttScope.isOpen = true;
                                assignIsOpen(true);
                                positionTooltip();
                            });
                        }

                        function cancelShow () {
                            if (showTimeout) {
                                $timeout.cancel(showTimeout);
                                showTimeout = null;
                            }

                            if (positionTimeout) {
                                $timeout.cancel(positionTimeout);
                                positionTimeout = null;
                            }
                        }

                        // Hide the tooltip popup element.
                        function hide () {
                            if (!ttScope) {
                                return;
                            }

                            // First things first: we don't show it anymore.
                            ttScope.$evalAsync(function () {
                                if (ttScope) {
                                    ttScope.isOpen = false;
                                    assignIsOpen(false);
                                    // And now we remove it from the DOM. However, if we have animation, we
                                    // need to wait for it to expire beforehand.
                                    // FIXME: this is a placeholder for a port of the transitions library.
                                    // The fade transition in TWBS is 150ms.
                                    if (ttScope.animation) {
                                        if (!transitionTimeout) {
                                            transitionTimeout = $timeout(removeTooltip, 150, false);
                                        }
                                    } else {
                                        removeTooltip();
                                    }
                                }
                            });
                        }

                        function cancelHide () {
                            if (hideTimeout) {
                                $timeout.cancel(hideTimeout);
                                hideTimeout = null;
                            }

                            if (transitionTimeout) {
                                $timeout.cancel(transitionTimeout);
                                transitionTimeout = null;
                            }
                        }

                        function createTooltip () {
                            // There can only be one tooltip element per directive shown at once.
                            if (tooltip) {
                                return;
                            }

                            tooltipLinkedScope = ttScope.$new();
                            tooltip = tooltipLinker(tooltipLinkedScope, function (tooltip) {
                                if (appendToBody) {
                                    $document.find('body').append(tooltip);
                                } else {
                                    element.after(tooltip);
                                }
                            });

                            openedTooltips.add(ttScope, {
                                close: hide
                            });

                            prepObservers();
                        }

                        function removeTooltip () {
                            cancelShow();
                            cancelHide();
                            unregisterObservers();

                            if (tooltip) {
                                tooltip.remove();

                                tooltip = null;
                                if (adjustmentTimeout) {
                                    $timeout.cancel(adjustmentTimeout);
                                }
                            }

                            openedTooltips.remove(ttScope);

                            if (tooltipLinkedScope) {
                                tooltipLinkedScope.$destroy();
                                tooltipLinkedScope = null;
                            }
                        }

                        /**
                         * Set the initial scope values. Once
                         * the tooltip is created, the observers
                         * will be added to keep things in sync.
                         */
                        function prepareTooltip () {
                            ttScope.title = attrs[prefix + 'Title'];
                            if (contentParse) {
                                ttScope.content = contentParse(scope);
                            } else {
                                ttScope.content = attrs[ttType];
                            }

                            ttScope.popupClass = attrs[prefix + 'Class'];
                            ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ?
                                attrs[prefix + 'Placement'] : options.placement;
                            var placement = $rxPosition.parsePlacement(ttScope.placement);
                            lastPlacement = placement[1] ? placement[0] + '-' + placement[1] : placement[0];

                            var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
                            var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
                            ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                            ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
                        }

                        function assignIsOpen (isOpen) {
                            if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                                isOpenParse.assign(scope, isOpen);
                            }
                        }

                        ttScope.contentExp = function () {
                            return ttScope.content;
                        };

                        /**
                         * Observe the relevant attributes.
                         */
                        attrs.$observe('disabled', function (val) {
                            if (val) {
                                cancelShow();
                            }

                            if (val && ttScope.isOpen) {
                                hide();
                            }
                        });

                        if (isOpenParse) {
                            scope.$watch(isOpenParse, function (val) {
                                if (ttScope && !val === ttScope.isOpen) {
                                    toggleTooltipBind();
                                }
                            });
                        }

                        function prepObservers () {
                            observers.length = 0;

                            if (contentParse) {
                                observers.push(
                                    scope.$watch(contentParse, function (val) {
                                        ttScope.content = val;
                                        if (!val && ttScope.isOpen) {
                                            hide();
                                        }
                                    })
                                );

                                observers.push(
                                    tooltipLinkedScope.$watch(function () {
                                        if (!repositionScheduled) {
                                            repositionScheduled = true;
                                            tooltipLinkedScope.$$postDigest(function () {
                                                repositionScheduled = false;
                                                if (ttScope && ttScope.isOpen) {
                                                    positionTooltip();
                                                }
                                            });
                                        }
                                    })
                                );
                            } else {
                                observers.push(
                                    attrs.$observe(ttType, function (val) {
                                        ttScope.content = val;
                                        if (!val && ttScope.isOpen) {
                                            hide();
                                        } else {
                                            positionTooltip();
                                        }
                                    })
                                );
                            }

                            observers.push(
                                attrs.$observe(prefix + 'Title', function (val) {
                                    ttScope.title = val;
                                    if (ttScope.isOpen) {
                                        positionTooltip();
                                    }
                                })
                            );

                            observers.push(
                                attrs.$observe(prefix + 'Placement', function (val) {
                                    ttScope.placement = val ? val : options.placement;
                                    if (ttScope.isOpen) {
                                        positionTooltip();
                                    }
                                })
                            );
                        }

                        function unregisterObservers () {
                            if (observers.length) {
                                angular.forEach(observers, function (observer) {
                                    observer();
                                });
                                observers.length = 0;
                            }
                        }

                        // hide tooltips/popovers for outsideClick trigger
                        function bodyHideTooltipBind (e) {
                            if (!ttScope || !ttScope.isOpen || !tooltip) {
                                return;
                            }
                            // make sure the tooltip/popover link or tool tooltip/popover itself were not clicked
                            if (!element[0].contains(e.target) && !tooltip[0].contains(e.target)) {
                                hideTooltipBind();
                            }
                        }

                        // KeyboardEvent handler to hide the tooltip on Escape key press
                        function hideOnEscapeKey (e) {
                            if (e.which === 27) {
                                hideTooltipBind();
                            }
                        }

                        var unregisterTriggers = function () {
                            triggers.show.forEach(function (trigger) {
                                if (trigger === 'outsideClick') {
                                    element.off('click', toggleTooltipBind);
                                } else {
                                    element.off(trigger, showTooltipBind);
                                    element.off(trigger, toggleTooltipBind);
                                }
                                element.off('keypress', hideOnEscapeKey);
                            });
                            triggers.hide.forEach(function (trigger) {
                                if (trigger === 'outsideClick') {
                                    $document.off('click', bodyHideTooltipBind);
                                } else {
                                    element.off(trigger, hideTooltipBind);
                                }
                            });
                        };

                        function prepTriggers () {
                            var showTriggers = [], hideTriggers = [];
                            var val = scope.$eval(attrs[prefix + 'Trigger']);
                            unregisterTriggers();

                            if (angular.isObject(val)) {
                                Object.keys(val).forEach(function (key) {
                                    showTriggers.push(key);
                                    hideTriggers.push(val[key]);
                                });
                                triggers = {
                                    show: showTriggers,
                                    hide: hideTriggers
                                };
                            } else {
                                triggers = getTriggers(val);
                            }

                            if (triggers.show !== 'none') {
                                triggers.show.forEach(function (trigger, idx) {
                                    if (trigger === 'outsideClick') {
                                        element.on('click', toggleTooltipBind);
                                        $document.on('click', bodyHideTooltipBind);
                                    } else if (trigger === triggers.hide[idx]) {
                                        element.on(trigger, toggleTooltipBind);
                                    } else if (trigger) {
                                        element.on(trigger, showTooltipBind);
                                        element.on(triggers.hide[idx], hideTooltipBind);
                                    }
                                    element.on('keypress', hideOnEscapeKey);
                                });
                            }
                        }

                        prepTriggers();

                        var animation = scope.$eval(attrs[prefix + 'Animation']);
                        ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

                        var appendToBodyVal;
                        var appendKey = prefix + 'AppendToBody';
                        if (appendKey in attrs && attrs[appendKey] === undefined) {
                            appendToBodyVal = true;
                        } else {
                            appendToBodyVal = scope.$eval(attrs[appendKey]);
                        }

                        appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

                        // Make sure tooltip is destroyed and removed.
                        scope.$on('$destroy', function onDestroyTooltip () {
                            unregisterTriggers();
                            removeTooltip();
                            ttScope = null;
                        });
                    };
                }
            };
        };
    };
});
