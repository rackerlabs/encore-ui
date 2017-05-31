describe('rxOptionTable', function () {
    var scope, compile, rootScope;

    beforeEach(function () {
        module('encore.ui.rxOptionTable');
        module('templates/rxOptionTable.html');

        module({ suppressDeprecationWarnings: true });

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('directive:rxOptionTable', function () {
        describe('using checkboxes', function () {
            var checkboxFormTemplate =
                '<rx-option-table id="optionTableId" field-id="optionTableFieldId" ' +
                'data="tableData" required="true" columns="tableColumns" type="checkbox" ' +
                'model="myModel" disable-fn="disableOption(tableId, fieldId, rowId)"></rx-option-table>';

            var tableDataTemplate = [
                {
                    'name': 'Item 1'
                },
                {
                    'name': 'Item 2'
                }
            ];

            it('should determine if row is disabled', function () {
                var checkScope = rootScope.$new();
                checkScope.tableData = [
                    {
                        'id': 'option1_id'
                    },
                    {
                        'id': 'option2_id'
                    }
                ];

                checkScope.disableOption = function (tableId, fieldId, rowId) {
                    return rowId === 'option1_id';
                };

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkDisabled({ 'id': 'option1_id' })).to.be.true;
                expect(checkTableScope.checkDisabled({ 'id': 'option2_id' })).to.be.false;
            });

            it('should validate if there is an empty form but no required flag', function () {
                var checkboxFormTemplate2 =
                    '<rx-option-table data="tableData" columns="tableColumns" ' +
                    'type="checkbox" model="myModel"></rx-option-table>';

                var checkScope = rootScope.$new();
                checkScope.tableData = _.clone(tableDataTemplate);
                checkScope.myModel = [true, false];

                var checkTable = helpers.createDirective(checkboxFormTemplate2, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkRequired()).to.be.false;
            });

            it('should invalidate if there is an empty form and a required flag', function () {
                var checkScope = rootScope.$new();
                checkScope.tableData = _.clone(tableDataTemplate);
                checkScope.myModel = [false, false];

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkRequired()).to.be.true;
            });

            it('should validate if there is one checkbox and a required flag', function () {
                var checkScope = rootScope.$new();
                checkScope.tableData = _.clone(tableDataTemplate);
                checkScope.myModel = [true, false];

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkRequired()).to.be.false;
            });

            it('should validate if there is one checkbox with a ngTrueValue and a required flag', function () {
                var checkScope = rootScope.$new();
                checkScope.tableData = [
                    {
                        'name': 'Item 1'
                    },
                    {
                        'name': 'Item 2',
                        'value': 'checked',
                        'falseValue': 'unchecked'
                    }
                ];
                checkScope.myModel = [false, 'checked'];

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkRequired()).to.be.false;
            });

            it('should validate if there is one checkbox without an ngTrueValue a required flag', function () {
                var checkScope = rootScope.$new();
                checkScope.tableData = [
                    {
                        'name': 'Item 1'
                    },
                    {
                        'name': 'Item 2',
                        'value': 'checked',
                        'falseValue': 'unchecked'
                    }
                ];
                checkScope.myModel = [true, 'unchecked'];

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkRequired()).to.be.false;
            });

            it('should invalidate if there is a form with falsey values and a required flag', function () {
                var checkScope = rootScope.$new();
                checkScope.tableData = [
                    {
                        'name': 'Item 1'
                    },
                    {
                        'name': 'Item 2',
                        'value': 'checked',
                        'falseValue': 'unchecked'
                    }
                ];

                checkScope.myModel = [false, 'unchecked'];

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();
                expect(checkTableScope.checkRequired()).to.be.true;
            });

            it('should select all', function () {
                var checkboxFormTemplate2 =
                    '<rx-option-table data="tableData" columns="tableColumns" ' +
                    'type="checkbox" model="myModel"></rx-option-table>';

                var checkScope = rootScope.$new();
                checkScope.tableData = _.clone(tableDataTemplate);
                checkScope.myModel = [true, false];

                var checkTable = helpers.createDirective(checkboxFormTemplate2, compile, checkScope);
                var checkTableScope = checkTable.isolateScope();

                expect(checkTableScope.model[0]).to.be.true;
                expect(checkTableScope.model[1]).to.be.false;

                checkTableScope.selectAll();

                expect(checkTableScope.model[0]).to.be.true;
                expect(checkTableScope.model[1]).to.be.true;

            });
        });

        describe('using radios', function () {
            var el, elScope,
                radioFormTemplate =
                    '<rx-option-table id="optionTableId" data="tableData" columns="tableColumns" ' +
                    'type="radio" model="myModel" field-id="optionTableFieldId" selected="0" ' +
                    'disable-fn="disableOption(tableId, fieldId, rowId)"></rx-option-table>';

            beforeEach(function () {
                // init myModel
                scope.myModel;

                scope.tableData = [
                    {
                        'id': 'option1_id',
                        'name': 'Option #1',
                        'value': 0
                    }, {
                        'id': 'option2_id',
                        'name': 'Option #2',
                        'value': 1
                    }, {
                        'id': 'option3_id',
                        'name': 'Option #3',
                        'value': 2
                    }
                ];

                scope.tableColumns = [{
                    'label': 'Name',
                    'key': 'name',
                    'selectedLabel': '(Already saved data)'
                }];

                scope.disableOption = function (tableId, fieldId, rowId) {
                    return rowId === 'option1_id';
                };

                el = helpers.createDirective(radioFormTemplate, compile, scope);

                elScope = el.isolateScope();
            });

            afterEach(function () {
                el = null;
                elScope = null;
            });

            it('should determine the current row', function () {
                expect(elScope.isCurrent('0'), 'Item 1').to.be.true;
                expect(elScope.isCurrent(1), 'Item 2').to.be.false;
            });

            it('should determine if row is disabled', function () {
                expect(elScope.checkDisabled({ 'id': 'option1_id' })).to.be.true;
                expect(elScope.checkDisabled({ 'id': 'option2_id' })).to.be.false;
                expect(elScope.checkDisabled({ 'id': 'option3_id' })).to.be.false;
            });

            it('should determine the selected row for radio inputs', function () {
                // nothing should be selected by default
                expect(elScope.isSelected(0), 'Item 1').to.be.false;
                expect(elScope.isSelected(1), 'Item 2').to.be.false;

                // select second item
                scope.myModel = 1;
                scope.$digest();

                expect(elScope.isSelected(0), 'Item 1 still unselected').to.be.false;
                expect(elScope.isSelected(1), 'Item 2 now selected').to.be.true;

                // should take either string or int
                expect(elScope.isSelected('1'), 'Check item 2 selected with string').to.be.true;
            });

            it('should determine the selected row for checkbox inputs', function () {
                var checkboxFormTemplate =
                    '<rx-option-table data="tableData" columns="tableColumns" ' +
                    'type="checkbox" model="myModel" field-id="optionTable2"></rx-option-table>';

                var checkScope = rootScope.$new();
                checkScope.myModel = [];

                var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);

                var checkTableScope = checkTable.isolateScope();

                // nothing should be selected by default
                expect(checkTableScope.isSelected(0, 0), 'Item 1').to.be.false;
                expect(checkTableScope.isSelected(1, 1), 'Item 2').to.be.false;

                // select second item
                checkScope.myModel[1] = 1;
                checkScope.$digest();

                expect(checkTableScope.isSelected(0, 0), 'Item 1 still unselected').to.be.false;
                expect(checkTableScope.isSelected(1, 1), 'Item 2 now selected').to.be.true;

                // select first item
                checkScope.myModel[0] = 0;
                checkScope.$digest();

                expect(checkTableScope.isSelected(0, 0), 'Item 1 now selected').to.be.true;
                expect(checkTableScope.isSelected(1, 1), 'Item 2 still selected').to.be.true;
            });

            it('should correctly return the attribute from the passed object', function () {
                var column = { key: 'test' },
                    data = { test: 'VALUE' };
                expect(elScope.getContent(column, data)).to.be.eq('VALUE');
            });

            it('should correctly interpolate expression and output nested properties from an object', function () {
                var column = { key: '{{ test.data }}' },
                    data = { test: { data: 10 }};
                expect(elScope.getContent(column, data)).to.be.eq('10');
            });

            it('should correctly interpolate expression and apply the uppercase filter', function () {
                var column = { key: '{{ data | uppercase }}' },
                    data = { data: 'lowercase' };
                expect(elScope.getContent(column, data)).to.be.eq('LOWERCASE');
            });

            it('should correctly interpolate expression and do the math inside it', function () {
                var column = { key: '{{ value * 10 }}' },
                    data = { value: 100 };
                expect(elScope.getContent(column, data)).to.be.eq('1000');
            });

            it('should correctly interpolate expression and apply the currency filter to it', function () {
                var column = { key: '{{ amount | currency }}' },
                    data = { amount: 12.5 };
                expect(elScope.getContent(column, data)).to.be.eq('$12.50');
            });
        });
    });
});
