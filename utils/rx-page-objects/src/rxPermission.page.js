var Page = require('astrolabe').Page;

exports.rxPermission = Page.create({
    rxPermission: {
        get: function () {
            return $('rx-permission');
        }
    }
});
