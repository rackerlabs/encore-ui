describe('rxTags', function () {
    var scope, isolateScope, compile, el, input;
    var createTemplate = _.template('<rx-tags ng-model="tags" options="tagOptions" ${attrs}></rx-tags>');
    var standardTemplate = createTemplate({ attrs: '' });

    beforeEach(function () {
        module('encore.ui.utilities');
        module('encore.ui.elements');
        module('templates/rxTags.html');
        module('templates/rxTypeaheadPopup.html');
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        scope.tagOptions = [
            { text: 'a key' },
            { text: 'another key' }
        ];

        el = helpers.createDirective(standardTemplate, compile, scope);
        isolateScope = el.isolateScope();

        input = el.find('input')[0];
        input.focus = sinon.stub();
    });

    describe('disabling', function () {
        describe('using the disabled attribute', function () {
            var disabledTemplate = createTemplate({ attrs: 'disabled' });

            beforeEach(function () {
                el = helpers.createDirective(disabledTemplate, compile, scope);
                isolateScope = el.isolateScope();
            });

            it('is disabled', function () {
                expect(isolateScope.disabled).to.be.true;
            });
        });

        describe('using the ng-disabled directive', function () {
            var ngDisabledTemplate = createTemplate({ attrs: 'ng-disabled="d"' });

            beforeEach(function () {
                el = helpers.createDirective(ngDisabledTemplate, compile, scope);
                isolateScope = el.isolateScope();
            });

            it('is disabled when the value is true', function () {
                scope.d = true;
                scope.$digest();
                expect(isolateScope.disabled).to.be.true;
            });

            it('is enabled when the value is false', function () {
                scope.d = false;
                scope.$digest();
                expect(isolateScope.disabled).to.be.false;
            });
        });
    });

    describe('focusInput()', function () {
        it('focuses the input if the container element is clicked', function () {
            isolateScope.focusInput({ target: el.children()[0] });
            expect(input.focus).to.have.been.called;
        });

        it('does not focus the input if any other element is clicked', function () {
            isolateScope.focusInput({});
            expect(input.focus).to.not.have.been.called;
        });
    });

    describe('removeIfBackspace()', function () {
        beforeEach(function () {
            sinon.stub(isolateScope, 'remove');
        });

        afterEach(function () {
            isolateScope.remove.restore();
        });

        it('removes the tag when the key is backspace', function () {
            isolateScope.removeIfBackspace({
                keyCode: 8,
                preventDefault: function () {},
                target: {}
            }, 'foo');
            expect(isolateScope.remove).to.have.been.calledWith('foo');
        });

        it('does nothing when the key is not backspace', function () {
            isolateScope.removeIfBackspace({
                keyCode: 9,
                preventDefault: function () {}
            }, 'foo');
            expect(isolateScope.remove).to.not.have.been.called;
        });
    });

    describe('focusTag()', function () {
        var elementMock = { previousElementSibling: { focus: sinon.stub() }};

        beforeEach(function () {
            elementMock.previousElementSibling.focus.reset();
        });

        it('changes focus when the key is backspace and the input is empty', function () {
            isolateScope.focusTag({
                keyCode: 8,
                target: elementMock
            }, '');
            expect(elementMock.previousElementSibling.focus).to.have.been.called;
        });

        it('does not change focus when the key is not backspace', function () {
            isolateScope.focusTag({
                keyCode: 9,
                target: elementMock
            }, '');
            expect(elementMock.previousElementSibling.focus).to.not.have.been.called;
        });

        it('does not change focus when the input is not empty', function () {
            isolateScope.focusTag({
                keyCode: 8,
                target: elementMock
            }, 'foo');
            expect(elementMock.previousElementSibling.focus).to.not.have.been.called;
        });
    });

    describe('add()', function () {
        it('adds a new tag to the list', function () {
            var tag = { text: 'a tag' };
            isolateScope.add(tag);
            expect(scope.tags).to.eql([tag]);
        });

        it('resets the tag input', function () {
            isolateScope.newTag = 'foo';
            isolateScope.add();
            expect(isolateScope.newTag).to.equal('');
        });
    });

    describe('remove()', function () {
        it('removes a tag from the list', function () {
            var tags = scope.options;
            scope.tags = _.clone(tags);
            scope.$digest();
            isolateScope.remove(_.head(tags));
            expect(scope.tags).to.eql(_.tail(tags));
        });

        it('focuses the input', function () {
            isolateScope.remove();
            expect(input.focus).to.have.been.called;
        });
    });

    describe('with the key attribute', function () {
        var keyTemplate = createTemplate({ attrs: 'key="text">' });

        beforeEach(function () {
            el = helpers.createDirective(keyTemplate, compile, scope);
            isolateScope = el.isolateScope();
        });

        it('writes tags to the model by their keys', function () {
            isolateScope.add({ text: 'a key' });
            scope.$digest();
            expect(scope.tags).to.eql(['a key']);
        });

        it('renders tags by checking their keys', function () {
            scope.tags = ['a key'];
            scope.$digest();
            expect(isolateScope.tags).to.eql([{ text: 'a key' }]);
        });
    });
});
