var Page = require('astrolabe').Page;

var notificationTypes = /error|info|success|warning/;
var notification = function (rootElement) {
    /**
     * @description Functions for interacting with a single notification.
     * @namespace rxNotify.notification
     * @see rxNotify
     */
    return Page.create({

        /**
         * @type {ElementFinder}
         * @memberof rxNotify.notification
         * @instance
         * @description The root element of the notification.
         */
        rootElement: {
            get: function () {
                return rootElement;
            }
        },

        btnDismiss: {
            get: function () {
                return rootElement.$('.notification-dismiss');
            }
        },

        /**
         * @instance
         * @memberof rxNotify.notification
         * @type {String}
         * @description The type of notification. See {@link rxNotify.types}.
         * @see rxNotify.types
         * @example
         * it('should have the right notification type', function () {
         *     var notificationType = encore.rxNotify.all.byText('Something bad happened').type;
         *     expect(notificationType).to.eventually.equal('error');
         *     // or, you could write it this way
         *     expect(notificationType).to.eventually.equal(encore.rxNotify.types.error);
         * });
         */
        type: {
            get: function () {
                return rootElement.getAttribute('class').then(function (className) {
                    return className.match(notificationTypes)[0];
                });
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxNotify.notification
         * @description The text of the notification.
         * @example
         * it('should have the right notification text', function () {
         *     var notificationText = encore.rxNotify.all.byText('Something bad happened').getText();
         *     expect(notificationText).to.eventually.equal('Something bad happened: Contact joe@rackspace.com');
         * });
         * @returns {Promise<String>}
         */
        getText: {
            value: function () {
                return this.rootElement.$('.notification-text').getText();
            }
        },

        /**
         * @instance
         * @function
         * @memberof rxNotify.notification
         * @description Dismisses the notification.
         * @example
         * it('should dismiss the notification', function () {
         *     var notification = encore.rxNotify.all.byText('Something bad happened');
         *     expect(encore.rxNotify.all.count()).to.eventually.equal(1);
         *     notification.dismiss();
         *     expect(encore.rxNotify.all.count()).to.eventually.equal(0);
         * });
         */
        dismiss: {
            value: function () {
                var page = this;
                return this.isDismissable().then(function (dismissable) {
                    if (dismissable) {
                        page.btnDismiss.click();
                        // hack for chrome support -- this is for any possible
                        // alerts that are opened by closing this notification.
                        // also, before you check, EC.isAlertPresent does not work here.
                        return browser.getCapabilities().then(function (capabilities) {
                            if (capabilities.get('browserName') === 'chrome') {
                                browser.sleep(500);
                            }
                        });
                    }
                });
            }
        },

        /**
         * @private
         */
        hasSpinner: {
            value: function () {
                return rootElement.$('.rx-spinner').isPresent();
            }
        },

        /**
         * @function
         * @instance
         * @memberof rxNotify.notification
         * @returns {Boolean}
         * @description Whether or not the notification includes an "x" on the far right side.
         * @example
         * it('should not let me close the warning on the page', function () {
         *     var notification = encore.rxNotify.byText('Warning: Outage in progress');
         *     expect(notification.type).to.eventually.equal(encore.rxNotify.types.warning);
         *     expect(notification.isDismissable()).to.eventually.be.false;
         * });
         */
        isDismissable: {
            value: function () {
                return this.btnDismiss.isPresent();
            }
        }

    });
};

/**
 * @namespace
 * @description Functions for interacting with groups of notifications, or getting a single notification.
 */
var rxNotify = {
    tblNotifications: {
        get: function () {
            return this.rootElement.all(by.repeater('message in messages'));
        }
    },

    /**
     * @instance
     * @function
     * @description The number of notifications present in the scope of the namespace. For instance,
     * calling this function on the object returned from {@link rxNotify.all} will inform you of the
     * number of notifications present *anywhere* on the page. Calling it on {@link rxNotify.byStack}
     * will return the count, but limited to the number of notifications in the stack selected.
     * @example
     * it('should have some notifications in the top area', function () {
     *     expect(encore.rxNotify.byStack('banner').count()).to.eventually.equal(1);
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(2);
     * });
     */
    count: {
        value: function () {
            return this.tblNotifications.count();
        }
    },

    /**
     * @function
     * @instance
     * @param {String} notificationText - The text to search for in the current scope of notifications.
     * @returns {rxNotify.notification}
     * @description The resulting notification object that matches the `notificationText`. This notification
     * is searched for using a partial text matching strategy. If more than one notification contains
     * `notificationText`, only the first will be returned.
     * @example
     * it('should have a success message that personally thanks the user', function () {
     *     var notification = encore.rxNotify.all.byText('Good job, ');
     *     expect(notification.getText()).to.eventually.equal('Good job, ' + browser.params.username + '!');
     * });
     */
    byText: {
        value: function (notificationText) {
            return notification(this.rootElement.element(by.cssContainingText('.rx-notification', notificationText)));
        }
    },

    /**
     * @function
     * @instance
     * @description Close all notifications in the current scope of notifications.
     * @example
     * it('should close some notifications', function () {
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(2);
     *     encore.rxNotify.byStack('banner').dismiss();
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(1);
     *     encore.rxNotify.all.dismiss();
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(0);
     * });
     */
    dismiss: {
        value: function () {
            var page = this;
            return this.tblNotifications.map(function (notificationElement, index) {
                return notification(notificationElement).isDismissable().then(function (dismissable) {
                    if (dismissable) {
                        return index;
                    }
                });
            }).then(function (dismissableIndexes) {
                dismissableIndexes.reverse().forEach(function (index) {
                    // The above `.map` call will populate the list with `undefined` if undismissable. Ignore those.
                    if (index !== undefined) {
                        notification(page.tblNotifications.get(index)).dismiss();
                    }
                });
            });
        }
    },

    /**
     * @instance
     * @function
     * @param {String} string - The text to look for inside the notification.
     * @param {String} [type=] - The notification type ('success', 'info', 'warning', 'error').
     * @description Whether or not the notification matching text `string` exists in the current
     * scope of notifications. If no `type` is specified, all notifications are searched. If a
     * `type` is specified, only those types of notifications will be searched. See {@link rxNotify.types}
     * to see the list of notification types supported.
     * @example
     * it('should have the notification present', function () {
     *     expect(encore.rxNotify.all.isPresent('My message', 'error')).to.eventually.be.false;
     *     expect(encore.rxNotify.all.byText('My message').type).to.eventually.equal('info');
     *     expect(encore.rxNotify.all.isPresent('My message')).to.eventually.be.true;
     *     expect(encore.rxNotify.all.isPresent('My message', encore.rxNotify.types.info)).to.eventually.be.true;
     * });
     * @returns {Promise<Boolean>}
     */
    isPresent: {
        value: function (string, type) {
            var elementsOfType;

            type = type ? '.notification-'.concat(type) : '[class^="notification-"]';
            elementsOfType = this.rootElement.all(by.cssContainingText(type, string));

            return elementsOfType.count().then(function (count) {
                return count > 0;
            });
        }
    }
};

exports.rxNotify = {
    /**
     * @memberof rxNotify
     * @function
     * @type {rxNotify.notification}
     * @param {ElementFinder} [rxNotificationElement=$('.rx-notifications .rx-notification')] -
     * The *singular* rxNotify notification element to be transformed into an {@link rxNotify.notification} page object.
     * @description Create a single {@link rxNotify.notification} page object from a DOM element.
     * @example
     * it('should have a notification', function () {
     *     expect(encore.rxNotify.initialize().type).to.eventually.equal(encore.rxNotify.types.warning);
     * });
     */
    initialize: function (rxNotificationElement) {
        if (rxNotificationElement === undefined) {
            rxNotificationElement = $('.rx-notifications .rx-notification');
        }
        return notification(rxNotificationElement);
    },

    /**
     * @memberof rxNotify
     * @function
     * @description Returns a collection of functions used to interact with a group of notifications in a stack.
     * @returns {rxNotify}
     * @see rxNotify.all
     * @example
     * it('should have some notifications in the top area', function () {
     *     expect(encore.rxNotify.byStack('banner').count()).to.eventually.be.above(0);
     *     expect(encore.rxNotify.all.count()).to.eventually.be.above(0);
     * });
     */
    byStack: function (stackName) {
        rxNotify.rootElement = {
            get: function () {
                return $('.rx-notifications[stack="' + stackName + '"]');
            }
        };

        return Page.create(rxNotify);
    },

    /**
     * @memberof rxNotify
     * @type {rxNotify}
     * @description Returns a collection of functions used to interact with all notifications on the page.
     * @see rxNotify.byStack
     * @example
     * it('should have some notifications in the top area', function () {
     *     expect(encore.rxNotify.all.count()).to.eventually.be.above(0);
     *     expect(encore.rxNotify.byStack('banner').count()).to.eventually.be.above(0);
     * });
     */
    all: (function () {
        rxNotify.rootElement = {
            get: function () {
                return $('html');
            }
        };

        return Page.create(rxNotify);
    })(),

    /**
     * @description A lookup for translating types of notifications and their string representations
     * in {@link rxNotify.notification#type}.
     * @type {Object}
     * @property {String} error - 'error': A red notification. Used typically for errors or exceptions.
     * @property {String} info - 'info': A blue notification. Used typically for loading actions.
     * @property {String} success - 'success': A green notification. Used typically after successful actions.
     * @property {String} warning - 'warning': An orange warning. Used typically to "sticky" an ever-present message.
     */
    types: {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning'
    }
};
