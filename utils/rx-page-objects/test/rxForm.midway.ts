'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {rxCheckboxAccessor, rxForm, rxRadioAccessor, rxSelectAccessor, textFieldAccessor} from '../index';
import {exercise, rxCheckbox, rxFieldName} from '../index';

let demoPage = require('../../demo.page');

// an anonymous page object to prove that form filling works
class FormPageObject {
    formFill(formData: Object) {
        rxForm.fill(this, formData);
    }

    @textFieldAccessor($('#txtPlain')) plainTextbox;

    @rxCheckboxAccessor($('#chkVolumeNameRequired')) requireName;

    get options() {
        class FormPageOptions {
            @rxRadioAccessor($('#favBeatle_0')) first;
            @rxRadioAccessor($('#favBeatle_1')) second;
        }
        return new FormPageOptions();
    }

    get volumeTypeSelect() {
        class VolumeType {
            @rxSelectAccessor($('#selVolumeType')) type;
        }
        return new VolumeType();
    }
}

let formPageObject = new FormPageObject();

describe('rxForm', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('rxFieldName', () => {
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

    describe('form filling', () => {
        let formData = {
            plainTextbox: 'This is a plain textbox',
            requireName: false,
            options: {
                first: true,
                second: false,
            },
            volumeTypeSelect: {
                type: 'PUNCHCARDS',
            },
            radioTable: [{ Name: 'Option #2' }],
            checkboxTable: [{ Name: 'Item 1' }, { Name: 'Item 2' }],
        };

        before(() => {
            formPageObject.formFill(formData);
        });

        it('should have filled the plainTextbox value', () => {
            expect(formPageObject.plainTextbox).to.eventually.equal('This is a plain textbox');
        });

        it('should have unchecked the requireName checkbox', () => {
            expect(formPageObject.requireName).to.eventually.be.false;
        });

        it('should have selected the first radio option', () => {
            expect(formPageObject.options.first).to.eventually.be.true;
        });

        it('should not have selected the second radio option', () => {
            expect(formPageObject.options.second).to.eventually.be.false;
        });

        it('should have selected the volume type', () => {
            expect(formPageObject.volumeTypeSelect.type.getText()).to.eventually.equal('PUNCHCARDS');
        });

    });
});
