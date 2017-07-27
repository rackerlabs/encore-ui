var _ = require('lodash');
var Page = require('astrolabe').Page;

// "wait" for autosave to clear -- function passed to `browser.wait`
var forAutoSaveToClear = function () {
    return encore.rxNotify.all.isPresent('rxAutoSave data has been cleared!');
};

// anonymous page object
var autoSaving = Page.create({
    form: {
        set: function (formData) {
            encore.rxForm.fill(this, formData);
        }
    },

    checkbox: encore.rxCheckbox.generateAccessor(element(by.model('formData.checkbox'))),

    name: encore.rxForm.textField.generateAccessor(element(by.model('formData.name'))),

    description: encore.rxForm.textField.generateAccessor(element(by.model('formData.description'))),

    sensitiveData: encore.rxForm.textField.generateAccessor(element(by.model('formData.sensitive'))),

    clearAutoSave: {
        value: function () {
            element(by.buttonText('Clear rxAutoSave')).click();
            browser.wait(forAutoSaveToClear);
        }
    },

    clearAutoSaveWithPromise: {
        value: function () {
            element(by.buttonText('Clear rxAutoSave by resolving a promise')).click();
            browser.wait(forAutoSaveToClear);
        }
    }
});

describe('utilities:rxAutoSave', function () {
    before(function () {
        demoPage.go('#/utilities/rxAutoSave');
    });

    describe('rxAutoSave', function () {
        var autoSavedData = {
            checkbox: true,
            name: 'Canadian Armed Forces',
            description: ['Using snow as cover, leap from your hiding spot to',
                          'surprise your enemy in a display of tactical brilliance.',
                          'In order to prevent your outfit from soaking',
                          '(later risking hypothermia) you must wear the least',
                          'amount of clothes possible to stay dry through the night.'].join(' '),
            sensitiveData: 'Only Jay Parlar knows where the Candian Armed Forces lie in wait!'
        };

        var leavePage = function () {
            demoPage.go('#/utilities/rxTitleize');
            demoPage.go('#/utilities/rxAutoSave');
        };

        before(function () {
            autoSaving.form = autoSavedData;
            leavePage();
        });

        _.forEach(autoSavedData, function (data, property) {
            it('should remember the form data for ' + property, function () {
                if (property === 'sensitiveData') {
                    expect(autoSaving[property]).to.eventually.equal('');
                } else {
                    expect(autoSaving[property]).to.eventually.equal(data);
                }
            });
        });

        describe('should clear auto saved data', function () {

            before(function () {
                autoSaving.clearAutoSave();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), function (property) {
                it('should not remember the form data for ' + property, function () {
                    expect(autoSaving[property]).to.eventually.be.not.ok;
                });
            });

        });

        describe('should clear auto saved data with a promise', function () {

            before(function () {
                autoSaving.form = autoSavedData;
                autoSaving.clearAutoSaveWithPromise();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), function (property) {
                it('should not remember the form data for ' + property, function () {
                    expect(autoSaving[property]).to.eventually.be.not.ok;
                });
            });

        });
    });
});
