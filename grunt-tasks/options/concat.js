module.exports = {
    dist: {
        options: {
            banner: '<%= config.banner %>\n',
            process: true
        },
        src: [], //src filled in by 'modules' task
        dest: '<%= config.dir.dist %>/<%= config.dist.fileName %>.js'
    },
    tmpDemosLess: {
        options: {
            banner: '@import (reference) "vars";\n\n'
        },
        src: [
            'src/**/docs/*.demo.less'
        ],
        dest: '<%= config.tmp.less.demos %>'
    },
    tmpExamplesLess: {
        options: {
            banner: '.rx-example {\n',
            footer: '\n}//.rx-example'
        },
        src: [
            'src/**/examples/*.less',
            'demo/examples/*.less'
        ],
        dest: '<%= config.tmp.less.examples %>',
    },
    tmpEncoreLess: {
        // The `less` task can't properly create a source map when multiple input
        // files are present. We concat them all into a temp file here, and it
        // can work from that instead
        files: [
            /* Non-responsive Styles */
            {
                src: [
                    'src/base.less',
                    'src/**/styles/*.less',
                    '!src/styles/*.less',
                    // exclude responsive, handled below
                    '!src/components/layout/responsive.less'
                ],
                dest: '<%= config.tmp.less.encore %>'
            },
            /* Responsive Styles */
            {
                src: [
                    'src/base.less',
                    'src/**/styles/*.less',
                    '!src/styles/*.less'
                ],
                dest: '<%= config.tmp.less.encoreResp %>'
            }
        ]
    }
};
