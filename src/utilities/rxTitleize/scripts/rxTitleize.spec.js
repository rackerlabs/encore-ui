describe('filter:rxTitleize', function () {
    var subject;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            subject = $filter('rxTitleize');
        });
    });

    it('replaces underscores with spaces', function () {
        expect(subject('_A_B_')).to.equal(' A B ');
    });

    it('converts the string to title case', function () {
        expect(subject('a bcD_e')).to.equal('A Bcd E');
    });
});

describe('filter:titleize (DEPRECATED)', function () {
    var subject;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            subject = $filter('titleize');
        });
    });

    it('replaces underscores with spaces', function () {
        expect(subject('_A_B_')).to.equal(' A B ');
    });

    it('converts the string to title case', function () {
        expect(subject('a bcD_e')).to.equal('A Bcd E');
    });
});
