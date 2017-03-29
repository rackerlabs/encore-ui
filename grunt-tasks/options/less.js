module.exports = {
    encore: {
        options: {
            // TODO figure out how to get sourcemap file to only generate once
            sourceMap: true,
            sourceMapFilename: '<%= config.dir.dist %>/<%= config.css.map.encore %>',
            sourceMapURL: '<%= config.css.map.encore %>',
            outputSourceFiles: 'true',
            paths: ['src/styles/', 'node_modules/normalize.css/']
        },
        files: {
            '<%= config.dir.dist %>/<%= config.dist.fileName %>.css': ['<%= config.tmp.less.encore %>']
        }
    },

    encoreResp: {
        options: {
            sourceMap: true,
            sourceMapFilename: '<%= config.dir.dist %>/<%= config.css.map.encoreResp %>',
            sourceMapURL: '<%= config.css.map.encoreResp %>',
            outputSourceFiles: 'true',
            paths: ['src/styles/', 'node_modules/normalize.css/']
        },
        files: {
            '<%= config.dir.dist %>/<%= config.dist.fileNameResp %>.css': ['<%= config.tmp.less.encoreResp %>']
        }
    },

    styleguide: {
        options: {
            paths: ['src/styles/']
        },
        files: {
            '<%= config.dir.docs %>/<%= config.css.demoApp %>': 'demo/less/app.less',
            '<%= config.dir.docs %>/<%= config.css.demos %>': '<%= config.tmp.less.demos %>',
            '<%= config.dir.docs %>/<%= config.css.examples %>': '<%= config.tmp.less.examples %>'
        }
    }
};
