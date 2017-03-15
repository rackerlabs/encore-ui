'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$$} from 'protractor';

import {rxDiskSize} from '../index';

let demoPage = require('../../demo.page');

describe('rxBytesConvert', () => {
    let diskSizesTable;
    let diskSizeStrings = [
        '420 GB',
        '125 TB',
        '171.34 PB',
        '420 GB',
        '125 TB',
        '171.34 PB',
    ];

    before(() => {
        demoPage.go('#/utilities/rxBytesConvert');
        diskSizesTable = $$('#rx-bytes-convert-demo ul li');
    });

    _.forEach(diskSizeStrings, (testData, index) => {
        it('should still have ' + testData + ' as test data on the page', () => {
            diskSizesTable.get(index).getText().then(text => {
                let onPage = text.split('→')[1].trim();
                expect(onPage).to.equal(testData);
            });
        });

        it('should convert ' + testData + ' back to bytes', () => {
            diskSizesTable.get(index).getText().then(text => {
                let gigabytes = parseInt(text.split(' ')[0], 10);
                expect(rxDiskSize.toBytes(testData)).to.equal(gigabytes);
            });
        });
    });

});
