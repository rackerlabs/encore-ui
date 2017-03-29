module.exports = {
    ghPages: {
        options: {
            // commit the entire build directory
            base: '<%= config.dir.build %>',
            // always commit to source repo
            repo: 'https://github.com/rackerlabs/encore-ui.git',
            message: 'docs(ghpages): release v<%= pkg.version %> [skip ci]',
            /*
             * This is the key to versioned docs. When we output all
             * documentation to the build/3.x directory, it will only add new
             * items to the gh-pages branch. This allows each major version to
             * have its own directory and they won't interfere with one another.
             */
            add: true // IMPORTANT! Prevents overwriting documentation
        },
        src: '**/*'
    },
    bower: {
        options: {
            base: 'bower',
            branch: 'master',
            message: 'chore(bower): release v<%= pkg.version %>',
            repo: 'https://github.com/rackerlabs/encore-ui-bower.git',
            tag: '<%= pkg.version %>'
        },
        src: '**/*'
    }
};
