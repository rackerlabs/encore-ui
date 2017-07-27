var Page = require('astrolabe').Page;

/**
 * @description Properties around a single badge, or a collection of badges.
 * Can be accessed via functions in {@link rxAccountInfo#badge}
 * @namespace rxAccountInfo.badge
 */
var badge = function (rootElement) {
    return Page.create({

        /**
         * @instance
         * @description The attribute under `ng-src` for a single badge.
         * @memberof rxAccountInfo.badge
         * @type {String}
         */
        src: {
            get: function () {
                return rootElement.getAttribute('ng-src');
            }
        },

        /**
         * @instance
         * @description The `data-name` attribute from a single badge.
         * @memberof rxAccountInfo.badge
         * @type {String}
         */
        name: {
            get: function () {
                return rootElement.getAttribute('data-name');
            }
        },

        /**
         * @instance
         * @description Will get the `data-description` attribute from a single badge.
         * @memberof rxAccountInfo.badge
         * @type {String}
         */
        description: {
            get: function () {
                return rootElement.getAttribute('data-description');
            }
        }

    });
};

/**
   @namespace rxAccountInfo
 */
var rxAccountInfo = {

    tblBadges: {
        get: function () {
            return this.rootElement.$$('.account-info-badge img');
        }
    },

    lblStatus: {
        get: function () {
            return this.rootElement.$('.account-status');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the account info element is displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @instance
     * @description The name of the account.
     * @type {String}
     */
    name: {
        get: function () {
            return this.rootElement.element(by.binding('accountName')).getText();
        }
    },

    /**
     * @instance
     * @description The account number.
     * @type {String}
     */
    number: {
        get: function () {
            return this.rootElement.element(by.binding('accountNumber')).getText();
        }
    },

    /**
     * @instance
     * @description The account access policy.
     * @type {String}
     */
    accessPolicy: {
        get: function () {
            return this.rootElement.element(by.binding('accountAccessPolicy')).getText();
        }
    },

    /**
     * @instance
     * @description The account collections Status.
     * @type {String}
     */
    collectionsStatus: {
        get: function () {
            return this.rootElement.element(by.binding('accountCollectionsStatus')).getText();
        }
    },

    /**
     * @description The resulting status is lowercased so that it is easy to use with {@link rxAccountInfo.statuses}.
     * @instance
     * @type {String}
     */
    status: {
        get: function () {
            return this.lblStatus.getText().then(function (text) {
                return text.toLowerCase();
            });
        }
    },

    /**
     * @description Parses a class name from the DOM to determine what the status of the account is.
     * Designed to be easily compared with {@link rxAccountInfo.statusTypes}.
     * @instance
     * @type {String}
     */
    statusType: {
        get: function () {
            return this.lblStatus.getAttribute('class').then(function (classNames) {
                var className = classNames.match(/msg-(\w+)/);
                return className === null ? 'active' : className[1];
            });
        }
    },

    /**
     * @description Methods for interacting with a collection of badges.
     * @see rxAccountInfo.badge
     * @instance
     */
    badge: {
        get: function () {
            var page = this;
            return Page.create({

                /**
                 * @function
                 * @instance
                 * @param {Number} index - The badge to return at position `index`.
                 * @memberof rxAccountInfo.badge
                 * @returns {rxAccountInfo.badge} A single badge object at position `index`.
                 */
                byIndex: {
                    value: function (index) {
                        return badge(page.tblBadges.get(index));
                    }
                },

                /**
                 * @function
                 * @instance
                 * @description Whether or not the badge `badgeName` is present.
                 * @param {String} badgeName - The name of the badge to check if present.
                 * @memberof rxAccountInfo.badge
                 * @returns {Promise<Boolean>}
                 */
                isPresent: {
                    value: function (badgeName) {
                        return page.rootElement.$('img[data-name="' + badgeName + '"]').isPresent();
                    }
                },

                /**
                 * @function
                 * @instance
                 * @description A single badge object by name `badgeName`.
                 * Accepts a string for a fast, exact match only. Matches on the `img[data-name]` attribute.
                 * @memberof rxAccountInfo.badge
                 * @param {String} badgeName - Badge name to match against.
                 * @returns {rxAccountInfo.badge}
                 * @example
                 * var badge = encore.rxAccountInfo.initialize().badge.byName('Super Support');
                 * expect(badge.name).to.eventually.equal('Super Support');
                 */
                byName: {
                    value: function (badgeName) {
                        return badge(page.rootElement.$('img[data-name="' + badgeName + '"]'));
                    }
                },

                /**
                 * @memberof rxAccountInfo.badge
                 * @description All badge names.
                 * @instance
                 * @type {String[]}
                 * @example
                 * var names = encore.rxAccountInfo.initialize().badge.names;
                 * expect(names).to.eventually.equal(['Super Support', 'Never Say Die SLA']);
                 */
                names: {
                    get: function () {
                        return page.tblBadges.map(function (badgeElement) {
                            return badge(badgeElement).name;
                        });
                    }
                },

                /**
                 * @function
                 * @instance
                 * @description The total number of badges for the account.
                 * @memberof rxAccountInfo.badge
                 * @returns {Number}
                 */
                count: {
                    value: function () {
                        return page.tblBadges.count();
                    }
                }

            });
        }
    },

    badges: {
        get: function () {
            var page = this;
            return Page.create({
                matchingName: {
                    value: function (badgeRegExp) {
                        return page.tblBadges.filter(function (badgeElement) {
                            return badgeElement.getAttribute('data-name').then(function (name) {
                                return badgeRegExp.test(name) === true;
                            });
                        }).then(function (matchingElements) {
                            return matchingElements.map(function (matchingElement) {
                                return badge(matchingElement);
                            });
                        });
                    }
                }
            });
        }
    }

};

exports.rxAccountInfo = {

    /**
     * @function
     * @memberof rxAccountInfo
     * @description Creates a page object from an `rx-account-info` DOM element.
     * @param {ElementFinder} [rxAccountInfoElement=$('rx-account-info')] -
     * ElementFinder to be transformed into an {@link rxAccountInfo} object.
     * @returns {rxAccountInfo}
     */
    initialize: function (rxAccountInfoElement) {
        if (rxAccountInfoElement === undefined) {
            rxAccountInfoElement = $('rx-account-info');
        }

        rxAccountInfo.rootElement = {
            get: function () { return rxAccountInfoElement; }
        };
        return Page.create(rxAccountInfo);
    },

    /**
     * @description Lookup of account statuses from status text. Used for comparisons in tests.
     * @memberof rxAccountInfo
     * @type {Object}
     * @property {String} statuses.approvalDenied - 'approval denied'
     * @property {String} statuses.aupViolation - 'aup violation'
     * @property {String} statuses.delinquent - 'delinquent'
     * @property {String} statuses.pendingApproval - 'pending approval'
     * @property {String} statuses.pendingMigration - 'pending migration'
     * @property {String} statuses.suspended - 'suspended'
     * @property {String} statuses.terminated - 'terminated'
     * @property {String} statuses.testStatus - 'teststatus'
     * @property {String} statuses.unverified - 'unverified'
     * @example
     * var accountInfo = encore.rxAccountInfo.initialize();
     * expect(accountInfo.status).to.eventually.equal(accountInfo.statuses.delinquent);
     */
    statuses: {
        approvalDenied: 'approval denied',
        aupViolation: 'aup violation',
        delinquent: 'delinquent',
        pendingApproval: 'pending approval',
        pendingMigration: 'pending migration',
        suspended: 'suspended',
        terminated: 'terminated',
        testStatus: 'teststatus',
        unverified: 'unverified'
    },

    /**
     * @description Lookup of status types from a human-readable class name. Used for comparisons in tests.
     * @memberof rxAccountInfo
     * @type {Object}
     * @property {String} active - 'active'
     * @property {String} info - 'info'
     * @property {String} warning - 'warn'
     * @example
     * var accountInfo = encore.rxAccountInfo.initialize();
     * expect(accountInfo.statusType).to.eventually.equal(accountInfo.statusTypes.warning);
     */
    statusTypes: {
        active: 'active',
        info: 'info',
        warning: 'warn'
    }

};
