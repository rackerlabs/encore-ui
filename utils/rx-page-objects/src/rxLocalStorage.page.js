var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxLocalStorage = {

    /**
     * @function
     * @description Add a new item to local storage. All parameters are
     * passed through `JSON.stringify()` before being set.
     * @param {String} key - The key to store the item under inside of local storage.
     * @param {String} value - The value to associate with the given `key` under local storage.
     * @example
     * it('should set a key in local storage', function () {
     *   encore.rxLocalStorage.setItem('key', 'value');
     *   expect(encore.rxLocalStorage.getItem('key')).to.eventually.equal('value');
     * });
     */
    setItem: {
        value: function (key, value) {
            var command = function (key, value) {
                localStorage.setItem(key, value);
            };
            browser.executeScript(command, key, JSON.stringify(value));
        }
    },

    /**
     * @function
     * @description Retrieve a pre-existing value from local storage by `key`. If the item is not
     * found, `null` is returned instead.
     * @param {String} key - The name to look up (and return its value) in local storage.
     * @returns {*|null}
     * @example
     * it('should add the token when you click the button', function () {
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.false;
     *     $('#the-button').click();
     *     expect(encore.rxLocalStorage.getItem('key')).to.eventually.equal('value');
     * });
     */
    getItem: {
        value: function (key) {
            var command = function (key) {
                return JSON.parse(localStorage.getItem(key));
            };
            return browser.executeScript(command, key);
        }
    },

    /**
     * @function
     * @description Remove an entry from local storage by `key`.
     * @param {String} key - The key to look up in local storage (and then delete).
     * @example
     * it('should remove the token from local storage', function () {
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.true;
     *     encore.rxLocalStorage.removeItem('key');
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.false;
     * });
     */
    removeItem: {
        value: function (key) {
            var command = function (key) {
                localStorage.removeItem(key);
            };
            browser.executeScript(command, key);
        }
    },

    /**
     * @function
     * @description Whether or not the `key` provided has already been set in local storage.
     * @param {String} key - The key to look up in local storage (and check if it is present).
     * @returns {Boolean}
     * @example
     * it('should report if the key isPresent', function () {
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.false;
     *     encore.rxLocalStorage.setItem('key', 'value');
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.true;
     * });
     */
    isPresent: {
        value: function (key) {
            var command = function (key) {
                return localStorage.getItem(key) !== null;
            };
            return browser.executeScript(command, key);
        }
    }

};

exports.rxLocalStorage = Page.create(rxLocalStorage);
