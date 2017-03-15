'use strict';

import {expect} from 'chai';
import {$, browser} from 'protractor';

import {exercise, rxCopy} from '../index';

let demoPage = require('../../demo.page');

describe('rxCopy', () => {
    let subject: rxCopy;

    before(() => {
        demoPage.go('#/elements/Copy');
    });

    describe('simple usage', exercise.rxCopy({
        instance: new rxCopy($('#copy-simple-short')),
        expectedText: 'This is a short sentence.',
        testCopyArea: $('#test-textarea'),
    }));

    describe('simple usage with angular variables', exercise.rxCopy({
        instance: new rxCopy($('#copy-simple-long')),
        expectedText: /^A paragraph that will wrap/,
        testCopyArea: $('#test-textarea'),
    }));

    describe('compact paragraph', exercise.rxCopy({
        instance: new rxCopy($('#copy-long-compact')),
        expectedText: /^A compacted paragraph/,
        testCopyArea: $('#test-textarea'),
    }));

    describe('compact metadata', exercise.rxCopy({
        instance: new rxCopy($('#copy-metadata-compact')),
        expectedText: /^A compacted metadata value/,
        testCopyArea: $('#test-textarea'),
    }));

    describe('table usage', () => {
        describe('(icon visibility)', () => {
            before(() => {
                subject = new rxCopy($('td.copy-short rx-copy:first-of-type'));
            });

            it('should have an icon', () => {
                expect(subject.icon.isPresent()).to.eventually.be.true;
            });

            it('should not show an icon', () => {
                expect(subject.icon.isDisplayed()).to.eventually.be.false;
            });

            describe('on hover', () => {
                beforeEach(() => {
                    browser.actions().mouseMove(subject).perform();
                });

                it('should show icon', () => {
                    expect(subject.icon.isDisplayed()).to.eventually.be.true;
                });
            }); // on hover
        }); // icon visibility

        describe('short visible values', exercise.rxCopy({
            instance: new rxCopy($('td.copy-short rx-copy:first-of-type')),
            expectedText: 'Short',
            testCopyArea: $('#test-textarea'),
        })); // short visible values

        describe('long overflow values', exercise.rxCopy({
            instance: new rxCopy($('td.copy-long rx-copy:first-of-type')),
            expectedText: /^An extremely long cell value/,
            testCopyArea: $('#test-textarea'),
        })); // long overflow values
    });
});
