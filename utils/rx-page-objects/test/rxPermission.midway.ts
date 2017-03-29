'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

let demoPage = require('../../demo.page');

describe('rxPermission', () => {
    before(() => {
        demoPage.go('#/utilities/rxPermission');
    });

    it('rxPermission should display and hide content when appropriate', () => {
        let rxPermission = $('rx-permission');
        expect(rxPermission.isDisplayed()).to.eventually.be.false;
        demoPage.storeTokenButton.click();
        expect(rxPermission.isDisplayed()).to.eventually.be.true;
        demoPage.clearTokenButton.click();
        expect(rxPermission.isDisplayed()).to.eventually.be.false;
    });
});
