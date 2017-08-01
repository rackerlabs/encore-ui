var _ = require('lodash');
var rxBulkSelect = require('./rxBulkSelect.page').rxBulkSelect;

/**
 * @function
 * @description rxBulkSelect exercises.
 * @exports exercise/rxBulkSelect
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxBulkSelect} [options.instance={@link rxBulkSelect.initialize}] - Component to exercise.
 * @param {string[]} [options.batchActions=[]] - List of batch actions to exercise, will not run exercises if empty.
 * @param {number} [options.count=10] - Number of items in the table.
 * @example
 * describe('default exercises', encore.exercise.rxBulkSelect({
 *     instance: myPage.bulkSelect, // select one of many widgets from your page objects
 *     batchActions: ['Create', 'Read', 'Update', 'Delete']
 * }));
 */
exports.rxBulkSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxBulkSelect.initialize(),
        count: 10,
        batchActions: []
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('has no selected rows, a hidden message, and a disabled batch actions link', function () {
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('shows the message and enables the batch actions link when a row is selected', function () {
            component.row(0).select();
            expect(component.bulkMessage).to.eventually.match(/^1 \w+ is selected.$/);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('updates the message as rows are selected', function () {
            component.selectByIndex([1, 2]);
            expect(component.bulkMessage).to.eventually.match(/^3 \w+s are selected.$/);
        });

        it('hides the message and disables the batch actions link when all rows are deselected', function () {
            component.deselectByIndex([0, 1, 2]);
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('selects all rows via the header checkbox', function () {
            var selExp = new RegExp('^' + options.count + ' \\w+s are selected.$');

            component.selectAllCheckbox.select();
            expect(component.allSelected()).to.eventually.be.true;
            expect(component.bulkMessage).to.eventually.match(selExp);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('clears the selection via the header checkbox', function () {
            component.selectAllCheckbox.deselect();
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('selects all rows via the button in the message', function () {
            var selExp = new RegExp('^' + options.count + ' \\w+s are selected.$');

            component.row(0).select();
            component.selectAll();
            expect(component.allSelected()).to.eventually.be.true;
            expect(component.selectAllCheckbox.isSelected()).to.eventually.be.true;
            expect(component.bulkMessage).to.eventually.match(selExp);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('clears the selection via the button in the message', function () {
            component.clearSelections();
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.selectAllCheckbox.isSelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        if (options.batchActions.length > 0) {
            it('should have a batch actions menu', function () {
                expect(component.batchActions.isPresent()).to.eventually.be.true;
            });

            it('should disable the batch actions menu when no items selected', function () {
                expect(component.batchActions.isEnabled()).to.eventually.be.false;
            });

            it('should enable the batch actions menu when an item is selected', function () {
                component.row(0).select();
                expect(component.batchActions.isEnabled()).to.eventually.be.true;
            });

            it('should expand the batch action menu when clicked', function () {
                component.batchActions.expand();
                expect(component.batchActions.isExpanded()).to.eventually.be.true;
            });

            it('should have the correct number of batch actions', function () {
                expect(component.batchActions.actionCount()).to.eventually.eql(options.batchActions.length);
            });

            _.each(options.batchActions, function (action) {
                it('should have the batch action "' + action + '"', function () {
                    expect(component.batchActions.hasAction(action)).to.eventually.be.true;
                });

                it('should be able to open the modal for batch action "' + action + '"', function () {
                    var modal = component.batchActions.action(action).openModal();
                    expect(modal.isDisplayed()).to.eventually.be.true;
                    modal.close();
                });
            });
        }
    };
};
