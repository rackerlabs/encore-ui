'use strict';

import {expect} from 'chai';
import {$, by} from 'protractor';
import {exercise, rxBulkSelect, rxModalAction} from '../index';

let demoPage = require('../../demo.page');

class CustomModal extends rxModalAction {
    selectFirst() {
        this.all(by.css('tbody tr:nth-child(1) input')).click();
    }
}

describe('rxBulkSelect', () => {

    let page = {
        get btnSelectDatacenters() {
            return $('rx-modal-action#selectDatacenters a');
        },
    };

    before(() => {
        demoPage.go('#/elements/Tables');
    });

    describe('exercises', exercise.rxBulkSelect({
        instance: new rxBulkSelect($('[rx-bulk-select]')),
        batchActions: ['Shutdown Selected Datacenters'],
    }));

    describe('rxBulkSelectValidate', () => {
        let validateModal: CustomModal;

        beforeEach(() => {
            validateModal = new CustomModal($('.modal'));
        });

        it('disables the submit button when no items are selected', () => {
            page.btnSelectDatacenters.click();
            expect(validateModal.canSubmit()).to.eventually.be.false;
        });

        it('enables the submit button when an item is selected', () => {
            validateModal.selectFirst();
            expect(validateModal.canSubmit()).to.eventually.be.true;
        });
    });

});
