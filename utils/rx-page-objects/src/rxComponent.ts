'use strict';

import {promise} from 'selenium-webdriver'
import {browser, ElementFinder} from 'protractor';

export class rxComponentElement extends ElementFinder {
    constructor(rootElement: ElementFinder) {
        super(browser, rootElement.elementArrayFinder_);
    }
};

// TODO - this is not the best place for a generic exported type like this.
// but it works well for now, seeing as how many components will need both
// generic reusable exported types, as well as rxComponentElement
export type AccessorPromiseString = string | promise.Promise<string>;
export type Promise<T> = promise.Promise<T>; // alias to aid in typing
