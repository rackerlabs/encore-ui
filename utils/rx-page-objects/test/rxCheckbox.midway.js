var rxCheckboxPage = encore.rxCheckbox;

describe('rxCheckbox', function () {
    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled Checked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkValidEnabledOne')),
        disabled: false,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Enabled UnChecked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkValidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Ng-Disabled Checked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkValidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Ng-Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkValidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Disabled Checked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkValidDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkValidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Invalid Enabled Checked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkInvalidEnabledOne')),
        disabled: false,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Enabled UnChecked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkInvalidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid Ng-Disabled Checked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkInvalidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Ng-Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkInvalidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid Disabled Checked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkInvalidDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: encore.rxCheckbox.initialize($('#chkInvalidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('plain HTML checkboxes', function () {
        describe('Valid Enabled Unchecked', encore.exercise.rxCheckbox({
            instance: encore.rxCheckbox.initialize($('#plainHtmlNormal')),
            disabled: false,
            selected: false,
            valid: false
        }));

        describe('Valid Disabled Unchecked', encore.exercise.rxCheckbox({
            instance: encore.rxCheckbox.initialize($('#plainHtmlDisabled')),
            disabled: true,
            selected: false,
            valid: false
        }));

        describe('Valid Enabled Checked', encore.exercise.rxCheckbox({
            instance: encore.rxCheckbox.initialize($('#plainHtmlChecked')),
            disabled: false,
            selected: true,
            valid: false
        }));

    });

    describe('Show/Hide Input', function () {
        var chkSure, chkReallySure;

        before(function () {
            chkSure = rxCheckboxPage.initialize($('#chkAmSure'));
            chkReallySure = rxCheckboxPage.initialize($('#chkAmReallySure'));
        });

        describe('"Are you sure?"', function () {
            it('should be displayed', function () {
                expect(chkSure.isDisplayed()).to.eventually.be.true;
            });

            describe('when checked', function () {
                before(function () {
                    chkSure.select();
                });

                it('should be valid', function () {
                    expect(chkSure.isValid()).to.eventually.be.true;
                });

                it('should show "Are you REALLY sure?"', function () {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.true;
                });
            });

            describe('when unchecked', function () {
                before(function () {
                    chkSure.deselect();
                });

                it('should not be valid', function () {
                    expect(chkSure.isValid()).to.eventually.be.false;
                });

                it('should not show "Are you REALLY sure?"', function () {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.false;
                });
            });
        });

        describe('plain HTML checkboxes', function () {
            var willHide;
            var willBeHidden;

            before(function () {
                willHide = encore.rxCheckbox.initialize($('#plainChkRemoveCheckbox'));
                willBeHidden = encore.rxCheckbox.initialize($('#plainChkRemoveable'));
            });

            it('should show the checkbox by default', function () {
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

            it('should remove the checkbox from the DOM', function () {
                willHide.select();
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should put the checkbox back', function () {
                willHide.deselect();
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

        });
    });

    describe('Destroy Input', function () {
        var chkRemove, chkRemoveable;

        before(function () {
            chkRemove = rxCheckboxPage.initialize($('#chkRemoveCheckbox'));
            chkRemoveable = rxCheckboxPage.initialize($('#chkRemoveable'));
        });

        describe('when checked', function () {
            before(function () {
                chkRemove.select();
            });

            describe('Static Checkbox', function () {
                it('should not exist', function () {
                    expect(chkRemoveable.isPresent()).to.eventually.be.false;
                });
            });
        });

        describe('when unchecked', function () {
            before(function () {
                chkRemove.deselect();
            });

            describe('Static Checkbox', function () {
                it('should exist', function () {
                    expect(chkRemoveable.isPresent()).to.eventually.be.true;
                });
            });
        });
    });
});
