var _banner = `/*
 * <%= pkg.name %>
 * <%= pkg.homepage %>
 *
 * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>
 * License: <%= pkg.license %>
 */`;

module.exports = {
    github: {
        base: 'https://github.com/rackerlabs/encore-ui',
        branch: '4.x',
        src: '<%= config.github.base %>/tree/<%= config.github.branch %>/src'
    },
    dir: {
        app: 'src',
        bower: 'bower',
        build: 'build',
        dist: '<%= config.dir.docs %>/dist', // used for js/css files pushed to CDN/bower
        docs: 'build/4.x', // used for demo, coverage, and jsdocs files to go to gh-pages
        exportableStyles: '<%= config.dir.app %>/styles',
    },
    /* BOWER OUTPUT/DISTRIBUTION */
    dist: {
        fileName: 'encore-ui-<%= pkg.version %>',
        fileNameResp: 'encore-ui-resp-<%= pkg.version %>'
    },
    server: {
        hostname: 'localhost',
        port: 9001
    },
    modules: [], // filled in by modules task
    examples: {}, // filled in by examples task
    banner: _banner,
    css: {
        demoApp: 'css/app.css',
        demos: 'css/demos.css',
        examples: 'css/examples.css',
        map: {
            encore: '<%= config.dist.fileName %>.css.map',
            encoreResp: '<%= config.dist.fileNameResp %>.css.map'
        }
    },
    tmp: {
        dir: 'tmp',
        less: {
            dir: '<%= config.tmp.dir %>/less',
            encore: '<%= config.tmp.less.dir %>/encore-ui.less',
            encoreResp: '<%= config.tmp.less.dir %>/encore-ui-resp.less',
            demos: '<%= config.tmp.less.dir %>/demos.less',
            examples: '<%= config.tmp.less.dir %>/examples.less'
        }
    },
    regex: {
        version: /-(?:\d+\.){2}\d+(?:-\d+)*/g // http://www.regexr.com/395kl
    }
};
