describe('stacked map', function () {
    var stackedMap;

    beforeEach(function () {
        module('encore.ui.utilities');
        inject(function (rxStackedMap) {
            stackedMap = rxStackedMap.createNew();
        });
    });

    it('should add and remove objects by key', function () {
        stackedMap.add('foo', 'foo_value');
        expect(stackedMap.length()).to.eq(1);
        expect(stackedMap.get('foo').key).to.eq('foo');
        expect(stackedMap.get('foo').value).to.eq('foo_value');

        stackedMap.remove('foo');
        expect(stackedMap.length()).to.eq(0);
        expect(stackedMap.get('foo')).to.be.undefined;
    });

    it('should support listing keys', function () {
        stackedMap.add('foo', 'foo_value');
        stackedMap.add('bar', 'bar_value');

        expect(stackedMap.keys()).to.eql(['foo', 'bar']);
    });

    it('should get topmost element', function () {
        stackedMap.add('foo', 'foo_value');
        stackedMap.add('bar', 'bar_value');
        expect(stackedMap.length()).to.eq(2);

        expect(stackedMap.top().key).to.eq('bar');
        expect(stackedMap.length()).to.eq(2);
    });

    it('should remove topmost element', function () {
        stackedMap.add('foo', 'foo_value');
        stackedMap.add('bar', 'bar_value');

        expect(stackedMap.removeTop().key).to.eq('bar');
        expect(stackedMap.removeTop().key).to.eq('foo');
    });

    it('should preserve semantic of an empty stackedMap', function () {
        expect(stackedMap.length()).to.eq(0);
        expect(stackedMap.top()).to.be.undefined;
    });

    it('should ignore removal of non-existing elements', function () {
        expect(stackedMap.remove('non-existing')).to.be.undefined;
    });
});
