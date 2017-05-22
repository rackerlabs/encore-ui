describe('typeahead', function () {
    var el, scope, filter;

    var template = '<input type="text" ng-model="selected" ' +
                   'typeahead="letter for letter in letters | filter:$viewValue:allowEmpty">';

    beforeEach(function () {
        module('encore.ui.elements');

        inject(function ($rootScope, $filter, $compile) {
            scope = $rootScope.$new();
            scope.letters = ['a', 'b', 'c'];

            filter = $filter('filter');

            el = helpers.createDirective(template, $compile, scope);
        });
    });

    it.skip('does not filter items when the value is empty', function () {
        expect(filter(scope.letters, '$EMPTY$', scope.allowEmpty)).to.eql(scope.letters);
    });

    it('does not modify the input value passed to the model', function () {
        ['', 'hello'].forEach(function (value) {
            el.val(value);
            el.triggerHandler('input');
            expect(scope.selected).to.equal(value);
        });
    });
});
