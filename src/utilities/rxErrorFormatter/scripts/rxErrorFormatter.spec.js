describe('service:rxErrorFormatter', function () {
    var errorFormatter;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (rxErrorFormatter) {
            errorFormatter = rxErrorFormatter;
        });
    });

    it('should use an error object with a message property', function () {
        var error = { message: 'foobar' };
        var errorMsg = errorFormatter.buildErrorMsg('Hi ${message}', error);
        expect(errorMsg).to.equal('Hi foobar');
    });

    it('should use statusText for ${message} if there is no message property', function () {
        var error = { statusText: 'baz' };
        var errorMsg = errorFormatter.buildErrorMsg('Hi ${message}', error);
        expect(errorMsg).to.equal('Hi baz');
    });

    it('should replace ${message} with "Unknown error" if it cannot find message or statusText', function () {
        var error = {};
        var errorMsg = errorFormatter.buildErrorMsg('Hi ${message}', error);
        expect(errorMsg).to.equal('Hi Unknown error');
    });

    it('should accept arbitrary template variables', function () {
        var error = { firstVar: 'foo', secondVar: 'bar' };
        var errorMsg = errorFormatter.buildErrorMsg('${firstVar} ${secondVar}', error);
        expect(errorMsg).to.equal('foo bar');
    });
});

describe('service:ErrorFormatter (DEPRECATED)', function () {
    var errorFormatter;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (ErrorFormatter) {
            errorFormatter = ErrorFormatter;
        });
    });

    it('should use an error object with a message property', function () {
        var error = { message: 'foobar' };
        var errorMsg = errorFormatter.buildErrorMsg('Hi ${message}', error);
        expect(errorMsg).to.equal('Hi foobar');
    });

    it('should use statusText for ${message} if there is no message property', function () {
        var error = { statusText: 'baz' };
        var errorMsg = errorFormatter.buildErrorMsg('Hi ${message}', error);
        expect(errorMsg).to.equal('Hi baz');
    });

    it('should replace ${message} with "Unknown error" if it cannot find message or statusText', function () {
        var error = {};
        var errorMsg = errorFormatter.buildErrorMsg('Hi ${message}', error);
        expect(errorMsg).to.equal('Hi Unknown error');
    });

    it('should accept arbitrary template variables', function () {
        var error = { firstVar: 'foo', secondVar: 'bar' };
        var errorMsg = errorFormatter.buildErrorMsg('${firstVar} ${secondVar}', error);
        expect(errorMsg).to.equal('foo bar');
    });
});
