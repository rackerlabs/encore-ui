'use strict';
import {$} from 'protractor';

import {exercise, rxCharacterCount} from '../index';

let demoPage = require('../../demo.page');

describe('rxCharacterCount', () => {

    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('defaults', exercise.rxCharacterCount({
        instance: new rxCharacterCount($('.demo-default-char-count-values')),
    }));

    describe('low max characters', exercise.rxCharacterCount({
        instance: new rxCharacterCount($('.demo-custom-max-characters')),
        maxCharacters: 25,
    }));

    describe('high near limit level', exercise.rxCharacterCount({
        instance: new rxCharacterCount($('.demo-custom-low-boundary')),
        nearLimit: 250,
    }));

    describe('count insignificant whitespace', exercise.rxCharacterCount({
        instance: new rxCharacterCount($('.demo-custom-do-not-trim')),
        ignoreInsignificantWhitespace: false,
    }));

    describe('initial value', exercise.rxCharacterCount({
        instance: new rxCharacterCount($('.demo-initial-value')),
    }));

    describe('with highlighting', exercise.rxCharacterCount({
        instance: new rxCharacterCount($('.demo-highlighting')),
        maxCharacters: 10,
        highlight: true,
    }));

});
