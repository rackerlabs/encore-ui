var _ = require('lodash');
var moment = require('moment');

var rxSelect = require('./rxSelect.page').rxSelect;

/**
 * @class
 * @param {ElementFinder} rxTimePickerElement
 * ElementFinder to be transformed into an rxTimePicker page object
 *
 * @returns {rxTimePicker}
 *
 * @property {String[]} errors - (get) Array of error messages
 * @property {String} hour - (get/set) Hour value of picker
 * @property {String} minutes - (get/set) Minutes value of picker
 * @property {String} period - (get/set) Period value of picker (AM/PM)
 * @property {String} time (get/set)
 * Time value in `HH:mmZ` format, where `Z` must match `[-+]\d{2}:\d{2}`.
 * This returns the data value of the picker, not the display value.
 *
 * When set, it will automatically commit changes to the model.
 *
 * @property {String} utcOffset (get/set)
 * UTC Offset value of picker (-05:00, +00:00, +10:00)
 *
 * @example
 * var picker = new encore.rxTimePicker($('#myTimePicker'));
 *
 * // ===== Modifying Time =====
 * picker.time = '18:45+04:00'; // automatically commits change
 * picker.time; // '18:45+04:00'
 * picker.hour; // '6'
 * picker.minutes; // '45'
 * picker.period; // 'PM'
 * picker.offset; // '+04:00'
 *
 * // ===== Modifying Time Parts =====
 *
 * // cannot modify without opening picker
 * picker.open();
 *
 * picker.hour = 12;
 * picker.minutes = 15;
 * picker.period = 'PM';
 * picker.offset = '-05:00';
 * picker.time; // '18:45+04:00' (currently unchanged)
 *
 * // makes changes to `time` and automatically closes picker
 * picker.submit();
 *
 * picker.time; // '12:15-05:00' (value updated)
 * picker.hour; // '12'
 * picker.minutes; // '15'
 * picker.period; // 'PM'
 * picker.offset; // '-05:00'
 */
function rxTimePicker (rxTimePickerElement) {
    this.rootElement = rxTimePickerElement || $$('rx-time-picker').first();

    // Private selectors
    this.eleControl = this.rootElement.$('.control');
    this.txtHour = this.rootElement.$('.hour');
    this.txtMinutes = this.rootElement.$('.minutes');
    this.btnSubmit = this.rootElement.$('button.done');
    this.btnCancel = this.rootElement.$('button.cancel');
    this.selPeriod = this.rootElement.$('.period');
    this.selUtcOffset = this.rootElement.$('.utcOffset');
    this.txtDisplayValue = this.rootElement.$('.displayValue');

    // Private Page Objects
    this.pagePeriod = rxSelect.initialize(this.selPeriod);
    this.pageUtcOffset = rxSelect.initialize(this.selUtcOffset);

    // Properties
    Object.defineProperties(this, {
        errors: {
            get: function () {
                return this.rootElement.$$('rx-inline-error').getText();
            }
        },//errors

        hour: {
            get: function () {
                return this.txtHour.getAttribute('value');
            },
            set: function (val) {
                this.txtHour.clear();
                this.txtHour.sendKeys(val);
            }
        },//hour

        minutes: {
            get: function () {
                return this.txtMinutes.getAttribute('value');
            },
            set: function (val) {
                this.txtMinutes.clear();
                this.txtMinutes.sendKeys(val);
            }
        },//minutes

        period: rxSelect.generateAccessor(this.selPeriod),

        utcOffset: rxSelect.generateAccessor(this.selUtcOffset),

        time: {
            get: function () {
                return this.txtDisplayValue.getAttribute('data-time');
            },
            set: function (val) {
                // Accept ISO 8601 Standard Time Format OR custom display format
                var date = moment(val, 'HH:mmZ');

                // `date` is currently in local TZ (not expected TZ)
                // extract the expected TZ to update `date`
                var offset = encore.rxTimePickerUtil.parseUtcOffset(val);
                // force to time zone from input
                date.utcOffset(offset);

                // set via picker
                this.open();

                this.hour = date.format('hh'); // 12-hour format (no padding)
                this.minutes = date.format('mm'); // padded minutes
                this.selPeriod.element(by.cssContainingText('option', date.format('A'))).click();
                this.selUtcOffset.element(by.cssContainingText('option', date.format('Z'))).click();
                this.submit();
            }
        }//time
    });//properties
}//rxTimePicker

/**
 * @description Whether the picker can be submitted
 * @returns {Boolean}
 */
rxTimePicker.prototype.canSubmit = function () {
    return this.btnSubmit.isEnabled();
};

/**
 * @description Whether the picker can be cancelled
 * @returns {Boolean}
 */
rxTimePicker.prototype.canCancel = function () {
    return this.btnCancel.isEnabled();
};

/**
 * @description Whether the picker is open
 * @returns {Promise<Boolean>}
 */
rxTimePicker.prototype.isOpen = function () {
    return this.rootElement.$('.popup').getAttribute('class').then(function (classes) {
        return !_.includes(classes, 'ng-hide');
    });
};

/**
 * @description Open picker
 */
rxTimePicker.prototype.open = function () {
    var self = this;
    return this.isOpen().then(function (opened) {
        if (!opened) {
            self.eleControl.click();
        }
    });
};

/**
 * @description Close picker
 */
rxTimePicker.prototype.close = function () {
    var self = this;
    return this.isOpen().then(function (open) {
        if (open) {
            self.eleControl.click();
        }
    });
};

/**
 * @description Submit and close picker
 */
rxTimePicker.prototype.submit = function () {
    this.btnSubmit.click();
};

/**
 * @description Cancel picker, without updating value
 */
rxTimePicker.prototype.cancel = function () {
    this.btnCancel.click();
};

/**
 * @description Static initializer method for backward compatibility
 * @param {ElementFinder} rxTimePickerElement
 * ElementFinder to be transformed into an rxTimePicker page object
 * @returns {rxTimePicker}
 * @example
 * var picker = encore.rxTimePicker.initialize($('#myTimePicker'));
 */
rxTimePicker.initialize = function (rxTimePickerElement) {
    return new rxTimePicker(rxTimePickerElement);
};

exports.rxTimePicker = rxTimePicker;
