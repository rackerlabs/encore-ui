'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$} from 'protractor';

import * as component from './rxMultiSelect.page';

interface IRxMultiSelectOptions {
    instance: component.rxMultiSelect;
    inputs?: string[];
    disabled?: boolean;
    valid?: boolean;
}
/**
 * rxMultiSelect exercises.
 * @example
 * describe('default exercises', encore.exercise.rxMultiSelect({
 *     instance: myPage.subscriptionList, // select one of many widgets from your page objects
 *     inputs: ['Texas', 'California', 'Virginia', 'Georgia']
 * }));
 */
export function rxMultiSelect(options: IRxMultiSelectOptions) {
    options = _.defaults(options, {
        inputs: [],
        disabled: false,
        valid: true,
    });

    return () => {
        let component: component.rxMultiSelect;

        before(() => {
            component = options.instance;
        });

        it('should hide the menu initially', () => {
            expect(component.isOpen()).to.eventually.be.false;
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', () => {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });

        if (options.disabled) {
            it('should not show the menu when clicked', () => {
                component.open();
                expect(component.isOpen()).to.eventually.be.false;
            });
        } else {
            it('should show the menu when clicked', () => {
                component.open();
                expect(component.isOpen()).to.eventually.be.true;
            });

            it('should select all options', () => {
                component.select(['Select All']);
                expect(component.selectedOptions.getText()).to.eventually.eql(['Select All'].concat(options.inputs));
                expect(component.getPreviewText()).to.eventually.equal('All Selected');
            });

            it('should select no options', () => {
                component.deselect(['Select All']);
                expect(component.selectedOptions.getText()).to.eventually.be.empty;
                expect(component.getPreviewText()).to.eventually.equal('None');
            });

            it('should select a single option', () => {
                let input = _.head(options.inputs);
                component.select([input]);
                expect(component.selectedOptions.getText()).to.eventually.eql([input]);
                expect(component.getPreviewText()).to.eventually.equal(input);
            });

            if (options.inputs.length > 2) {
                it('should select multiple options', () => {
                    let inputs = options.inputs.slice(0, 2);
                    component.select(inputs);
                    expect(component.selectedOptions.getText()).to.eventually.eql(inputs);
                    expect(component.getPreviewText()).to.eventually.equal('2 Selected');
                });
            }

            it('should select all options', () => {
                component.select(['Select All']);
                expect(component.selectedOptions.getText()).to.eventually.eql(['Select All'].concat(options.inputs));
                expect(component.getPreviewText()).to.eventually.equal('All Selected');
            });

            it('should deselect all options', () => {
                component.deselect(['Select All']);
                expect(component.selectedOptions.getText()).to.eventually.be.empty;
                expect(component.getPreviewText()).to.eventually.equal('None');
            });
        }// if options.disabled

        it('hides the menu when another element is clicked', () => {
            $('body').click();
            expect(component.isOpen()).to.eventually.be.false;
        });
    };
};
