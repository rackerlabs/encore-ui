describe('$rxPosition service', function () {
    var $document, $rxPosition;

    var TargetElMock = function (width, height) {
        this.width = width;
        this.height = height;

        this.prop = function (propName) {
            return propName === 'offsetWidth' ? width : height;
        };
    };

    beforeEach(module('encore.ui.utilities'));

    chai.use(function (_chai) {
        _chai.Assertion.addChainableMethod('bePositionedAt', function (top, left){
            var subject = this._obj;
            var actualCoord = '(' + subject.top + ', ' + subject.left + ')';
            var expectedCoord = '(' + top + ', ' + left + ')';
            this.assert(
                (subject.top === top && subject.left === left),
                'expected ' + actualCoord + ' to be positioned at ' + expectedCoord,
                'expected ' + actualCoord + ' not to be positioned at ' + expectedCoord
            );
        });
    });

    beforeEach(inject(function (_$document_, _$rxPosition_) {
        $document = _$document_;
        $rxPosition = _$rxPosition_;
    }));

    describe('rawnode', function () {
        it('returns the raw DOM element from an angular element', function () {
            var angularEl = angular.element('<div></div>');
            var el = $rxPosition.getRawNode(angularEl);
            expect(el.nodeName).to.contain('DIV');
        });

        it('returns the raw DOM element from a select element', function () {
            var angularEl = angular.element('<select><option value="value">value</option></select>');
            var el = $rxPosition.getRawNode(angularEl);
            expect(el.nodeName).to.contain('SELECT');
        });
    });

    describe('offset', function () {
        it('returns getBoundingClientRect by default', function () {
            var el = angular.element('<div>Foo</div>');

            /* getBoundingClientRect values will be based on the testing Chrome window
             so that makes this tests very brittle if we don't mock */
            sinon.stub(el[0], 'getBoundingClientRect').returns({
                width: 100,
                height: 100,
                top: 2,
                left: 2
            });
            $document.find('body').append(el);

            var offset = $rxPosition.offset(el);

            expect(offset).to.eql({
                width: 100,
                height: 100,
                top: 2,
                left: 2
            });

            el.remove();
        });
    });

    describe('viewportOffset', function () {
        var el;

        beforeEach(function () {
            el = angular.element('<div id="outer" style="overflow: auto; width: 200px;' +
            ' height: 200px; padding: 25px; box-sizing: border-box;"><div id="inner"' +
            ' style="margin: 20px; width: 100px; height: 100px; box-sizing: border-box;"></div></div>');
            $document.find('body').append(el);
        });

        afterEach(function () {
            el.remove();
        });

        it('measures the offset', function () {
            var vpOffset = $rxPosition.viewportOffset(document.getElementById('inner'));
            expect(vpOffset).to.eql({
                top: 20,
                bottom: 30,
                left: 20,
                right: 30
            });
        });

        it('measures the offset without padding', function () {
            var outerEl = document.getElementById('outer');
            outerEl.style.paddingTop = '0px';
            outerEl.style.paddingBottom = '0px';
            outerEl.style.paddingLeft = '0px';
            outerEl.style.paddingRight = '0px';

            var vpOffset = $rxPosition.viewportOffset(document.getElementById('inner'));
            expect(vpOffset).to.eql({
                top: 20,
                bottom: 80,
                left: 20,
                right: 80
            });
        });

        it('measures the offset with borders', function () {
            var outerEl = document.getElementById('outer');
            outerEl.style.width = '220px';
            outerEl.style.height = '220px';
            outerEl.style.border = '10px solid black';

            var vpOffset = $rxPosition.viewportOffset(document.getElementById('inner'));
            expect(vpOffset).to.eql({
                top: 20,
                bottom: 30,
                left: 20,
                right: 30
            });
        });

        it('measures the offset excluding padding', function () {
            var vpOffset = $rxPosition.viewportOffset(document.getElementById('inner'), false, false);
            expect(vpOffset).to.eql({
                top: 45,
                bottom: 55,
                left: 45,
                right: 55
            });
        });

        it('measures the offset when scrolled', function () {
            var innerEl = document.getElementById('inner');
            innerEl.style.width = '300px';
            innerEl.style.height = '300px';
            var outerEl = document.getElementById('outer');
            outerEl.scrollTop = 25;
            outerEl.scrollLeft = 25;

            var vpOffset = $rxPosition.viewportOffset(document.getElementById('inner'));
            expect(vpOffset.top).to.eq(-5);
            expect(vpOffset.bottom).to.be.above(-180);
            expect(vpOffset.left).to.eq(-5);
            expect(vpOffset.right).to.be.above(-180);
        });
    });

    describe('position', function () {
        var el;

        afterEach(function () {
            el.remove();
        });

        it('gets position with document as the relative parent', function () {
            el = angular.element('<div>Foo</div>');

            sinon.stub(el[0], 'getBoundingClientRect').returns({
                width: 100,
                height: 100,
                top: 2,
                left: 2
            });

            $document.find('body').append(el);

            var position = $rxPosition.position(el);

            expect(position).to.eql({
                width: 100,
                height: 100,
                top: 2,
                left: 2
            });
        });

        it('gets position with an element as the relative parent', function () {
            el = angular.element('<div id="outer" style="position:relative;"><div id="inner">Foo</div></div>');

            $document.find('body').append(el);

            var outerEl = angular.element(document.getElementById('outer'));
            var innerEl = angular.element(document.getElementById('inner'));

            sinon.stub(outerEl[0], 'getBoundingClientRect').returns({
                width: 100,
                height: 100,
                top: 2,
                left: 2
            });
            sinon.stub(innerEl[0], 'getBoundingClientRect').returns({
                width: 20,
                height: 20,
                top: 5,
                left: 5
            });

            var position = $rxPosition.position(innerEl);

            expect(position).to.eql({
                width: 20,
                height: 20,
                top: 3,
                left: 3
            });
        });
    });

    describe('isScrollable', function () {
        var el;

        afterEach(function () {
            el.remove();
        });

        it('should return true if the element is scrollable', function () {
            el = angular.element('<div style="overflow: auto"></div>');
            $document.find('body').append(el);
            expect($rxPosition.isScrollable(el)).to.be.true;
        });

        it('should return false if the element is scrollable', function () {
            el = angular.element('<div></div>');
            $document.find('body').append(el);
            expect($rxPosition.isScrollable(el)).to.be.false;
        });
    });

    describe('scrollParent', function () {
        var el;

        afterEach(function () {
            el.remove();
        });

        it('gets the closest scrollable ancestor', function () {
            el = angular.element('<div id="outer" style="overflow: auto;">' +
            ' <div>Foo<div id="inner">Bar</div></div></div>');

            $document.find('body').css({ overflow: 'auto' }).append(el);

            var outerEl = document.getElementById('outer');
            var innerEl = document.getElementById('inner');

            var scrollParent = $rxPosition.scrollParent(innerEl);
            expect(scrollParent).to.eq(outerEl);
        });

        it('gets the closest scrollable ancestor with overflow-x: scroll', function () {
            el = angular.element('<div id="outer" style="overflow-x: scroll;">' +
            ' <div>Foo<div id="inner">Bar</div></div></div>');

            $document.find('body').css({ overflow: 'auto' }).append(el);

            var outerEl = document.getElementById('outer');
            var innerEl = document.getElementById('inner');

            var scrollParent = $rxPosition.scrollParent(innerEl);
            expect(scrollParent).to.eq(outerEl);
        });

        it('gets the closest scrollable ancestor with overflow-y: hidden', function () {
            el = angular.element('<div id="outer" style="overflow-y: hidden;">' +
            ' <div>Foo<div id="inner">Bar</div></div></div>');

            $document.find('body').css({ overflow: 'auto' }).append(el);

            var outerEl = document.getElementById('outer');
            var innerEl = document.getElementById('inner');

            var scrollParent = $rxPosition.scrollParent(innerEl, true);
            expect(scrollParent).to.eq(outerEl);
        });

        it('gets the document element if no scrollable ancestor exists', function () {
            el = angular.element('<div id="outer"><div>Foo<div id="inner">Bar</div></div></div>');

            $document.find('body').css({ overflow: '' }).append(el);

            var innerEl = document.getElementById('inner');

            var scrollParent = $rxPosition.scrollParent(innerEl);
            expect(scrollParent).to.eq($document[0].documentElement);
        });

        it('gets the closest scrollable ancestor after a positioned ancestor when positioned absolute', function () {
            el = angular.element('<div id="outer" style="overflow: auto;' +
            ' position: relative;"><div style="overflow: auto;">Foo' +
            ' <div id="inner" style="position: absolute;">Bar</div></div></div>');

            $document.find('body').css({ overflow: 'auto' }).append(el);

            var outerEl = document.getElementById('outer');
            var innerEl = document.getElementById('inner');

            var scrollParent = $rxPosition.scrollParent(innerEl);
            expect(scrollParent).to.eq(outerEl);
        });
    });

    describe('positionElements - append-to-body: false', function () {
        var actual, top, left;

        beforeEach(function () {
            //mock position info normally queried from the DOM
            $rxPosition.position = function () {
                return {
                    width: 20,
                    height: 20,
                    top: 100,
                    left: 100
                };
            };
        });

        var positions = {
            'other': [90, 105],
            'top': [90, 105],
            'top-center': [90, 105],
            'top-left': [90, 100],
            'top-right': [90, 110],
            'bottom': [120, 105],
            'bottom-center': [120, 105],
            'bottom-left': [120, 100],
            'bottom-right': [120, 110],
            'left': [105, 90],
            'left-center': [105, 90],
            'left-top': [100, 90],
            'left-bottom': [110, 90],
            'right': [105, 120],
            'right-center': [105, 120],
            'right-top': [100, 120],
            'right-bottom': [110, 120]
        };

        for (var pos in positions) {
            top = positions[pos][0];
            left = positions[pos][1];
            it('should position element on ' + pos, function (){
                actual = $rxPosition.positionElements({}, new TargetElMock(10, 10), pos);
                expect(actual).to.bePositionedAt(top, left);
            });
        };
    });

    describe('positionElements - append-to-body: true', function () {
        var pos, actual, top, left;

        beforeEach(function () {
            //mock offset info normally queried from the DOM
            $rxPosition.offset = function () {
                return {
                    width: 20,
                    height: 20,
                    top: 100,
                    left: 100
                };
            };
        });

        var positions = {
            'other': [90, 105],
            'top': [90, 105],
            'top-center': [90, 105],
            'top-left': [90, 100],
            'top-right': [90, 110],
            'bottom': [120, 105],
            'bottom-center': [120, 105],
            'bottom-left': [120, 100],
            'bottom-right': [120, 110],
            'left': [105, 90],
            'left-center': [105, 90],
            'left-top': [100, 90],
            'left-bottom': [110, 90],
            'right': [105, 120],
            'right-center': [105, 120],
            'right-top': [100, 120],
            'right-bottom': [110, 120]
        };

        for (var pos in positions) {
            top = positions[pos][0];
            left = positions[pos][1];
            it('should position element on ' + pos, function (){
                actual = $rxPosition.positionElements({}, new TargetElMock(10, 10), pos, true);
                expect(actual).to.bePositionedAt(top, left);
            });
        };
    });

    describe('smart positioning', function () {
        var viewportOffset, el;

        beforeEach(function () {
            el = angular.element('<div></div>');
            $document.find('body').append(el);

            //mock position info normally queried from the DOM
            $rxPosition.position = function () {
                return {
                    width: 40,
                    height: 40,
                    top: 100,
                    left: 100
                };
            };

            viewportOffset = {
                width: 10,
                height: 10,
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            };

            $rxPosition.viewportOffset = function () {
                return viewportOffset;
            };
        });

        afterEach(function () {
            el.remove();
        });

        // tests primary top -> bottom
        // tests secondary left -> right
        it('should position element on bottom-right when top-left does not fit', function () {
            viewportOffset.bottom = 20;
            viewportOffset.left = 20;
            el.css({ width: '60px', height: '20px' });
            expect($rxPosition.positionElements({}, el, 'auto top-left')).to.bePositionedAt(140, 80);
        });

        // tests primary bottom -> top
        // tests secondary right -> left
        it('should position element on top-left when bottom-right does not fit', function () {
            viewportOffset.top = 20;
            viewportOffset.right = 20;
            el.css({ width: '60px', height: '20px' });
            expect($rxPosition.positionElements({}, el, 'auto bottom-right')).to.bePositionedAt(80, 100);
        });

        // tests primary left -> right
        // tests secondary top -> bottom
        it('should position element on right-bottom when left-top does not fit', function () {
            viewportOffset.top = 20;
            viewportOffset.right = 20;
            el.css({ width: '20px', height: '60px' });
            expect($rxPosition.positionElements({}, el, 'auto left-top')).to.bePositionedAt(80, 140);
        });

        // tests primary right -> left
        // tests secondary bottom -> top
        it('should position element on left-top when right-bottom does not fit', function () {
            viewportOffset.bottom = 20;
            viewportOffset.left = 20;
            el.css({ width: '20px', height: '60px' });
            expect($rxPosition.positionElements({}, el, 'auto right-bottom')).to.bePositionedAt(100, 80);
        });

        // tests vertical center -> top
        it('should position element on left-top when left-center does not fit vetically', function () {
            viewportOffset.bottom = 100;
            el.css({ width: '20px', height: '120px' });
            expect($rxPosition.positionElements({}, el, 'auto left')).to.bePositionedAt(100, 80);
        });

        // tests vertical center -> bottom
        it('should position element on left-bottom when left-center does not fit vertically', function () {
            viewportOffset.top = 100;
            el.css({ width: '20px', height: '120px' });
            expect($rxPosition.positionElements({}, el, 'auto left')).to.bePositionedAt(20, 80);
        });

        // tests horizontal center -> left
        it('should position element on top-left when top-center does not fit horizontally', function () {
            viewportOffset.right = 100;
            el.css({ width: '120px', height: '20px' });
            expect($rxPosition.positionElements({}, el, 'auto top')).to.bePositionedAt(80, 100);
        });

        // tests horizontal center -> right
        it('should position element on top-right when top-center does not fit horizontally', function () {
            viewportOffset.left = 100;
            el.css({ width: '120px', height: '20px' });
            expect($rxPosition.positionElements({}, el, 'auto top')).to.bePositionedAt(80, 20);
        });
    });
});
