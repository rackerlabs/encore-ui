angular.module('encore.ui.rxApp')
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAppNav
 * @restrict E
 * @scope
 * @description
 * Creates a menu based on items passed in.
 *
 * # Navigation Menu JSON Structure
 * EncoreUI applications, by default, load the navigation menu from JSON defined
 * in the [encore-ui-nav project](https://github.com/rackerlabs/encore-ui-nav).
 * You can specify that a different JSON file be used (see the demo below), but
 * a certain structure is expected for the JSON.
 *
 * ## Outer structure/Sections
 * The JSON consists of an array of objects, with each object representing a
 * "section" in the nav. The two demos at the bottom of this page each only have
 * one section, `"All Tools"` and `"Example Menu"`, respectively. As such, the
 * JSON for each of them is an array with one object in it. The default EncoreUI
 * nav menu only has one section `"All Tools"`, and individual products should
 * not be expecting to add their own sections.
 *
 * The application that this documentation lives in has three sections, which you
 * can see if you look at the current left nav menu.
 * They are `EncoreUI`, `Design Styleguide` and `All Components`.
 *
 * ### `title` (required)
 *
 * Each section specified in this array is required to have a `title`
 * attribute, i.e.
 *
 * <pre>
 * navJSON = [
 *     {
 *         "title": "Section 1"
 *     }, {
 *         "title": "Section 2"
 *     }
 * ]
 * </pre>
 *
 * ### `type` (optional)
 * Each section can optionally have a `type` attribute. If present, a class with
 * the value `nav-section-TYPE` will be applied in the nav, otherwise
 * `nav-section-all` will be applied.
 *
 * <pre>
 * navJSON = [
 *     {
 *         "title": "Section 1",
 *         "type": "highlight"
 *     }, {
 *         "title": "Section 2"
 *     }
 * ]
 * </pre>
 *
 * In this example, `Section 1` will have a `nav-section-highlight` class applied
 * to it, while `Section 2` will receive the default `nav-section-all` class.
 *
 * The default Encore nav menu does not currently use the `type` property, and
 * products being added to Encore should avoid it. This attribute is reserved
 * for future use by the EncoreUI designers.
 *
 * ### `children` (optional)
 *
 * A section's `children` attribute details the first level of navigation items
 * that live within the section. This is defined as an array of objects, where
 * each object represents an "item" to be displayed in the nav (and the structure
 * of the objects/items themselves will be defined in the Navigation Items
 * section below). As an example, this could look like:
 *
 *<pre>
 * navJSON = [
 *     {
 *         "title": "Section 1",
 *         "type": "highlight",
 *         "children": [
 *             {
 *                 "href": "/overview",
 *                 "key": "overview",
 *                 "linkText": "Overview"
 *             }, {
 *                 "href": "/about",
 *                 "key": "about",
 *                 "linkText": "About"
 *             },
 *         ]
 *     }, {
 *         "title": "Section 2",
 *         "children": [
 *             {
 *                 "href": "/overview2",
 *                 "linkText": "Section 2 Overview"
 *             }
 *         ]
 *     }
 * ]
 * </pre>
 *
 * These `children` will be able to have further `children` nested inside them,
 * accessible via an expand/collapse chevron, but it is important to note that
 * the top level `children` in each section will _always_ be displayed.
 *
 * ## Navigation Items
 * A Navigation Item is an object that exists in a `children` array, and
 * represents a clickable item. These items have many optional attributes,
 * and can themselves contain `children` attributes.
 *
 * Their only required attribute is `linkText`. The object will also need _one_
 * of the `href` or `children` attributes, but these two should be mutually exclusive.
 *
 * ### `linkText` (required)
 *
 * The `linkText` attribute defines what text will be shown for the item in the
 * nav menu. This was shown in the example above,
 *
 * <pre>
 * {
 *        "title": "Section 1",
 *        "type": "highlight",
 *        "children": [
 *            {
 *                 "href": "/overview",
 *                 "key": "overview",
 *                 "linkText": "Overview"
 *           }, {
 *                 "href": "/about",
 *                 "key": "about",
 *                 "linkText": "About"
 *           },
 *       ]
 * }
 * </pre>
 *
 * These items will be displayed in the nav with `Overview` and `About` text.
 *
 * ### `key` (required for top-level items)
 * The `key` attribute is used to provide an unique identifier for individual
 * navigation items. If you are introducing a new top-level item into the nav
 * menu, then the `key` is required. It is optional for any nested items. There
 * are two possible reasons you would want to provide this for nested items:
 *
 * 1. A nav item with a `key` will have the class `rx-app-key-{{ item.key }}`
 * applied to it
 * 2. `rxAppRoutes` exposes a few methods for working with the key, including
 * `isActiveByKey()` and `setRouteByKey()`
 *
 * In general, you should not need to provide a `key` attribute for any nested
 * children. We try to avoid custom styling inside the nav, so the automatic
 * class application shouldn't be necessary. And the `rxAppRoutes` methods are
 * _generally_ only used internally by EncoreUI.
 *
 *
 * ### `href` (optional)
 *
 * The `href` attribute is used to assign a URL to the item, which will be
 * navigated to when clicked. If the item has a `children` attribute, you
 * normally would not include `href`, because you want the children to
 * expand/collapse when this item is clicked, rather than navigating away to
 * somewhere else.
 *
 * For Encore products within Rackspace, we keep the products on the same domain
 * (encore.rackspace.com), but give each product its own top-level path, i.e.
 * `encore.rackspace.com/foo`, `encore.rackspace.com/bar`. By doing this, the
 * `href` values can simply be entered as `/foo` and `/bar`. And more importantly,
 * `/foo` and `/bar` can be _completely separate Angular applications_. Both
 * applications are available in the nav, but clicking on `/foo` will load a new
 * Angular application, while clicking on `/bar` loads a brand new Angular
 * application.
 *
 * This allows applications to be developed and deployed independently from each
 * other. The nav is aware of all the applications, but they do not have to be
 * aware of each other.
 *
 * An extra feature of `href` is that you can put variables into it, that will be
 * interpolated with the current `$route.current.pathParams`. Thus, you can do
 * something like:
 *
 * <pre>
 * {
 *      "title": "Section 1",
 *     "type": "highlight",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about/{{foobar}}",
 *             "key": "about",
 *             "linkText": "About"
 *         },
 *         ]
 * }
 * </pre>
 *
 * If `foobar` is currently in `$route.current.pathParams`, then its value will
 * automatically be inserted into the final URL.
 *
 *
 * ### `children` (optional)
 * If an item doesn't have an `href` attribute, it's probably because it has
 * child items via the `children` attribute.
 *
 * <pre>
 * {
 *      "title": "Section 1",
 *     "type": "highlight",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about",
 *             "key": "about",
 *             "linkText": "About"
 *         }, {
 *             "linkText": "People",
 *             "children": [
 *                 {
 *                     "href": "/people/bob",
 *                     "linkText": "Bob",
 *                 }, {
 *                     "href": "/people/sue",
 *                     "linkText": "Sue"
 *                 }
 *
 *             ]
 *         }
 *     ]
 * }
 * </pre>
 *
 * This example shows a new item `People`, which has no `href` of its own, but
 * does have `children`, which contains two new items, each with their own unique `href`.
 *
 * By default, the `Bob` and `Sue` items will not be visible, and in the nav,
 * `People` will automatically have a chevron attached. When clicked, it will
 * expand to show the `children` items.
 *
 * As an aside, in this example, there will likely be one Angular application at
 * `/people`, which is resonsible for routing `/people/bob` and `/people/sue`,
 * while `/overview` and `/about` would probably be two different Angular
 * applications.
 *
 *
 * ### `visibility` and `childVisibility` (optional)
 * The `visibility` attribute is used to control whether or not an individual nav
 * item is visible to the user. If `visibility` is not specified, then by default
 * the item is always visible. The `childVisibility` attribute takes all the same
 * possible values as `visibility`, but is used to determine whether the items in
 * `children` should be visible.
 *
 * `visibility` can take a few types of values. The original form used in EncoreUI
 * was to pass an expression, filtering values with `rxEnvironmentMatch`, i.e.
 *
 * <pre>
 * "visibility": "('unified-preprod' | rxEnvironmentMatch) || ('local' | rxEnvironmentMatch)",
 * </pre>
 *
 * This expression would be evaluated, checking if the user is currently viewing
 * the app in the `unified-preprod` environment or the `local` environment, and
 * only display the item if one of those was true. (See {@link utilities.service:rxEnvironment rxEnvironment}
 * for more details on environemnts). This was used to prevent items from being
 * displayed in a production environment if they were only currently available in
 * staging.
 *
 * *Note*: Using an expression for environment checking use has somewhat tailed off.
 * We now have different JSON files for each environment, so checking the current
 * environment is not necessary.
 *
 * Another technique for visibility is to use a predefined set of visibility
 * functions that exist in the framework—`rxPathParams`, for example.
 *
 * To use these, you pass an array to `visibility`, with the first argument being
 * the name of the function to use (as a string), and the second argument as an
 * optional object describing the parameters to pass to the function.
 *
 * For instance, `rxPathParams` is used to check if a particular parameter is
 * present in the current route. The syntax is as follows:
 *
 * <pre>
 * "visibility": ["rxPathParams", { "param": "accountNumber" }],
 * </pre>
 *
 * This means "only show this item if `accountNumber` is present in the current route.
 *
 * `rxPathParams` is typically used with `childVisibility`, not `visibility`. For
 * instance, the `Account` section in Encore will by default show a search directive
 * (discussed later), and none of its children are visible. After entering a search
 * term, an account number is found, and inserted into the route. At that point,
 * all of the children under `Account` will be visible, as they all require an
 * `accountNumber` to correctly operate.
 *
 * ### `childHeader` (optional)
 *
 * The `childHeader` attribute is used to specify an HTML header to be placed
 * above the `children` in an expanded area (and thus having a `childHeader`
 * attribute requires having a `children` attribute).
 *
 * `childHeader` receives HTML content as a string, and uses
 * {@link utilities.directive:rxCompile} to compile and insert the content above
 * the `children` items. The compiled content will be linked against the current
 * scope, allowing you to do things like:
 *
 * <pre>
 * {
 *     "title": "Section 1",
 *     "type": "highlight",
 *     "childHeader": "<strong>Current Account:</strong>#{{route.current.pathParams.accountNumber}}",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about",
 *             "key": "about",
 *             "linkText": "About"
 *         }, {
 *            "linkText": "People",
 *            "children": [
 *                 {
 *                     "href": "/people/bob",
 *                     "linkText": "Bob"
 *                 }, {
 *                     "href": "/people/sue",
 *                     "linkText": "Sue"
 *                 }
 *             ]
 *         }
 *     ]
 * }
 * </pre>
 *
 * This example will pull the `accountNumber` from the `pathParams`, and insert
 * `Current Account: 1234` above the children.
 *
 *
 *
 * ### `roles` (optional)
 *
 * *Note*: Support for `roles` requires at least version 1.19.0 of EncoreUI.
 *
 * In addition to the `visibility` criteria described above, you can also restrict
 * which items are shown to a user based on the LDAP roles of that user. This is
 * done via the `roles` attribute, which takes a single object as its value. This
 * object can be used to specify that a user requires _all_ roles from a certain
 * set, or _any_ role from a certain set, to see an item. For example:
 *
 * <pre>
 * {
 *     "title": "Section 1",
 *     "type": "highlight",
 *     "childHeader": "<strong>Current Account:</strong>#{{route.current.pathParams.accountNumber}}",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about",
 *             "key": "about",
 *             "linkText": "About"
 *         }, {
 *             "linkText": "People",
 *             "children": [
 *                 {
 *                     "href": "/people/bob",
 *                     "linkText": "Bob",
 *                     "roles": { "all": ["role1", "role2"] }
 *                 }, {
 *                     "href": "/people/sue",
 *                     "linkText": "Sue",
 *                     "roles": { "any": ["role1", "role2", "role3"] }
 *                 }
 *
 *             ]
 *         }
 *     ]
 * }
 * </pre>
 *
 * In this example, the `Bob` item can only be seen by users who have _both_ `role1`
 * and `role2` in their LDAP roles, while the `Sue` item can only be seen by users
 * who have _at least one_ of `role1`, `role2`, or `role3`. Please keep in mind that you
 * [can't do real security in front-end JavaScript](https://goo.gl/wzuhxO).
 * Do not rely on `roles` as a security feature. `roles` is purely to enhance user
 * experience, to prevent them from seeing items that they won't have permissions
 * to access anyway. All the data is still sent to the browser. A user who knows
 * how to use the dev tools will be able to see the full list. LDAP role-based
 * security must still happen on the server-side.
 *
 *
 * ### `directive` (optional)
 * The optional `directive` attribute receives the name of a directive in its
 * dash-delimited format (i.e. uses `"rx-account-search"` instead of `"rxAccountSearch"`).
 * If this directive is available, then the navigation menu will have that directive
 * inserted and rendered directly under the `linkText` for the nav item.
 *
 * The most important line in the previous paragraph is `If this directive is
 * available...`. Let's say we add a new `Support` item to the nav, where each
 * of its children are supposed to render its own custom search directive:
 *
 * <pre>
 * {
 *     "linkText": "Support",
 *     "children": [
 *         {
 *             "linkText": "People Support",
 *             "directive": "people-search"
 *         }, {
 *             "linkText": "Machine Support",
 *             "directive": "machine-search"
 *         }
 *     ]
 * }
 * </pre>
 *
 * The _intent_ is that when the user clicks on "Support", the menu will expand
 * to show "People Support" and "Machine Support" child items, and each will
 * contain a search box, defined by the `people-search` and `machine-search`
 * directives, respectively.
 *
 * But where do those directives come from? `rxApp` provides some legacy
 * directives that are available to the nav, including `rxAppSearch`,
 * `rxAccountUsers`, etc. But `people-search` does not come from `rxApp`. And
 * recall from the `href` section that the nav might be defining multiple
 * different Angular applications. What if "Support" is defined in your
 * application, ad that's where `people-search` comes from, but the user is
 * currently in a different application? That different application won't have
 * `people-search` defined anywhere, so when the user clicks on "Support", the
 * directives won't be available.
 *
 * The solution to this is to ensure that these elements with directives _also_
 * have an `href`, and those URLs belong to Angular applications that define those
 * directives. i.e.
 *
 * <pre>
 * {
 *     "linkText": "Support",
 *     "key": "support",
 *     "children": [
 *         {
 *             "linkText": "People Support",
 *             "directive": "people-search",
 *             "href": "/support/people-support",
 *         }, {
 *             "linkText": "Machine Support",
 *             "directive": "machine-search",
 *             "href": "/support/machine-support",
 *         }
 *     ]
 * }
 * </pre>
 *
 * In fact, recall that we said all items _must_ have one of `href` or `children`,
 * so the `href` is necessary anyway. But they key here is that by having an `href`,
 * the browser will navigate to `/support/people-support` / `/support/machine-support`,
 * which should be defined in Angular apps that have `people-search` and `machine-search`
 * available as directives.
 *
 * With this configuration, clicking on `Support` will expand the `children`,
 * and the user will see `People Support` and `Machine Support`, but they will
 * not see the directives. But if they then click on one of `People Support` or
 * `Machine Support`, then the `/support` Angular application will be loaded,
 * the and the directives will become available.
 *
 * @param {Object} items Menu items to display. See encoreNav for object definition
 * @param {String} level Level in heirarchy in page. Higher number is deeper nested
 *
 * @example
 * <pre>
 * <rx-app-nav level="1" items="menuItems"></rx-app-nav>
 * </pre>
 */
.directive('rxAppNav', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppNav.html',
        scope: {
            items: '=',
            level: '='
        }
    };
});
