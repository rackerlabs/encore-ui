'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {exercise, rxCheckbox} from '../index';

let demoPage = require('../../demo.page');

describe('rxCheckbox', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled Checked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkValidEnabledOne')),
        disabled: false,
        selected: true,
        valid: true,
    }));

    describe('(State) Valid Enabled UnChecked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkValidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: true,
    }));

    describe('(State) Valid Ng-Disabled Checked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkValidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: true,
    }));

    describe('(State) Valid Ng-Disabled Unchecked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkValidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true,
    }));

    describe('(State) Valid Disabled Checked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkValidDisabledOne')),
        disabled: true,
        selected: true,
        valid: true,
    }));

    describe('(State) Valid Disabled Unchecked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkValidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true,
    }));

    describe('(State) Invalid Enabled Checked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkInvalidEnabledOne')),
        disabled: false,
        selected: true,
        valid: false,
    }));

    describe('(State) Invalid Enabled UnChecked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkInvalidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: false,
    }));

    describe('(State) Invalid Ng-Disabled Checked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkInvalidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: false,
    }));

    describe('(State) Invalid Ng-Disabled Unchecked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkInvalidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false,
    }));

    describe('(State) Invalid Disabled Checked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkInvalidDisabledOne')),
        disabled: true,
        selected: true,
        valid: false,
    }));

    describe('(State) Invalid Disabled Unchecked', exercise.rxCheckbox({
        instance: new rxCheckbox($('#chkInvalidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false,
    }));

    describe('plain HTML checkboxes', () => {
        describe('Valid Enabled Unchecked', exercise.rxCheckbox({
            instance: new rxCheckbox($('#plainHtmlNormal')),
            disabled: false,
            selected: false,
            valid: false,
        }));

        describe('Valid Disabled Unchecked', exercise.rxCheckbox({
            instance: new rxCheckbox($('#plainHtmlDisabled')),
            disabled: true,
            selected: false,
            valid: false,
        }));

        describe('Valid Enabled Checked', exercise.rxCheckbox({
            instance: new rxCheckbox($('#plainHtmlChecked')),
            disabled: false,
            selected: true,
            valid: false,
        }));

    });

    describe('Show/Hide Input', () => {
        let chkSure: rxCheckbox;
        let chkReallySure: rxCheckbox;

        before(() => {
            chkSure = new rxCheckbox($('#chkAmSure'));
            chkReallySure = new rxCheckbox($('#chkAmReallySure'));
        });

        describe('"Are you sure?"', () => {
            it('should be displayed', () => {
                expect(chkSure.isDisplayed()).to.eventually.be.true;
            });

            describe('when checked', () => {
                before(() => {
                    chkSure.select();
                });

                it('should be valid', () => {
                    expect(chkSure.isValid()).to.eventually.be.true;
                });

                it('should show "Are you REALLY sure?"', () => {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.true;
                });
            });

            describe('when unchecked', () => {
                before(() => {
                    chkSure.deselect();
                });

                it('should not be valid', () => {
                    expect(chkSure.isValid()).to.eventually.be.false;
                });

                it('should not show "Are you REALLY sure?"', () => {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.false;
                });
            });
        });

        describe('plain HTML checkboxes', () => {
            let willHide: rxCheckbox;
            let willBeHidden: rxCheckbox;

            before(() => {
                willHide = new rxCheckbox($('#plainChkRemoveCheckbox'));
                willBeHidden = new rxCheckbox($('#plainChkRemoveable'));
            });

            it('should show the checkbox by default', () => {
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

            it('should remove the checkbox from the DOM', () => {
                willHide.select();
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should put the checkbox back', () => {
                willHide.deselect();
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

        });
    });

    describe('Destroy Input', () => {
        let chkRemove: rxCheckbox;
        let chkRemoveable: rxCheckbox;

        before(() => {
            chkRemove = new rxCheckbox($('#chkRemoveCheckbox'));
            chkRemoveable = new rxCheckbox($('#chkRemoveable'));
        });

        describe('when checked', () => {
            before(() => {
                chkRemove.select();
            });

            describe('Static Checkbox', () => {
                it('should not exist', () => {
                    expect(chkRemoveable.isPresent()).to.eventually.be.false;
                });
            });
        });

        describe('when unchecked', () => {
            before(() => {
                chkRemove.deselect();
            });

            describe('Static Checkbox', () => {
                it('should exist', () => {
                    expect(chkRemoveable.isPresent()).to.eventually.be.true;
                });
            });
        });
    });
});
