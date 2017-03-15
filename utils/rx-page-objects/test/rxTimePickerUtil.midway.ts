'use strict';

import {expect} from 'chai';

import {rxTimePickerUtil} from '../index';

let demoPage = require('../../demo.page');

describe('utilities:rxTimePickerUtil', () => {
    before(() => {
        demoPage.go('#/utilities/rxTimePickerUtil');
    });

    // Don't forget to update rxTimePickerUtil specs
    describe('parseUtcOffset()', () => {
        [
            ['8:00 (-06:00)', '-06:00'],
            ['13:00 (UTC-0800)', '-0800'],
            ['20:00-04:00', '-04:00'],
            ['non-time string', ''],
            ['20:00-0400', '-0400'],
            ['20:00-400', ''],
            ['20:00-4', ''],
        ].forEach(strPair => {
            let strInput = strPair[0];
            let strOutput = strPair[1];

            it('should return "' + strOutput + '" as parsed from "' + strInput + '"', () => {
                let result = rxTimePickerUtil.parseUtcOffset(strInput);
                expect(result).to.eq(strOutput);
            });
        });
    }); // parseUtcOffset()
});
