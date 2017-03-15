'use strict';
import {$} from 'protractor';

import {exercise, rxSearchBox} from '../index';

let demoPage = require('../../demo.page');

describe('rxSearchBox', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('default rxSearchBox', exercise.rxSearchBox({
        instance: new rxSearchBox($('.default-search-box')),
    }));

    describe('disabled rxSearchBox', exercise.rxSearchBox({
        instance: new rxSearchBox($('.disabled-search-box')),
        disabled: true,
    }));

    describe('custom, wide rxSearchBox', exercise.rxSearchBox({
        instance: new rxSearchBox($('.custom-search-box')),
        placeholder: 'Filter by any...',
    }));
});
