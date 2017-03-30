'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import * as component from './rxSearchBox.page';

export interface IRxSearchBoxExerciseOptions {
    instance: component.rxSearchBox;
    disabled?: boolean;
    placeholder?: string;
}
/**
 * @description rxSearchBox exercises.
 * @example
 * describe('default exercises', encore.exercise.rxSearchBox({
 *     instance: myPage.searchText, // select one of many widgets from your page objects
 *     placeholder: 'Filter by name...'
 * }));
 */
export function rxSearchBoxExercise (options: IRxSearchBoxExerciseOptions) {

    options = _.defaults(options, {
        disabled: false,
        placeholder: 'Search...',
    });

    return () => {
        let searchBox: component.rxSearchBox;

        before(() => {
            searchBox = options.instance;
        });

        it('should show the element', () => {
            expect(searchBox.isDisplayed()).to.eventually.be.true;
        });

        if (options.placeholder) {
            it('should have a placeholder', () => {
                expect(searchBox.getPlaceholder()).to.eventually.equal(options.placeholder);
            });
        }

        if (options.disabled) {
            describe('when disabled', () => {
                it('should not be enabled', () => {
                    expect(searchBox.isEnabled()).to.eventually.be.false;
                });

                it('should not display the clear button', () => {
                    expect(searchBox.isClearable()).to.eventually.be.false;
                });
            }); // when disabled
        } else {
            describe('when enabled', () => {
                it('should be enabled', () => {
                    expect(searchBox.isEnabled()).to.eventually.be.true;
                });

                it('should update the search term', () => {
                    searchBox.search('testing');
                    expect(searchBox.getTerm()).to.eventually.equal('testing');
                });

                it('should be clearable', () => {
                    expect(searchBox.isClearable()).to.eventually.be.true;
                });

                it('should clear the search term', () => {
                    searchBox.clear();
                    expect(searchBox.getTerm()).to.eventually.equal('');
                });

                it('should not be clearable', () => {
                    expect(searchBox.isClearable()).to.eventually.be.false;
                });
            }); // when enabled
        }
    };
};
