# rx-page-objects

Using EncoreUI Angular components? Writing Selenium end-to-end automation using Protractor? Save time with these convenient page objects!

## Page Objects

Many of the components that ship with EncoreUI require end to end testing. Why should we waste all of the work we put into assuring ourselves that the components work, when you're going to need to do the same yourself?

**good**:
```js
it('should have actually sorted the column ascending', () => {
    let names = ['Anne', 'Bob', 'Charlie'];
    let column = element(by.cssContainingText('rx-sortable-column', 'Name'));
    column.$('i.sort-icon').click();
    column.$('i.sort-icon').click();
    let columnData = element.all(by.repeater('user in users').column('Name')).getText());
    expect(columnData).to.eventually.eql(names);
});
```

**better**
```js
// Let a test page object do the heavy lifting, this can be dry.
let myPage = {
    column(columnName) {
        var columnElement = element(by.cssContainingText('rx-sortable-column', columnName));
        return new encore.rxSortableColumn(columnElement);
    }
    data(columnName) {
        return element.all(by.repeater('user in users').column(columnName)).getText();
    }
};

it('should have actually sorted the column ascending', () => {
    myPage.column('Name').sortAscending(); // Ensures a consistent sort.
    myPage.columnData('Name').to.eventually.eql(names.sort());
});
```

**best**
```js
// Or you can use extend the base class to add a data selector.
class Column extends encore.rxSortableColumn {
    constructor(columnName) {
        super(element(by.cssContainingText('rx-sortable-column', columnName)));
        this.columnName = columnName;
    }
    getData() {
        return element.all(by.repeater('user in users').column(this.columnName)).getText();
    }
}

// This allows you to more easily override for specific columns with odd data requirements.
class SpecialColumn extends Colunn {
    getData() {
        return element.all(by.repeater('user in users').column(this.columnName)).getAttribute('data-attribute');
    }
}

it('should have actually sorted the column ascending', () => {
    let col = new Column('Name');
    col.sortAscending(); // Ensures a consistent sort.
    expect(col.getData()).to.eventually.eql(names.sort());
});
```

## Forms

Forms are everywhere. And they are *horribly boring*. Most forms are not innovative by themselves, but can be the epicenter of many tests that validate input, success messages, error responses, etc. How can you make a form with rx-page-objects? Easy!

**bad**
```js
it('should fill out the form correctly', () => {
    element(by.model('user.name')).sendKeys('Charlie Day');
    element(by.model('user.country')).click();
    element.all(by.repeater('country in countries')).element(by.cssContainingText('option', 'United States')).click();
    element(by.buttonText('Submit')).click();
    expect(element.all(by.repeater('message in messages')).first.getText()).to.eventually.contain('Success');
});

it('should show an error message when submitting a foreign country', () => {
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
let form = {
    get name() {
        return element(by.model('user.name')).getAttribute('value');
    },
    set name(input) {
        element(by.model('user.name')).clear();
        element(by.model('user.name')).sendKeys(input);
    },

    get country() {
        return encore.rxForm.dropdown.initialize(element(by.model('user.country'))).selectedOption;
    },
    set country(countryName) {
        encore.rxForm.dropdown.initialize(element(by.model('user.country'))).select(countryName);
    },

    submit() {
        element(by.buttonText('Submit')).click();
    }
};

it('should fill out the form correctly', () => {
    form.name = 'Charlie Day';
    form.country = 'United States';
    form.submit();
    expect(encore.rxNotify.all.isPresent('Success')).to.eventually.be.true;
});

it('should show an error message when submitting a foreign country', () => {
    form.name = 'Lāčplēsis';
    form.country = 'Latvia';
    form.submit();
    expect(encore.rxNotify.all.isPresent('Error')).to.eventually.be.true;
});
```

**best**
```js
let form = {
    /**
     * Feel free to add logic to your tests to make things easier.  This simple method will work with
     * all of the accessors provided by rx-page-objects
     */
    fill(formData) {
        _.each(formData, (value, key) => {
            this[key] = value;
        });
    },
    submit() {
        element(by.buttonText('Submit')).click();
    }
};
/**
 * Use the built-in form accessor functions along with Object.defineProperties.  Notes that these accessors
 * are written as TypeScript decorators, so the syntax is much simpler if you are using TypeScript.
 */
Object.defineProperties(form, {
    country: encore.selectFieldAccessor(element(by.model('user.country'))(),
    name: encore.textFieldAccessor(element(by.model('user.name'))())
};

it('should fill out the form correctly', () => {
    form.fill({
        name: 'Charlie Day',
        country: 'United States'
    });
    expect(encore.rxNotify.all.hasNotification('Success')).to.eventually.be.true;
});

it('should show an error message when submitting a foreign country', () => {
    form.fill({
        name: 'Lāčplēsis',
        country: 'Latvia'
    });
    expect(encore.rxNotify.all.hasNotification('Error')).to.eventually.be.true;
});
```

More examples of supported form entry elements can be found in the [test library's API documentation](http://rackerlabs.github.io/encore-ui/rx-page-objects/index.html).  Specifically look at the `rxSelect`, `rxCheckbox`, `rxRadio`, and `textField` objects.

When you're using rx-page-objects in your app, you can get back to focusing on what matters -- testing the *business logic* that your app provides, not that all the little buttons, notifications, and menus are working.

## Extends Protractor/Selenium API.

Most componend in in rx-page-objects extend the ElementFinder class from the Protractor API.  This means that
the methods and properties of ElementFinder are typically present on any `rxClassName` object.

```js
it('should have a custom icon on the "Delete" menu option', () => {
    let menu = new encore.rxActionMenu($('rx-action-menu#custom'));
    expect(menu.action('Delete').$('.icon-custom').isPresent()).to.eventually.be.true;
});
```

Please note that in the above example [[rxAction]] inherits the `$` method from Protractor's `ElementFinder`.

The latest documentation on the Protractor API is available here: [Protractor API](http://www.protractortest.org/#/api)

## Exercises

But what happens when you need to make sure your rxCharacterCount directives *actually work*? Or that you correctly implemented a pagination component on a table?

What you need is a way to quickly run boring, repetitive tests that ensure your team didn't make any mistakes "wiring up" the component on the page. Because face it, if a user can't get past page one in your table, it's going to look bad on you. Somebody's gotta test the boring stuff.

But why write dozens of the same tests for *every* single pagination widget in your app, when you can use ours?

**bad**:
```js
describe('user list table', () => {
    describe('pagination', () => {
        it('should be present');
        it('should have a next button');
        it('should have a previous button');
        // this goes on for a while...
    }))
});
```

**good**:
```js
describe('user list table', () => {
    describe('pagination', encore.exercise.rxPaginate({
        instance: somePageObject.pagination,
        pageSizes: [3, 50, 200, 350, 500],
        defaultPageSize: 3
    }));
});
```

## Setting up

*command line*

```
    npm install --save-dev rx-page-objects
```

*protractor.conf.js*

```js
    onPrepare: () => {
        encore = require('rx-page-objects');
    },
```

*.jshintrc*

```js
    "globals": {
        encore: true
    }
```

## Links

[Full Documentation](http://rackerlabs.github.io/encore-ui/rx-page-objects/index.html).

[Components Demo](http://rackerlabs.github.io/encore-ui/#/overview).
