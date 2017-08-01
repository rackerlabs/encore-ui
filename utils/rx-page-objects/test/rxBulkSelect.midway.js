var Page = require('astrolabe').Page;

describe('rxBulkSelect', function () {

    var page = Page.create({
        btnSelectDatacenters: {
            get: function () {
                return $('rx-modal-action#selectDatacenters a');
            }
        }
    });

    var modal = {
        selectFirst: {
            value: function () {
                this.rootElement.all(by.css('tbody tr:nth-child(1) input')).click();
            }
        }
    };

    before(function () {
        demoPage.go('#/elements/Tables');
    });

    describe('exercises', encore.exercise.rxBulkSelect({
        batchActions: ['Shutdown Selected Datacenters']
    }));

    describe('rxBulkSelectValidate', function () {
        var validateModal;

        beforeEach(function () {
            validateModal = encore.rxModalAction.initialize(modal);
        });

        it('disables the submit button when no items are selected', function () {
            page.btnSelectDatacenters.click();
            expect(validateModal.canSubmit()).to.eventually.be.false;
        });

        it('enables the submit button when an item is selected', function () {
            validateModal.selectFirst();
            expect(validateModal.canSubmit()).to.eventually.be.true;
        });
    });

});
