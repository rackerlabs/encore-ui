'use strict';

export namespace rxTimePickerUtil {
    /**
     * @description return offset value, if present in string
     *
     * **NOTE:** Logic in this function must match the logic in
     * the rxTimePickerUtil service.
     */
    export function parseUtcOffset(stringValue: string) {
        let regex = /([-+]\d{2}:?\d{2})/;
        let matched = stringValue.match(regex);
        return (matched ? matched[0] : '');
    }
};
