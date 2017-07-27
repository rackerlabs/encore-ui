describe('rxTooltip', function () {
    var elm, elmBody, scope, elmScope, tooltipScope, $document;

    beforeEach(module('encore.ui.elements'));
    beforeEach(module('templates/rxTooltip-html-popup.html'));
    beforeEach(module('templates/rxTooltip-popup.html'));
    beforeEach(module('templates/rxTooltip-template-popup.html'));

    beforeEach(inject(function ($rootScope, $compile, _$document_) {
        elmBody = angular.element(
            '<div><span rx-tooltip="tooltip text" rx-tooltip-animation="false">Selector Text</span></div>'
        );

        $document = _$document_;
        scope = $rootScope;
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;
    }));

    afterEach(function () {
        $document.off('keyup');
    });

    function trigger (element, evt) {
        element.trigger(evt);
        element.scope().$$childTail.$digest();
    }

    it('should not be open initially', inject(function () {
        expect(tooltipScope.isOpen).to.be.false;

        // We can only test *that* the tooltip-popup element wasn't created as the
        // implementation is templated and replaced.
        expect(elmBody.children().length).to.eq(1);
    }));

    it('should open on mouseenter', inject(function () {
        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.true;

        // We can only test *that* the tooltip-popup element was created as the
        // implementation is templated and replaced.
        expect(elmBody.children().length).to.eq(2);
    }));

    it('should close on mouseleave', inject(function () {
        trigger(elm, 'mouseenter');
        trigger(elm, 'mouseleave');
        expect(tooltipScope.isOpen).to.be.false;
    }));

    it('should not animate on animation set to false', inject(function () {
        expect(elm.hasClass('tooltipScope.animation')).to.be.false;
    }));

    it('should have default placement of "top"', inject(function () {
        trigger(elm, 'mouseenter');
        expect(tooltipScope.placement).to.equal('top');
    }));

    it('should allow specification of placement', inject(function ($compile) {
        elm = $compile(angular.element(
            '<span rx-tooltip="tooltip text" rx-tooltip-placement="bottom">Selector Text</span>'
        ))(scope);
        scope.$apply();
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        trigger(elm, 'mouseenter');
        expect(tooltipScope.placement).to.equal('bottom');
    }));

    it('should update placement dynamically', inject(function ($compile, $timeout) {
        scope.place = 'bottom';
        elm = $compile(angular.element(
            '<span rx-tooltip="tooltip text" rx-tooltip-placement="{{place}}">Selector Text</span>'
        ))(scope);
        scope.$apply();
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        trigger(elm, 'mouseenter');
        expect(tooltipScope.placement).to.contain('bottom');

        scope.place = 'right';
        scope.$digest();
        $timeout.flush();
        expect(tooltipScope.placement).to.contain('right');
    }));

    it('should work inside an ngRepeat', inject(function ($compile) {
        elm = $compile(angular.element(
            '<ul>' +
              '<li ng-repeat="item in items">' +
                '<span rx-tooltip="{{item.tooltip}}">{{item.name}}</span>' +
              '</li>' +
            '</ul>'
        ))(scope);

        scope.items = [
            { name: 'One', tooltip: 'First Tooltip' }
        ];

        scope.$digest();

        var tt = angular.element(elm.find('li > span')[0]);
        trigger(tt, 'mouseenter');

        expect(tt.text()).to.eq(scope.items[0].name);

        tooltipScope = tt.scope().$$childTail;
        expect(tooltipScope.content).to.eq(scope.items[0].tooltip);

        trigger(tt, 'mouseleave');
        expect(tooltipScope.isOpen).to.not.be.ok;
    }));

    it('should show correct text when in an ngRepeat', inject(function ($compile, $timeout) {
        elm = $compile(angular.element(
            '<ul>' +
              '<li ng-repeat="item in items">' +
                '<span rx-tooltip="{{item.tooltip}}">{{item.name}}</span>' +
              '</li>' +
            '</ul>'
        ))(scope);

        scope.items = [
            { name: 'One', tooltip: 'First Tooltip' },
            { name: 'Second', tooltip: 'Second Tooltip' }
        ];

        scope.$digest();

        var tt1 = angular.element(elm.find('li > span')[0]);
        var tt2 = angular.element(elm.find('li > span')[1]);

        trigger(tt1, 'mouseenter');
        trigger(tt1, 'mouseleave');

        $timeout.flush();

        trigger(tt2, 'mouseenter');

        expect(tt1.text()).to.eq(scope.items[0].name);
        expect(tt2.text()).to.eq(scope.items[1].name);

        tooltipScope = tt2.scope().$$childTail;
        expect(tooltipScope.content).to.eq(scope.items[1].tooltip);
        expect(elm.find('.rxTooltip__inner').text()).to.eq(scope.items[1].tooltip);

        trigger(tt2, 'mouseleave');
    }));

    it('should only have an isolate scope on the popup', inject(function ($compile) {
        var ttScope;

        scope.tooltipMsg = 'Tooltip Text';
        scope.alt = 'Alt Message';

        elmBody = $compile(angular.element(
            '<div><span alt={{alt}} rx-tooltip="{{tooltipMsg}}" rx-tooltip-animation="false">Selector Text</span></div>'
        ))(scope);

        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();

        trigger(elm, 'mouseenter');
        expect(elm.attr('alt')).to.equal(scope.alt);

        ttScope = angular.element(elmBody.children()[1]).isolateScope();
        expect(ttScope.content).to.equal(scope.tooltipMsg);

        trigger(elm, 'mouseleave');

        //Isolate scope contents should be the same after hiding and showing again (issue 1191)
        trigger(elm, 'mouseenter');

        ttScope = angular.element(elmBody.children()[1]).isolateScope();
        expect(ttScope.content).to.equal(scope.tooltipMsg);
    }));

    it('should not show tooltips if there is nothing to show - issue #129', inject(function ($compile) {
        elmBody = $compile(angular.element(
            '<div><span rx-tooltip="">Selector Text</span></div>'
        ))(scope);
        scope.$digest();
        elmBody.find('span').trigger('mouseenter');

        expect(elmBody.children().length).to.eq(1);
    }));

    it('should close the tooltip when its trigger element is destroyed', inject(function () {
        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.true;

        elm.remove();
        elmScope.$destroy();
        expect(elmBody.children().length).to.eq(0);
    }));

    it('issue 1191 - scope on the popup should always be child of correct element scope', function () {
        var ttScope;
        trigger(elm, 'mouseenter');

        ttScope = angular.element(elmBody.children()[1]).scope();
        expect(ttScope.$parent).to.equal(tooltipScope);

        trigger(elm, 'mouseleave');

        // After leaving and coming back, the scope's parent should be the same
        trigger(elm, 'mouseenter');

        ttScope = angular.element(elmBody.children()[1]).scope();
        expect(ttScope.$parent).to.equal(tooltipScope);

        trigger(elm, 'mouseleave');
    });

    describe('with specified enable expression', function () {
        beforeEach(inject(function ($compile) {
            scope.enable = false;
            elmBody = $compile(angular.element(
                '<div><span rx-tooltip="tooltip text" rx-tooltip-enable="enable">Selector Text</span></div>'
            ))(scope);
            scope.$digest();
            elm = elmBody.find('span');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
        }));

        it('should not open ', inject(function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.not.be.ok;
            expect(elmBody.children().length).to.eq(1);
        }));

        it('should open', inject(function () {
            scope.enable = true;
            scope.$digest();
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.ok;
            expect(elmBody.children().length).to.eq(2);
        }));
    });

    describe('with specified popup delay', function () {
        var $timeout;
        beforeEach(inject(function ($compile, _$timeout_) {
            $timeout = _$timeout_;
            scope.delay = '1000';
            elm = $compile(angular.element(
                '<span rx-tooltip="tooltip text" rx-tooltip-popup-delay=' +
                '"{{delay}}" ng-disabled="disabled">Selector Text</span>'
            ))(scope);
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
            scope.$digest();
        }));

        it('should open after timeout', function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.false;

            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.true;
        });

        it('should not open if mouseleave before timeout', function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.false;

            trigger(elm, 'mouseleave');
            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.false;
        });

        it('should use default popup delay if specified delay is not a number', function () {
            scope.delay = 'text1000';
            scope.$digest();
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.true;
        });

        it('should not open if disabled is present', function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.false;

            elmScope.disabled = true;
            elmScope.$digest();
            $timeout.flush(500);

            expect(tooltipScope.isOpen).to.be.false;
        });

        it('should open when not disabled after being disabled - issue #4204', function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.false;

            $timeout.flush(500);
            elmScope.disabled = true;
            elmScope.$digest();

            $timeout.flush(500);
            expect(tooltipScope.isOpen).to.be.false;

            elmScope.disabled = false;
            elmScope.$digest();

            trigger(elm, 'mouseenter');
            $timeout.flush();

            expect(tooltipScope.isOpen).to.be.true;
        });

        it('should close the tooltips in order', inject(function ($compile) {
            var elm2 = $compile('<div><span rx-tooltip="tooltip #2"' +
                'rx-tooltip-is-open="isOpen2">Selector Text</span></div>')(scope);
            scope.$digest();
            elm2 = elm2.find('span');
            var tooltipScope2 = elm2.scope().$$childTail;
            tooltipScope2.isOpen = false;
            scope.$digest();

            trigger(elm, 'mouseenter');
            tooltipScope2.$digest();
            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.true;
            expect(tooltipScope2.isOpen).to.be.false;

            trigger(elm2, 'mouseenter');
            tooltipScope2.$digest();
            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.true;
            expect(tooltipScope2.isOpen).to.be.true;

            var evt = $.Event('keyup');
            evt.which = 27;

            $document.trigger(evt);
            tooltipScope.$digest();
            tooltipScope2.$digest();
            $timeout.flush();

            expect(tooltipScope.isOpen).to.be.true;
            expect(tooltipScope2.isOpen).to.be.false;

            var evt2 = $.Event('keyup');
            evt2.which = 27;

            $document.trigger(evt2);
            tooltipScope.$digest();
            tooltipScope2.$digest();
            $timeout.flush(500);

            expect(tooltipScope.isOpen).to.be.false;
            expect(tooltipScope2.isOpen).to.be.false;
        }));
    });

    describe('with specified popup close delay', function () {
        var $timeout;
        beforeEach(inject(function ($compile, _$timeout_) {
            $timeout = _$timeout_;
            scope.delay = '1000';
            elm = $compile(angular.element(
                '<span rx-tooltip="tooltip text" rx-tooltip-popup-close-delay="{{delay}}"' +
                 'ng-disabled="disabled">Selector Text</span>'
            ))(scope);
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
            scope.$digest();
        }));

        it('should close after timeout', function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.true;
            trigger(elm, 'mouseleave');
            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.false;
        });

        it('should use default popup close delay if specified delay is not a' +
        'number and close immediately', function () {
            scope.delay = 'text1000';
            scope.$digest();
            trigger(elm, 'mouseenter');
            expect(tooltipScope.popupCloseDelay).to.eq(0);
            expect(tooltipScope.isOpen).to.be.true;
            trigger(elm, 'mouseleave');
            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.false;
        });

        it('should open when not disabled after being disabled and close after delay - issue #4204', function () {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.true;

            elmScope.disabled = true;
            elmScope.$digest();

            $timeout.flush(500);
            expect(tooltipScope.isOpen).to.be.false;

            elmScope.disabled = false;
            elmScope.$digest();

            trigger(elm, 'mouseenter');

            expect(tooltipScope.isOpen).to.be.true;
            trigger(elm, 'mouseleave');
            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.false;
        });
    });

    describe('with specified popup and popup close delay', function () {
        var $timeout;
        beforeEach(inject(function ($compile, _$timeout_) {
            $timeout = _$timeout_;
            scope.delay = '1000';
            elm = $compile(angular.element(
                '<span rx-tooltip="tooltip text" rx-tooltip-popup-close-delay="{{delay}}"' +
                'rx-tooltip-popup-close-delay="{{delay}}" ng-disabled="disabled">Selector Text</span>'
            ))(scope);
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
            scope.$digest();
        }));

        it('should not open if mouseleave before timeout', function () {
            trigger(elm, 'mouseenter');
            $timeout.flush(500);
            trigger(elm, 'mouseleave');
            $timeout.flush();

            expect(tooltipScope.isOpen).to.be.false;
        });
    });

    describe('with an is-open attribute', function () {
        beforeEach(inject(function ($compile) {
            scope.isOpen = false;
            elm = $compile(angular.element(
              '<span rx-tooltip="tooltip text" rx-tooltip-is-open="isOpen" >Selector Text</span>'
            ))(scope);
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
            scope.$digest();
        }));

        it('should show and hide with the controller value', function () {
            expect(tooltipScope.isOpen).to.be.false;
            elmScope.isOpen = true;
            elmScope.$digest();
            expect(tooltipScope.isOpen).to.be.true;
            elmScope.isOpen = false;
            elmScope.$digest();
            expect(tooltipScope.isOpen).to.be.false;
        });

        it('should update the controller value', function () {
            trigger(elm, 'mouseenter');
            expect(elmScope.isOpen).to.be.true;
            trigger(elm, 'mouseleave');
            expect(elmScope.isOpen).to.be.false;
        });
    });

    describe('with an is-open attribute expression', function () {
        beforeEach(inject(function ($compile) {
            scope.isOpen = false;
            elm = $compile(angular.element(
                '<span rx-tooltip="tooltip text" rx-tooltip-is-open="isOpen === true" >Selector Text</span>'
            ))(scope);
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
            scope.$digest();
        }));

        it('should show and hide with the expression', function () {
            expect(tooltipScope.isOpen).to.be.false;
            elmScope.isOpen = true;
            elmScope.$digest();
            expect(tooltipScope.isOpen).to.be.true;
            elmScope.isOpen = false;
            elmScope.$digest();
            expect(tooltipScope.isOpen).to.be.false;
        });
    });

    describe('observers', function () {
        var elmBody, elm, elmScope, scope, tooltipScope;

        beforeEach(inject(function ($compile, $rootScope) {
            scope = $rootScope;
            scope.content = 'tooltip content';
            scope.placement = 'top';
            elmBody = angular.element('<div><input rx-tooltip="{{content}}"' +
            'rx-tooltip-placement={{placement}} /></div>');
            $compile(elmBody)(scope);
            scope.$apply();

            elm = elmBody.find('input');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
        }));

        it('should be removed when tooltip hides', inject(function ($timeout) {
            expect(tooltipScope.content).to.equal(undefined);
            expect(tooltipScope.placement).to.equal(undefined);

            trigger(elm, 'mouseenter');
            expect(tooltipScope.content).to.equal('tooltip content');
            expect(tooltipScope.placement).to.equal('top');
            scope.content = 'tooltip content updated';

            scope.placement = 'bottom';
            scope.$apply();
            expect(tooltipScope.content).to.equal('tooltip content updated');
            expect(tooltipScope.placement).to.equal('bottom');

            trigger(elm, 'mouseleave');
            $timeout.flush();
            scope.content = 'tooltip content updated after close';
            scope.placement = 'left';
            scope.$apply();
            expect(tooltipScope.content).to.equal('tooltip content updated');
            expect(tooltipScope.placement).to.equal('bottom');
        }));
    });
});

describe('tooltip positioning', function () {
    var elm, elmBody, scope;
    var $rxPosition;

    // load the tooltip code
    beforeEach(module('encore.ui.elements', function ($rxTooltipProvider) {
        $rxTooltipProvider.options({ animation: false });
    }));

    // load the template
    beforeEach(module('templates/rxTooltip-popup.html'));

    beforeEach(inject(function ($rootScope, $compile, _$rxPosition_) {
        $rxPosition = _$rxPosition_;
        sinon.spy($rxPosition, 'positionElements');

        scope = $rootScope;
        scope.text = 'Some Text';

        elmBody = $compile(angular.element(
            '<div><span rx-tooltip="{{ text }}">Selector Text</span></div>'
        ))(scope);
        scope.$digest();
        elm = elmBody.find('span');
    }));

    function trigger (element, evt) {
        element.trigger(evt);
        element.scope().$$childTail.$digest();
    }

    it('should re-position when value changes', inject(function ($timeout) {
        trigger(elm, 'mouseenter');

        scope.$digest();
        $timeout.flush();
        var startingPositionCalls = $rxPosition.positionElements.callCount;

        scope.text = 'New Text';
        scope.$digest();
        $timeout.flush();
        expect(elm.attr('rx-tooltip')).to.equal('New Text');
        expect($rxPosition.positionElements).to.have.callCount(startingPositionCalls + 1);
        // Check that positionElements was called with elm
        expect($rxPosition.positionElements.args[0][0][0]).to.eq(elm[0]);

        scope.$digest();
        $timeout.verifyNoPendingTasks();
        expect($rxPosition.positionElements).to.have.callCount(startingPositionCalls + 1);
        expect($rxPosition.positionElements.args[0][0][0]).to.eq(elm[0])
        scope.$digest();
    }));
});

describe('tooltipHtml', function () {
    var elm, elmBody, elmScope, tooltipScope, scope;

    // load the tooltip code
    beforeEach(module('encore.ui.elements', function ($rxTooltipProvider) {
        $rxTooltipProvider.options({ animation: false });
    }));

    // load the template
    beforeEach(module('templates/rxTooltip-html-popup.html'));

    beforeEach(inject(function ($rootScope, $compile, $sce) {
        scope = $rootScope;
        scope.html = 'I say: <strong class="hello">Hello!</strong>';
        scope.safeHtml = $sce.trustAsHtml(scope.html);

        elmBody = $compile(angular.element(
          '<div><span rx-tooltip-html="safeHtml">Selector Text</span></div>'
        ))(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;
    }));

    function trigger (element, evt) {
        element.trigger(evt);
        element.scope().$$childTail.$digest();
    }

    it('should render html properly', inject(function () {
        trigger(elm, 'mouseenter');
        expect(elmBody.find('.rxTooltip__inner').html()).to.eq(scope.html);
    }));

    it('should not open if html is empty', function () {
        scope.safeHtml = null;
        scope.$digest();
        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.false;
    });

    it('should show on mouseenter and hide on mouseleave', inject(function ($sce) {
        expect(tooltipScope.isOpen).to.be.false;

        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.true;
        expect(elmBody.children().length).to.eq(2);

        expect($sce.getTrustedHtml(tooltipScope.contentExp())).to.eq(scope.html);

        trigger(elm, 'mouseleave');
        expect(tooltipScope.isOpen).to.be.false;
        expect(elmBody.children().length).to.eq(1);
    }));
});

describe('$rxTooltipProvider', function () {
    var elm,
        elmBody,
        scope,
        elmScope,
        tooltipScope;

    function trigger (element, evt) {
        element.trigger(evt);
        element.scope().$$childTail.$digest();
    }

    describe('popupDelay', function () {
        beforeEach(module('encore.ui.elements', function ($rxTooltipProvider) {
            $rxTooltipProvider.options({ popupDelay: 1000 });
        }));

        // load the template
        beforeEach(module('templates/rxTooltip-popup.html'));

        beforeEach(inject(function ($rootScope, $compile) {
            elmBody = angular.element(
                '<div><span rx-tooltip="tooltip text">Selector Text</span></div>'
            );

            scope = $rootScope;
            $compile(elmBody)(scope);
            scope.$digest();
            elm = elmBody.find('span');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;
        }));

        it('should open after timeout', inject(function ($timeout) {
            trigger(elm, 'mouseenter');
            expect(tooltipScope.isOpen).to.be.false;

            $timeout.flush();
            expect(tooltipScope.isOpen).to.be.true;
        }));
    });

    describe('appendToBody', function () {
        var $body;

        beforeEach(module('templates/rxTooltip-popup.html'));
        beforeEach(module('encore.ui.elements', function ($rxTooltipProvider) {
            $rxTooltipProvider.options({ appendToBody: true });
        }));

        afterEach(function () {
            $body.find('.tooltip').remove();
        });

        it('should append to the body', inject(function ($rootScope, $compile, $document) {
            $body = $document.find('body');
            elmBody = angular.element(
              '<div><span rx-tooltip="tooltip text">Selector Text</span></div>'
            );

            scope = $rootScope;
            $compile(elmBody)(scope);
            scope.$digest();
            elm = elmBody.find('span');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;

            var bodyLength = $body.children().length;
            trigger(elm, 'mouseenter');

            expect(tooltipScope.isOpen).to.be.true;
            expect(elmBody.children().length).to.eq(1);
            expect($body.children().length).to.eq(bodyLength + 1);
        }));

        it('should append to the body when only attribute present', inject(function ($rootScope, $compile, $document) {
            $body = $document.find('body');
            elmBody = angular.element(
              '<div><span rx-tooltip="tooltip text" rx-tooltip-append-to-body>Selector Text</span></div>'
            );

            scope = $rootScope;
            $compile(elmBody)(scope);
            scope.$digest();
            elm = elmBody.find('span');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;

            var bodyLength = $body.children().length;
            trigger(elm, 'mouseenter');

            expect(tooltipScope.isOpen).to.be.true;
            expect(elmBody.children().length).to.eq(1);
            expect($body.children().length).to.eq(bodyLength + 1);
        }));

        it('should not append to the body when attribute value is false',
        inject(function ($rootScope, $compile, $document) {
            $body = $document.find('body');
            elmBody = angular.element(
              '<div><span rx-tooltip="tooltip text" rx-tooltip-append-to-body="false">Selector Text</span></div>'
            );

            scope = $rootScope;
            $compile(elmBody)(scope);
            scope.$digest();
            elm = elmBody.find('span');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;

            var bodyLength = $body.children().length;
            trigger(elm, 'mouseenter');

            expect(tooltipScope.isOpen).to.be.true;
            expect(elmBody.children().length).to.eq(2);
            expect($body.children().length).to.eq(bodyLength);
        }));
    });

    describe('placementClassPrefix', function () {
        beforeEach(module('encore.ui.elements', function ($rxTooltipProvider) {
            $rxTooltipProvider.options({ placementClassPrefix: 'rx-' });
        }));

        // load the template
        beforeEach(module('templates/rxTooltip-popup.html'));

        it('should add the classes', inject(function ($rootScope, $compile, $timeout) {
            elmBody = angular.element(
                '<div><span rx-tooltip="tooltip text" rx-tooltip-placement="top-right"></span></div>'
            );

            scope = $rootScope;
            $compile(elmBody)(scope);
            scope.$digest();
            elm = elmBody.find('span');
            elmScope = elm.scope();
            tooltipScope = elmScope.$$childTail;

            expect(elmBody.children().length).to.eq(1);

            trigger(elm, 'mouseenter');
            $timeout.flush();

            var tooltipElm = elmBody.find('.rxTooltip');
            expect(tooltipElm.hasClass('top')).to.be.true;
            expect(tooltipElm.hasClass('rx-top-right')).to.be.true;
        }));
    });
});
