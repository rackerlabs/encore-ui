/*jshint node:true */

var config = {
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9001',

    specs: [
        './test/*.midway.js'
    ],

    framework: 'mocha',

    capabilities: {
        browserName: 'firefox'
    },

    allScriptsTimeout: 30000,

    params: {
        environments: {
            'http://localhost:9001': 'localhost',
            'http://rackerlabs.github.io/encore-ui': 'staging'
        },
        isChrome: false,
        isMac: false
    },

    onPrepare: function () {
        browser.driver.manage().window().setSize(1366, 768); // laptop
        expect = require('chai').use(require('chai-as-promised')).expect;
        _ = require('lodash');
        moment = require('moment');
        demoPage = require('../demo.page.js');
        encore = require('./index');
        config.params.isMac = (process.platform === 'darwin');
    },

    // Options to be passed to mocha
    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;
