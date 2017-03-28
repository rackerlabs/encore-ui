'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var rxTimePickerUtil;
(function (rxTimePickerUtil) {
    /**
     * @description return offset value, if present in string
     *
     * **NOTE:** Logic in this function must match the logic in
     * the rxTimePickerUtil service.
     */
    function parseUtcOffset(stringValue) {
        var regex = /([-+]\d{2}:?\d{2})/;
        var matched = stringValue.match(regex);
        return (matched ? matched[0] : '');
    }
    rxTimePickerUtil.parseUtcOffset = parseUtcOffset;
})(rxTimePickerUtil = exports.rxTimePickerUtil || (exports.rxTimePickerUtil = {}));
;
