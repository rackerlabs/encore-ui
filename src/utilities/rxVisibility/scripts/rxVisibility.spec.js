describe('utilities:rxVisibility', function () {
    describe('rxVisibility', function () {
        var rxvisibility;

        beforeEach(function () {
            module('encore.ui.utilities');

            inject(function (rxVisibility) {
                rxvisibility = rxVisibility;
            });
        });

        it('should have an added method', function () {
            var method = function () {};

            rxvisibility.addMethod('foo', method);
            expect(rxvisibility.hasMethod('foo'), 'hasMethod').to.be.true;
        });

        it('should have added a visibility object', function () {
            var obj = {
                name: 'someName',
                method: function () { return true; }
            };

            rxvisibility.addVisibilityObj(obj);
            expect(rxvisibility.hasMethod('someName'), 'hasMethod').to.be.true;
            expect(rxvisibility.getMethod('someName'), 'getMethod').to.equal(obj.method);
        });

        it('should return an added method', function () {
            var method = function () {};

            rxvisibility.addMethod('foo', method);
            expect(rxvisibility.getMethod('foo'), 'getMethod').to.equal(method);

        });

        it('should return undefined for an unknown method', function () {
            expect(rxvisibility.getMethod('foo'), 'getMethod').to.be.undefined;
        });
    });
});
