'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {browser, by, element} from 'protractor';
import {rxCheckboxAccessor, rxNotify, textFieldAccessor} from '../index';

let demoPage = require('../../demo.page');

// "wait" for autosave to clear -- function passed to `browser.wait`
let forAutoSaveToClear = () => {
    return rxNotify.all.hasNotification('rxAutoSave data has been cleared!');
};

// anonymous page object
class AutoSaving {
    fill(formData) {
        _.each(formData, (value, key) => {
            this[key] = value;
        });
    }

    @rxCheckboxAccessor(element(by.model('formData.checkbox'))) checkbox;

    @textFieldAccessor(element(by.model('formData.name'))) formName;

    @textFieldAccessor(element(by.model('formData.description'))) description;

    @textFieldAccessor(element(by.model('formData.sensitive'))) sensitiveData;

    clearAutoSave() {
        element(by.buttonText('Clear rxAutoSave')).click();
        browser.wait(forAutoSaveToClear);
    }

    clearAutoSaveWithPromise() {
        element(by.buttonText('Clear rxAutoSave by resolving a promise')).click();
        browser.wait(forAutoSaveToClear);
    }
}

describe('utilities:rxAutoSave', () => {
    let autoSave = new AutoSaving();

    before(() => {
        demoPage.go('#/utilities/rxAutoSave');
    });

    describe('rxAutoSave', () => {
        let autoSavedData = {
            checkbox: true,
            formName: 'Canadian Armed Forces',
            description: ['Using snow as cover, leap from your hiding spot to',
                          'surprise your enemy in a display of tactical brilliance.',
                          'In order to prevent your outfit from soaking',
                          '(later risking hypothermia) you must wear the least',
                          'amount of clothes possible to stay dry through the night.'].join(' '),
            sensitiveData: 'Only Jay Parlar knows where the Candian Armed Forces lie in wait!',
        };

        let leavePage = () => {
            demoPage.go('#/utilities/rxTitleize');
            demoPage.go('#/utilities/rxAutoSave');
        };

        before(() => {
            autoSave.fill(autoSavedData);
            leavePage();
        });

        _.forEach(autoSavedData, (data, property) => {
            it('should remember the form data for ' + property, () => {
                if (property === 'sensitiveData') {
                    expect(autoSave[property]).to.eventually.equal('');
                } else {
                    expect(autoSave[property]).to.eventually.equal(data);
                }
            });
        });

        describe('should clear auto saved data', () => {

            before(() => {
                autoSave.clearAutoSave();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), property => {
                it('should not remember the form data for ' + property, () => {
                    expect(autoSave[property]).to.eventually.be.not.ok;
                });
            });

        });

        describe('should clear auto saved data with a promise', () => {

            before(() => {
                autoSave.fill(autoSavedData);
                autoSave.clearAutoSaveWithPromise();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), property => {
                it('should not remember the form data for ' + property, () => {
                    expect(autoSave[property]).to.eventually.be.not.ok;
                });
            });

        });
    });
});
