'use strict';

import {expect} from 'chai';
import {$, ElementFinder} from 'protractor';
let demoPage = require('../../demo.page');

describe('rxToggle', () => {
    let rxToggle: ElementFinder;
    let rxToggleContent: ElementFinder;

    before(() => {
        demoPage.go('#/utilities/rxToggle');
        rxToggle = $('#vacillator');
        rxToggleContent = $('#vacillated');
    });

    it('should toggle content on show', () => {
        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;
        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.true;
        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;
    });
});
