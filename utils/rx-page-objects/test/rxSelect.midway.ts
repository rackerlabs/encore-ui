'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {exercise, rxCheckbox, rxRadio, rxSelect} from '../index';

let demoPage = require('../../demo.page');

describe('rxSelect', () => {
    let subject: rxSelect;

    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled', exercise.rxSelect({
        instance: new rxSelect($('#selValidEnabled')),
        disabled: false,
        visible: true,
        valid: true,
        selectedText: 'Third',
    }));

    describe('(State) Valid NG-Disabled', exercise.rxSelect({
        instance: new rxSelect($('#selValidNgDisabled')),
        disabled: true,
        visible: true,
        valid: true,
        selectedText: 'Disabled by \'ng-disabled\' attribute',
    }));

    describe('(State) Valid Disabled', exercise.rxSelect({
        instance: new rxSelect($('#selValidDisabled')),
        disabled: true,
        visible: true,
        valid: true,
        selectedText: 'Disabled by \'disabled\' attribute',
    }));

    describe('(State) Invalid Enabled', exercise.rxSelect({
        instance: new rxSelect($('#selInvalidEnabled')),
        disabled: false,
        visible: true,
        valid: false,
        selectedText: 'Fourth',
    }));

    describe('(State) Invalid NG-Disabled', exercise.rxSelect({
        instance: new rxSelect($('#selInvalidNgDisabled')),
        disabled: true,
        visible: true,
        valid: false,
        selectedText: 'Disabled by \'ng-disabled\' attribute',
    }));

    describe('(State) Invalid Disabled', exercise.rxSelect({
        instance: new rxSelect($('#selInvalidDisabled')),
        disabled: true,
        visible: true,
        valid: false,
        selectedText: 'Disabled by \'disabled\' attribute',
    }));

    describe('plain HTML select elements', () => {
        describe('Enabled Default Starting Value', exercise.rxSelect({
            instance: new rxSelect($('#plainSelNormal')),
            disabled: false,
            valid: false,
            selectedText: 'Plain HTML Select Option',
        }));

        describe('Disabled', exercise.rxSelect({
            instance: new rxSelect($('#plainSelDisabled')),
            disabled: true,
            valid: false,
            selectedText: 'Disabled HTML Select Option',
        }));

        describe('Valid Enabled Non-Default Starting Value', exercise.rxSelect({
            instance: new rxSelect($('#plainSelSecondSelected')),
            disabled: false,
            valid: true,
            selectedText: 'Non Default Starting Option',
        }));
    });

    describe('How do you like your bacon?', () => {
        before(() => {
            subject = new rxSelect($('#selBaconPrep'));
        });

        it('should be invalid', () => {
            expect(subject.isValid()).to.eventually.be.false;
        });

        it('should have 5 options', () => {
            expect(subject.options.count()).to.eventually.equal(5);
        });

        it('should contain desired option', () => {
            expect(subject.option('Thick (borderline jerky)').isPresent()).to.eventually.be.true;
        });

        it('should not contain undesired option', () => {
            expect(subject.option('no preference').isPresent()).to.eventually.be.false;
        });

        it('should not report a different option as selected', () => {
            expect(subject.option('Thick (borderline jerky)').isSelected()).to.eventually.be.false;
        });

        it('should have expected options', () => {
            let opts = [
                'I do not like bacon',
                'Thin (light and crispy)',
                'Medium (perfect balance of flavor)',
                'Thick (borderline jerky)',
                'Crumbled (great on salads)',
            ];
            expect(subject.options.getText()).to.eventually.eql(opts);
        });

        it('should have expected values', () => {
            let vals = [ '', 'thin', 'medium', 'thick', 'crumbled' ];
            expect(subject.options.getAttribute('value')).to.eventually.eql(vals);
        });

        it('should have a selected option by default', () => {
            /* redundant test, but moved from rxForm.midway.js */
            expect(subject.selectedOption.isSelected()).to.eventually.be.true;
        });

        describe('selecting "Thin (light and crispy)"', () => {
            let txt = 'Thin (light and crispy)';
            let val = 'thin';

            beforeEach(() => {
                subject.select(txt);
            });

            afterEach(() => {
                subject.select('I do not like bacon');
            });

            it('should be valid', () => {
                expect(subject.isValid()).to.eventually.be.true;
            });

            it('should display correct text', () => {
                expect(subject.selectedOption.getText()).to.eventually.eq(txt);
            });

            it('should have correct value', () => {
                expect(subject.selectedOption.getAttribute('value')).to.eventually.eq(val);
            });
        });

        describe('Selecting "I do not like bacon"', () => {
            before(() => {
                subject.select('I do not like bacon');
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('plain HTML select elements', () => {
            let willHide: rxSelect;
            let willBeHidden: rxSelect;

            before(() => {
                willHide = new rxSelect($('#plainSelShowSelect'));
                willBeHidden = new rxSelect($('#plainSelRemoveable'));
            });

            it('should show the select element by default', () => {
                expect(willBeHidden.isPresent()).to.eventually.be.true;
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
            });

            it('should remove the select element to the DOM', () => {
                willHide.select('Hide Next Select Box');
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should add the select element back', () => {
                willHide.select('Show Next Select Box');
                expect(willBeHidden.isPresent()).to.eventually.be.true;
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
            });
        });
    });

    describe('Show/Hide Select', () => {
        let checkbox: rxCheckbox;

        before(() => {
            checkbox = new rxCheckbox($('#chkShow'));
            subject = new rxSelect($('#selTargetShow'));
        });

        describe('when checkbox checked', () => {
            before(() => {
                checkbox.select();
            });

            it('should be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });
        });

        describe('when checkbox unchecked', () => {
            before(() => {
                checkbox.deselect();
            });

            it('should not be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });
        });
    });

    describe('Destroy Select', () => {
        let radDestroyed: rxRadio;
        let radCreated: rxRadio;

        before(() => {
            radDestroyed = new rxRadio($('#radDestroyed'));
            radCreated = new rxRadio($('#radCreated'));
            subject = new rxSelect($('#selTargetCreated'));
        });

        describe('when created', () => {
            before(() => {
                radCreated.select();
            });

            it('should be present', () => {
                expect(subject.isPresent()).to.eventually.be.true;
            });
        });

        describe('when destroyed', () => {
            before(() => {
                radDestroyed.select();
            });

            it('should not be present', () => {
                expect(subject.isPresent()).to.eventually.be.false;
            });
        });
    });
});
