/* eslint-disable */
angular.module('encore.ui.utilities')
    .controller('rxTypeaheadController',
        function ($scope, $element, $attrs, $compile, $parse, $q, $timeout,
            $document, $window, $rootScope, $$rxDebounce, $rxPosition, rxTypeaheadParser) {

            var originalScope = $scope;
            var element = $element;
            var attrs = $attrs;
            var HOT_KEYS = [9, 13, 27, 38, 40];
            var eventDebounceTime = 200;
            var modelCtrl, ngModelOptions;
            //SUPPORTED ATTRIBUTES (OPTIONS)

            //minimal no of characters that needs to be entered before typeahead kicks-in
            var minLength = originalScope.$eval(attrs.rxTypeaheadMinLength);
            if (!minLength && minLength !== 0) {
                minLength = 1;
            }

            originalScope.$watch(attrs.rxTypeaheadMinLength, function (newVal) {
                minLength = !newVal && newVal !== 0 ? 1 : newVal;
            });

            //minimal wait time after last character typed before typeahead kicks-in
            var waitTime = originalScope.$eval(attrs.rxTypeaheadWaitMs) || 0;

            //should it restrict model values to the ones selected from the popup only?
            var isEditable = originalScope.$eval(attrs.rxTypeaheadEditable) !== false;
            originalScope.$watch(attrs.rxTypeaheadEditable, function (newVal) {
                isEditable = newVal !== false;
            });

            //binding to a variable that indicates if matches are being retrieved asynchronously
            var isLoadingSetter = $parse(attrs.rxTypeaheadLoading).assign || angular.noop;

            //a function to determine if an event should cause selection
            var isSelectEvent = attrs.rxTypeaheadShouldSelect ?
                $parse(attrs.rxTypeaheadShouldSelect) : function (scope, vals) {
                    var evt = vals.$event;
                    return evt.which === 13 || evt.which === 9;
                };

            //a callback executed when a match is selected
            var onSelectCallback = $parse(attrs.rxTypeaheadOnSelect);

            //should it select highlighted popup value when losing focus?
            var isSelectOnBlur = angular.isDefined(attrs.rxTypeaheadSelectOnBlur) ?
                originalScope.$eval(attrs.rxTypeaheadSelectOnBlur) : false;

            //binding to a variable that indicates if there were no results after the query is completed
            var isNoResultsSetter = $parse(attrs.rxTypeaheadNoResults).assign || angular.noop;

            var inputFormatter = attrs.rxTypeaheadInputFormatter ? $parse(attrs.rxTypeaheadInputFormatter) : undefined;

            var appendToBody = attrs.rxTypeaheadAppendToBody ? originalScope.$eval(attrs.rxTypeaheadAppendToBody) : false;

            var appendTo = attrs.rxTypeaheadAppendTo ?
                originalScope.$eval(attrs.rxTypeaheadAppendTo) : null;

            var appendToElementId =  attrs.rxTypeaheadAppendToElementId || false;

            var focusFirst = originalScope.$eval(attrs.rxTypeaheadFocusFirst) !== false;

            //If input matches an item of the list exactly, select it automatically
            var selectOnExact = attrs.rxTypeaheadSelectOnExact ?
                originalScope.$eval(attrs.rxTypeaheadSelectOnExact) : false;

            //binding to a variable that indicates if dropdown is open
            var isOpenSetter = $parse(attrs.rxTypeaheadIsOpen).assign || angular.noop;

            var showHint = originalScope.$eval(attrs.rxTypeaheadShowHint) || false;

            //INTERNAL VARIABLES

            //model setter executed upon match selection
            var parsedModel = $parse(attrs.ngModel);
            var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
            var $setModelValue = function (scope, newValue) {
                if (angular.isFunction(parsedModel(originalScope)) &&
                    ngModelOptions.getOption('getterSetter')) {
                    return invokeModelSetter(scope, {
                        $$$p: newValue
                    });
                }

                return parsedModel.assign(scope, newValue);
            };

            //expressions used by typeahead
            var parserResult = rxTypeaheadParser.parse(attrs.rxTypeahead);

            var hasFocus;

            //Used to avoid bug in iOS webview where iOS keyboard does not fire
            //mousedown & mouseup events
            //Issue #3699
            var selected;

            //create a child scope for the typeahead directive so we are not polluting original scope
            //with typeahead-specific data (matches, query etc.)
            var scope = originalScope.$new();
            var offDestroy = originalScope.$on('$destroy', function () {
                scope.$destroy();
            });
            scope.$on('$destroy', offDestroy);

            // WAI-ARIA
            var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
            element.attr({
                'aria-autocomplete': 'list',
                'aria-expanded': false,
                'aria-owns': popupId
            });

            var inputsContainer, hintInputElem;
            //add read-only input to show hint
            if (showHint) {
                inputsContainer = angular.element('<div></div>');
                inputsContainer.css('position', 'relative');
                element.after(inputsContainer);
                hintInputElem = element.clone();
                hintInputElem.attr('placeholder', '');
                hintInputElem.attr('tabindex', '-1');
                hintInputElem.val('');
                hintInputElem.css({
                    'position': 'absolute',
                    'top': '0px',
                    'left': '0px',
                    'border-color': 'transparent',
                    'box-shadow': 'none',
                    'opacity': 1,
                    'background': 'none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)',
                    'color': '#999'
                });
                element.css({
                    'position': 'relative',
                    'vertical-align': 'top',
                    'background-color': 'transparent'
                });

                if (hintInputElem.attr('id')) {
                    hintInputElem.removeAttr('id'); // remove duplicate id if present.
                }
                inputsContainer.append(hintInputElem);
                hintInputElem.after(element);
            }

            //pop-up element used to display matches
            var popUpEl = angular.element('<div rx-typeahead-popup ></div>');
            popUpEl.attr({
                id: popupId,
                matches: 'matches',
                active: 'activeIdx',
                select: 'select(activeIdx, evt)',
                'move-in-progress': 'moveInProgress',
                query: 'query',
                position: 'position',
                'assign-is-open': 'assignIsOpen(isOpen)',
                'rx-debounce': 'debounceUpdate'
            });
            //custom item template
            if (angular.isDefined(attrs.rxTypeaheadTemplateUrl)) {
                popUpEl.attr('rx-template-url', attrs.rxTypeaheadTemplateUrl);
            }

            if (angular.isDefined(attrs.rxTypeaheadPopupTemplateUrl)) {
                popUpEl.attr('rx-popup-template-url', attrs.rxTypeaheadPopupTemplateUrl);
            }

            var resetHint = function () {
                if (showHint) {
                    hintInputElem.val('');
                }
            };

            var resetMatches = function () {
                scope.matches = [];
                scope.activeIdx = -1;
                element.attr('aria-expanded', false);
                resetHint();
            };

            var getMatchId = function (index) {
                return popupId + '-option-' + index;
            };

            // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
            // This attribute is added or removed automatically when the `activeIdx` changes.
            scope.$watch('activeIdx', function (index) {
                if (index < 0) {
                    element.removeAttr('aria-activedescendant');
                } else {
                    element.attr('aria-activedescendant', getMatchId(index));
                }
            });

            var inputIsExactMatch = function (inputValue, index) {
                if (scope.matches.length > index && inputValue) {
                    return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
                }

                return false;
            };

            var getMatchesAsync = function (inputValue, evt) {
                var locals = {
                    $viewValue: inputValue
                };
                isLoadingSetter(originalScope, true);
                isNoResultsSetter(originalScope, false);
                $q.when(parserResult.source(originalScope, locals)).then(function (matches) {
                    //it might happen that several async queries were in progress if a user were typing fast
                    //but we are interested only in responses that correspond to the current view value
                    var onCurrentRequest = inputValue === modelCtrl.$viewValue;
                    if (onCurrentRequest && hasFocus) {
                        if (matches && matches.length > 0) {
                            scope.activeIdx = focusFirst ? 0 : -1;
                            isNoResultsSetter(originalScope, false);
                            scope.matches.length = 0;

                            //transform labels
                            for (var i = 0; i < matches.length; i++) {
                                locals[parserResult.itemName] = matches[i];
                                scope.matches.push({
                                    id: getMatchId(i),
                                    label: parserResult.viewMapper(scope, locals),
                                    model: matches[i]
                                });
                            }

                            scope.query = inputValue;
                            //position pop-up with matches - we need to re-calculate its position each time
                            //we are opening a window
                            //with matches as a pop-up might be absolute-positioned and position of an input
                            // might have changed on a page
                            //due to other elements being rendered
                            recalculatePosition();

                            element.attr('aria-expanded', true);

                            //Select the single remaining option if user input matches
                            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
                                if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                                    $$rxDebounce(function () {
                                        scope.select(0, evt);
                                    }, angular.isNumber(scope.debounceUpdate) ?
                                        scope.debounceUpdate : scope.debounceUpdate['default']);
                                } else {
                                    scope.select(0, evt);
                                }
                            }

                            if (showHint) {
                                var firstLabel = scope.matches[0].label;
                                if (angular.isString(inputValue) &&
                                    inputValue.length > 0 &&
                                    firstLabel.slice(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
                                    hintInputElem.val(inputValue + firstLabel.slice(inputValue.length));
                                } else {
                                    hintInputElem.val('');
                                }
                            }
                        } else {
                            resetMatches();
                            isNoResultsSetter(originalScope, true);
                        }
                    }
                    if (onCurrentRequest) {
                        isLoadingSetter(originalScope, false);
                    }
                }, function () {
                    resetMatches();
                    isLoadingSetter(originalScope, false);
                    isNoResultsSetter(originalScope, true);
                });
            };

            // bind events only if appendToBody params exist - performance feature
            if (appendToBody) {
                angular.element($window).on('resize', fireRecalculating);
                $document.find('body').on('scroll', fireRecalculating);
            }

            // Declare the debounced function outside recalculating for
            // proper debouncing
            var debouncedRecalculate = $$rxDebounce(function () {
                // if popup is visible
                if (scope.matches.length) {
                    recalculatePosition();
                }

                scope.moveInProgress = false;
            }, eventDebounceTime);

            // Default progress type
            scope.moveInProgress = false;

            function fireRecalculating () {
                if (!scope.moveInProgress) {
                    scope.moveInProgress = true;
                    scope.$digest();
                }

                debouncedRecalculate();
            }

            // recalculate actual position and set new values to scope
            // after digest loop is popup in right position
            function recalculatePosition () {
                scope.position = appendToBody ? $rxPosition.offset(element) : $rxPosition.position(element);
                scope.position.top += element.prop('offsetHeight');
            }

            //we need to propagate user's query so we can higlight matches
            scope.query = undefined;

            //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
            var timeoutPromise;

            var scheduleSearchWithTimeout = function (inputValue) {
                timeoutPromise = $timeout(function () {
                    getMatchesAsync(inputValue);
                }, waitTime);
            };

            var cancelPreviousTimeout = function () {
                if (timeoutPromise) {
                    $timeout.cancel(timeoutPromise);
                }
            };

            resetMatches();

            scope.assignIsOpen = function (isOpen) {
                isOpenSetter(originalScope, isOpen);
            };

            scope.select = function (activeIdx) {
                //called from within the $digest() cycle
                var locals = {};
                var model, item;

                selected = true;
                locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                model = parserResult.modelMapper(originalScope, locals);
                $setModelValue(originalScope, model);
                modelCtrl.$setValidity('editable', true);
                modelCtrl.$setValidity('parse', true);

                onSelectCallback(originalScope, {
                    $item: item,
                    $model: model,
                    $label: parserResult.viewMapper(originalScope, locals)
                });

                resetMatches();

                //return focus to the input element if a match was selected via a mouse click event
                // use timeout to avoid $rootScope:inprog error
                if (scope.$eval(attrs.rxTypeaheadFocusOnSelect) !== false) {
                    $timeout(function () {
                        element[0].focus();
                    }, 0, false);
                }
            };

            //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
            element.on('keydown', function (evt) {
                //typeahead is open and an "interesting" key was pressed
                if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                    return;
                }

                var shouldSelect = isSelectEvent(originalScope, {
                    $event: evt
                });

                /**
                 * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
                 * or
                 * shift + tab is pressed to bring focus to the previous element
                 * then clear the results
                 */
                if (scope.activeIdx === -1 && shouldSelect || evt.which === 9 && !!evt.shiftKey) {
                    resetMatches();
                    scope.$digest();
                    return;
                }


                evt.preventDefault();
                var target;
                switch (evt.which) {
                    case 27: // escape
                        evt.stopPropagation();

                        resetMatches();
                        originalScope.$digest();
                        break;
                    case 38: // up arrow
                        scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
                        scope.$digest();
                        target = popUpEl[0].querySelectorAll('.rx-typeahead-match')[scope.activeIdx];
                        target.parentNode.scrollTop = target.offsetTop;
                        break;
                    case 40: // down arrow
                        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                        scope.$digest();
                        target = popUpEl[0].querySelectorAll('.rx-typeahead-match')[scope.activeIdx];
                        target.parentNode.scrollTop = target.offsetTop;
                        break;
                    default:
                        if (shouldSelect) {
                            scope.$apply(function () {
                                if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
                                    $$rxDebounce(function () {
                                        scope.select(scope.activeIdx, evt);
                                    }, angular.isNumber(scope.debounceUpdate) ?
                                        scope.debounceUpdate : scope.debounceUpdate['default']);
                                } else {
                                    scope.select(scope.activeIdx, evt);
                                }
                            });
                        }
                }
            });

            element.on('focus', function (evt) {
                hasFocus = true;
                if (minLength === 0 && !modelCtrl.$viewValue) {
                    $timeout(function () {
                        getMatchesAsync(modelCtrl.$viewValue, evt);
                    }, 0);
                }
            });

            element.on('blur', function (evt) {
                if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
                    selected = true;
                    scope.$apply(function () {
                        if (angular.isObject(scope.debounceUpdate) && angular.isNumber(scope.debounceUpdate.blur)) {
                            $$rxDebounce(function () {
                                scope.select(scope.activeIdx, evt);
                            }, scope.debounceUpdate.blur);
                        } else {
                            scope.select(scope.activeIdx, evt);
                        }
                    });
                }
                if (!isEditable && modelCtrl.$error.editable) {
                    modelCtrl.$setViewValue();
                    scope.$apply(function () {
                        // Reset validity as we are clearing
                        modelCtrl.$setValidity('editable', true);
                        modelCtrl.$setValidity('parse', true);
                    });
                    element.val('');
                }
                hasFocus = false;
                selected = false;
            });

            // Keep reference to click handler to unbind it.
            var dismissClickHandler = function (evt) {
                // Issue #3973
                // Firefox treats right click as a click on document
                if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
                    resetMatches();
                    if (!$rootScope.$$phase) {
                        originalScope.$digest();
                    }
                }
            };

            $document.on('click', dismissClickHandler);

            originalScope.$on('$destroy', function () {
                $document.off('click', dismissClickHandler);
                if (appendToBody || appendTo) {
                    $popup.remove();
                }

                if (appendToBody) {
                    angular.element($window).off('resize', fireRecalculating);
                    $document.find('body').off('scroll', fireRecalculating);
                }
                // Prevent jQuery cache memory leak
                popUpEl.remove();

                if (showHint) {
                    inputsContainer.remove();
                }
            });

            var $popup = $compile(popUpEl)(scope);
            if (appendToBody) {
                $document.find('body').append($popup);
            } else if (appendTo) {
                angular.element(appendTo).eq(0).append($popup);
            } else if (appendToElementId !== false) {
                angular.element($document[0].getElementById(appendToElementId)).append($popup);
            } else {
                element.after($popup);
            }

            this.init = function (_modelCtrl) {
                modelCtrl = _modelCtrl;
                ngModelOptions = extractOptions(modelCtrl);

                scope.debounceUpdate = $parse(ngModelOptions.getOption('rxDebounce'))(originalScope);

                //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                //$parsers kick-in on all the changes coming from the view as well as
                //$manually triggered by $setViewValue
                modelCtrl.$parsers.unshift(function (inputValue) {
                    hasFocus = true;

                    if (minLength === 0 || inputValue && inputValue.length >= minLength) {
                        if (waitTime > 0) {
                            cancelPreviousTimeout();
                            scheduleSearchWithTimeout(inputValue);
                        } else {
                            getMatchesAsync(inputValue);
                        }
                    } else {
                        isLoadingSetter(originalScope, false);
                        cancelPreviousTimeout();
                        resetMatches();
                    }

                    if (isEditable) {
                        return inputValue;
                    }

                    if (!inputValue) {
                        // Reset in case user had typed something previously.
                        modelCtrl.$setValidity('editable', true);
                        return null;
                    }

                    modelCtrl.$setValidity('editable', false);
                    return undefined;
                });

                modelCtrl.$formatters.push(function (modelValue) {
                    var candidateViewValue, emptyViewValue;
                    var locals = {};

                    // The validity may be set to false via $parsers (see above) if
                    // the model is restricted to selected values. If the model
                    // is set manually it is considered to be valid.
                    if (!isEditable) {
                        modelCtrl.$setValidity('editable', true);
                    }

                    if (inputFormatter) {
                        locals.$model = modelValue;
                        return inputFormatter(originalScope, locals);
                    }

                    //it might happen that we don't have enough info to properly render input value
                    //we need to check for this situation and simply return model value if we can't
                    //apply custom formatting
                    locals[parserResult.itemName] = modelValue;
                    candidateViewValue = parserResult.viewMapper(originalScope, locals);
                    locals[parserResult.itemName] = undefined;
                    emptyViewValue = parserResult.viewMapper(originalScope, locals);

                    return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                });
            };

            function extractOptions (ngModelCtrl) {
                var ngModelOptions;

                if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
                    // guarantee a value
                    ngModelOptions = ngModelCtrl.$options || {};

                    // mimic 1.6+ api
                    ngModelOptions.getOption = function (key) {
                        return ngModelOptions[key];
                    };
                } else { // in angular >=1.6 $options is always present
                    ngModelOptions = ngModelCtrl.$options;
                }

                return ngModelOptions;
            }
        }
    );
/* eslint-enable */
