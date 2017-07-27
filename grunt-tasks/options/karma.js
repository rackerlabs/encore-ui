// list of files / patterns to load in the browser
var files = [
    // bower:js
    'demo/bower_components/jquery/jquery.js',
    'demo/bower_components/angular/angular.js',
    'demo/bower_components/angular-animate/angular-animate.js',
    'demo/bower_components/angular-sanitize/angular-sanitize.js',
    'demo/bower_components/angular-resource/angular-resource.js',
    'demo/bower_components/angular-route/angular-route.js',
    'demo/bower_components/angular-messages/angular-messages.js',
    'demo/bower_components/lodash/lodash.js',
    'demo/bower_components/moment/moment.js',
    'demo/bower_components/html2canvas/build/html2canvas.js',
    'demo/bower_components/ng-debounce/angular-debounce.js',
    'demo/bower_components/angular-mocks/angular-mocks.js',
    // endbower
    'utils/browser-helpers.js',
    'utils/resource-helpers.js'
];

module.exports = {
    options: {
        configFile: 'karma.conf.js',
        files: files.concat([
            'src/*/*.module.js',         // src/:category/<category>.module.js
            'src/*/**/*.module.js',      // src/:category/:component/<component>.module.js
            'src/**/templates/*.html',   // src/:category/:component/templates/*.html
            'src/*.js',                  // src/*.js
            'src/**/scripts/*.js'        // src/:category/:component/scripts/*.js
        ])
    },
    watch: {
        background: true
    },
    single: {
        singleRun: true
    },
    debug: {
        singleRun: false,
        browsers: ['Chrome'],
        preprocessors: {
            'src/**/*.html': 'ng-html2js',
        },
    },
    minified: {
        options: {
            files: files.concat([
                'src/**/*.spec.js',
                '<%= config.dir.dist %>/<%= config.dist.fileName %>.min.js'
            ])
        },
        singleRun: true,
        reporters: ['progress']
    }
};
