describe('rxTypeaheadHighlight', function () {
    var highlightFilter, $sce;

    beforeEach(module('encore.ui.elements'));

    beforeEach(inject(function (_$sce_) {
        $sce = _$sce_;
    }));


    beforeEach(inject(function (rxTypeaheadHighlightFilter) {
        highlightFilter = rxTypeaheadHighlightFilter;
    }));

    it('should higlight a match', function () {
        expect($sce.getTrustedHtml(highlightFilter('before match after',
        'match'))).to.eq('before <strong>match</strong> after');
    });

    it('should higlight a match with mixed case', function () {
        expect($sce.getTrustedHtml(highlightFilter('before MaTch after',
        'match'))).to.eq('before <strong>MaTch</strong> after');
    });

    it('should higlight all matches', function () {
        expect($sce.getTrustedHtml(highlightFilter('before MaTch after match',
        'match'))).to.eq('before <strong>MaTch</strong> after <strong>match</strong>');
    });

    it('should do nothing if no match', function () {
        expect($sce.getTrustedHtml(highlightFilter('before match after',
        'nomatch'))).to.eq('before match after');
    });

    it('should do nothing if no or empty query', function () {
        expect($sce.getTrustedHtml(highlightFilter('before match after', ''))).to.eq('before match after');
        expect($sce.getTrustedHtml(highlightFilter('before match after', null))).to.eq('before match after');
        expect($sce.getTrustedHtml(highlightFilter('before match after', undefined))).to.eq('before match after');
    });

    it('issue 316 - should work correctly for regexp reserved words', function () {
        expect($sce.getTrustedHtml(highlightFilter('before (match after',
        '(match'))).to.eq('before <strong>(match</strong> after');
    });

    it('issue 1777 - should work correctly with numeric values', function () {
        expect($sce.getTrustedHtml(highlightFilter(123, '2'))).to.eq('1<strong>2</strong>3');
    });
});

describe('Security concerns', function () {
    var highlightFilter, logSpy;

    beforeEach(module('encore.ui.elements'));

    beforeEach(inject(function (rxTypeaheadHighlightFilter, $log) {
        highlightFilter = rxTypeaheadHighlightFilter;
        logSpy = sinon.spy($log, 'warn');
    }));

    it('should not call the $log service when ngSanitize is present', function () {
        highlightFilter('before <script src="">match</script> after', 'match');
        expect(logSpy).to.not.have.been.called;
    });
});
