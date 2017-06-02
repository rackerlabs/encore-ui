module.exports = function (grunt) {
    grunt.registerTask('build', 'Create build files', function () {
        grunt.task.run([
            'clean:build',
            'modules',
            'examples',
            'concat:dist',
            'concat:tmpEncoreLess',
            'concat:tmpDemosLess',
            'concat:tmpExamplesLess',
            'less:encore',
            'less:encoreResp',
            'less:styleguide',
            'copy:demohtml',
            'copy:demoassets',
            'copy:demopolyfills',
            'copy:demoExamples',
            'imagemin',
            'shell:tscRxPageObjects',
            'shell:tscRxPageObjectsTests',
            'shell:docRxPageObjects',
            'copy:rxPageObjectsDocs',
            'ngdocs'
        ]);
    });
};
