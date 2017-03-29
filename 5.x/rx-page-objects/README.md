# rx-page-objects

### End to end testing utilities for Encore applications.

Provides high-level access to components in the Encore-UI library through Protractor.

You can use it directly in your test code, without using any abstractions at all.

```
it('should have all breadcrumbs present', function () {
    expect(encore.rxBreadcrumbs.initialize().names).to.eventually.eql(['Home', 'Feature', 'Details']);
});
```

### Construct page objects faster.

Assemble many of the reusable components from rx-page-objects into a easy to maintain page object.

Great for when you already use page objects, and want to benefit from using pre-fabricated components.

```js
var myHomePage = {
    get breadcrumbs() { return encore.rxBreadcrumbs.initialize(); },
    get pagination() { return encore.rxPaginate.initialize($('#myTable rx-paginate')); },
};

it('should have all breadcrumbs present', function () {
    expect(myHomePage.breadcrumbs.names).to.eventually.eql(['Home', 'Feature', 'Details']);
});
```

### Use exercises to generate basic tests.

Describe your component at a high level, and let rx-page-objects run a set of simple tests for you.

```js
describe('Default Pagination Tests', encore.exercise.rxPaginate({
    instance: myHomePage.pagination,
    pages: 8,
    defaultPageSize: 20,
    pageSizes: [5, 10, 20, 25, 50]
}));
```

From just those few lines of code, the following is tested.

```
  ✓ should navigate forward one page at a time
  ✓ should navigate backwards one page at a time
  ✓ should navigate to the last page
  ✓ should jump forward to page 6 using pagination
  ✓ should jump backward to page 2 using pagination
  ✓ should not allow navigating `next` the last page
  ✓ should allow attempting to navigate to the last page when already on the last page
  ✓ should navigate to the first page
  ✓ should not allow navigating `prev` the first page
  ✓ should allow attempting to navigate to the first page when already on the first page
  ✓ should have all available page sizes
  ✓ should highlight the current items per page selection
  ✓ should list the lower bounds of the shown items currently in the table
  ✓ should list the upper bounds of the shown items currently in the table
  ✓ should know the total number of pages without visiting it
  ✓ should switch to a different items per page
  ✓ should put the user back on the first page after resizing the items per page
  ✓ should not fail to match the lower bounds of the shown items even if not displayed
  ✓ should not fail to match the upper bounds of the shown items even if not displayed
  ✓ should not allow selecting an unavailable items per page
```

Exercises are designed to test the basics quickly. It contains no app-specific business logic.

It will always put your app in the same state it found it in when it started.

## Setting up

*command line*

```
npm install --save-dev rx-page-objects
```

*protractor.conf.js*

```js
onPrepare: function () {
    encore = require('rx-page-objects');
},
```

*.jshintrc*

```js
"globals": {
    encore: true
}
```
