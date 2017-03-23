'use strict';
import * as moment from 'moment';
import {$} from 'protractor';

import {exercise, rxDatePicker} from '../index';

let demoPage = require('../../demo.page');

describe('rxDatePicker', () => {

    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('simple example', exercise.rxDatePicker({
        instance: new rxDatePicker($('#dpSimple')),
        selectedDate: moment().format('YYYY-MM-DD'),
    }));

    describe('enabled, valid', exercise.rxDatePicker({
        instance: new rxDatePicker($('#dpEnabledValid')),
        selectedDate: '2015-12-15',
    }));

    describe('enabled, invalid', exercise.rxDatePicker({
        instance: new rxDatePicker($('#dpEnabledInvalid')),
        valid: false,
        selectedDate: '2015-12-15',
    }));

    describe('disabled, valid', exercise.rxDatePicker({
        instance: new rxDatePicker($('#dpDisabledValid')),
        enabled: false,
    }));

    describe('disabled, invalid', exercise.rxDatePicker({
        instance: new rxDatePicker($('#dpDisabledInvalid')),
        enabled: false,
        valid: false,
    }));

});
