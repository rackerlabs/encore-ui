'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import * as component from './rxFieldName.page';

export interface IRxFieldNameExerciseOptions {
    instance: component.rxFieldName;
    name?: string;
    present?: boolean;
    required?: boolean;
    visible?: boolean;
}

/**
 * rxFieldName exercises.
 */
export function rxFieldNameExercise (options: IRxFieldNameExerciseOptions) {

    options = _.defaults(options, {
        visible: true,
        present: true,
        required: false,
    });

    return () => {
        let component: component.rxFieldName;

        before(() => {
            component = options.instance;
        });

        it(`should ${(options.visible ? 'be' : 'not be')} visible`, () => {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.present === true) {
            it('should be present', () => {
                expect(component.isPresent()).to.eventually.be.true;
            });

            it('should have a symbol present', () => {
                expect(component.symbol.isPresent()).to.eventually.be.true;
            });
        } else {
            it('should not be present', () => {
                expect(component.isPresent()).to.eventually.be.false;
            });

            it('should not have a symbol present', () => {
                expect(component.symbol.isPresent()).to.eventually.be.false;
            });
        }

        if (options.required === true) {
            it('should have a symbol visible', () => {
                expect(component.symbol.isDisplayed()).to.eventually.be.true;
            });
        } else {
            it('should not have a symbol visible', () => {
                expect(component.symbol.isDisplayed()).to.eventually.be.false;
            });
        }

        if (options.name !== undefined) {
            it('should have the specified field name', () => {
                expect(component.getText()).to.eventually.eql(options.name);
            });
        }
    };
};
