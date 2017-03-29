'use strict';
import {$} from 'protractor';

import {exercise, rxCollapse} from '../index';

let demoPage = require('../../demo.page');

describe('rxCollapse', () => {

    before(() => {
        demoPage.go('#/elements/Collapse');
    });

    describe('custom title', exercise.rxCollapse({
        instance: new rxCollapse($('.demo-with-title')),
        title: 'A Custom Title',
        expanded: true,
    }));

    describe('default title', exercise.rxCollapse({
        instance: new rxCollapse($('.demo-no-title')),
        expanded: false,
    }));
});
