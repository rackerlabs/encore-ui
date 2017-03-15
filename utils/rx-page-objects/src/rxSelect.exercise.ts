'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import * as component from './rxSelect.page';

interface IRxSelectExerciseOptions {
    instance?: component.rxSelect;
    disabled?: boolean;
    visible?: boolean;
    valid?: boolean;
    selectedText?: string;
}

/**
 * @description rxSelect exercises.
 */
export function rxSelect (options: IRxSelectExerciseOptions) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        visible: true,
        valid: true,
    });

    return () => {
        let component;

        before(() => {
            component = options.instance;
        });

        it('should be present', () => {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', () => {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', () => {
            expect(component.isEnabled()).to.eventually.eq(!options.disabled);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', () => {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });

        if (options.selectedText) {
            it('should have the correct selected option already chosen', () => {
                expect(component.selectedOption.getText()).to.eventually.equal(options.selectedText);
            });
        }
    };
};
