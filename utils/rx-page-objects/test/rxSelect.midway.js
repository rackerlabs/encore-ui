describe('rxSelect', function () {
    var subject;

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled', encore.exercise.rxSelect({
        instance: encore.rxSelect.initialize($('#selValidEnabled')),
        disabled: false,
        visible: true,
        valid: true,
        selectedText: 'Third'
    }));

    describe('(State) Valid NG-Disabled', encore.exercise.rxSelect({
        instance: encore.rxSelect.initialize($('#selValidNgDisabled')),
        disabled: true,
        visible: true,
        valid: true,
        selectedText: 'Disabled by \'ng-disabled\' attribute'
    }));

    describe('(State) Valid Disabled', encore.exercise.rxSelect({
        instance: encore.rxSelect.initialize($('#selValidDisabled')),
        disabled: true,
        visible: true,
        valid: true,
        selectedText: 'Disabled by \'disabled\' attribute'
    }));

    describe('(State) Invalid Enabled', encore.exercise.rxSelect({
        instance: encore.rxSelect.initialize($('#selInvalidEnabled')),
        disabled: false,
        visible: true,
        valid: false,
        selectedText: 'Fourth'
    }));

    describe('(State) Invalid NG-Disabled', encore.exercise.rxSelect({
        instance: encore.rxSelect.initialize($('#selInvalidNgDisabled')),
        disabled: true,
        visible: true,
        valid: false,
        selectedText: 'Disabled by \'ng-disabled\' attribute'
    }));

    describe('(State) Invalid Disabled', encore.exercise.rxSelect({
        instance: encore.rxSelect.initialize($('#selInvalidDisabled')),
        disabled: true,
        visible: true,
        valid: false,
        selectedText: 'Disabled by \'disabled\' attribute'
    }));

    describe('plain HTML select elements', function () {
        describe('Enabled Default Starting Value', encore.exercise.rxSelect({
            instance: encore.rxSelect.initialize($('#plainSelNormal')),
            disabled: false,
            valid: false,
            selectedText: 'Plain HTML Select Option'
        }));

        describe('Disabled', encore.exercise.rxSelect({
            instance: encore.rxSelect.initialize($('#plainSelDisabled')),
            disabled: true,
            valid: false,
            selectedText: 'Disabled HTML Select Option'
        }));

        describe('Valid Enabled Non-Default Starting Value', encore.exercise.rxSelect({
            instance: encore.rxSelect.initialize($('#plainSelSecondSelected')),
            disabled: false,
            valid: true,
            selectedText: 'Non Default Starting Option'
        }));
    });

    describe('How do you like your bacon?', function () {
        var slowClick = false;
        before(function () {
            subject = encore.rxSelect.initialize($('#selBaconPrep'));
        });

        it('should be invalid', function () {
            expect(subject.isValid()).to.eventually.be.false;
        });

        it('should have 5 options', function () {
            expect(subject.optionCount()).to.eventually.equal(5);
        });

        it('should contain desired option', function () {
            expect(subject.optionExists('Thick (borderline jerky)')).to.eventually.be.true;
        });

        it('should not contain undesired option', function () {
            expect(subject.optionExists('no preference')).to.eventually.be.false;
        });

        it('should not report a different option as selected', function () {
            expect(subject.option('Thick (borderline jerky)').isSelected()).to.eventually.be.false;
        });

        it('should have expected options', function () {
            var opts = [
                'I do not like bacon',
                'Thin (light and crispy)',
                'Medium (perfect balance of flavor)',
                'Thick (borderline jerky)',
                'Crumbled (great on salads)',
            ];
            expect(subject.options).to.eventually.eql(opts);
        });

        it('should have expected values', function () {
            var vals = [ '', 'thin', 'medium', 'thick', 'crumbled' ];
            expect(subject.values).to.eventually.eql(vals);
        });

        it('should have a selected option by default', function () {
            /* redundant test, but moved from rxForm.midway.js */
            expect(subject.selectedOption.isSelected()).to.eventually.be.true;
        });

        describe('selecting "Thin (light and crispy)"', function () {
            var txt = 'Thin (light and crispy)';
            var val = 'thin';

            beforeEach(function () {
                subject.select(txt, slowClick);
            });

            afterEach(function () {
                subject.select('I do not like bacon', slowClick);
            });

            it('should be valid', function () {
                expect(subject.isValid()).to.eventually.be.true;
            });

            it('should display correct text', function () {
                expect(subject.selectedOption.getText()).to.eventually.eq(txt);
            });

            it('should have correct value', function () {
                expect(subject.selectedOption.value).to.eventually.eq(val);
            });
        });

        describe('Selecting "I do not like bacon"', function () {
            before(function () {
                subject.select('I do not like bacon', slowClick);
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('plain HTML select elements', function () {
            var willHide;
            var willBeHidden;

            before(function () {
                willHide = encore.rxSelect.initialize($('#plainSelShowSelect'));
                willBeHidden = encore.rxSelect.initialize($('#plainSelRemoveable'));
            });

            it('should show the select element by default', function () {
                expect(willBeHidden.isPresent()).to.eventually.be.true;
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
            });

            it('should remove the select element to the DOM', function () {
                willHide.select('Hide Next Select Box', slowClick);
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should add the select element back', function () {
                willHide.select('Show Next Select Box', slowClick);
                expect(willBeHidden.isPresent()).to.eventually.be.true;
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
            });
        });
    });

    describe('Show/Hide Select', function () {
        var checkbox;

        before(function () {
            checkbox = encore.rxCheckbox.initialize($('#chkShow'));
            subject = encore.rxSelect.initialize($('#selTargetShow'));
        });

        describe('when checkbox checked', function () {
            before(function () {
                checkbox.select();
            });

            it('should be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });
        });

        describe('when checkbox unchecked', function () {
            before(function () {
                checkbox.deselect();
            });

            it('should not be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });
        });
    });

    describe('Destroy Select', function () {
        var radDestroyed, radCreated;

        before(function () {
            radDestroyed = encore.rxRadio.initialize($('#radDestroyed'));
            radCreated = encore.rxRadio.initialize($('#radCreated'));
            subject = encore.rxSelect.initialize($('#selTargetCreated'));
        });

        describe('when created', function () {
            before(function () {
                radCreated.select();
            });

            it('should be present', function () {
                expect(subject.isPresent()).to.eventually.be.true;
            });
        });

        describe('when destroyed', function () {
            before(function () {
                radDestroyed.select();
            });

            it('should not be present', function () {
                expect(subject.isPresent()).to.eventually.be.false;
            });
        });
    });
});
