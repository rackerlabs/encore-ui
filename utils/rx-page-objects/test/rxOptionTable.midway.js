var _ = require('lodash');
var rxOptionTablePage = encore.rxOptionTable;
var rxMisc = encore.rxMisc;

describe('rxOptionTable', function () {
    var component;

    before(function () {
        demoPage.go('#/components/rxOptionTable');
    });

    describe('exercise', function () {
        describe('radio table', encore.exercise.rxOptionTable({
            instance: encore.rxOptionTable.initialize($('#radioOptionTable')),
            visible: true,
            empty: false
        }));

        describe('checkbox table', encore.exercise.rxOptionTable({
            instance: encore.rxOptionTable.initialize($('#checkboxOptionTable')),
            visible: true,
            empty: false
        }));

        describe('empty table', encore.exercise.rxOptionTable({
            instance: encore.rxOptionTable.initialize($('#emptyOptionTable')),
            visible: true,
            empty: true
        }));
    });

    describe('with radios', function () {
        var columnNames = ['Name', 'Static Content', 'Expression 2', 'Expression 3', 'Expression 4'];

        before(function () {
            component = rxOptionTablePage.initialize($('#radioOptionTable'));
        });

        it('should have all column names', function () {
            expect(component.columnNames).to.eventually.eql(columnNames);
        });

        it('should return column data as text by default', function () {
            var textData = ['$0.00', '$1.00', '$2.00', '$3.00'];
            expect(component.columnData('Expression 4')).to.eventually.eql(textData);
        });

        it('should return column data as defined by a custom function', function () {
            var penniesData = [0, 100, 200, 300];
            var penniesFn = function (cellElements) {
                return cellElements.map(function (cellElement) {
                    return cellElement.getText().then(rxMisc.currencyToPennies);
                });
            };

            expect(component.columnData('Expression 4', penniesFn)).to.eventually.eql(penniesData);
        });

        it('should select a column by text', function () {
            component.selectByColumnText('Expression 4', '$2.00');
            expect(component.selections).to.eventually.eql([2]);
        });

        it('should have the current saved data in the first row', function () {
            expect(component.row(0).isCurrent()).to.eventually.be.true;
        });

        it('should have disabled row 4', function () {
            expect(component.disabledOptions).to.eventually.eql([3]);
        });

        describe('selected row', function () {
            var row;
            var cellData = ['Option #3', 'Some Text & HTML', '200.00', 'NESTED NAME 3', '$2.00'];
            var rowData = _.zipObject(columnNames, cellData);

            before(function () {
                row = component.selectedRow;
            });

            it('should be selected', function () {
                expect(row.isSelected()).to.eventually.be.true;
            });

            it('should not be the current saved data', function () {
                expect(row.isCurrent()).to.eventually.be.false;
            });

            _.forEach(rowData, function (data, column) {
                it('should have the correct data in the ' + column + ' column', function () {
                    expect(row.cell(column)).to.eventually.equal(data);
                });
            });
        });
    });//radio

    describe('with checkboxes', function () {
        before(function () {
            component = rxOptionTablePage.initialize($('#checkboxOptionTable'));
        });

        it.skip('should have one row selected', function () {
            expect(component.selections).to.eventually.eql([0]);
        });

        it('should deselect all rows', function () {
            component.deselectAll();
            expect(component.selections).to.eventually.be.empty;
        });

        it.skip('should select many rows', function () {
            component.selectMany([{ Name: 'Item 1' }, { Name: 'Item 2' }]);
            expect(component.selections).to.eventually.eql([0, 1]);
        });

        it('should deselect many rows', function () {
            component.deselectMany([{ Name: 'Item 1' }, { Name: 'Item 2' }]);
            expect(component.selections).to.eventually.be.empty;
        });
    });
});
