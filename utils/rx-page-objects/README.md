# rx-page-objects

Using EncoreUI Angular components? Writing Selenium end-to-end automation using Protractor? Save time with these convenient page objects!

## Page Objects

Many of the components that ship with EncoreUI require end to end testing. Why should we waste all of the work we put into assuring ourselves that the components work, when you're going to need to do the same yourself?

**good**:
```js
it('should have actually sorted the column ascending', function () {
    var column = element(by.cssContainingText('rx-sortable-column', 'Name'));
    column.$('i.sort-icon').click();
    column.$('i.sort-icon').click();
    element.all(by.repeater('user in users').column('Name')).getText().then(function (names) {
        expect(names).to.eql(names.sort());
    });
});
```

**better**:
```js
it('should have actually sorted the column ascending', function () {
    var columnElement = element(by.cssContainingText('rx-sortable-column', 'Name'));
    var column = encore.rxSortableColumn.initialize(columnElement, 'user in users');
    column.sortAscending();
    column.data.then(function (names) {
        expect(names).to.eql(names.sort());
    });
});
```

**best**
```js
var Page = require('astrolabe').Page;

var myPage = Page.create({
    column: {
        value: function (columnName) {
            var columnElement = element(by.cssContainingText('rx-sortable-column', columnName));
            return encore.rxSortableColumn.initialize(columnElement);
        }
    }
});

it('should have actually sorted the column ascending', function () {
    var column = myPage.column('Name');
    column.sortAscending();
    column.data.then(function (names) {
        expect(names).to.eql(names.sort());
    });
});
```

## Forms

Forms are everywhere. And they are *horribly boring*. Most forms are not innovative by themselves, but can be the epicenter of many tests that validate input, success messages, error responses, etc. How can you make a form with rx-page-objects? Easy!

**bad**
```js
it('should fill out the form correctly', function () {
    element(by.model('user.name')).sendKeys('Charlie Day');
    element(by.model('user.country')).click();
    element.all(by.repeater('country in countries')).element(by.cssContainingText('option', 'United States')).click();
    element(by.buttonText('Submit')).click();
    expect(element.all(by.repeater('message in messages')).first.getText()).to.eventually.contain('Success');
});

it('should show an error message when submitting a foreign country', function () {
    // http://i.imgur.com/ag8KcpB.jpg
    element(by.model('user.name')).sendKeys('Lāčplēsis');
    element(by.model('user.country')).click();
    element.all(by.repeater('country in countries')).element(by.cssContainingText('option', 'Latvia')).click();
    element(by.buttonText('Submit')).click();
    expect(element.all(by.repeater('message in messages')).first.getText()).to.eventually.contain('Error');
});

// copy-pasted tests continue below...I sure hope this form never changes...
```

**better**
```js
var Page = require('astrolabe').Page;

var form = Page.create({

    name: {
        get: function () {
            return element(by.model('user.name')).getAttribute('value');
        },
        set: function (input) {
            element(by.model('user.name')).clear();
            element(by.model('user.name')).sendKeys(input);
        }
    },

    country: {
        get: function () {
            return encore.rxForm.dropdown.initialize(element(by.model('user.country'))).selectedOption;
        },
        set: function (countryName) {
            encore.rxForm.dropdown.initialize(element(by.model('user.country'))).select(countryName);
        }
    },

    submit: {
        value: function () {
            element(by.buttonText('Submit')).click();
        }
    }

});

it('should fill out the form correctly', function () {
    form.name = 'Charlie Day';
    form.country = 'United States';
    form.submit();
    expect(encore.rxNotify.all.isPresent('Success')).to.eventually.be.true;
});

it('should show an error message when submitting a foreign country', function () {
    form.name = 'Lāčplēsis';
    form.country = 'Latvia';
    form.submit();
    expect(encore.rxNotify.all.isPresent('Error')).to.eventually.be.true;
});
```

**best**
```js
var Page = require('astrolabe').Page;

var form = Page.create({

    fill: {
        value: function (formData) {
            encore.rxForm.fill(this, formData);
            this.submit();
        }
    },

    name: encore.rxForm.textField.generateAccessor(element(by.model('user.name'))),

    country: encore.rxForm.dropdown.generateAccessor(element(by.model('user.country')),

    submit: {
        value: function () {
            element(by.buttonText('Submit')).click();
        }
    }

});

it('should fill out the form correctly', function () {
    form.fill({
        name: 'Charlie Day',
        country: 'United States'
    });
    expect(encore.rxNotify.all.isPresent('Success')).to.eventually.be.true;
});

it('should show an error message when submitting a foreign country', function () {
    form.fill({
        name: 'Lāčplēsis',
        country: 'Latvia'
    });
    expect(encore.rxNotify.all.isPresent('Error')).to.eventually.be.true;
});
```

More examples of supported form entry elements can be found in the [test library's API documentation](http://rackerlabs.github.io/encore-ui/rx-page-objects/index.html#rxForm).

When you're using rx-page-objects in your app, you can get back to focusing on what matters -- testing the *business logic* that your app provides, not that all the little buttons, notifications, and menus are working.

## Exercises

But what happens when you need to make sure your rxCharacterCount directives *actually work*? Or that you correctly implemented a pagination component on a table?

What you need is a way to quickly run boring, repetitive tests that ensure your team didn't make any mistakes "wiring up" the component on the page. Because face it, if a user can't get past page one in your table, it's going to look bad on you. Somebody's gotta test the boring stuff.

But why write dozens of the same tests for *every* single pagination widget in your app, when you can use ours?

**bad**:
```js
describe('user list table', function () {
    describe('pagination', function () {
        it('should be present');
        it('should have a next button');
        it('should have a previous button');
        // this goes on for a while...
    }))
});
```

**good**:
```js
describe('user list table', function () {
    describe('pagination', encore.exercise.rxPaginate({
        instance: somePageObject.pagination,
        pageSizes: [3, 50, 200, 350, 500],
        defaultPageSize: 3
    }));
});
```

## Setting up

*command line*

    npm install --save-dev rx-page-objects

*protractor.conf.js*

    onPrepare: function () {
        encore = require('rx-page-objects');
    },

*.jshintrc*

    "globals": {
        encore: true
    }

## Links

[Full Documentation](http://rackerlabs.github.io/encore-ui/rx-page-objects/index.html).

[Components Demo](http://rackerlabs.github.io/encore-ui/#/overview).
