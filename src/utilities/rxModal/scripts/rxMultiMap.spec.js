describe('multi map', function () {
    var multiMap;

    beforeEach(function () {
        module('encore.ui.utilities');
        inject(function (rxMultiMap) {
            multiMap = rxMultiMap.createNew();
        });
    });

    it('should add and remove objects by key', function () {
        multiMap.put('foo', 'bar');

        expect(multiMap.get('foo')).to.eql(['bar']);

        multiMap.put('foo', 'baz');

        expect(multiMap.get('foo')).to.eql(['bar', 'baz']);

        multiMap.remove('foo', 'bar');

        expect(multiMap.get('foo')).to.eql(['baz']);

        multiMap.remove('foo', 'baz');

        expect(multiMap.hasKey('foo')).to.be.false;
    });

    it('should support getting the keys', function () {
        multiMap.put('foo', 'bar');
        multiMap.put('baz', 'boo');

        expect(multiMap.keys()).to.eql(['foo', 'baz']);
    });

    it('should return all entries', function () {
        multiMap.put('foo', 'bar');
        multiMap.put('foo', 'bar2');
        multiMap.put('baz', 'boo');

        expect(multiMap.entries()).to.eql([{
            key: 'foo',
            value: ['bar', 'bar2']
        },
        {
            key: 'baz',
            value: ['boo']
        }]);
    });

    it('should preserve semantic of an empty key', function () {
        expect(multiMap.get('key')).to.be.undefined;
    });

    it('should respect removal of non-existing elements', function () {
        expect(multiMap.remove('foo', 'bar')).to.be.undefined;
    });
});
