'use strict';

var _ = require('lodash');

var srcPath = require('path').join(__dirname, 'src');
var pageObjects = {
    exercise: {}
};

require('fs').readdirSync(srcPath).forEach(file => {
    // ignore unless JS
    if (!/\.js$/.test(file)) {
        return;
    }

    var module = require(`./src/${file}`);

    _.each(module, (functionality, exportedName) => {
        if (/.*exercise\.js$/.test(file)) {
            pageObjects.exercise[exportedName] = functionality;
        } else {
            pageObjects[exportedName] = functionality;
        }
    });
});

module.exports = pageObjects;
