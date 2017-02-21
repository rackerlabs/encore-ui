describe('rxFloatingHeader', function () {
    var scope, compile, el, $timeout, headerInputs;
    var validTemplate =
        '<table rx-floating-header>' +
            '<thead>' +
                '<tr><th colspan="2"><input></th></tr>' +
                '<tr><th>Col 1</th><th>Col 2</th></tr>' +
            '</thead>' +
            '<tbody>' +
                '<tr><td>Hi</td><td>There 1</td></tr>' +
                '<tr><td>Hi</td><td>There 2</td></tr>' +
                '<tr><td>Hi</td><td>There 3</td></tr>' +
                '<tr><td>Hi</td><td>There 4</td></tr>' +
                '<tr><td>Hi</td><td>There 5</td></tr>' +
                '<tr><td>Hi</td><td>There 6</td></tr>' +
                '<tr><td>Hi</td><td>There 7</td></tr>' +
                '<tr><td>Hi</td><td>There 8</td></tr>' +
                '<tr class="middle-row"><td>Hi</td><td>There 9</td></tr>' +
                '<tr><td>Hi</td><td>There 10</td></tr>' +
                '<tr><td>Hi</td><td>There 11</td></tr>' +
                '<tr><td>Hi</td><td>There 12</td></tr>' +
                '<tr><td>Hi</td><td>There 13</td></tr>' +
            '</tbody>' +
        '</table>';

    var rxDOMHelper = function () {
        var height = '20px',
            width = '20px',
            shouldFloat = true,
            scrollTop = 0,
            offset = 0;

        return {
            // mock methods
            shouldFloat: function () { return shouldFloat; },
            onscroll: function () {},
            height: function () { return height; },
            width: function () { return width; },
            scrollTop: function () { return scrollTop; },
            offset: function () { return offset; },

            // methods to control the mock
            setShouldFloat: function (val) { shouldFloat = val; },
            setHeight: function (val) { height = val; },
            setWidth: function (val) { width = val; },
            setScrollTop: function (val) { scrollTop = val; },
        };
    };
    var mockJq = rxDOMHelper();

    beforeEach(function () {
        // load module
        module('encore.ui.elements');

        module(function ($provide) {
            $provide.value('rxDOMHelper', mockJq);
        });

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile, _$timeout_) {
            scope = $rootScope.$new();
            compile = $compile;
            $timeout = _$timeout_;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
        scope.$digest();

        $timeout.flush();
    });

    describe('header', function () {
        var header, headerCells, cell;

        before(function () {
            header = el.find('thead');;
            headerCells = header.find('th');
            headerInputs = el.find('input');
        });

        it('should have 3 cells', function () {
            expect(headerCells).to.have.length(3);
        });

        it('should have one <input> element with "filter-box" class', function () {
            expect(headerInputs).to.have.length(1);
            expect(headerInputs.eq(0).hasClass('filter-box')).to.be.true;
        });

        describe('first cell', function () {
            beforeEach(function () {
                cell = headerCells.eq(0);
            });

            it('should have "filter-header" class', function () {
                expect(cell.hasClass('filter-header')).to.be.true;
            });
        });//first cell

        describe('second cell', function () {
            beforeEach(function () {
                cell = headerCells.eq(1);
            });

            it('should not have "filter-header" class', function () {
                expect(cell.hasClass('filter-header')).to.be.false;
            });
        });//second cell

        describe('third cell', function () {
            beforeEach(function () {
                cell = headerCells.eq(2);
            });

            it('should not have "filter-header" class', function () {
                expect(cell.hasClass('filter-header')).to.be.false;
            });
        });//third cell
    });

    it('should add .rx-floating-header when we scroll past the header', function () {
        scope.update();
        expect(el.find('thead tr').hasClass('rx-floating-header')).to.be.true;
    });

    it('should remove .rx-floating-header when we scroll back up', function () {
        scope.update();
        expect(el.find('thead tr').hasClass('rx-floating-header'), 'add class').to.be.true;

        mockJq.setShouldFloat(false);
        scope.update();
        expect(el.find('thead tr').hasClass('rx-floating-header'), 'removed class').to.be.false;
    });
});
