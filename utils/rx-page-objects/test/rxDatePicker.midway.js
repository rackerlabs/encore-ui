var moment = require('moment');

describe('rxDatePicker', function () {

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('simple example', encore.exercise.rxDatePicker({
        instance: new encore.rxDatePicker($('#dpSimple')),
        selectedDate: moment().format('YYYY-MM-DD')
    }));

    describe('enabled, valid', encore.exercise.rxDatePicker({
        instance: new encore.rxDatePicker($('#dpEnabledValid')),
        selectedDate: '2015-12-15'
    }));

    describe('enabled, invalid', encore.exercise.rxDatePicker({
        instance: new encore.rxDatePicker($('#dpEnabledInvalid')),
        isValid: false,
        selectedDate: '2015-12-15'
    }));

    describe('disabled, valid', encore.exercise.rxDatePicker({
        instance: new encore.rxDatePicker($('#dpDisabledValid')),
        isEnabled: false
    }));

    describe('disabled, invalid', encore.exercise.rxDatePicker({
        instance: new encore.rxDatePicker($('#dpDisabledInvalid')),
        isEnabled: false,
        isValid: false
    }));

});
