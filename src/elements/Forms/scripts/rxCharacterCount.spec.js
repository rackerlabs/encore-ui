describe('elements:CharacterCount', function () {
    var originalScope, scope, compile, el, $timeout, $rootScope;
    var initialTemplate = '<textarea ng-model="initComment" rx-character-count></textarea>';
    var defaultTemplate = '<textarea ng-model="comment" rx-character-count></textarea>';
    var maxCharsTemplate = '<textarea ng-model="comment" rx-character-count max-characters="50"></textarea>';
    var boundaryTemplate = '<textarea ng-model="comment" rx-character-count max-characters="20" low-boundary="5">' +
                           '</textarea>';
    var ngTrimTemplate = '<textarea ng-model="trimComment" rx-character-count max-characters="50" ' +
                         'ng-trim="true"></textarea>';
    var ngTrimFalseTemplate = '<textarea ng-model="trimComment" rx-character-count max-characters="50" ' +
                              'ng-trim="false"></textarea>';

    beforeEach(function () {
        // load module
        module('encore.ui.elements');

        // Inject in angular constructs
        inject(function ($location, _$rootScope_, $compile, _$timeout_) {
            $rootScope = _$rootScope_;
            originalScope = $rootScope.$new();
            originalScope.comment = '';
            originalScope.trimComment = '  Hello  ';
            originalScope.initComment = 'I have an initial value';
            originalScope.showTextArea = true;
            originalScope.hideTextArea = true;
            compile = $compile;
            $timeout = _$timeout_;
        });

    });

    // Originate the text change from the element
    // so that the ngChange function is executed
    var changeText = function (el, text) {
        el.val(text).triggerHandler('input');
        originalScope.$digest();
    };

    describe('initialTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(initialTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should initialize `remaining` based on the initial model value', function () {
            expect(scope.remaining).to.equal(231);
        });
    });

    describe('defaultTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(defaultTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should have sane defaults ', function () {
            expect(scope.remaining).to.equal(254);
            expect(el.find('.character-countdown').hasClass('near-limit')).to.be.false;
            expect(el.find('.character-countdown').hasClass('over-limit')).to.be.false;
        });

        it('should update `remaining` when the model changes', function () {
            expect(scope.remaining).to.equal(254);

            changeText(el, 'foo');
            expect(scope.remaining).to.equal(251);
        });
    });

    describe('boundaryTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(boundaryTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should let you pass in a custom lowBoundary', function () {
            expect(scope.nearLimit).to.be.false;

            changeText(el, '1234567890123456');
            expect(scope.nearLimit).to.be.true;
        });
    });

    describe('maxCharsTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(maxCharsTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should let you pass in a custom maxCharacters', function () {
            expect(scope.remaining).to.equal(50);
        });

        it('should set nearLimit to true when we drop below', function () {
            expect(scope.nearLimit).to.be.false;

            // Pass in 40 characters, should not be below limit
            changeText(el, '1234567890123456789012345678901234567890');
            expect(scope.nearLimit).to.be.false;

            // Pass in 41 characters, should be below limit
            changeText(el, '12345678901234567890123456789012345678901');
            expect(scope.nearLimit).to.be.true;
        });

        it('should set overLimit when we drop below 0', function () {

            expect(scope.nearLimit).to.be.false;

            // Pass in 40 characters, should not be below limit
            changeText(el, '1234567890123456789012345678901234567890');
            expect(scope.nearLimit, 'near, 40 chars').to.be.false;
            expect(scope.overLimit, 'over, 40 chars').to.be.false;

            // Pass in 50 characters, should be below limit, but not over
            changeText(el, '12345678901234567890123456789012345678901234567890');
            expect(scope.nearLimit, 'near, 50 chars').to.be.true;
            expect(scope.overLimit, 'over, 50 chars').to.be.false;

            // Pass in 51 characters, should be over, but not below
            changeText(el, '123456789012345678901234567890123456789012345678901');
            expect(scope.nearLimit, 'near, 51 chars').to.be.false;
            expect(scope.overLimit, 'over, 51 chars').to.be.true;
        });
    });

    describe('cleanup', function () {
        var parentDiv;
        var ngIfTemplate = '<div class="parent">' +
                           '<textarea ng-if="showTextArea" ng-model="comment" rx-character-count></textarea></div>';
        var ngShowTemplate = '<div class="parent">' +
                           '<textarea ng-show="showTextArea" ng-model="comment" rx-character-count></textarea></div>';
        var ngHideTemplate = '<div class="parent">' +
                           '<textarea ng-hide="hideTextArea" ng-model="comment" rx-character-count></textarea></div>';

        it('should remove the character count if the element is removed with ng-if', function () {
            parentDiv = helpers.createDirective(ngIfTemplate, compile, originalScope);
            el = parentDiv.find('textarea');
            originalScope.showTextArea = false;
            originalScope.$apply();

            // Because we have to remove the wrapper in a $timeout, we need
            // to explicity call flush() here. Which sucks, because an implementation
            // detail is leaking through to the tests.
            $timeout.flush();
            expect(parentDiv.is(':empty')).to.be.true;
        });

        it('should remove the character count if the element is removed manually', function () {
            parentDiv = helpers.createDirective(ngIfTemplate, compile, originalScope);
            el = parentDiv.find('textarea');
            el.scope().$destroy();
            el.remove();
            $rootScope.$apply();
            $timeout.flush();
            expect(parentDiv.is(':empty')).to.be.true;
        });

        it('should hide the character count if the element hides (ngShow)', function () {
            parentDiv = helpers.createDirective(ngShowTemplate, compile, originalScope);
            el = parentDiv.find('textarea');
            var characterCount = parentDiv.find('.character-countdown');
            originalScope.showTextArea = false;
            originalScope.$apply();
            expect(el.hasClass('ng-hide'), 'textarea').to.be.true;
            expect(characterCount.hasClass('ng-hide'), 'character countdown').to.be.true;
        });

        it('should show the character count if the element becomes visible (ngHide)', function () {
            parentDiv = helpers.createDirective(ngHideTemplate, compile, originalScope);
            el = parentDiv.find('textarea');
            var characterCount = parentDiv.find('.character-countdown');
            originalScope.hideTextArea = false;
            originalScope.$apply();
            expect(el.hasClass('ng-hide'), 'textarea should be visible').to.be.false;
            expect(characterCount.hasClass('ng-hide'), 'character countdown should be visible').to.be.false;
        });
    });

    describe('"ng-trim" set to true', function () {
        beforeEach(function () {
            el = helpers.createDirective(ngTrimTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should count the trimmed length', function () {
            expect(scope.remaining).to.equal(45);
        });
    });

    describe('"ng-trim" set to false', function () {
        beforeEach(function () {
            el = helpers.createDirective(ngTrimFalseTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should count the full length', function () {
            expect(scope.remaining).to.equal(41);
        });
    });
});
