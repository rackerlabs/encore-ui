'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import * as component from './rxTags.page';

export interface IRxTagsExerciseOptions {
    instance?: component.rxTags;
    sampleText?: string;
}

/**
 * rxTags exercises
 * @example
 * describe('default exercises', exercise.rxTags({
 *     instance: new rxTags($('.demo rx-tags')) // select one of many widgets on page
 *     sampleText: 'Tag text to use when creating and testing your tags'
 * }));
 */
export function rxTagsExercise (options: IRxTagsExerciseOptions) {

    options = _.defaults(options, {
        sampleText: undefined,
    });

    return () => {
        let component: component.rxTags;
        let tag: component.Tag;
        let numTags: number;

        before(() => {
            component = options.instance;

            component.count().then(num => {
                numTags = num;
            });
        });

        if (!_.isUndefined(options.sampleText)) {
            describe('after adding tag', () => {
                before(() => {
                    component.addTag(options.sampleText);
                    tag = component.byText(options.sampleText);
                });

                it('should have expected value', () => {
                    expect(tag.getText()).to.eventually.equal(options.sampleText);
                });

                it('should increment total tags by 1', () => {
                    expect(component.count()).to.eventually.equal(numTags + 1);
                });

                it('should not focus last tag', () => {
                    expect(tag.isFocused()).to.eventually.be.false;
                });

                describe('and clicking the tag X', () => {
                    before(() => {
                        tag.remove();
                    });

                    it('should no longer exist', () => {
                        expect(tag.isPresent()).to.eventually.be.false;
                    });

                    it('should decrement total tags by 1', () => {
                        expect(component.count()).to.eventually.equal(numTags);
                    });
                });
            });

            describe('after adding temporary tag for removal', () => {
                before(() => {
                    component.addTag(options.sampleText);
                    tag = component.byText(options.sampleText);
                });

                describe('and typing backspace from input', () => {
                    before(() => {
                        component.sendBackspace();
                    });

                    it('should focus the last tag', () => {
                        expect(tag.isFocused()).to.eventually.be.true;
                    });

                    describe('and typing backspace with focused tag', () => {
                        before(() => {
                            tag.backspaceRemove();
                        });

                        it('should no longer exist', () => {
                            expect(component.byText(options.sampleText).isPresent()).to.eventually.be.false;
                        });

                        it('should decrement count by 1', () => {
                            expect(component.count()).to.eventually.equal(numTags);
                        });
                    });
                });
            });
        }
    };
};
