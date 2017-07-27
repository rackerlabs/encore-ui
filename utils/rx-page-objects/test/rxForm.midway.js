var Page = require('astrolabe').Page;

// an anonymous page object to prove that form filling works
var formPageObject = Page.create({
    form: {
        set: function (formData) {
            encore.rxForm.fill(this, formData);
        }
    },

    plainTextbox: encore.rxForm.textField.generateAccessor($('#txtPlain')),

    requireName: encore.rxCheckbox.generateAccessor($('#chkVolumeNameRequired')),

    options: {
        get: function () {
            return Page.create({
                first: encore.rxRadio.generateAccessor($('#favBeatle_0')),
                second: encore.rxRadio.generateAccessor($('#favBeatle_1'))
            });
        }
    },

    volumeTypeSelect: {
        get: function () {
            var slowClick = false;
            return Page.create({
                type: encore.rxSelect.generateAccessor($('#selVolumeType'), slowClick)
            });
        }
    }
});

describe('rxForm', function () {
    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('rxFieldName', function () {
        describe('"Plain Textbox"', encore.exercise.rxFieldName({
            instance: new encore.rxFieldName($('#fieldNamePlainTextbox')),
            visible: true,
            required: false
        }));

        describe('"Required Textarea"', encore.exercise.rxFieldName({
            instance: new encore.rxFieldName($('#fieldNameRequiredTextarea')),
            visible: true,
            required: true
        }));

        describe('Example', function () {
            var checkbox, subject;

            before(function () {
                checkbox = encore.rxCheckbox.initialize($('#chkVolumeNameRequired'));
                subject = new encore.rxFieldName($('#fieldNameVolumeName'));
            });

            describe('when checkbox checked', function () {
                before(function () {
                    checkbox.select();
                });

                it('symbol should be visible', function () {
                    expect(subject.isSymbolDisplayed()).to.eventually.be.true;
                });
            });

            describe('when checkbox unchecked', function () {
                before(function () {
                    checkbox.deselect();
                });

                it('symbol should not be visible', function () {
                    expect(subject.isSymbolDisplayed()).to.eventually.be.false;
                });
            });
        });
    });

    describe('form filling', function () {
        var formData = {
            plainTextbox: 'This is a plain textbox',
            requireName: false,
            options: {
                first: true,
                second: false
            },
            volumeTypeSelect: {
                type: 'PUNCHCARDS'
            },
            radioTable: [{ Name: 'Option #2' }],
            checkboxTable: [{ Name: 'Item 1' }, { Name: 'Item 2' }]
        };

        before(function () {
            formPageObject.form = formData;
        });

        it('should have filled the plainTextbox value', function () {
            expect(formPageObject.plainTextbox).to.eventually.equal('This is a plain textbox');
        });

        it('should have unchecked the requireName checkbox', function () {
            expect(formPageObject.requireName).to.eventually.be.false;
        });

        it('should have selected the first radio option', function () {
            expect(formPageObject.options.first).to.eventually.be.true;
        });

        it('should not have selected the second radio option', function () {
            expect(formPageObject.options.second).to.eventually.be.false;
        });

        it('should have selected the volume type', function () {
            expect(formPageObject.volumeTypeSelect.type.getText()).to.eventually.equal('PUNCHCARDS');
        });

    });
});
