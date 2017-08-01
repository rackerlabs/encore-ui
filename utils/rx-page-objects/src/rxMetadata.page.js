var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxMetadata = {

    /**
     * @instance
     * @function
     * @description The text of the metadata term, unless a `transformFn` is provided, or `null` if not found.
     * Uses {@link rxMisc.unless} to ensure that something is returned from the lookup.
     * @param {String} metadataTerm - The term to lookup in the metadata component.
     * @returns {*}
     */
    term: {
        value: function (metadataTerm, fallbackReturnValue) {
            var page = this;
            var termElement = $('rx-meta[label="' + metadataTerm  + '"]');
            return encore.rxMisc.unless(termElement, function (foundTermElement) {
                var definitionElement = foundTermElement.$('.definition');
                if (page.transformFns[metadataTerm] !== undefined) {
                    return page.transformFns[metadataTerm](definitionElement);
                }
                return definitionElement.getText();
            }, fallbackReturnValue);
        }
    },

    /**
     * @type {String[]}
     * @description All terms in the block of metadata, without processing. Will strip the ending semicolon
     * from each term.
     * @example
     * expect(encore.rxMetadata.initialize().terms).to.eventually.eql(['Age', 'Sex', 'Location']);
     */
    terms: {
        get: function () {
            return this.rootElement.$$('div.label').getText().then(function (keys) {
                return keys.map(function (key) {
                    // strip ending colon character
                    return key.replace(/:$/, '');
                });
            });
        }
    },

    /**
     * @instance
     * @function
     * @description The definition ElementFinder matching the term, whether it be an rx-meta or
     * rx-meta-show-hide element.
     * @returns {ElementFinder}
     */
    definitionElementByTerm: {
        value: function (term) {
            var rxMetaSelector = 'rx-meta[label="' + term  + '"] .definition';
            var rxMetaShowHideSelector = 'rx-meta-show-hide[label="' + term  + '"] .definition';
            return $(rxMetaSelector + ', ' + rxMetaShowHideSelector);
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the root element is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @instance
     * @function
     * @description Whether or not the root element is present.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};

exports.rxMetadata = {
    /**
     * @function
     * @memberof rxMetadata
     * description Page object representing an rxMetadata element.
     * @param {ElementFinder} rxMetadataElement - ElementFinder to be transformed into an rxMetadata page object.
     * @param {Object} transformFns - An object defining which metadata entries should be transformed, and how.
     * @returns {rxMetadata}
     * @example
     * var myPage = Page.create({
     *     metadata: {
     *         get: function () {
     *             // Every other metadata entry here should just be text.
     *             // For those entries which need some extra processing, they are defined below
     *             var transforms = {
     *                 'Signup Date': function (elem) {
     *                     return elem.getText().then(encore.rxMisc.newDate);
     *                 },
     *                 'Overdue Balance': function (elem) {
     *                     return elem.getText().then(encore.rxMisc.currencyToPennies);
     *                 },
     *                 'Current Due': function (elem) {
     *                     return elem.getText().then(encore.rxMisc.currencyToPennies);
     *                 },
     *                 'Expiration Date' function (elem) {
     *                     return elem.getText().then(encore.rxMisc.newDate);
     *                 }
     *             }
     *             return encore.rxMetadata.initialize($('rx-metadata'), transforms));
     *         }
     *     }
     * });
     */
    initialize: function (rxMetadataElement, transformFns) {
        if (rxMetadataElement === undefined) {
            rxMetadataElement = $('rx-metadata');
        }

        if (transformFns === undefined) {
            transformFns = {};
        }

        rxMetadata.transformFns = {
            get: function () { return transformFns; }
        };

        rxMetadata.rootElement = {
            get: function () { return rxMetadataElement; }
        };
        return Page.create(rxMetadata);
    }
};
