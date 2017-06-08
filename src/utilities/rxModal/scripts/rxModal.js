angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxModal
 * @requires utilities.factory:rxModalStack
 * @description
 * Service for providing modals
 */
.provider('rxModal', function () {
    var $modalProvider = {

        options: {
            animation: true,
            backdrop: true, //can also be false or 'static'
            keyboard: true
        },
        $get: function ($injector, $rootScope, $q, $templateRequest, $controller, rxModalStack) {
            var $modal = {};
            function getTemplatePromise (options) {
                return options.template ? $q.when(options.template) :
                $templateRequest(angular.isFunction(options.templateUrl) ?
                    (options.templateUrl)() : options.templateUrl);
            }

            function getResolvePromises (resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function (value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    } else if (angular.isString(value)) {
                        promisesArr.push($q.when($injector.get(value)));
                    } else {
                        promisesArr.push($q.when(value));
                    }
                });
                return promisesArr;
            }

            var promiseChain = null;
            $modal.getPromiseChain = function () {
                return promiseChain;
            };

            $modal.open = function (modalOptions) {
                var modalResultDeferred = $q.defer();
                var modalOpenedDeferred = $q.defer();
                var modalRenderDeferred = $q.defer();

                //prepare an instance of a modal to be injected into controllers and returned to a caller
                var modalInstance = {
                    result: modalResultDeferred.promise,
                    opened: modalOpenedDeferred.promise,
                    rendered: modalRenderDeferred.promise,
                    close: function (result) {
                        return rxModalStack.close(modalInstance, result);
                    },
                    dismiss: function (reason) {
                        return rxModalStack.dismiss(modalInstance, reason);
                    }
                };

                //merge and clean up options
                modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                modalOptions.resolve = modalOptions.resolve || {};

                //verify options
                if (!modalOptions.template && !modalOptions.templateUrl) {
                    throw new Error('One of template or templateUrl options is required.');
                }

                var templateAndResolvePromise =
                $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

                function resolveWithTemplate () {
                    return templateAndResolvePromise;
                }

                // Wait for the resolution of the existing promise chain.
                // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
                // Then add to rxModalStack and resolve opened.
                // Finally clean up the chain variable if no subsequent modal has overwritten it.
                var samePromise;
                samePromise = promiseChain = $q.all([promiseChain])
                .then(resolveWithTemplate, resolveWithTemplate)
                .then(function resolveSuccess (tplAndVars) {

                    var modalScope = (modalOptions.scope || $rootScope).$new();
                    modalScope.$close = modalInstance.close;
                    modalScope.$dismiss = modalInstance.dismiss;

                    modalScope.$on('$destroy', function () {
                        if (!modalScope.$$uibDestructionScheduled) {
                            modalScope.$dismiss('$uibUnscheduledDestruction');
                        }
                    });

                    var ctrlInstance, ctrlLocals = {};
                    var resolveIter = 1;

                    //controllers
                    if (modalOptions.controller) {
                        ctrlLocals.$scope = modalScope;
                        ctrlLocals.$modalInstance = modalInstance;
                        Object.defineProperty(ctrlLocals, '$modalInstance', {
                            get: function () {
                                return modalInstance;
                            }
                        });
                        angular.forEach(modalOptions.resolve, function (value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });

                        ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                        if (modalOptions.controllerAs) {
                            if (modalOptions.bindToController) {
                                angular.extend(ctrlInstance, modalScope);
                            }

                            modalScope[modalOptions.controllerAs] = ctrlInstance;
                        }
                    }

                    rxModalStack.open(modalInstance, {
                        scope: modalScope,
                        deferred: modalResultDeferred,
                        renderDeferred: modalRenderDeferred,
                        content: tplAndVars[0],
                        animation: modalOptions.animation,
                        backdrop: modalOptions.backdrop,
                        keyboard: modalOptions.keyboard,
                        backdropClass: modalOptions.backdropClass,
                        windowTopClass: modalOptions.windowTopClass,
                        windowClass: modalOptions.windowClass,
                        windowTemplateUrl: modalOptions.windowTemplateUrl,
                        size: modalOptions.size,
                        openedClass: modalOptions.openedClass
                    });
                    modalOpenedDeferred.resolve(true);

                }, function resolveError (reason) {
                    modalOpenedDeferred.reject(reason);
                    modalResultDeferred.reject(reason);
                })
                .finally(function () {
                    if (promiseChain === samePromise) {
                        promiseChain = null;
                    }
                });

                return modalInstance;
            };

            return $modal;
        }
    };
    return $modalProvider;
});
