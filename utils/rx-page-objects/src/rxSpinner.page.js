var Page = require('astrolabe').Page;

/**
 * @deprecated rxSpinner will be removed in a future release of rxPageObjects.
 */
exports.rxSpinner = Page.create({
    rxSpinnerElement: {
        get: function () {
            console.warn(
                'DEPRECATED: rxSpinner will be removed in a future release of rxPageObjects.'
            );
            return element(by.id('rxSpinnerElement'));
        }
    }
});
