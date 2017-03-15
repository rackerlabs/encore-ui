'use strict';
import {$} from 'protractor';

import {exercise, rxToggleSwitch} from '../index';

let demoPage = require('../../demo.page');

describe('rxToggleSwitch', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('defaults', exercise.rxToggleSwitch({
        instance: new rxToggleSwitch($('.demo-default-values')),
    }));

    describe('specific model values', exercise.rxToggleSwitch({
        instance: new rxToggleSwitch($('.demo-model-values')),
    }));

    describe('successful asynchronous operation', exercise.rxToggleSwitch({
        instance: new rxToggleSwitch($('.demo-post-hook')),
        toggledAtStart: true,
        toggledAtEnd: false,
    }));

    describe('failed asynchronous operation', exercise.rxToggleSwitch({
        instance: new rxToggleSwitch($('.demo-failed-async')),
        toggledAtEnd: false,
    }));

    describe('disabled', exercise.rxToggleSwitch({
        instance: new rxToggleSwitch($('.demo-disabled')),
        enabled: false,
    }));

});
