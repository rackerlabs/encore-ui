var rxRadioPage = encore.rxRadio;

describe('rxRadio', function () {
    var subject;

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled Selected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radValidEnabledOne')),
        disabled: false,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Enabled Unselected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radValidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Disabled Selected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radValidDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Disabled Unselected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radValidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Valid NG-Disabled Selected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radValidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid NG-Disabled Unselected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radValidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Invalid Enabled Selected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radInvalidEnabledOne')),
        disabled: false,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Enabled Unselected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radInvalidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid Disabled Selected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radInvalidDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Disabled Unselected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radInvalidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid NG-Disabled Selected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radInvalidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid NG-Disabled Unselected', encore.exercise.rxRadio({
        instance: encore.rxRadio.initialize($('#radInvalidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('plain HTML radio buttons', function () {
        describe('Valid Enabled Unchecked', encore.exercise.rxRadio({
            instance: encore.rxRadio.initialize($('#plainRadNormal')),
            disabled: false,
            selected: false,
            valid: false
        }));

        describe('Valid Disabled Unchecked', encore.exercise.rxRadio({
            instance: encore.rxRadio.initialize($('#plainRadDisabled')),
            disabled: true,
            selected: false
        }));

        describe('Valid Enabled Checked', encore.exercise.rxRadio({
            instance: encore.rxRadio.initialize($('#plainRadChecked')),
            disabled: false,
            selected: false
        }));
    });

    describe('Show/Hide Input', function () {
        var radHate, radLike, radLove;

        before(function () {
            radHate = rxRadioPage.initialize($('#radHateBacon'));
            radLike = rxRadioPage.initialize($('#radLikeBacon'));
            radLove = rxRadioPage.initialize($('#radLoveBacon'));
        });

        describe('"I hate bacon"', function () {
            before(function () {
                subject = radHate;
            });

            it('should be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"Actually, I LOVE bacon"', function () {
            before(function () {
                subject = radLove;
            });

            it('should not be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"I like bacon"', function () {
            before(function () {
                subject = radLike;
            });

            it('should be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });

            describe('when selected', function () {
                before(function () {
                    subject.select();
                });

                it('should be valid', function () {
                    expect(subject.isValid()).to.eventually.be.true;
                });

                describe('"I hate bacon"', function () {
                    it('should be valid', function () {
                        expect(radHate.isValid()).to.eventually.be.true;
                    });
                });

                describe('"Actually, I LOVE bacon"', function () {
                    before(function () {
                        subject = radLove;
                    });

                    it('should be visible', function () {
                        expect(subject.isDisplayed()).to.eventually.be.true;
                    });

                    it('should be valid', function () {
                        expect(subject.isValid()).to.eventually.be.true;
                    });
                });
            });
        });

        describe('plain HTML radio buttons', function () {
            var willHide;
            var willBeHidden;
            var otherRadio;

            before(function () {
                willHide = encore.rxRadio.initialize($('#plainRadRemoveRadio'));
                willBeHidden = encore.rxRadio.initialize($('#plainRadRemoveable'));
                otherRadio = encore.rxRadio.initialize($('#plainRadNormal'));
            });

            it('should show the radio button by default', function () {
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should remove the radio button from the DOM', function () {
                willHide.select();
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

            it('should put the radio button back', function () {
                otherRadio.select();
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

        });
    });//Show/Hide Input

    describe('Destroy Input', function () {
        var radCreated, radDestroyed, radTargetCreated;

        before(function () {
            radCreated = rxRadioPage.initialize($('#radCreated'));
            radDestroyed = rxRadioPage.initialize($('#radDestroyed'));
            radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
        });

        it('"Destroyed" should be selected', function () {
            expect(radDestroyed.isSelected()).to.eventually.be.true;
        });

        it('"Created" should not be selected', function () {
            expect(radCreated.isSelected()).to.eventually.be.false;
        });

        it('target radio should not be present', function () {
            radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
            expect(radTargetCreated.isPresent()).to.eventually.be.false;
        });

        describe('when "Created" is selected', function () {
            before(function () {
                radCreated.select();
            });

            it('"Destroyed" should not be selected', function () {
                expect(radDestroyed.isSelected()).to.eventually.be.false;
            });

            it('target radio should be present', function () {
                radTargetCreated = rxRadioPage.initialize($('#selTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.true;
            });
        });

        describe('when "Destroyed" is selected again', function () {
            before(function () {
                radDestroyed.select();
            });

            it('"Created" should not be selected', function () {
                expect(radCreated.isSelected()).to.eventually.be.false;
            });

            it('target radio should not be present', function () {
                radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.false;
            });
        });
    });//Destroy Input
});
