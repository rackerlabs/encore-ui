'use strict';

import {browser, by, ElementFinder} from 'protractor';
import {promise} from 'selenium-webdriver';

export class rxComponentElement extends ElementFinder {
    // tslint:disable-next-line:variable-name
    _originalElement: ElementFinder;

    constructor(originalElement: ElementFinder) {
        super(browser, originalElement.elementArrayFinder_);
        this._originalElement = originalElement;
    }

    get parent() {
        return new rxComponentElement(this.element(by.xpath('..')));
    }
};

// TODO - this is not the best place for a generic exported type like this.
// but it works well for now, seeing as how many components will need both
// generic reusable exported types, as well as rxComponentElement
export type AccessorPromiseString = string | promise.Promise<string>;
export type Promise<T> = promise.Promise<T>; // alias to aid in typing

/**
 * @description Decorator that will allow us to easily override methods inherited from webdriver.
 * This uses something of a simple hack to prevent protractor from changing the method at runtime.
 */
export function OverrideWebdriver(target: Object, propertyKey: string | symbol): PropertyDescriptor {
    let original = target[propertyKey];
    return {
        get() {
            return original;
        },
        set() {
            return null;
        },
    };
}
