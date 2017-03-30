'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import {rxMisc} from './rxMisc.page';
import * as component from './rxToggleSwitch.page';

export interface IRxToggleSwitchExerciseOptions {
    instance: component.rxToggleSwitch;
    enabled?: boolean;
    toggledAtStart?: boolean;
    toggledAtEnd?: boolean;
}

/**
 * @description rxToggleSwitch exercises.
 * @example
 * describe('default exercises', encore.exercise.rxToggleSwitch({
 *     instance: myPage.emailPreference // select one of many widgets from your page objects
 * }));
 */
export function rxToggleSwitchExercise (options: IRxToggleSwitchExerciseOptions) {

    options = _.defaults(options, {
        enabled: true,
        toggledAtStart: false,
        toggledAtEnd: true,
    });

    return () => {
        let toggledAtEnd = options.toggledAtEnd;
        let toggledAtStart = options.toggledAtStart;
        let component: component.rxToggleSwitch;
        let positionAsText = isEnabled => {
            return isEnabled ? 'ON' : 'OFF';
        };

        let toggle = () => {
            rxMisc.scrollToElement(component, {
                positionOnScreen: 'middle',
            });
            return component.isToggled().then(toggled => {
                toggled ? component.toggleOff() : component.toggleOn();
            });
        };

        before(() => {
            component = options.instance;
            component.isToggled().then(isToggled => {
                // use option if available, otherwise use detected state
                toggledAtStart = _.isNull(options.toggledAtStart) ? isToggled : options.toggledAtStart;

                // use option if available, otherwise use inverse of toggledAtStart
                toggledAtEnd = _.isNull(options.toggledAtEnd) ? !toggledAtStart : options.toggledAtEnd;
            });
        });

        it('should show the element', () => {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should' + (options.enabled ? '' : ' not') + ' be enabled', () => {
            expect(component.isEnabled()).to.eventually.equal(options.enabled);
        });

        if (!options.enabled) {
            it('should not change state when clicked', () => {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtStart);
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtStart));
            });
        } else {
            it('should begin in the ' + positionAsText(toggledAtStart) + ' state', () => {
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtStart));
            });

            it('should change to ' + positionAsText(toggledAtEnd) + ' when clicked', () => {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtEnd);
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtEnd));
            });

            it('should return to the ' + positionAsText(toggledAtStart) + ' when clicked again', () => {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtStart);
                expect(component.getText()).to.eventually.equal(positionAsText(toggledAtStart));
            });
        }

    };
};
