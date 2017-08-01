angular.module('encore.ui.rxApp')
/**
 * @ngdoc directive
 * @name rxApp.directive:rxPage
 * @restrict E
 * @scope
 * @description
 *
 * Responsible for creating the HTML necessary for a page (including breadcrumbs
 * and page title) You can pass in a `title` attribute or an `unsafeHtmlTitle`
 * attribute, but not both. Use the former if your title is a plain string, use
 * the latter if your title contains embedded HTML tags AND you trust the source
 * of this title. Arbitrary javascript can be executed, so ensure you trust your
 * source.
 *
 * The document title will be set to either `title` or a stripped version of
 * `unsafeHtmlTitle`, depending on which you provide.
 *
 * You'll likely want to use the {@link rxApp.directive:rxPage rxPage} directive
 * inside your template view. For example, inside a 'myView.html' file:
 *
 * <pre>
 * <rx-page title="'Example Page'">
 *    Here is my content
 * </rx-page>
 * </pre>
 *
 * `rx-page` is used to create a common wrapper for specific page views. It
 * automatically adds the breadcrumbs and page title/subtitle (if specified),
 * along with the correct styling.
 *
 * Both the `title` and `subtitle` attributes accept an Angular expression,
 * which can be a string (shown in the previous example) or a scope property.
 * This string/property can accept other expressions, enabling you to build
 * custom titles. The demo has an example of this usage.
 *
 * If you wish to use arbitrary HTML in your title, you can use the
 * `unsafe-html-title` attribute instead of `title`. This is considered "unsafe"
 * because it is capable of executing arbitrary Javascript, so you must ensure
 * that you trust the source of the title. The "Customized Page Title" in the
 * demo shows the use of HTML tags.
 *
 * In either case (`title` or `unsafe-html-title`), the document title
 * (i.e. visible in the browser tab) will be set to your chosen title. If you
 * use `unsafe-html-title`, all HTML tags will be stripped before setting the
 * document title.
 *
 * ### Account Info below Breadcrumbs
 *
 * `rxPage` integrates with the {@link elements.directive:rxAccountInfo rxAccountInfo}
 * component, to draw the Account Info box directly underneath the
 * `rxBreadcrumbs`. This is opt-in. By default, it will not appear. To enable it,
 * pass the `account-number="..."` attribute to `<rx-page>` in your template, i.e
 *
 * <pre>
 * <rx-page account-number="{{ accountNumber }}">
 * </pre>
 *
 * As noted in {@link elements.directive:rxAccountInfo rxAccountInfo}, this
 * directive requires that `SupportAccount`, `Encore` and `Teams` services are
 * available to the Angular Dependency Injection system. These are *not*
 * provided by EncoreUI, but are available in an internal Rackspace repository.
 *
 *
 * ### Status tags
 *
 * A final attribute that `rx-page` accepts is `status`. This takes a string,
 * and has the effect of drawing a status "tag" beside the page title.
 * The "Customized rxApp" demo shows the use of this with the `"alpha"` tag.
 *
 * The framework currently provides `"alpha"` and `"beta"` tags, but any product
 * can specify their own custom tags using the `rxStatusTagsProvider`. It
 * currently has one method, `addStatus`, which takes an unique `key` for the
 * new tag, the `class` it should use in the HTML, and the `text` that will be
 * drawn. All custom tags are drawn inside of a `<span>`, essentially as:
 *
 * <pre>
 * <span class="status-tag {{ class }}">{{ text }}</span>
 * </pre>
 *
 * To use this, do the following in your application's `.config()` method:
 *
 * <pre>
 * rxStatusTagsProvider.addStatus({
 *     key: 'gamma',
 *     class: 'alpha-status',
 *     text: 'Hello World!'
 * });
 * </pre>
 *
 * This will create a new status tag called `"gamma"`, which you can pass to
 * `rx-page` as:
 *
 * <pre>
 * <rx-page title="'Some Title'" status="gamma">
 * </pre>
 *
 * And the title will appear with a `Hello World!` tag beside it, styled the
 * same way as our `"alpha"` status tag is styled. You can also define your own
 * CSS style in your application and use those instead, passing it as the `class`
 * value to `addStatus()`.
 *
 * All the tags are accessible inside of {@link elements.directive:rxBreadcrumbs rxBreadcrumbs}
 * as well. Any breadcrumb that was created with `useStatusTag: true` will
 * automatically receive the same status tag as you passed to `<rx-page>`.
 *
 * ### .page-actions
 *
 * A `page-actions` class is provided by rx-app to easily add custom page actions
 * to the top right of a page. For example:
 *
 * <pre>
 * <rx-page title="'Servers Overview'">
 *    <div class="page-actions">
 *        <a href="/create" class="link-action msg-action">Create New Server</a>
 *    </div>
 *    <img src="http://cdn.memegenerator.net/instances/500x/48669250.jpg"
 *         alt="Look at all these servers there are so many" />
 * </rx-page>
 * </pre>
 *
 * @param {String} title Title of page
 * @param {String} unsafeHtmlTitle Title for the page, with embedded HTML tags
 * @param {String=} subtitle Subtitle of page
 *
 * @example
 * <pre>
 * <rx-page title="'Page Title'"></rx-page>
 * </pre>
 */
.directive('rxPage', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxPage.html',
        scope: {
            title: '=',
            unsafeHtmlTitle: '=',
            subtitle: '=',
            status: '@',
            accountNumber: '@',
            teamId: '@'
        },
        link: function (scope, element) {
            // Remove the title attribute, as it will cause a popup to appear when hovering over page content
            // @see https://github.com/rackerlabs/encore-ui/issues/251
            element.removeAttr('title');

            var pageDiv = element[0];
            var pageBodyDiv = pageDiv.querySelector('.page-content');

            // Move the specified attribute from rxPage div to page-body div
            function moveLayoutAttrib (attr) {

                // Only apply to attributes that start with 'layout'
                if (!_.isString(attr.name) || !attr.name.match(/^layout/)) {
                    return;
                }

                pageBodyDiv.setAttribute(attr.name, pageDiv.getAttribute(attr.name));
                pageDiv.removeAttribute(attr.name);
            }

            // Relocate all layout attributes
            var i = pageDiv.attributes.length;
            while (i--) {
                moveLayoutAttrib(pageDiv.attributes[i]);
            }
        },
        controller: function ($scope, rxPageTitle) {
            $scope.$watch('title', function () {
                rxPageTitle.setTitle($scope.title);
            });

            $scope.$watch('unsafeHtmlTitle', function () {
                if (!_.isEmpty($scope.unsafeHtmlTitle)) {
                    rxPageTitle.setTitleUnsafeStripHTML($scope.unsafeHtmlTitle);
                }
            });
        }
    };
});
