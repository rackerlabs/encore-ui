
'use strict';
import * as _ from 'lodash';
import {$, browser, ElementFinder, promise} from 'protractor';

import {exercise, rxMetadata} from '../index';

let demoPage = require('../../demo.page');

let transformService = (definition: ElementFinder) => {
    return definition.getText().then(text => _.zipObject(['current', 'proposed'], text.split(' → ')));
};
let transformAmount = (definition: ElementFinder) => {
    return definition.getText().then(currencyString => {
        let resFloat = parseFloat(currencyString.split(' ')[0].replace(/[,$()]/g, '').trim());

        // Negative number
        if (_.head(currencyString) === '(' && _.last(currencyString) === ')') {
            resFloat = -resFloat;
        }

        return Math.round(resFloat * 100);
    });
};
let transformDateField = (definition: ElementFinder) => {
    return definition.getText().then(text => new Date(text));
};
let transformLink = (definition: ElementFinder) => {
    let promises = [definition.getText(), definition.$('a').getAttribute('href')];
    return promise.all(promises).then(results => {
        return { text: results[0], href: results[1] };
    });
};
let transformDataAndLink = (definition: ElementFinder) => {
    let promises = [definition.getText(), definition.$('a').getAttribute('href')];
    return promise.all(promises).then(results => {
        // 'Some data (Link)' -> ['Some data', 'link']
        let text = results[0].split('(')[0].trim();
        let linkText = results[0].split('(')[1].replace(')', '');
        return {
            text,
            href: results[1],
            linkText,
        };
    });
};

describe('rxMetadata', () => {

    before(() => {
        demoPage.go('#/elements/Metadata');
    });

    describe('Status', exercise.rxMetadata({
        instance: new rxMetadata($('rx-metadata')),
        present: true,
        visible: true,
        terms: {
            'Field Name': 'Field Value Example',
            'Another Field Name': 'Another Field Value Example',
            'Third Field Name': 'The Third Field Value Example',
            'Super Long Value': 'A super long data value with aseeminglyunbreakablewordthatcouldoverflowtonextcolumn',
            'Short Field Name': 'A long field value given here to show line break style.',
            'Status': 'Active',
            'RCN': 'RCN-555-555-555',
            'Type': 'Cloud',
            'Service Level': { current: 'Managed', proposed: 'Managed' },
            'Service Type': { current: 'DevOps', proposed: 'SysOps' },
            'Amount': 19268,
            'Phone Number Field': '888 - 888 - 8888',
            'Date Field': new Date('January 6, 1989'),
            'Link Field': { text: 'Link', href: browser.baseUrl + '/#' },
            'Data and Link Field': {
                text: 'Some data',
                href: browser.baseUrl + '/#',
                linkText: 'Link',
            },
        },
        transforms: {
            'Service Level': transformService,
            'Service Type': transformService,
            'Amount': transformAmount,
            'Date Field': transformDateField,
            'Link Field': transformLink,
            'Data and Link Field': transformDataAndLink,
        },
    }));
});
