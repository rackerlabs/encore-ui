'use strict';

import {browser, ElementFinder} from 'protractor';
import * as webdriver from 'selenium-webdriver';

export class rxComponentElement extends ElementFinder {
    originalElement: ElementFinder;

    constructor(originalElement: ElementFinder) {
        super(browser, originalElement.elementArrayFinder_);
        this.originalElement = originalElement;
    }
};

// TODO - this is not the best place for a generic exported type like this.
// but it works well for now, seeing as how many components will need both
// generic reusable exported types, as well as rxComponentElement
export type AccessorPromiseString = string | webdriver.promise.Promise<string>;
export type Promise<T> = webdriver.promise.Promise<T>; // alias to aid in typing

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
