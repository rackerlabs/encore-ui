module.exports = {
    options: {
        livereload: 1337
    },
    scripts: {
        files: [
            'src/**/*.js',
            'src/**/*.meta.json',
            '!src/**/*.spec.js'
        ],
        tasks: [
            'build',
            'karma:watch:run'
        ]
    },
    specs: {
        files: [
            'src/**/*.spec.js'
        ],
        tasks: [
            'karma:watch:run',
            'copy:coverage'
        ],
        options: {
            livereload: false
        }
    },
    componentHtml: {
        files: [
            'src/**/templates/*.html'
        ],
        tasks: [
            'html2js',
            'build',
            'karma:watch:run'
        ]
    },
    componentLess: {
        files: [
            'src/**/*.less',
            '!src/**/examples/*.less'
        ],
        tasks: [
            'concat:tmpEncoreLess',
            'concat:tmpDemosLess',
            'less'
        ]
    },
    componentImages: {
        files: [
            'src/**/images/*'
        ],
        tasks: [
            'imagemin'
        ]
    },
    exampleMarkup: {
        files: [
            'src/**/examples/*.html',
            'demo/examples/*.html'
        ],
        tasks: [
            'copy:demoExamples'
        ]
    },
    exampleLess: {
        files: [
            'src/**/examples/*.less',
            'demo/examples/*.less'
        ],
        tasks: [
            'concat:tmpExamplesLess',
            'less'
        ]
    },
    demoSite: {
        files: [
            'src/**/docs/*.html',
            'src/**/*.md',
            'demo/**/*',
            '!demo/bower_components/**/*'
        ],
        tasks: [
            'build'
        ]
    },
    rxPageObjects: {
        files: [
            'utils/rx-page-objects/src/*.js',
            'utils/rx-page-objects/doc/README.md'
        ],
        tasks: [
            'jsdoc:rxPageObjects',
            'copy:rxPageObjectsDocs'
        ]
    },
    tscRxPageObjects: {
        files: [
            'utils/rx-page-objects/test/*.ts',
            'utils/rx-page-objects/src/*.ts'
        ],
        tasks: [
            'shell:tscRxPageObjects'
        ]
    }
};
