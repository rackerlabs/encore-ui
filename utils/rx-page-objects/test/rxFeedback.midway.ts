'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$, browser} from 'protractor';

import {rxFeedback, rxNotify} from '../index';

let demoPage = require('../../demo.page');

describe('rxFeedback', () => {
    let successfulFeedback: rxFeedback;
    let unsuccessfulFeedback: rxFeedback;
    let defaultFeedback = 'Software Bug';

    before(() => {
        demoPage.go('#/elements/Feedback');
        successfulFeedback = new rxFeedback($('#rxFeedbackSucceeds'));
        unsuccessfulFeedback = new rxFeedback($('#rxFeedbackFails'));
    });

    it('should select the "' + defaultFeedback + '" feedback type by default', () => {
        successfulFeedback.open();
        expect(successfulFeedback.type).to.eventually.equal(defaultFeedback);
    });

    it('should have the default feedback description label for "' + defaultFeedback + '"', () => {
        expect(successfulFeedback.getDescriptionLabel()).to.eventually.equal('Bug Description:');
    });

    it('should have the default feedback placeholder text for "' + defaultFeedback + '"', () => {
        let placeholder = 'Please be as descriptive as possible so we can track it down for you.';
        expect(successfulFeedback.getDescriptionPlaceholder()).to.eventually.equal(placeholder);
    });

    describe('feedback types and labels', () => {
        let typesAndLabels = {
            'Incorrect Data': {
                descriptionLabel: 'Problem Description:',
                descriptionPlaceholder: ['Please be as descriptive as possible ',
                                         'so we can figure it out for you.'].join(''),
            },
            'Feature Request': {
                descriptionLabel: 'Feature Description:',
                descriptionPlaceholder: ['Please be as descriptive as possible ',
                                         'so we can make your feature awesome.'].join(''),
            },
            'Kudos': {
                descriptionLabel: 'What made you happy?:',
                descriptionPlaceholder: ['We love to hear that you\'re enjoying Encore! ',
                                         'Tell us what you like, and what we can do to ',
                                         'make it even better'].join(''),
            },
        };

        it('should have all feedback types', () => {
            let types = [defaultFeedback].concat(_.keys(typesAndLabels));
            expect(successfulFeedback.getTypes()).to.eventually.eql(types);
        });

        _.forEach(typesAndLabels, (typeData, type) => {
            it('should switch feedback types', () => {
                successfulFeedback.type = type;
                expect(successfulFeedback.type).to.eventually.equal(type);
            });

            it('should have the correct label set for description', () => {
                expect(successfulFeedback.getDescriptionLabel())
                    .to.eventually.equal(typeData.descriptionLabel);
            });

            it('should have the correct description placeholder', () => {
                expect(successfulFeedback.getDescriptionPlaceholder())
                    .to.eventually.equal(typeData.descriptionPlaceholder);
            });

        });

    });

    describe('submitting feedback', () => {

        it('should successfully submit feedback', () => {
            expect(successfulFeedback.send('Software Bug', 'test', 3000)).to.not.be.rejectedWith(Error);
        });

        it('should catch errors on unsuccessful feedback', () => {
            rxNotify.all.dismiss();
            expect(unsuccessfulFeedback.send('Software Bug', 'test', 3000)).to.be.rejectedWith(Error);
        });

    });

});
