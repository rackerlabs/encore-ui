# rx-page-objects

### End to end testing utilities for Encore applications.

Provides high-level access to components in the Encore-UI library through Protractor.

You can use it directly in your test code, without using any abstractions at all.

```js
it('should have the "Delete" menu option present', function () {
    let menu = new encore.rxActionMenu($('rx-action-menu#custom'));
    expect(menu.hasAction('Delete')).to.eventually.be.true;
});
```

### Extends Protractor/Selenium API.

Most componend in in rx-page-objects extend the ElementFinder class from the Protractor API.  This means that
the methods and properties of ElementFinder are typically present on any `rxClassName` object.

```js
it('should have a custom icon on the "Delete" menu option', function () {
    let menu = new encore.rxActionMenu($('rx-action-menu#custom'));
    expect(menu.action('Delete').$('.icon-custom').isPresent()).to.eventually.be.true;
});
```

Please note that in the above example [[rxAction]] inherits the `$` method from Protractor's `ElementFinder`.

The latest documentation on the Protractor API is available here: [Protractor API](http://www.protractortest.org/#/api)

### Construct page objects faster.

Assemble many of the reusable components from rx-page-objects into a easy to maintain page object.

Great for when you already use page objects, and want to benefit from using pre-fabricated components.

```js
let myHomePage = {
    get notifications() { return encore.rxNotify.all; },
    get pagination() { return new encore.rxPaginate($('#myTable rx-paginate')); },
};

it('should have three notifications present', function () {
    expect(myHomePage.notifications.count()).to.eventually.eql(3);
});
```

### Use exercises to generate basic tests.

Describe your component at a high level, and let rx-page-objects run a set of simple tests for you.

```js
describe('Default Pagination Tests', encore.exercise.rxPaginate({
    instance: myHomePage.pagination,
    totalItems: 157,
    defaultPageSize: 20,
    pageSizes: [5, 10, 20, 25, 50]
}));
```

From just those few lines of code, the following is tested.

```
    ✓ should be displayed
    ✓ should not have `next` link on the last page
    ✓ should allow attempting to navigate to the next page when already on the last page
    ✓ should allow attempting to navigate to the last page when already on the last page
    ✓ should navigate to the first page
    ✓ should not have `prev` link on the first page
    ✓ should allow attempting to navigate to the previous page when already on the first page
    ✓ should allow attempting to navigate to the first page when already on the first page
    ✓ should have all available page sizes
    ✓ should highlight the current items per page selection
    ✓ should navigate forward one page at a time
    ✓ should navigate backwards one page at a time
    ✓ should navigate to the last page
    ✓ should jump forward to page 6 using pagination
    ✓ should jump backward to page 2 using pagination
    ✓ should switch to a different items per page
    ✓ should put the user back on the first page after resizing the items per page
    ✓ should list have the correct string for the shown items
    ✓ should not fail to match the upper bounds of the shown items even if not displayed
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
