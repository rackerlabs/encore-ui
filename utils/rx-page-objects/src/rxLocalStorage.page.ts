'use strict';

import {browser} from 'protractor';

/* tslint:disable no-shadowed-variable */

/**
 * @namespace
 */
export namespace rxLocalStorage {

    /**
     * @description Add a new item to local storage. All parameters are
     * passed through `JSON.stringify()` before being set.
     * @example
     * it('should set a key in local storage', function () {
     *   encore.rxLocalStorage.setItem('key', 'value');
     *   expect(encore.rxLocalStorage.getItem('key')).to.eventually.equal('value');
     * });
     */
    export function setItem(key: string, value: any) {
        let command = (key: string, value: any) => {
            localStorage.setItem(key, value);
        };
        browser.executeScript(command, key, JSON.stringify(value));
    }

    /**
     * @description Retrieve a pre-existing value from local storage by `key`. If the item is not
     * found, `null` is returned instead.
     * @example
     * it('should add the token when you click the button', function () {
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.false;
     *     $('#the-button').click();
     *     expect(encore.rxLocalStorage.getItem('key')).to.eventually.equal('value');
     * });
     */
    export function getItem(key: string) {
        let command = (key: string) => {
            return JSON.parse(localStorage.getItem(key));
        };
        return browser.executeScript(command, key);
    }

    /**
     * @description Remove an entry from local storage by `key`.
     * @example
     * it('should remove the token from local storage', function () {
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.true;
     *     encore.rxLocalStorage.removeItem('key');
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.false;
     * });
     */
    export function removeItem(key: string) {
        let command = (key: string) => {
            localStorage.removeItem(key);
        };
        browser.executeScript(command, key);
    }

    /**
     * @description Whether or not the `key` provided has already been set in local storage.
     * @example
     * it('should report if the key isPresent', function () {
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.false;
     *     encore.rxLocalStorage.setItem('key', 'value');
     *     expect(encore.rxLocalStorage.isPresent('key')).to.eventually.be.true;
     * });
     */
    export function isPresent(key: string) {
        let command = (key: string) => {
            return localStorage.getItem(key) !== null;
        };
        return browser.executeScript(command, key);
    }
}
