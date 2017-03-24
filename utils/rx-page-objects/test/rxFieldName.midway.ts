'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {exercise, rxCheckbox, rxFieldName} from '../index';

let demoPage = require('../../demo.page');

describe('rxFieldName', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('"Plain Textbox"', exercise.rxFieldName({
        instance: new rxFieldName($('#fieldNamePlainTextbox')),
        visible: true,
        required: false,
    }));

    describe('"Required Textarea"', exercise.rxFieldName({
        instance: new rxFieldName($('#fieldNameRequiredTextarea')),
        visible: true,
        required: true,
    }));

    describe('Example', () => {
        let checkbox: rxCheckbox;
        let subject: rxFieldName;

        before(() => {
            checkbox = new rxCheckbox($('#chkVolumeNameRequired'));
            subject = new rxFieldName($('#fieldNameVolumeName'));
        });

        describe('when checkbox checked', () => {
            before(() => {
                checkbox.select();
            });

            it('symbol should be visible', () => {
                expect(subject.isSymbolDisplayed()).to.eventually.be.true;
            });
        });

        describe('when checkbox unchecked', () => {
            before(() => {
                checkbox.deselect();
            });

            it('symbol should not be visible', () => {
                expect(subject.isSymbolDisplayed()).to.eventually.be.false;
            });
        });
    });
});
