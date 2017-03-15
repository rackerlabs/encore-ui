'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {ElementFinder} from 'protractor';
import {Promise} from './rxComponent';

import * as component from './rxMetadata.page';

interface IRxMetadataExerciseOptions {
    instance: component.rxMetadata;
    present?: boolean;
    visible?: boolean;
    terms: { [id: string]: any };
    transforms?: { [id: string]: (definition: ElementFinder) => Promise<any> };
}
/**
 * rxMetadata exercises, with optional transforms to exercising complex metadata
 * @example
 * describe('metadata', encore.exercise.rxMetadata({
 *     instance: myPage.accountOverviewMetadata,
 *     terms: {
 *         'Signup Date': new Date('March 1st, 2011').valueOf(),
 *         'Overdue Balance': 13256,
 *         'Current Due': 64400,
 *         'Expiration Date': new Date('January 1st, 2021').valueOf()
 *     },
 *     transforms: {
 *         'Current Due': (definition) => {
 *             return definition.getText().then(text => parseInt(text));
 *         }
 *     }
 * }));
 */
export function rxMetadata (options: IRxMetadataExerciseOptions) {

    options = _.defaults(options, {
        present: true,
        visible: true,
        transforms: {},
    });

    return () => {
        let component: component.rxMetadata;

        before(() => {
            component = options.instance;
        });

        it('should ' + (options.present ? 'be' : 'not be') + ' present', () => {
            expect(component.isPresent()).to.eventually.eq(options.present);
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', () => {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should have every term present and in the correct order', () => {
            expect(component.getLabels()).to.eventually.eql(Object.keys(options.terms));
        });

        _.forEach(options.terms, (expected: string, term: any) => {
            it('should have the correct definition for ' + term, () => {
                let definition = component.term(term);
                if (options.transforms[term]) {
                    let transformFn = options.transforms[term];
                    expect(transformFn(definition)).to.eventually.eql(expected);
                } else {
                    expect(definition.getText()).to.eventually.eql(expected);
                }
            });
        });

    };
};
