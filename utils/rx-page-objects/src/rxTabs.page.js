var rxMisc = require('./rxMisc.page').rxMisc;
var Page = require('astrolabe').Page;

var rxTabFromElement = function (tabElement) {

    /**
     * @namespace rxTabset.rxTab
     * @description Functionality around interacting with a single tab.
     * @see tabs
     */
    return Page.create({

        /**
         * @instance
         * @function
         * @returns {Boolean}
         * @memberof rxTabset.rxTab
         * @description Whether or not the tab object is set as active.
         * @example
         * it('should mark the current tab as active when visiting it', function () {
         *     var tab = encore.tabs.initialize().byName('Home');
         *     expect(tab.isActive()).to.eventually.be.false;
         *     tab.click();
         *     expect(tab.isActive()).to.eventually.be.true;
         * });
         */
        isActive: {
            value: function () {
                return tabElement.getAttribute('class').then(function (className) {
                    return className.indexOf('active') > -1;
                });
            }
        },

        /**
         * @instance
         * @type {String}
         * @memberof rxTabset.rxTab
         * @description The full name of the tab, meaning it includes both the main name
         * and the subtitle.
         * @see rxTabset.rxTab#name
         * @see rxTabset.rxTab#subtitle
         * @example
         * it('should list the full name of the tab', function () {
         *     var tab = encore.tabs.initialize().byName('Activity');
         *     expect(tab.fullName).to.eventually.equal('Activity (recent first)');
         * });
         */
        fullName: {
            get: function () {
                return tabElement.getText().then(function (text) {
                    return text.trim();
                });
            }
        },

        /**
         * @instance
         * @type {String}
         * @memberof rxTabset.rxTab
         * @description The name of the tab. Will parse out the subtitle, if it exists.
         * @example
         * it('should have just the name correct', function () {
         *     expect(encore.tabs.initialize().byName('Activity').name).to.eventually.equal('Activity');
         * });
         */
        name: {
            get: function () {
                var tab = this;
                return this.subtitle.then(function (subtitle) {
                    if (subtitle !== null) {
                        return tab.fullName.then(function (name) {
                            return name.split(subtitle)[0].trim();
                        });
                    } else {
                        return tabElement.getText().then(function (name) {
                            return name.trim();
                        });
                    }
                });
            }
        },

        /**
         * @instance
         * @type {String}
         * @memberof rxTabset.rxTab
         * @description The subtitle of the tab. Will parse out the name, if it exists.
         * @example
         * it('should have just the subtitle correct', function () {
         *     expect(encore.tabs.initialize().byName('Activity').subtitle).to.eventually.equal('recent first');
         * });
         */
        subtitle: {
            get: function () {
                var subtitleElement = tabElement.$('.subdued');
                return subtitleElement.isPresent().then(function (present) {
                    if (present) {
                        return subtitleElement.getText().then(function (text) {
                            return text.trim();
                        });
                    } else {
                        return null;
                    }
                });
            }
        },

        /**
         * @instance
         * @function
         * @returns {Boolean}
         * @memberof rxTabset.rxTab
         */
        isDisplayed: {
            value: function () {
                return tabElement.isDisplayed();
            }
        },

        /**
         * @instance
         * @function
         * @memberof tabs.tab
         * @example
         * it('should visit the tab', function () {
         *     var tabs = encore.tabs.initialize();
         *     tabs.byName('Activity').click();
         *     expect(browser.currentUrl()).to.eventually.contain('activity/newest');
         * });
         */
        click: {
            value: function () {
                tabElement.click();
            }
        }

    });

};

/**
 * @namespace rxTabset
 * @description Functions for interacting with rxTabset.
 */
var rxTabset = {

    cssTabs: {
        get: function () {
            return '.nav-tabs li';
        }
    },

    tblTabs: {
        get: function () {
            return this.rootElement.$$(this.cssTabs);
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the rxTabset collection is displayed
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @instance
     * @function
     * @param {String} tabName - The rxTab to search for in the rxTabset.
     * @returns {Boolean}
     * @description Whether or not the txTan by text `tabName` exists in the rxTabset.
     * @example
     * it('should have the tab present', function () {
     *     expect(encore.tabs.initialize().hasTab('Home')).to.eventually.be.true;
     * });
     */
    hasTab: {
        value: function (tabName) {
            var tabElement = this.rootElement.element(by.cssContainingText(this.cssTabs, tabName));
            return tabElement.isPresent().then(function (present) {
                return present ? tabElement.isDisplayed() : present;
            });
        }
    },

    /**
     * @instance
     * @function
     * @param {String} tabName - The rxTab to search for by `tabName`, and return as a {@link rxTabset.rxTab} object.
     * @returns {rxTabset.rxTab}
     * @description Returns a {@link rxTabset.rxTab} object for the tab matching `tabName`. This will not be able to
     * differentiate between similarly named tabs with different subtitled names. Include any subtitled text
     * to differentiate between them. Matches on partial text matches.
     * @example
     * it('should find the home tab by name', function () {
     *     var tab = encore.tabs.initialize().byName('Home');
     *     expect(tab.name).to.eventually.equal('Home');
     * });
     */
    byName: {
        value: function (tabName) {
            var tabElement = this.rootElement.element(by.cssContainingText(this.cssTabs, tabName));
            return rxTabFromElement(tabElement);
        }
    },

    /**
     * @instance
     * @function
     * @param {Number} index - The position of the tab you want transformed into a {@link rxTabset.rxTab} object.
     * @returns {rxTabset.rxTab}
     * @description Will return the tab at position `index` as a {@link rxTabset.rxTab} object.
     * @example
     * it('should have the home tab in the first position', function () {
     *     expect(encore.tabs.initialize().byIndex(0).name).to.eventually.equal('Home');
     * });
     */
    byIndex: {
        value: function (index) {
            return rxTabFromElement(this.tblTabs.get(index));
        }
    },

    /**
     * @instance
     * @type {String[]}
     * @description A list of all tab names in the collection of tabs, in the order they appear.
     * @example
     * it('should have every tab present', function () {
     *     var tabNames = ['Home', 'Profile', 'Activity'];
     *     expect(encore.tabs.initialize().names).to.eventually.eql(tabNames);
     * });
     */
    names: {
        get: function () {
            return this.tblTabs.map(function (tabElement) {
                return tabElement.getText().then(function (text) {
                    return text.trim();
                });
            });
        }
    },

    /**
     * @instance
     * @type {rxTabset.rxTab}
     * @description Return a {@link rxTabset.rxTab} object for the current active tab.
     * If you attempt to call this property when there is no active tab, you will
     * trigger a NoSuchElementException.
     * @example
     * it('should mark a visited tab as active', function () {
     *     var tab = encore.tabs.initialize().byName('Home');
     *     expect(tab.isActive()).to.eventually.be.false;
     *     tab.click();
     *     expect(tab.isActive()).to.eventually.be.true;
     *     expect(encore.tabs.initialize().activeTab.name).to.eventually.equal('Home');
     * });
     */
    activeTab: {
        get: function () {
            return rxTabFromElement(this.rootElement.$('.nav-tabs .active'));
        }
    },

    /**
     * @instance
     * @function
     * @returns {Number}
     * @description The number of tabs in the collection of tabs.
     * @example
     * it('should have three tabs', function () {
     *     expect(encore.tabs.initialize().count()).to.eventually.equal(3);
     * });
     */
    count: {
        value: function () {
            return this.tblTabs.count();
        }
    }

};

exports.rxTabset = {
    /**
     * @function
     * @memberof tabs
     * @param {ElementFinder} tabsElement - The ElementFinder to be transformed into a {@link rxTabset} object.
     * @description Creates a {@link rxTabset} page object from a `tabsElement`, representing the container for
     * a particular list of tabs. If you'd like to track all tabs present on a page at the same time, pass
     * in a selector that highlights all elements on a page, such as `$('html')` or `$('body')`.
     */
    initialize: function (tabsElement) {
        if (tabsElement === undefined) {
            tabsElement = $('html');
        }

        rxTabset.rootElement = {
            get: function () { return tabsElement; }
        };
        return Page.create(rxTabset);
    }
};
