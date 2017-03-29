describe('demo components', function () {

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    it('checkboxes', function () {
        screenshot.snap(this, $('table[ng-controller="checkboxDocsCtrl"]'), { threshold: 1 });
    });

    it('radios', function () {
        $('#server_reboot_soft').click();
        screenshot.snap(this, $('rx-example[name="forms.radios"] .demo-wrapper'), { threshold: 1 });
    });

    it('disabled misc', function () {
        screenshot.snap(this, $('rx-example[name="forms.disabled"] .demo-wrapper'), { threshold: 1 });
    });

    describe('datepicker', function () {
        var datepicker;

        before(function () {
            datepicker = new encore.rxDatePicker(element(by.model('dateModel')));
            datepicker.open();
            datepicker.date = '2012-05-24';
        });

        it('closed', function () {
            datepicker.close();
            screenshot.snap(this, datepicker, { threshold: 1 });
        });

        it('open', function () {
            datepicker.open();
            screenshot.snap(this, datepicker.$('.popup'), { threshold: 1 });
        });

        after(function () {
            datepicker.close();
        });
    });

    describe('timepicker', function () {
        var timepicker;

        before(function () {
            timepicker = new encore.rxTimePicker(element(by.model('emptyValue')));
            timepicker.time = '17:38+00:00'; // http://i.imgur.com/2ZwswxW.png
        });

        it('closed', function () {
            timepicker.close();
            screenshot.snap(this, timepicker, { threshold: 1 });
        });

        it('open', function () {
            timepicker.open();
            screenshot.snap(this, timepicker.$('.popup'), { threshold: 1 });
        });

        after(function () {
            timepicker.close();
        });
    });

});
