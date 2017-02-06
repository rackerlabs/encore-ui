angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxAutoSave
 * @description
 * A factory that controllers can use to help automatically save and load
 * form data (via rxLocalStorage) on any given page.
 *
 * `rxAutoSave` provides a way to store values in a form for later. For instance, if a user is entering values into a
 * form, then accidentally navigate to a new page, we likely want the values to be present again when they click the
 * "Back" button in their browser. By correctly setting up an `rxAutoSave` instance for the form, this can happen
 * automatically. By default, all saved values will be cleared after two days.
 *
 * `rxAutoSave` is a service intended to be used in controllers. No directives are provided. The intent is that the
 * HTML forms themselves will have no knowledge that their values are being saved. `rxAutoSave` operates by doing a
 * `$watch` on the model values for a given form, storing those model values whenever they change, and loading them
 * on instantation.
 *
 * The stored data is keyed on the page URL. This means you can track the form state for multiple pages simultaneously.
 * For example, say you have an "Edit" form. The user has gone to edit some values for "Server1", at
 * `"/servers/server1/edit"`, and for "Server2" at `"/servers/server2/edit"`. The edit progress for both servers will
 * be saved independently of each other. `rxAutoSave` will also let you independently store values for multiple forms
 * appearing on the same page.
 *
 * By default, all values are stored in {@link utilities.service:rxLocalStorage rxLocalStoage} which interfaces with the
 * browser's `localStorage` object. This means that if a user logs into a different computer, their stored values will
 * not be present.  Use of `rxSessionStorage` is also supported out-of-the-box. If you wish to save form states 
 * elsewhere (for instance, to an API), see the "Storage Location" section below.
 *
 * ## Setting up your template
 *
 * Nothing explicit needs to be done in your templates to add support for `rxAutoSave`. The only requirement is that all
 * the `ng-model` values in a given form are stored within one object (`formData` below). For example, say you have the
 * following form in your template:
 *
 * <pre>
 *   <form name="demoForm" rx-form>
 *       <rx-form-section stacked>
 *           <rx-field>
 *               <rx-field-name>A checkbox field!:</rx-field-name>
 *               <rx-field-content>
 *                   <rx-input>
 *                       <input rx-checkbox id="chkCheckbox" ng-model="formData.checkbox" />
 *                       <label for="chkCheckbox">I likely don't disagree</label>
 *                   </rx-input>
 *               </rx-field-content>
 *           </rx-field>
 *
 *           <rx-field>
 *               <rx-field-name>Name:</rx-field-name>
 *               <rx-field-content>
 *                   <rx-input>
 *                       <input type="text" ng-model="formData.name" />
 *                   </rx-input>
 *               </rx-field-content>
 *           </rx-field>
 *
 *           <rx-field>
 *             <rx-field-name>Description:</rx-field-name>
 *             <rx-field-content>
 *                 <rx-input>
 *                     <textarea rows="10" ng-model="formData.description"></textarea>
 *                 </rx-input>
 *             </rx-field-content>
 *           </rx-field>
 *       </rx-form-section>
 *   </form>
 * </pre>
 *
 * **NOTE:** All the models for the form are attributes of the `formData` scope variable.
 *
 * ## Setting up your controller
 *
 * In your controller, you would have something like this in your initialization:
 *
 * <pre>
 *   $scope.formData = {
 *       checkbox: false,
 *       name: '',
 *       description: ''
 *   };
 * </pre>
 *
 * By default, every time this page was loaded, the form would be initialized with an unchecked checkbox, a blank
 * `Name` field and a blank `Description`.
 *
 * To have `rxAutoSave` automatically save values, first inject `rxAutoSave` into your controller, and modify
 * initialization as follows:
 *
 * <pre>
 *   $scope.formData = {
 *       checkbox: false,
 *       name: '',
 *       description: ''
 *   };
 *
 *   var autosave = rxAutoSave($scope, 'formData');
 * </pre>
 *
 * And that's it! Your `rxAutoSave` instance will watch for any change to `$scope.formData`, and will automatically
 * write those changes to `rxLocalStorage`.
 *
 * A third argument can be passed to `rxAutoSave`, specifying usage options. The default values for these options are:
 *
 * <pre>
 *   var autosave = rxAutoSave($scope, 'formData', {
 *     clearOnSuccess: null,        // Promise
 *     ttl: 172800,                 // Integer (seconds) - two days default
 *     load: true,                  // Boolean or Promise that will resolve with a Boolean
 *     save: true,                  // Boolean or Promise that will resolve with a Boolean
 *     exclude: [],                 // String[]
 *     storageBackend: rxLocalStorage // Object
 *   });
 * </pre>
 *
 * All of these options will be described below.
 *
 * ## Multiple Forms on one page
 *
 * `rxAutoSave` supports independently saving multiple forms on one page. To do this, have each form's model in its own
 * object, and create individual `rxAutoSave` instances for each. i.e.:
 *
 * <pre>
 *   $scope.form1Data = {
 *       checkbox: false,
 *       name: '',
 *       description: ''
 *   };
 *
 *   $scope.form2Data = {
 *       customerName: '',
 *       birthday: ''
 *   };
 *
 *   var autosave1 = rxAutoSave($scope, 'form1Data');
 *   var autosave2 = rxAutoSave($scope, 'form2Data');
 * </pre>
 *
 * ## Clearing values
 *
 * If you need to clear the stored values, you can call `autosave.clear()`. This will clear the values from
 * `rxLocalStorage`, but won't affect your `$scope.formData` values.
 *
 * More likely, rather than manually calling `autosave.clear()`, you'd like the values to be cleared on a "successful
 * submit". For example, if your user is editing the form described above, and they click a "Submit" button to send the
 * values to a server, `rxLocalStorage` should be cleared for this form if the server call is a success.
 *
 * To do this, pass an "options" parameter as the third argument to `rxAutoSave`, setting a promise on the
 * `clearOnSuccess` attribute, i.e.
 *
 * <pre>
 *   var autosave = rxAutoSave($scope, 'formData', { clearOnSuccess: serverSubmitPromise });
 * </pre>
 *
 * If the `serverSubmitPromise` resolves, then `rxAutoSave` will automatically clear the stored values for `formData` on
 * this page.
 *
 * When instantiating your controller, there's a good chance that the `clearOnSuccess` promise you are interested in
 * does not actually exist yet, i.e. if you want to clear on a successfull submit, you need the submit `promise`.
 * Instances of `rxAutoSave` provide a `clearOnSuccess()` method to accept this promise after instantiation:
 *
 * <pre>
 *   var autosave = rxAutoSave($scope, 'formData');
 *
 *   // Take some other actions
 *   ...
 *
 *   $scope.onSubmit = function () {
 *       // Server.save() is some $resource that returns a promise
 *       var promise = Server.save($scope.formData);
 *       autosave.clearOnSuccess(promise);
 *   }
 * </pre>
 *
 * ## Automatic expiry
 *
 * Another way to automatically clear values is to set an explict Time-To-Live (TTL) when instantiating your
 * `rxAutoSave` instance. This is done with the `ttl` property of the `opts` object,
 *
 * <pre>
 *   // Automatically expire after 24 hours
 *   var autosave = rxAutoSave($scope, 'formData', { ttl: 86400 });
 * </pre>
 *
 * By default, a `ttl` of `172800` (two days) is used.
 *
 * The `ttl` property takes a length of time in seconds. Whenever something in `formData` changes, the expiry time will
 * be freshly set. With the example above, whenever `formData` is changed, the new expiry time will be set to 24 hours
 * from the time of the change. In addition, we freshly set the expiry time whenever the data is loaded. If `formData`
 * is 12 hours away from expiring, and the user visits the page again, then the expiry will be freshly set to a new 24
 * hours, whether or not the user makes a change.
 *
 * If a user visits a page after the data has expired, the data will be cleared from storage and not automatically
 * loaded. (i.e. we're not running a continuous background process to look for expired data, we only check for
 * expiration the next time `rxAutoSave` tries to load the data).
 *
 * To turn off automatic expiry for a given form, pass a value of `{ ttl: 0 }`. In this case, the data will never
 * expire. You will have to clear it at an appropriate time by using one of the methods mentioned above.
 *
 * ## Preventing automatic loading
 *
 * If you need to prevent `rxAutoSave` from automatically loading stored values, you can again use the optional third
 * parameter, this time setting `load: false`, i.e.
 *
 * <pre>
 *   var autosave = rxAutoSave($scope, 'formData', { load: false });
 * </pre>
 *
 * `load:` will accept a boolean, or it can accept a promise that eventually resolves to a boolean. Accepting a promise
 * will let you delay your decision on whether or not to load (for example, asking a user if they want values loaded).
 * Note that if you use a promise, `rxAutoSave` will look at its resolved value. If the resolved value is `true`, then
 * the data will be loaded. If the resolved value is `false`, or the promise fails/rejects, then the data will not be
 * loaded.
 *
 * ## Excluding some values from loading/saving
 *
 * By default, `rxAutoSave` automatically loads and saves all the stored values for a form. If you want to prevent it
 * from loading/saving _some_ values, you can do:
 *
 * <pre>
 *   var autosave = rxAutoSave($scope, 'formData', { exclude: ['description'] });
 * </pre>
 *
 * This will tell `rxAutoSave` not to load from or save to the stored `description` value, but everything else in
 * `formData` will be loaded/saved.
 *
 * ## Manual saving
 *
 * It might be that you don't want your `rxAutoSave` instance to automatically save to the storage backend
 * automatically. In some cases, you might want to disable automatic saving and instead manually tell your instance
 * when it should save. To turn off automatic saving, set up your instance as follows:
 *
 * <pre>
 *   var manualsave = rxAutoSave($scope, 'formData', { save: false });
 * </pre>
 *
 * Then, whenever you want your `autosave` instance to commit the current model values to storage, do
 *
 * <pre>
 *   manualsave.save();
 * </pre>
 *
 * As with the `load` parameter, you can pass either a boolean or a promise to `save`.
 *
 * ## Storage location
 *
 * All values for `rxAutoSave` are by default stored in the browser's `localStorage` through the `rxLocalStorage`
 * service, and keyed on the URL of the page, with a `rxAutoSave::` prefix. For example, if the above form were
 * present at the URL `'users/JonnyRocket/edit'`, then the form data would be saved into the browser's `localStorage`
 * at location `'rxAutoSave::users/JonnyRocket/edit'`.
 *
 * If you wish to use a different storage backend (`rxSessionStorage`, for instance), use the `storageBackend` 
 * parameter:
 *
 * <pre>
 *    var autosave = rxAutoSave($scope, 'formData', { storageBackend: rxSessionStorage });
 * </pre>
 *
 * `storageBackend` requires that you pass it an object which has `getObject(key)` and `setObject(key, val)` methods.
 * `rxLocalStorage` and `rxSessionStorage` are both provided by EncoreUI, and support this interface.
 *
 * You can use your own custom backends as well, as long as it supports `getObject(key)` and `setObject(key, val)`.
 *
 * ## Custom Storage Key Values
 *
 * Sometimes, it may be necessary to change how a key is formed for the specified `storageBackend`. As previously
 * stated, these are calculated by prepending `'rxAutoSave::'` before the url. You can override this by passing in a
 * `keyShaping` function to the options object.
 *
 * An example one would be as follows:
 *
 * <pre>
 *   var autosave = rxAutoSave($scope, 'formData', {
 *       keyShaping: function (key) {
 *           return key.replace('?cache=false', '');
 *       }
 *   });
 * </pre>
 *
 * The above example could be used to have the current url ignore any caching flags passed in. The `keyShaping`
 * function will receive the default calculated key (`rxAutoSave::` + $location.path()). By default, `keyShaping`
 * just returns the original calculated key.
 *
 *
 * @param {Object} scope scope to apply a `$watch` expression
 * @param {String} variable
 * variable name corresponding to an object on the given scope
 * @param {Object=} options usage options
 * @param {Promise=} [options.clearOnSuccess=null]
 * Clear saved data on successful resolution of given promise.
 *
 * @param {Function=} options.keyShaping
 * Sometimes, it may be necessary to change how a key is formed for the specified
 * `storageBackend`.  Keys are calculated by prepending `'rxAutoSave::'` before the
 * url. Your custom `keyShaping` function will take one parameter (`key`), to which
 * you may modify to your specific needs.
 *
 * The below example will ignore any caching flags in the url.
 * <pre>
 * var autosave = rxAutoSave($scope, 'formData', {
 *     keyShaping: function (key) {
 *         return key.replace('?cache=false', '');
 *     }
 * });
 * </pre>
 *
 * @param {Integer=} [options.ttl=172800]
 * Time to Live (in seconds) - defaults to 2 days
 *
 * Whenever data changes in the watched variable, the expiry time will be freshly set
 * In addition, we freshly set the expiry time whenever the data is loaded. If the data
 * is 12 hours away from expiring and a user visits the page again, the expiry will be
 * freshly set to a new 48 hours, whether or not the user makes a change.
 *
 * If a user visits a page after the data has expired, the data will be cleared from
 * storage and not automatically loaded.
 * * A continuous background process is not running to look for expired data.
 * * We only check for expiration the next time `rxAutoSave` tries to load the data.
 *
 * To turn off automatic expiry for a given form, pass a value of `{ ttl: 0 }`.
 * In this case, the data will never expire and you will have to clear it manually at
 * an appropriate time by using one of the following:
 *
 * * `clear()`
 * * `clearOnSuccess()`
 *
 * @param {Boolean|Promise=} [options.load=true]
 * If false, will prevent data from being automatically loaded onto the scope.
 *
 * You may use a promise that resolves to a boolean, if desired.
 * @param {Boolean|Promise=} [options.save=true]
 * If false, will prevent data from being automatically saved on change.
 *
 * You may use a promise that resolves to a boolean, if desired.
 * @param {String[]=} options.exclude
 * A string of property names to exclude from automatic save. This is useful to
 * exclude saving any sensitive information like passwords, credit card numbers, etc.
 *
 * <pre>
 * var autosave = rxAutoSave($scope, 'formData', {
 *     exclude: ['password']
 * });
 * </pre>
 *
 * @param {Object=} [options.storageBackend=rxLocalStorage]
 * Must be an object which has `getObject(key)` and `setObject(key, val)` methods.
 * `rxLocalStorage` and `rxSessionStorage` are both provided by EncoreUI, and support
 * this interface.
 *
 * You can use your own custom backends as well, as long as it supports `getObject(key)`
 * and `setObject(key, val)`.
 */
.factory('rxAutoSave', function ($location, $q, debounce, rxLocalStorage) {
    /*
     * We'll version the schema for the stored data, so if we need to change
     * the schema in the future, we can do automatic migrations. Never
     * delete any of these documented schemas. If you have to add a new version,
     * then add it on top, but keep the documentation for the old one around.
     * VERSION 1
     *      'rxAutoSave::' + URL => {
     *          pageConfig: {
     *              version: 1
     *          },
     *          forms: {
     *              "form1": {
     *                   config: {
     *                      expires: 0,
     *                  },
     *                  data: {
     *                      // Serialized form data
     *                  }
     *              },
     *              "form2": {
     *                  config: {
     *                      expires: 33421234322,
     *                  },
     *                  data: {
     *                      // Serialized form data
     *                  }
     *              }
     *          }
     *      }
    */
    var version = 1;

    // This will be used by the rxAutoSave instance to interact with
    // rxLocalStorage.
    //
    // @param watchVar - the string name of the
    //                   object that's being watched, representing the model for the form.
    //                   StorageAPI is not publically exposed, it can only be used and accessed
    //                   by the rxAutoSave instance
    // @param [storageBackend] - Optional, defaults to rxLocalStorage. If you pass in a storage object,
    //                           it must support both getObject(key) and setObject(key, val), matching
    //                           the operations of rxLocalStorage and rxSessionStorage
    // @param [keyShaping] - Optional, defaults to just returning the originally defined key value.
    //                       It gets passed the original value defined ('rxAutoSave::' + $location.path())
    //                       and is expected to return the new key that you wish to have used.
    var StorageAPI = function (watchVar, storageBackend, keyShaping) {
        this.key = keyShaping('rxAutoSave::' + $location.path());
        this.watchVar = watchVar;
        this.storage = storageBackend ? storageBackend : rxLocalStorage;
    };

    // Get all the saved data for this page. If none
    // exists, then create an empty object that matches
    // the current schema.
    StorageAPI.prototype.getAll = function () {
        return this.storage.getObject(this.key) || {
            pageConfig: {
                version: version,
            },
            forms: {
            }
        };
    };

    // Given a `watchVar`, return the corresponding
    // `form` object from rxLocalStorage. This form object should include
    // both `.data` and `.config` properties.
    // If no form currently exists for `watchVar`, then an empty
    // object will be created that matches the current schema
    StorageAPI.prototype.getForm = function () {
        var all = this.getAll();
        if (!_.has(all.forms, this.watchVar)) {
            all.forms[this.watchVar] = {
                data: {},
                config: {
                    expires: 0
                }
            };
        }
        return all.forms[this.watchVar];
    };

    // Given a full form object, save it into rxLocalStorage,
    // indexed into the forms[watchVar] location for this page
    StorageAPI.prototype.setForm = function (form) {
        var all = this.getAll();
        all.forms[this.watchVar] = form;
        this.storage.setObject(this.key, all);
    };

    // Get the current `config` object for a given watchVar
    StorageAPI.prototype.getConfig = function () {
        return this.getForm().config;
    };

    // Return the time that a given form is supposed to
    // have its saved data expire
    StorageAPI.prototype.getExpires = function () {
        return this.getConfig().expires;
    };

    // For a given watchVar, set a new expiry time, and save
    // into rxLocalStorage
    StorageAPI.prototype.setExpiryTime = function (expiryTime) {
        var form = this.getForm();
        form.config.expires = expiryTime;
        this.setForm(form);
    };

    // Force an expiration for a given watchVar. This will completely
    // clear the saved data for this watchVar, and set the `expires`
    // back to 0
    StorageAPI.prototype.expire = function () {
        var form = this.getForm();
        form.data = {};
        form.config.expires = 0;
        this.setForm(form);
    };

    // Return the current saved data for a given watchVar
    StorageAPI.prototype.getDataObject = function () {
        return this.getForm().data || {};
    };

    // For a given watchVar, store `val` as its saved
    // data, into rxLocalStorage
    StorageAPI.prototype.setDataObject = function (val) {
        var form = this.getForm();
        form.data = val;
        this.setForm(form);
    };

    // This is what we return from rxAutoSave, and calling this
    // function will return an instance
    return function (scope, watchVar, opts) {
        opts = opts || {};
        _.defaults(opts, {
            load: true,
            save: true,
            clearOnSuccess: undefined,
            exclude: [],
            ttl: 172800,
            keyShaping: _.identity,
            storageBackend: rxLocalStorage
        });

        opts.ttl = opts.ttl * 1000; // convert back to milliseconds

        var api = new StorageAPI(watchVar, opts.storageBackend, opts.keyShaping);

        var updateExpiryTime = function () {
            if (opts.ttl > 0) {
                api.setExpiryTime(_.now() + opts.ttl);
            }
        };

        // Responsible for loading the data from the browser's localStorage into the form
        var load = function () {
            var expires = api.getExpires();
            if (expires > 0 && expires <= _.now()) {
                // This data has expired. Make sure we clear it out
                // of the browser's localStorage
                api.expire();
                return;
            }

            updateExpiryTime();

            // Write all the storedObject values into scope[watchVar], except
            // for any specified in opts.exclude
            var storedObject = api.getDataObject();
            _.assign(scope[watchVar], _.omit(storedObject, opts.exclude));
        };

        // This is the "instance" that is returned when someone
        // calls rxAutoSave($scope, 'someWatchVar')
        var autoSaveInstance = {
            clear: function () {
                api.expire();
            },

            clearOnSuccess: function (promise) {
                promise.then(this.clear);
            },

            save: function () {
                update(scope[watchVar]);
            },

            getStoredValue: function () {
                return api.getDataObject();
            }
        };

        _.bindAll(autoSaveInstance);

        function update (newVal) {
            // Get the current data stored for this watchVar
            var data = api.getDataObject();

            // Overwrite all properties in allWatchVars[watchVar] with properties from
            // newVal, except for the properties in opts.exclude
            _.assign(data, _.omit(newVal, opts.exclude));

            // Store the newly changed data in rxLocalStorage
            api.setDataObject(data);

            // Update the expiry time whenever we modify data
            updateExpiryTime();
        }

        // We don't want to write to the browser's localStorage every time the model changes,
        // because that would turn typing into a textarea into an expensive operation.
        // We'll instead debounce the the writes for 1 second
        var debounced = debounce(update, 1000);

        $q.when(opts.save).then(function (shouldSave) {
            if (shouldSave) {
                // The `true` third argument tells $watch to do a deep comparison
                scope.$watch(watchVar, debounced, true);
            }
        });

        $q.when(opts.load).then(function (shouldLoad) {
            if (shouldLoad) {
                load();
            }
        });

        if (!_.isUndefined(opts.clearOnSuccess)) {
            autoSaveInstance.clearOnSuccess(opts.clearOnSuccess);
        }

        return autoSaveInstance;
    };
});
