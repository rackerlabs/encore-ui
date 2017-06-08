describe('rxMultiSelect', function () {
    var scope, compile, createDirective;
    var transcludedTemplate = '<rx-multi-select ng-model="types">' +
                              '<rx-select-option value="A">Type A</rx-select-option>' +
                              '<rx-select-option value="B">Type B</rx-select-option>' +
                              '<rx-select-option value="C">Type C</rx-select-option>' +
                              '<rx-select-option value="D">Type D</rx-select-option>' +
                              '<rx-select-option value="E">Type E</rx-select-option>' +
                              '</rx-multi-select>';
    var optionsTemplate = '<rx-multi-select ng-model="types" options="options"></rx-multi-select>';

    beforeEach(function () {
        module('encore.ui.elements');

        module('templates/rxMultiSelect.html');
        module('templates/rxSelectOption.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        scope.options = ['A', 'B', 'C', 'D', 'E'];

        createDirective = function (template) {
            return helpers.createDirective(template, compile, scope);
        };
    });

    it('renders the preview text properly with preselected options', function () {
        scope.types = _.without(scope.options, 'E');
        var el = createDirective(optionsTemplate);
        var isolateScope = el.isolateScope();
        expect(isolateScope.preview).to.equal('All except E');
    });

    [transcludedTemplate, optionsTemplate].forEach(function (template, i) {
        describe(i === 0 ? 'without options attribute' : 'with options attribute', function () {
            var isolateScope, el;

            beforeEach(function () {
                el = createDirective(template);
                isolateScope = el.isolateScope();
            });

            it('hides the menu', function () {
                expect(isolateScope.listDisplayed).to.be.false;
            });

            it('toggles the visibility of the menu when clicked', function () {
                var previewElement = angular.element(el[0].querySelector('.preview'));
                previewElement.click();
                expect(isolateScope.listDisplayed).to.be.true;

                previewElement.click();
                expect(isolateScope.listDisplayed).to.be.false;
            });

            it('does not toggle the visibility of the menu when a child element is clicked', function () {
                angular.element(el[0].querySelector('.menu')).click();
                expect(isolateScope.listDisplayed).to.be.false;
            });

            describe('controller', function () {
                var ctrl;

                beforeEach(function () {
                    ctrl = el.controller('rxMultiSelect');
                });

                it('initializes the model with an empty array if not defined', function () {
                    expect(scope.types).to.eql([]);
                });

                it('adds options (except "all") and renders', function () {
                    ctrl.render = sinon.stub();

                    expect(ctrl.options).to.eql(['A', 'B', 'C', 'D', 'E']);

                    ctrl.addOption('F');
                    expect(ctrl.options).to.eql(['A', 'B', 'C', 'D', 'E', 'F']);

                    ctrl.addOption('all');
                    expect(ctrl.options).to.eql(['A', 'B', 'C', 'D', 'E', 'F']);

                    expect(ctrl.render).to.have.been.calledOnce;
                });

                it('removes options (except "all") and renders', function () {
                    var reducedOptions = ['A', 'B', 'C', 'D'];
                    var options = reducedOptions.concat('E');
                    scope.types = options;
                    scope.$digest();
                    ctrl.render = sinon.stub();

                    expect(ctrl.options).to.eql(options);

                    ctrl.removeOption('E');
                    scope.$digest();
                    expect(ctrl.options).to.eql(reducedOptions);
                    expect(scope.types).to.eql(reducedOptions);

                    ctrl.removeOption('all');
                    scope.$digest();
                    expect(ctrl.options).to.eql(reducedOptions);
                    expect(scope.types).to.eql(reducedOptions);

                    expect(ctrl.render).to.have.been.calledOnce;
                });

                it('selects and unselects a single option', function () {
                    ctrl.select('A');
                    scope.$digest();
                    expect(scope.types).to.eql(['A']);

                    ctrl.unselect('A');
                    scope.$digest();
                    expect(scope.types).to.eql([]);
                });

                it('selects and unselects all options', function () {
                    ctrl.select('all');
                    scope.$digest();
                    expect(scope.types).to.eql(['A', 'B', 'C', 'D', 'E']);

                    ctrl.unselect('all');
                    scope.$digest();
                    expect(scope.types).to.eql([]);
                });

                it('determines if an option is selected', function () {
                    expect(ctrl.isSelected('A')).to.be.false;

                    ctrl.select('A');
                    scope.$digest();
                    expect(ctrl.isSelected('A')).to.be.true;
                });

                it('determines if all options are selected', function () {
                    expect(ctrl.isSelected('all')).to.be.false;

                    ctrl.select('all');
                    scope.$digest();
                    expect(ctrl.isSelected('all')).to.be.true;
                });
            });

            describe('preview', function () {
                var ctrl;

                beforeEach(function () {
                    ctrl = el.controller('rxMultiSelect');
                });

                it('is set to "None" when no options are selected', function () {
                    expect(isolateScope.preview).to.equal('None');
                });

                it('is set to the option\'s label when one option is selected', function () {
                    var label = el[0].querySelector('rx-select-option[value="A"]').textContent.trim();
                    ctrl.select('A');
                    scope.$digest();
                    expect(isolateScope.preview).to.equal(label);
                });

                it('is set to "All except [x]" when n-1 options are selected', function () {
                    var label = el[0].querySelector('rx-select-option[value="E"]').textContent.trim();
                    ctrl.select('A');
                    ctrl.select('B');
                    ctrl.select('C');
                    ctrl.select('D');
                    scope.$digest();
                    expect(isolateScope.preview).to.equal('All except ' + label);
                });

                it('is set to "All" when all options are selected', function () {
                    ctrl.select('all');
                    scope.$digest();
                    expect(isolateScope.preview).to.equal('All Selected');
                });

                it('is set to "[#] Selected" when more than one but not all options are selected', function () {
                    ctrl.select('A');
                    ctrl.select('B');
                    scope.$digest();
                    expect(isolateScope.preview).to.equal('2 Selected');

                    ctrl.select('C');
                    scope.$digest();
                    expect(isolateScope.preview).to.equal('3 Selected');
                });

                it('rerenders when the model is changed outside the controller', function () {
                    var label = el[0].querySelector('rx-select-option[value="A"]').textContent.trim();
                    scope.types = ['A'];
                    scope.$digest();
                    expect(isolateScope.preview).to.equal(label);
                });

            });

        });

    });
});
