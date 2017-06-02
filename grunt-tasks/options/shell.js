module.exports = function (grunt) {
    return {
        'eslint-dev': {
            command: 'npm run eslint-dev',
            options: {
                stdout: true
            }
        },

        'eslint-test': {
            command: 'npm run eslint-test',
            options: {
                stdout: true
            }
        },

        'tslint-test': {
            command: 'npm run tslint-test',
            options: {
                stdout: true
            }
        },

        docRxPageObjects: {
            command: 'node_modules/.bin/typedoc',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/rx-page-objects'
                }
            }
        },

        tscRxPageObjects: {
            command: 'node_modules/.bin/tsc',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/rx-page-objects'
                }
            }
        },

        tscRxPageObjectsTests: {
            command: 'node_modules/.bin/tsc -p tsconfig-test.json',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/rx-page-objects'
                }
            }
        },

        npmPublish: {
            command: 'npm publish ./rx-page-objects',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/'
                }
            }
        },

        // When publishing a fix to an older version, we have to explicitly pass `--tag`
        // and a tagname, otherwise npm will automatically set this version as the `latest`,
        // even though "newer" versions exist
        npmPublishHotFix: {
            command: 'npm publish ./rx-page-objects --tag bugfix-<%= pkg.version %>',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/'
                }
            }
        }
    };
};
