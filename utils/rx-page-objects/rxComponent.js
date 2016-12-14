///<reference path="../typings/globals/node/index.d.ts"/>
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("protractor/globals");
const protractor_1 = require("protractor");
class rxComponentElement extends protractor_1.ElementFinder {
    constructor(rootElement) {
        super(globals_1.browser, rootElement.elementArrayFinder_);
    }
}
exports.rxComponentElement = rxComponentElement;
;
