module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', 'Publish rxPageObjects to npm', function (publishType) {
        var tasks = [
            'shell:tscRxPageObjects',
            'shell:tscRxPageObjectsTests',
            'shell:docRxPageObjects'
        ];

        if (publishType === 'hotfix') {
            tasks.push('shell:npmPublishHotFix');
        } else {
            tasks.push('shell:npmPublish');
        }

        grunt.task.run(tasks);
    });
};
