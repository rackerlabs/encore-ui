describe('service:rxSessionStorage', function () {
    var storage;

    beforeEach(function () {
        module('encore.ui.utilities');
        inject(function (rxSessionStorage) {
            storage = rxSessionStorage;
        });
    });

    afterEach(function () {
        storage.clear();
    });

    it('rxSessionStorage should exist', function () {
        expect(storage).to.exist;
    });

    it('rxSessionStorage should be empty after clear', function () {
        storage.clear();
        expect(storage.length).to.be.eq(0);
    });

    it('rxSessionStorage should be able to retrieve the key for an item', function () {
        storage.setItem('batman', 'robin');
        expect(storage.key(0)).not.be.empty;
        expect(storage.key(0)).to.be.eq('batman');
    });

    it('rxSessionStorage should be able to set/get a value in session storage', function () {
        storage.clear();
        //expect(storage.length).to.be.eq(0);
        storage.setItem('joker', 'harley');
        expect(storage.length).to.be.eq(1);
        expect(storage.getItem('joker')).to.be.eq('harley');
    });

    it('rxSessionStorage should be able to set/get objects in session storage', function () {
        var batman = { name: 'Batman', realName: 'Bruce Wayne' };
        storage.setObject('hero', batman);
        expect(storage.length).to.be.eq(1);
        expect(storage.getObject('hero')).to.deep.eq(batman);
    });

    it('rxSessionStorage should be able to set/get arrays in session storage', function () {
        var heros = [ { name: 'Batman' }, { name: 'Superman' } ];
        expect(storage.length).to.be.eq(0);
        storage.setObject('heros', heros);
        expect(storage.length).to.be.eq(1);
        expect(storage.getObject('heros')).to.deep.eq(heros);
    });

    it('rxSessionStorage should be able to remove item by key name', function () {
        storage.setItem('poison', 'ivy');
        expect(storage.length).to.eq(1);
        storage.removeItem('poison');
        expect(storage.length).to.eq(0);
    });
});

describe('service:SessionStorage (DEPRECATED)', function () {
    var storage;

    beforeEach(function () {
        module('encore.ui.utilities');
        inject(function (SessionStorage) {
            storage = SessionStorage;
        });
    });

    afterEach(function () {
        storage.clear();
    });

    it('rxSessionStorage should exist', function () {
        expect(storage).to.exist;
    });

    it('rxSessionStorage should be empty after clear', function () {
        storage.clear();
        expect(storage.length).to.be.eq(0);
    });

    it('rxSessionStorage should be able to retrieve the key for an item', function () {
        storage.setItem('batman', 'robin');
        expect(storage.key(0)).not.be.empty;
        expect(storage.key(0)).to.be.eq('batman');
    });

    it('rxSessionStorage should be able to set/get a value in session storage', function () {
        storage.clear();
        //expect(storage.length).to.be.eq(0);
        storage.setItem('joker', 'harley');
        expect(storage.length).to.be.eq(1);
        expect(storage.getItem('joker')).to.be.eq('harley');
    });

    it('rxSessionStorage should be able to set/get objects in session storage', function () {
        var batman = { name: 'Batman', realName: 'Bruce Wayne' };
        storage.setObject('hero', batman);
        expect(storage.length).to.be.eq(1);
        expect(storage.getObject('hero')).to.deep.eq(batman);
    });

    it('rxSessionStorage should be able to set/get arrays in session storage', function () {
        var heros = [ { name: 'Batman' }, { name: 'Superman' } ];
        expect(storage.length).to.be.eq(0);
        storage.setObject('heros', heros);
        expect(storage.length).to.be.eq(1);
        expect(storage.getObject('heros')).to.deep.eq(heros);
    });

    it('rxSessionStorage should be able to remove item by key name', function () {
        storage.setItem('poison', 'ivy');
        expect(storage.length).to.eq(1);
        storage.removeItem('poison');
        expect(storage.length).to.eq(0);
    });
});
