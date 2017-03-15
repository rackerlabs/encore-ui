'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import * as component from './rxCollapse.page';

interface IRxCollapseExerciseOptions {
    instance: component.rxCollapse;
    expanded?: boolean;
    title?: string;
}

/**
 * @description rxCollapse exercises.
 * @example
 * describe('default exercises', encore.exercise.rxCollapse({
 *     instance: myPage.hiddenSection, // select one of many widgets from your page objects
 *     title: 'My Custom rxCollapse Element',
 *     expanded: true
 * }));
 */
export function rxCollapse(options: IRxCollapseExerciseOptions) {
    options = _.defaults(options, {
        expanded: false,
        title: undefined,
    });

    return () => {
        let component: component.rxCollapse;

        before(() => {
            component = options.instance;
        });

        it('should show the element', () => {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should expand', () => {
            component.expand();
            expect(component.isExpanded()).to.eventually.be.true;
        });

        it('should not expand again', () => {
            component.expand();
            expect(component.isExpanded()).to.eventually.be.true;
        });

        it('should collapse', () => {
            component.collapse();
            expect(component.isExpanded()).to.eventually.be.false;
        });

        it('should not collapse again', () => {
            component.collapse();
            expect(component.isExpanded()).to.eventually.be.false;
        });

        it('should toggle', () => {
            component.toggle();
            expect(component.isExpanded()).to.eventually.be.true;
        });

        if (!_.isUndefined(options.title)) {
            it('should show a custom title', () => {
                expect(component.getTitle()).to.eventually.equal(options.title);
            });
        } else {
            it('should show "See More" for the title', () => {
                component.collapse();
                expect(component.getTitle()).to.eventually.equal('See More');
            });

            it('should toggle between "See More" and "See Less"', () => {
                component.expand();
                expect(component.getTitle()).to.eventually.equal('See Less');
            });

            it('should toggle between "See Less" and "See More"', () => {
                component.collapse();
                expect(component.getTitle()).to.eventually.equal('See More');
            });
        }

        after(() => {
            // put it back according to the options
            options.expanded ? component.expand() : component.collapse();
        });

    };
};
