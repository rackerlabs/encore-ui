describe('rxSortEmptyTop', function () {
    var sortEmptyTop;
    var predicate = 'image.name';
    var reverse = true;
    var dataRows = [
        { id: '4', image: { name: 'Cent OS' }},
        { id: '1', image: {}},
        { id: '2', image: { name: null }},
        { id: '3', image: { name: undefined }},
        { id: '5', image: { name: 'Ubuntu 12.04 LTS' }}
    ];

    var dataRowsSortedAscending = [
        { id: '1', image: {}},
        { id: '2', image: { name: null }},
        { id: '3', image: { name: undefined }},
        { id: '4', image: { name: 'Cent OS' }},
        { id: '5', image: { name: 'Ubuntu 12.04 LTS' }}
    ];

    var dataRowsSortedDescending = [
        { id: '5', image: { name: 'Ubuntu 12.04 LTS' }},
        { id: '4', image: { name: 'Cent OS' }},
        { id: '1', image: {}},
        { id: '2', image: { name: null }},
        { id: '3', image: { name: undefined }}
    ];

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            sortEmptyTop = $filter('rxSortEmptyTop');
        });
    });

    it('should exist', function () {
        expect(!!sortEmptyTop).to.be.true;
    });

    it('should move empty rows to the top in ascending', function () {
        expect(sortEmptyTop(dataRows, predicate, !reverse)).to.deep.eq(dataRowsSortedAscending);
    });

    it.skip('should move empty rows to the bottom in descending', function () {
        expect(sortEmptyTop(dataRows, predicate, reverse)).to.deep.eq(dataRowsSortedDescending);
    });

    it.skip('should return data in the same order when the predicate does not exist', function () {
        expect(sortEmptyTop(dataRows, 'not_a_field', reverse)).to.deep.eq(dataRows);
        expect(sortEmptyTop(dataRows, 'not_a_field', !reverse)).to.deep.eq(dataRows);
    });
});
