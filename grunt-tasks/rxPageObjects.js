module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', 'Publish rxPageObjects to npm', function (publishType) {
        var tasks = [
            'shell:tscRxPageObjects',

            /* 4.x - full TypeScript */
            //'shell:tscRxPageObjectsTest',
            //'shell:docRxPageObjects',

            /* 5.x - partial TypeScript */
            'jsdoc:rxPageObjects'
        ];

        if (publishType === 'hotfix') {
            tasks.push('shell:npmPublishHotFix');
        } else {
            tasks.push('shell:npmPublish');
        }

        grunt.task.run(tasks);
    });
};
