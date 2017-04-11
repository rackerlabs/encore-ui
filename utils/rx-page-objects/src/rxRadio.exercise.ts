'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import * as component from './rxRadio.page';

export interface IRxRadioExerciseOptions {
    instance: component.rxRadio;
    disabled?: boolean;
    selected?: boolean;
    valid?: boolean;
    visible?: boolean;
}
/**
 * @description rxRadio exercises
 */
export function rxRadioExercise (options: IRxRadioExerciseOptions) {

    options = _.defaults(options, {
        disabled: false,
        selected: false,
        visible: true,
        valid: true,
    });

    return () => {
        let component: component.rxRadio;

        before(() => {
            component = options.instance;
        });

        it('should be present', () => {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should be a radio button', () => {
            expect(component.isRadio()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', () => {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', () => {
            expect(component.isEnabled()).to.eventually.eq(!options.disabled);
        });

        it('should ' + (options.selected ? 'be' : 'not be') + ' selected', () => {
            expect(component.isSelected()).to.eventually.eq(options.selected);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', () => {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
