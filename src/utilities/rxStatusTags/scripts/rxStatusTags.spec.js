describe('utilities:rxstatusTags', function () {
    describe('rxStatusTags', function () {
        var rxstatusTags;

        beforeEach(function () {
            // Initialize a fake module to get at its config block
            // This is the main purpose of this whole `describe` block,
            // to test that this can be set in a `.config`
            angular.module('testApp', [])
                .config(function (rxStatusTagsProvider) {
                    rxStatusTagsProvider.addStatus({
                        key: 'testKey',
                        class: 'test-class',
                        text: 'test text'
                    });
                });

            module('encore.ui.utilities', 'testApp');
            module({ suppressDeprecationWarnings: true });

            // Inject in angular constructs
            inject(function (rxStatusTags) {
                rxstatusTags = rxStatusTags;
            });
        });

        it('should know about testKey', function () {
            var config = rxstatusTags.getTag('testKey');
            expect(config.text).to.equal('test text');
            expect(config.class).to.equal('test-class');
            expect(rxstatusTags.hasTag('testKey')).to.be.true;
        });

        it('should return empty text and class values for unknown keys', function () {
            var config = rxstatusTags.getTag('missingKey');
            expect(config.text).to.equal('');
            expect(config.class).to.equal('');
            expect(rxstatusTags.hasTag('missingKey')).to.be.false;

        });
    });
});
