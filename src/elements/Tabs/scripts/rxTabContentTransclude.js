angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTabContentTransclude
 * @requires elements.directive:rxTabset
 * @restrict A
 * @description
 * Element for transcluding tab content.
 */
.directive('rxTabContentTransclude', function () {
    function isTabHeading (node) {
        return node.tagName && (
            node.hasAttribute('rx-tab-heading') ||
            node.hasAttribute('data-rx-tab-heading') ||
            node.hasAttribute('x-rx-tab-heading') ||
            node.tagName.toLowerCase() === 'rx-tab-heading' ||
            node.tagName.toLowerCase() === 'data-rx-tab-heading' ||
            node.tagName.toLowerCase() === 'x-rx-tab-heading'
      );
    }

    return {
        restrict: 'A',
        require: '^rxTabset',
        link: function (scope, elm, attrs) {
            var tab = scope.$eval(attrs.rxTabContentTransclude);
            //Now our tab is ready to be transcluded: both the tab heading area
            //and the tab content area are loaded.  Transclude 'em both.
            tab.$transcludeFn(tab.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    if (isTabHeading(node)) {
                        //Let tabHeadingTransclude know.
                        tab.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        }
    };
});
