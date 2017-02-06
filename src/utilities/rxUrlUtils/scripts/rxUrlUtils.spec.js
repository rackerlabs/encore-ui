describe('service:rxUrlUtils', function () {
    var subject;
    var route = {
        current: {
            pathParams: {
                user: 'me'
            }
        }
    };

    beforeEach(function () {
        module('encore.ui.utilities');
        module('encore.ui.elements');
        module('encore.ui.utilities');
        // Provide any mocks needed
        module(function ($provide) {
            $provide.value('$route', route);
        });

        inject(function (rxUrlUtils) {
            subject = rxUrlUtils;
        });
    });

    describe('stripLeadingChars', function () {
        it('should strip leading # and /', function () {
            expect(subject.stripLeadingChars('##foo'), '##foo').to.equal('foo');
            expect(subject.stripLeadingChars('//##bar'), '//##bar').to.equal('bar');
            expect(subject.stripLeadingChars('//bar'), '//bar').to.equal('bar');
            expect(subject.stripLeadingChars('//##bar'), '//##bar').to.equal('bar');
            expect(subject.stripLeadingChars('##//bar'), '##//bar').to.equal('bar');
        });

        it('should not strip inside # or /', function () {
            expect(subject.stripLeadingChars('foo#bar')).to.equal('foo#bar');
            expect(subject.stripLeadingChars('foo/bar')).to.equal('foo/bar');
        });
    });

    describe('stripTrailingSlash', function () {
        it('should remove trailing slash',  function () {
            expect(subject.stripTrailingSlash('foo/')).to.equal('foo');
        });

        it('should not remove inside /', function () {
            expect(subject.stripTrailingSlash('foo/bar')).to.equal('foo/bar');
        });
    });

    describe('getChunks', function () {
        it('should return non-empty chunks', function () {
            var url = '//abc/def//ghi';
            expect(subject.getChunks(url)).to.deep.equal([ 'abc', 'def', 'ghi' ]);
        });

        it('should return an empty string in an array on non-string entry', function () {
            expect(subject.getChunks(undefined)).to.deep.equal(['']);
        });
    });

    describe('getFullPath', function () {
        // Provide any mocks needed
        var route;
        module(function ($provide) {
            $provide.value('$document', route);
        });
    });

    describe('getCurrentPathChunks', function () {
        var originalGetFullPath;
        before(function () {
            originalGetFullPath = subject.getFullPath;
        });

        after(function () {
            subject.getFullPath = originalGetFullPath;
        });

        it('should have correct chunks with no base', function () {
            var url = '/encore-ui/#/overviewPage';
            subject.getFullPath = function () { return url; };

            expect(subject.getCurrentPathChunks()).to.deep.equal(['encore-ui', '#', 'overviewPage']);

        });
    });

    describe('getItemUrl', function () {
        it('should remove leading slashes, hash tags and query string', function () {
            var item = { url: '/#/my/url?param=1' };
            expect(subject.getItemUrl(item)).to.equal('my/url');
        });

        it('should return undefined if `url` is not present on item', function () {
            expect(subject.getItemUrl({})).to.equal(undefined);
        });
    });

    describe('isActive', function () {
        it('should be active on an exact match', function () {
            var item = { url: '/foo/bar' };
            var currentPathChunks = [ 'foo', 'bar' ];
            expect(subject.isActive(item, currentPathChunks), 'item: /foo/bar').to.be.true;
        });

        it('should not be active if the item url is longer than the current url', function () {
            var item = { url: '/foo/bar/blah' };
            var currentPathChunks = [ 'foo', 'bar' ];
            expect(subject.isActive(item, currentPathChunks), 'item: /foo/bar/blah').to.be.false;
        });

        it('should not be active if the item has no url', function () {
            var item = {};
            var currentPathChunks = [ 'foo', 'bar' ];
            expect(subject.isActive(item, currentPathChunks), 'item: /foo').to.be.false;
        });

        it('should be active if the item has no url but a child item is active', function () {
            var item = {
                children: [
                    { url: '/foo/bar/blah' }
                ]
            };
            var currentPathChunks = [ 'foo', 'bar', 'blah' ];
            expect(subject.isActive(item, currentPathChunks), 'false before checking children').to.be.false;
            expect(subject.isActive(item.children[0], currentPathChunks), 'child is active').to.be.true;
            item.children[0].active = true;
            expect(subject.isActive(item, currentPathChunks), 'active now that child is active').to.be.true;
        });
    });

    describe('mathesSubChunks', function () {
        it('should match if the first n chunks match', function () {
            var first = ['a', 'b', 'c', 'd'];
            var second = ['a', 'b'];
            expect(subject.matchesSubChunks(first, second, 2)).to.be.true;
        });

        it('should not match if the first elements are different', function () {
            expect(subject.matchesSubChunks(['a'], ['b'], 1)).to.be.false;
        });

        it('should not match if the first n-1 match but the nth does not', function () {
            var first = ['a', 'b', 'c', 'd'];
            var second = ['a', 'b', 'c', 'XYZ'];
            expect(subject.matchesSubChunks(first, second, 4)).to.be.false;
        });

        it('should not match if numChunks is shorter than the length of subChunks', function () {
            var first = ['a', 'b', 'c', 'd'];
            var second = ['a', 'b', 'c', 'd'];
            expect(subject.matchesSubChunks(first, second, second.length - 1)).to.be.false;
        });
    });

    describe('buildUrl', function () {
        it('should populate the `user` parameter from the route', function () {
            expect(subject.buildUrl('/foo/{{user}}/bar')).to.equal('/foo/me/bar');
        });

        it('should populate with `user` and extra context', function () {
            var extraContext = { stuff: 'morestuff' };
            expect(subject.buildUrl('/foo/{{user}}/{{stuff}}', extraContext)).to.equal('/foo/me/morestuff');
        });

        it('should override `user` with `user` from extra context', function () {
            var extraContext = { user: 'extrauser' };
            expect(subject.buildUrl('/foo/{{user}}', extraContext)).to.equal('/foo/extrauser');
        });
        it('should return undefined if the url is undefined', function () {
            expect(subject.buildUrl(undefined)).to.be.undefined;
        });
    });

    describe('parseUrl', function () {
        it('should populate object with URL parts', function () {
            var parsed = subject.parseUrl('http://something.com/foo/bar?test=four#foobar');
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('something.com');
            expect(parsed.port).to.equal('');
            expect(parsed.pathname).to.equal('/foo/bar');
            expect(parsed.search).to.equal('?test=four');
            expect(parsed.hash).to.equal('#foobar');
            expect(parsed.host).to.equal('something.com');
        });

        it('should return pathname of undefined with loaded page host values if the url is undefined', function () {
            var parsed = subject.parseUrl(undefined);
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('localhost');
            expect(parsed.port).to.equal('9877');
            expect(parsed.pathname).to.equal('/undefined');
            expect(parsed.host).to.equal('localhost:9877');
        });

        it('should return current loaded page values if the url is blank', function () {
            var parsed = subject.parseUrl('');
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('localhost');
            expect(parsed.port).to.equal('9877');
            expect(parsed.pathname).to.equal('/context.html');
            expect(parsed.host).to.equal('localhost:9877');
        });

        it('should return empty values if the url is null', function () {
            var parsed = subject.parseUrl(null);
            expect(parsed.protocol).to.equal(':');
            expect(parsed.hostname).to.equal('');
            expect(parsed.port).to.equal('');
            expect(parsed.pathname).to.equal('');
            expect(parsed.search).to.equal('');
            expect(parsed.hash).to.equal('');
            expect(parsed.host).to.equal('');
        });

        it('should include the port number in the host property', function () {
            var parsed = subject.parseUrl('http://something.com:1010');
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('something.com');
            expect(parsed.port).to.equal('1010');
            expect(parsed.host).to.equal('something.com:1010');
        });
    });
});

describe('service:urlUtils (DEPRECATED)', function () {
    var subject;
    var route = {
        current: {
            pathParams: {
                user: 'me'
            }
        }
    };

    beforeEach(function () {
        module('encore.ui.utilities');
        module('encore.ui.elements');
        module('encore.ui.utilities');
        // Provide any mocks needed
        module(function ($provide) {
            $provide.value('$route', route);
        });

        inject(function (urlUtils) {
            subject = urlUtils;
        });
    });

    describe('stripLeadingChars', function () {
        it('should strip leading # and /', function () {
            expect(subject.stripLeadingChars('##foo'), '##foo').to.equal('foo');
            expect(subject.stripLeadingChars('//##bar'), '//##bar').to.equal('bar');
            expect(subject.stripLeadingChars('//bar'), '//bar').to.equal('bar');
            expect(subject.stripLeadingChars('//##bar'), '//##bar').to.equal('bar');
            expect(subject.stripLeadingChars('##//bar'), '##//bar').to.equal('bar');
        });

        it('should not strip inside # or /', function () {
            expect(subject.stripLeadingChars('foo#bar')).to.equal('foo#bar');
            expect(subject.stripLeadingChars('foo/bar')).to.equal('foo/bar');
        });
    });

    describe('stripTrailingSlash', function () {
        it('should remove trailing slash',  function () {
            expect(subject.stripTrailingSlash('foo/')).to.equal('foo');
        });

        it('should not remove inside /', function () {
            expect(subject.stripTrailingSlash('foo/bar')).to.equal('foo/bar');
        });
    });

    describe('getChunks', function () {
        it('should return non-empty chunks', function () {
            var url = '//abc/def//ghi';
            expect(subject.getChunks(url)).to.deep.equal([ 'abc', 'def', 'ghi' ]);
        });

        it('should return an empty string in an array on non-string entry', function () {
            expect(subject.getChunks(undefined)).to.deep.equal(['']);
        });
    });

    describe('getFullPath', function () {
        // Provide any mocks needed
        var route;
        module(function ($provide) {
            $provide.value('$document', route);
        });
    });

    describe('getCurrentPathChunks', function () {
        var originalGetFullPath;
        before(function () {
            originalGetFullPath = subject.getFullPath;
        });

        after(function () {
            subject.getFullPath = originalGetFullPath;
        });

        it('should have correct chunks with no base', function () {
            var url = '/encore-ui/#/overviewPage';
            subject.getFullPath = function () { return url; };

            expect(subject.getCurrentPathChunks()).to.deep.equal(['encore-ui', '#', 'overviewPage']);

        });
    });

    describe('getItemUrl', function () {
        it('should remove leading slashes, hash tags and query string', function () {
            var item = { url: '/#/my/url?param=1' };
            expect(subject.getItemUrl(item)).to.equal('my/url');
        });

        it('should return undefined if `url` is not present on item', function () {
            expect(subject.getItemUrl({})).to.equal(undefined);
        });
    });

    describe('isActive', function () {
        it('should be active on an exact match', function () {
            var item = { url: '/foo/bar' };
            var currentPathChunks = [ 'foo', 'bar' ];
            expect(subject.isActive(item, currentPathChunks), 'item: /foo/bar').to.be.true;
        });

        it('should not be active if the item url is longer than the current url', function () {
            var item = { url: '/foo/bar/blah' };
            var currentPathChunks = [ 'foo', 'bar' ];
            expect(subject.isActive(item, currentPathChunks), 'item: /foo/bar/blah').to.be.false;
        });

        it('should not be active if the item has no url', function () {
            var item = {};
            var currentPathChunks = [ 'foo', 'bar' ];
            expect(subject.isActive(item, currentPathChunks), 'item: /foo').to.be.false;
        });

        it('should be active if the item has no url but a child item is active', function () {
            var item = {
                children: [
                    { url: '/foo/bar/blah' }
                ]
            };
            var currentPathChunks = [ 'foo', 'bar', 'blah' ];
            expect(subject.isActive(item, currentPathChunks), 'false before checking children').to.be.false;
            expect(subject.isActive(item.children[0], currentPathChunks), 'child is active').to.be.true;
            item.children[0].active = true;
            expect(subject.isActive(item, currentPathChunks), 'active now that child is active').to.be.true;
        });
    });

    describe('mathesSubChunks', function () {
        it('should match if the first n chunks match', function () {
            var first = ['a', 'b', 'c', 'd'];
            var second = ['a', 'b'];
            expect(subject.matchesSubChunks(first, second, 2)).to.be.true;
        });

        it('should not match if the first elements are different', function () {
            expect(subject.matchesSubChunks(['a'], ['b'], 1)).to.be.false;
        });

        it('should not match if the first n-1 match but the nth does not', function () {
            var first = ['a', 'b', 'c', 'd'];
            var second = ['a', 'b', 'c', 'XYZ'];
            expect(subject.matchesSubChunks(first, second, 4)).to.be.false;
        });

        it('should not match if numChunks is shorter than the length of subChunks', function () {
            var first = ['a', 'b', 'c', 'd'];
            var second = ['a', 'b', 'c', 'd'];
            expect(subject.matchesSubChunks(first, second, second.length - 1)).to.be.false;
        });
    });

    describe('buildUrl', function () {
        it('should populate the `user` parameter from the route', function () {
            expect(subject.buildUrl('/foo/{{user}}/bar')).to.equal('/foo/me/bar');
        });

        it('should populate with `user` and extra context', function () {
            var extraContext = { stuff: 'morestuff' };
            expect(subject.buildUrl('/foo/{{user}}/{{stuff}}', extraContext)).to.equal('/foo/me/morestuff');
        });

        it('should override `user` with `user` from extra context', function () {
            var extraContext = { user: 'extrauser' };
            expect(subject.buildUrl('/foo/{{user}}', extraContext)).to.equal('/foo/extrauser');
        });
        it('should return undefined if the url is undefined', function () {
            expect(subject.buildUrl(undefined)).to.be.undefined;
        });
    });

    describe('parseUrl', function () {
        it('should populate object with URL parts', function () {
            var parsed = subject.parseUrl('http://something.com/foo/bar?test=four#foobar');
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('something.com');
            expect(parsed.port).to.equal('');
            expect(parsed.pathname).to.equal('/foo/bar');
            expect(parsed.search).to.equal('?test=four');
            expect(parsed.hash).to.equal('#foobar');
            expect(parsed.host).to.equal('something.com');
        });

        it('should return pathname of undefined with loaded page host values if the url is undefined', function () {
            var parsed = subject.parseUrl(undefined);
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('localhost');
            expect(parsed.port).to.equal('9877');
            expect(parsed.pathname).to.equal('/undefined');
            expect(parsed.host).to.equal('localhost:9877');
        });

        it('should return current loaded page values if the url is blank', function () {
            var parsed = subject.parseUrl('');
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('localhost');
            expect(parsed.port).to.equal('9877');
            expect(parsed.pathname).to.equal('/context.html');
            expect(parsed.host).to.equal('localhost:9877');
        });

        it('should return empty values if the url is null', function () {
            var parsed = subject.parseUrl(null);
            expect(parsed.protocol).to.equal(':');
            expect(parsed.hostname).to.equal('');
            expect(parsed.port).to.equal('');
            expect(parsed.pathname).to.equal('');
            expect(parsed.search).to.equal('');
            expect(parsed.hash).to.equal('');
            expect(parsed.host).to.equal('');
        });

        it('should include the port number in the host property', function () {
            var parsed = subject.parseUrl('http://something.com:1010');
            expect(parsed.protocol).to.equal('http:');
            expect(parsed.hostname).to.equal('something.com');
            expect(parsed.port).to.equal('1010');
            expect(parsed.host).to.equal('something.com:1010');
        });
    });
});
