module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', 'Publish rxPageObjects to npm', function (publishType) {
        var tasks = [
            'shell:tscRxPageObjects',
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
