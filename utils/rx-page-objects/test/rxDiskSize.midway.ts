'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$$} from 'protractor';

import {rxDiskSize as diskSize} from '../index';

let demoPage = require('../../demo.page');

describe('rxDiskSize', () => {
    let diskSizesTable;
    let diskSizeStrings = [
        '420 GB',
        '125 TB',
        '171.337 PB',
        '420 GB',
        '125 TB',
        '171.337 PB',
    ];

    before(() => {
        demoPage.go('#/utilities/rxDiskSize');
        diskSizesTable = $$('#rx-disk-size-demo ul li');
    });

    _.forEach(diskSizeStrings, (testData, index) => {
        it('should still have ' + testData + ' as test data on the page', () => {
            diskSizesTable.get(index).getText().then(text => {
                let onPage = text.split('→')[1].trim();
                expect(onPage).to.equal(testData);
            });
        });

        it('should convert ' + testData + ' back to gigabytes', () => {
            diskSizesTable.get(index).getText().then(text => {
                let gigabytes = parseInt(text.split(' ')[0], 10);
                expect(diskSize.toGigabytes(testData)).to.equal(gigabytes);
            });
        });
    });

});
