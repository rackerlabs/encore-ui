'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import * as component from './rxCheckbox.page';

export interface IRxCheckboxExerciseOptions {
    instance: component.rxCheckbox;
    disabled?: boolean;
    selected?: boolean;
    valid?: boolean;
    visible?: boolean;
}
/**
 * @description rxCheckbox exercises
 */
export function rxCheckboxExercise (options: IRxCheckboxExerciseOptions) {
    options = _.defaults(options, {
        disabled: false,
        selected: false,
        valid: true,
        visible: true,
    });

    return () => {
        let component;

        before(() => {
            component = options.instance;
        });

        it('should be present', () => {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should be a checkbox', () => {
            expect(component.isCheckbox()).to.eventually.be.true;
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

        if (options.disabled) {
            it('should not respond to selecting and unselecting', () => {
                component.isSelected().then(selected => {
                    selected ? component.deselect() : component.select();
                    expect(component.isSelected()).to.eventually.equal(selected);
                    // even though it "doesn't respond to selecting and unselecting"
                    // attempt to put it back anyway in case it did actually respond.
                    // that way nobody accidentally submits a swapped checkbox after
                    // running these exercises.
                    selected ? component.select() : component.deselect();
                    expect(component.isSelected()).to.eventually.equal(selected);
                });
            });
        } else {
            it('should respond to selecting and unselecting', () => {
                component.isSelected().then(selected => {
                    selected ? component.deselect() : component.select();
                    expect(component.isSelected()).to.eventually.not.equal(selected);
                    // exercises should never alter the state of a page.
                    // always put it back when you're done.
                    selected ? component.select() : component.deselect();
                    expect(component.isSelected()).to.eventually.equal(selected);
                });
            });
        }

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', () => {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
