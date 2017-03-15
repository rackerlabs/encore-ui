'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {exercise, rxRadio} from '../index';

let demoPage = require('../../demo.page');

describe('rxRadio', () => {
    let subject: rxRadio;

    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled Selected', exercise.rxRadio({
        instance: new rxRadio($('#radValidEnabledOne')),
        disabled: false,
        selected: true,
        valid: true,
    }));

    describe('(State) Valid Enabled Unselected', exercise.rxRadio({
        instance: new rxRadio($('#radValidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: true,
    }));

    describe('(State) Valid Disabled Selected', exercise.rxRadio({
        instance: new rxRadio($('#radValidDisabledOne')),
        disabled: true,
        selected: true,
        valid: true,
    }));

    describe('(State) Valid Disabled Unselected', exercise.rxRadio({
        instance: new rxRadio($('#radValidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true,
    }));

    describe('(State) Valid NG-Disabled Selected', exercise.rxRadio({
        instance: new rxRadio($('#radValidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: true,
    }));

    describe('(State) Valid NG-Disabled Unselected', exercise.rxRadio({
        instance: new rxRadio($('#radValidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true,
    }));

    describe('(State) Invalid Enabled Selected', exercise.rxRadio({
        instance: new rxRadio($('#radInvalidEnabledOne')),
        disabled: false,
        selected: true,
        valid: false,
    }));

    describe('(State) Invalid Enabled Unselected', exercise.rxRadio({
        instance: new rxRadio($('#radInvalidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: false,
    }));

    describe('(State) Invalid Disabled Selected', exercise.rxRadio({
        instance: new rxRadio($('#radInvalidDisabledOne')),
        disabled: true,
        selected: true,
        valid: false,
    }));

    describe('(State) Invalid Disabled Unselected', exercise.rxRadio({
        instance: new rxRadio($('#radInvalidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false,
    }));

    describe('(State) Invalid NG-Disabled Selected', exercise.rxRadio({
        instance: new rxRadio($('#radInvalidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: false,
    }));

    describe('(State) Invalid NG-Disabled Unselected', exercise.rxRadio({
        instance: new rxRadio($('#radInvalidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false,
    }));

    describe('plain HTML radio buttons', () => {
        describe('Valid Enabled Unchecked', exercise.rxRadio({
            instance: new rxRadio($('#plainRadNormal')),
            disabled: false,
            selected: false,
            valid: false,
        }));

        describe('Valid Disabled Unchecked', exercise.rxRadio({
            instance: new rxRadio($('#plainRadDisabled')),
            disabled: true,
            selected: false,
        }));

        describe('Valid Enabled Checked', exercise.rxRadio({
            instance: new rxRadio($('#plainRadChecked')),
            disabled: false,
            selected: false,
        }));
    });

    describe('Show/Hide Input', () => {
        let radHate: rxRadio;
        let radLike: rxRadio;
        let radLove: rxRadio;

        before(() => {
            radHate = new rxRadio($('#radHateBacon'));
            radLike = new rxRadio($('#radLikeBacon'));
            radLove = new rxRadio($('#radLoveBacon'));
        });

        describe('"I hate bacon"', () => {
            before(() => {
                subject = radHate;
            });

            it('should be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"Actually, I LOVE bacon"', () => {
            before(() => {
                subject = radLove;
            });

            it('should not be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"I like bacon"', () => {
            before(() => {
                subject = radLike;
            });

            it('should be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });

            describe('when selected', () => {
                before(() => {
                    subject.select();
                });

                it('should be valid', () => {
                    expect(subject.isValid()).to.eventually.be.true;
                });

                describe('"I hate bacon"', () => {
                    it('should be valid', () => {
                        expect(radHate.isValid()).to.eventually.be.true;
                    });
                });

                describe('"Actually, I LOVE bacon"', () => {
                    before(() => {
                        subject = radLove;
                    });

                    it('should be visible', () => {
                        expect(subject.isDisplayed()).to.eventually.be.true;
                    });

                    it('should be valid', () => {
                        expect(subject.isValid()).to.eventually.be.true;
                    });
                });
            });
        });

        describe('plain HTML radio buttons', () => {
            let willHide: rxRadio;
            let willBeHidden: rxRadio;
            let otherRadio: rxRadio;

            before(() => {
                willHide = new rxRadio($('#plainRadRemoveRadio'));
                willBeHidden = new rxRadio($('#plainRadRemoveable'));
                otherRadio = new rxRadio($('#plainRadNormal'));
            });

            it('should show the radio button by default', () => {
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should remove the radio button from the DOM', () => {
                willHide.select();
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

            it('should put the radio button back', () => {
                otherRadio.select();
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

        });
    }); // Show/Hide Input

    describe('Destroy Input', () => {
        let radCreated: rxRadio;
        let radDestroyed: rxRadio;
        let radTargetCreated: rxRadio;

        before(() => {
            radCreated = new rxRadio($('#radCreated'));
            radDestroyed = new rxRadio($('#radDestroyed'));
            radTargetCreated = new rxRadio($('#radTargetCreated'));
        });

        it('"Destroyed" should be selected', () => {
            expect(radDestroyed.isSelected()).to.eventually.be.true;
        });

        it('"Created" should not be selected', () => {
            expect(radCreated.isSelected()).to.eventually.be.false;
        });

        it('target radio should not be present', () => {
            radTargetCreated = new rxRadio($('#radTargetCreated'));
            expect(radTargetCreated.isPresent()).to.eventually.be.false;
        });

        describe('when "Created" is selected', () => {
            before(() => {
                radCreated.select();
            });

            it('"Destroyed" should not be selected', () => {
                expect(radDestroyed.isSelected()).to.eventually.be.false;
            });

            it('target radio should be present', () => {
                radTargetCreated = new rxRadio($('#selTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.true;
            });
        });

        describe('when "Destroyed" is selected again', () => {
            before(() => {
                radDestroyed.select();
            });

            it('"Created" should not be selected', () => {
                expect(radCreated.isSelected()).to.eventually.be.false;
            });

            it('target radio should not be present', () => {
                radTargetCreated = new rxRadio($('#radTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.false;
            });
        });
    }); // Destroy Input
});
