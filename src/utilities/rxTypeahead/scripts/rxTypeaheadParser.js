angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxTypeaheadParser
 * @description
 * parser service for use by rxTypeahead
 */
.service('rxTypeaheadParser', function ($parse) {
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse: function (input) {
            var match = input.match(TYPEAHEAD_REGEXP);
            if (!match) {
                throw new Error(
                    'Expected typeahead specification in form of "_modelValue_ (as _label_)? for' +
                    '_item_ in _collection_" but got "' + input + '".');
            }

            return {
                itemName: match[3],
                source: $parse(match[4]),
                viewMapper: $parse(match[2] || match[1]),
                modelMapper: $parse(match[1])
            };
        }
    };
});
