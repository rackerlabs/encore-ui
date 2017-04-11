'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$} from 'protractor';
import {rxModalAction} from './rxModalAction.page';

import * as component from './rxBulkSelect.page';

export interface IRxBulkSelectExerciseOptions {
    instance: component.rxBulkSelect;
    batchActions?: string [];
    count?: number;
}

/**
 * @description rxBulkSelect exercises.
 * @example
 * describe('default exercises', encore.exercise.rxBulkSelect({
 *     instance: myPage.bulkSelect, // select one of many widgets from your page objects
 *     batchActions: ['Create', 'Read', 'Update', 'Delete']
 * }));
 */
export function rxBulkSelectExercise (options: IRxBulkSelectExerciseOptions) {
    options = _.defaults(options, {
        batchActions: [],
        count: 10,
    });

    return () => {
        let component: component.rxBulkSelect;

        before(() => {
            component = options.instance;
        });

        it('has no selected rows, a hidden message, and a disabled batch actions link', () => {
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('shows the message and enables the batch actions link when a row is selected', () => {
            component.row(0).select();
            expect(component.bulkMessage).to.eventually.match(/^1 \w+ is selected.$/);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('updates the message as rows are selected', () => {
            component.selectByIndex([1, 2]);
            expect(component.bulkMessage).to.eventually.match(/^3 \w+s are selected.$/);
        });

        it('hides the message and disables the batch actions link when all rows are deselected', () => {
            component.deselectByIndex([0, 1, 2]);
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('selects all rows via the header checkbox', () => {
            let selExp = new RegExp('^' + options.count + ' \\w+s are selected.$');

            component.selectAllCheckbox.select();
            expect(component.tblSelectedRows.count()).to.eventually.eql(options.count);
            expect(component.bulkMessage).to.eventually.match(selExp);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('clears the selection via the header checkbox', () => {
            component.selectAllCheckbox.deselect();
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('selects all rows via the button in the message', () => {
            let selExp = new RegExp('^' + options.count + ' \\w+s are selected.$');

            component.row(0).select();
            component.selectAll();
            expect(component.tblSelectedRows.count()).to.eventually.eql(options.count);
            expect(component.selectAllCheckbox.isSelected()).to.eventually.be.true;
            expect(component.bulkMessage).to.eventually.match(selExp);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('clears the selection via the button in the message', () => {
            component.clearSelections();
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.selectAllCheckbox.isSelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        if (options.batchActions.length > 0) {
            it('should have a batch actions menu', () => {
                expect(component.batchActions.isPresent()).to.eventually.be.true;
            });

            it('should disable the batch actions menu when no items selected', () => {
                expect(component.batchActions.isEnabled()).to.eventually.be.false;
            });

            it('should enable the batch actions menu when an item is selected', () => {
                component.row(0).select();
                expect(component.batchActions.isEnabled()).to.eventually.be.true;
            });

            it('should expand the batch action menu when clicked', () => {
                component.batchActions.expand();
                expect(component.batchActions.isExpanded()).to.eventually.be.true;
            });

            it('should have the correct number of batch actions', () => {
                expect(component.batchActions.actionCount()).to.eventually.eql(options.batchActions.length);
            });

            _.each(options.batchActions, action => {
                it(`should have the batch action "${action}"`, () => {
                    expect(component.batchActions.hasAction(action)).to.eventually.be.true;
                });

                it(`should be able to open the modal for batch action "${action}"`, () => {
                    let modal = new rxModalAction($('.modal'));
                    component.batchActions.action(action).click();
                    expect(modal.isDisplayed()).to.eventually.be.true;
                    modal.close();
                });
            });
        }
    };
};
