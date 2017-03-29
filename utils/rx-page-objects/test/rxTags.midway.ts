'use strict';
import {$} from 'protractor';
import {exercise, rxTags} from '../index';

let demoPage = require('../../demo.page');

describe('rxTags', () => {
    before(() => {
        demoPage.go('#/elements/Tags');
    });

    describe('exercises', exercise.rxTags({
        instance: new rxTags($('#standard-tags')),
        sampleText: 'orange',
    }));
});
