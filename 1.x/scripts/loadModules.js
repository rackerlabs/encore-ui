angular.module('demoApp')
.value('Modules', [
    {
        "name": "elements",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "description": "",
        "stability": "experimental",
        "keywords": [],
        "displayName": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": true,
        "srcFiles": [
            "src/elements/elements.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "",
            "less": ""
        }
    },
    {
        "name": "utilities",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "description": "",
        "stability": "experimental",
        "keywords": [],
        "displayName": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": true,
        "srcFiles": [
            "src/utilities/utilities.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "",
            "less": ""
        }
    },
    {
        "displayName": "layout",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "layout",
        "moduleName": "'encore.ui.layout'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/layout/layout.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>Encore UI includes a grid system forked from <a href=\"https://material.angularjs.org/#/layout/container\">Angular Material&#39;s layout module</a>\nwith minor usability enhancements to provide an assortment of attribute-based layout options based on the flexbox layout model.\nIncluded are intuitive attribute based styles that ease the creation of responsive row and/or column based page layouts.</p>\n",
            "js": "angular.module('demoApp')\n.controller('layoutController', function ($scope) {\n    $scope.layout = 'row';\n    $scope.align = { first: 'center', second: 'middle' };\n    $scope.options1 = ['left', 'center', 'right', 'spread', 'justify'];\n    $scope.options2 = ['top', 'middle', 'bottom', 'stretch'];\n\n    // Swap the first 3 items in each array and set new value\n    $scope.swap = function (option) {\n\n        if ($scope.layout === option) {\n            return;\n        }\n\n        var swap = $scope.options2.slice(0, 3).concat($scope.options1.slice(3));\n        $scope.options2 = $scope.options1.slice(0, 3).concat($scope.options2.slice(3));\n        $scope.options1 = swap;\n        swap = $scope.options1[$scope.options1.indexOf($scope.align.second)] || 'spread';\n        $scope.align.second = $scope.options2[$scope.options2.indexOf($scope.align.first)] || 'stretch';\n        $scope.align.first = swap;\n    };\n});\n",
            "html": "<div class=\"layout-demo\">\n\n    <!-- Overview -->\n    <a id=\"Overview\"></a>\n\n    <h2>Overview</h2>\n\n    <p>Angular Material's responsive CSS layout is built \n    on <a href=\"http://www.w3.org/TR/css3-flexbox/\" target=_blank>flexbox.</a></p>\n\n    <p>The layout system is based upon element attributes rather than CSS classes. Attributes provide an easy way to \n    set a value (eg <code>layout=\"row\"</code>) and help separate concerns: attributes define layout, and classes define \n    styling.</p>\n\n\n    <!-- Layout Attribute -->\n    <a id=\"Attribute\"></a>\n\n    <h2>Layout Attribute</h2>\n\n    <p>Use the <code>layout</code> attribute on an element to arrange its children horizontally in a \n    row (<code>layout=\"row\"</code>), or vertically in a column (<code>layout=\"column\"</code>).</p>\n\n    <h3>Row Layout</h3>\n\n    <div layout=\"row\">\n      <div class=\"box dark-blue\">I'm left.</div>\n      <div class=\"box light-blue\">I'm right.</div>\n    </div>\n\n    <h3>Column Layout</h3>\n    <div layout=\"column\">\n      <div class=\"box dark-blue\">I'm above.</div>\n      <div class=\"box light-blue\">I'm below.</div>\n    </div>\n\n    <p>See <a href=\"#/components/layout#Options\">Options</a> for information on responsive layouts and other \n    options.</p>\n\n\n    <!-- Grid System-->\n    <a id=\"Grid\"></a>\n\n    <h2>Grid System</h2>\n\n    <p>To customize the size and position of elements in a layout, use the <code>flex</code>, <code>flex-offset</code>, \n    and <code>flex-order</code> attributes.</p>\n\n\n    <h3>Flex Attribute</h3>\n\n    <div layout=\"row\">\n      <div flex class=\"flex-box dark-blue\">\n        [flex]\n      </div>\n      <div flex class=\"flex-box light-blue\">\n        [flex]\n      </div>\n      <div flex class=\"flex-box dark-green\">\n        [flex]\n      </div>\n    </div>\n\n    <p>Add the <code>flex</code> attribute to a layout's child element, and it will flex (stretch) to fill the \n    available area.</p>\n\n\n    <h3>Flex Percent Values</h3>\n\n    <div layout=\"row\" layout-wrap>\n      <div flex=\"33\" class=\"flex-box dark-blue\">\n        [flex=\"33\"]\n      </div>\n      <div flex=\"55\" class=\"flex-box light-blue\">\n        [flex=\"55\"]\n      </div>\n      <div flex class=\"flex-box orange\">\n        [flex]\n      </div>\n      <div flex=\"66\" class=\"flex-box light-green\">\n        [flex=\"66\"]\n      </div>\n      <div flex=\"33\" class=\"flex-box dark-green\">\n        [flex=\"33\"]\n      </div>\n    </div>\n\n    <p>A layout child's <code>flex</code> attribute can be given an integer value from 0-100. The element will stretch \n    to the percentage of available space matching the value.</p>\n\n    <p>The <code>flex</code> attribute value is restricted to 33, 66, and multiples of five. For \n    example: <code>flex=\"5\"</code>, <code>flex=\"20\"</code>, \"<code>flex=\"33\"</code>, <code>flex=\"50\"</code>, \n    <code>flex=\"66\"</code>, <code>flex=\"75\"</code>, ....</p>\n\n    <p>See the <a href=\"#/components/layout#Options\">layout options</a> for more information on responsive flex \n    attributes.</p>\n\n    <h3>Static Flex Options</h3>\n\n    <div layout=\"row\">\n      <div flex class=\"flex-fix flex-box dark-blue\">\n        flex: 0 0 200px;\n      </div>\n      <div flex=\"55\" class=\"flex-box light-blue\">\n        [flex=\"55\"]\n      </div>\n      <div flex class=\"flex-box orange\">\n        [flex]\n      </div>\n    </div>\n\n    <p>CSS <code>flexbox</code> implementation provides the ability to define static flex items that will cooperate \n    alongside dynamic flex items.</p>\n\n    <p>A static flex item has the following property definition:</p>\n    <pre>\n    flex-grow: 0; // do not grow\n    flex-shrink: 0; // do not shrink\n    flex-basis: N; // set height/width to this value (depending on the value of flex-direction)\n\n    /* or using the shorthand */\n    flex: 0 0 N; // [ grow | shrink | basis ]\n    </pre>\n    <p><code>flex-basis</code> value may be a valid CSS <a href=\"http://www.w3.org/TR/css3-values/#lengths\">length</a> \n    or keyword.</p>\n\n    <h3>Flex Order Attribute</h3>\n\n    <div layout=\"row\" layout-margin>\n      <div flex flex-order=\"3\" class=\"flex-box dark-blue margin-left\">\n        [flex-order=\"3\"]\n      </div>\n      <div flex flex-order=\"2\" class=\"flex-box light-blue margin-right margin-left\">\n        [flex-order=\"2\"]\n      </div>\n      <div flex flex-order=\"1\" class=\"flex-box dark-green margin-right\">\n        [flex-order=\"1\"]\n      </div>\n    </div>\n\n    <p>Add the <code>flex-order</code> attribute to a layout child to set its position within the layout. Any value \n    from 0-9 is accepted.</p>\n\n    <p>Note that the <code>flex-order</code> attribute is not compatible with the <code>layout-margin</code> attribute. \n    This is because the CSS selector engine selects based on DOM markup order and the <code>layout-margin</code> \n    attribute makes use of <code>:first-child</code> and <code>:last-child</code> to apply margins to only the inner \n    elements in the container. As a work-around, <code>[flex-order].left-margin</code> and \n    <code>[flex-order].right-margin</code> classes are availabe to manually add margins. The most likely use cases for \n    these classes is for programmatic ordering of children.</p>\n\n    <table>\n        <tr>\n            <td>flex-order</td>\n            <td>Sets element order.</td>\n        </tr>\n        <tr>\n            <td>flex-order-sm </td>\n            <td>Sets element order on devices less than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-order-gt-sm</td>\n            <td>Sets element order on devices greater than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-order-md</td>\n            <td>Sets element order on devices between 600px and 960px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-order-gt-md</td>\n            <td>Sets element order on devices greater than 960px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-order-lg</td>\n            <td>Sets element order on devices between 960px and 1200px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-order-gt-lg</td>\n            <td>Sets element order on devices greater than 1200px wide.</td>\n        </tr>\n    </table>\n\n\n    <h3>Flex Offset Attribute</h3>\n\n    <div layout=\"row\">\n      <div flex flex-offset=\"33\" class=\"flex-box dark-blue\">\n        [flex offset=\"33\"]\n      </div>\n      <div flex class=\"flex-box light-blue\">\n        [flex]\n      </div>\n    </div>\n\n    <p>Add the <code>offset</code> attribute to a layout child to set its offset percentage within the layout. \n    Values must be multiples of <code>5</code>, or <code>33</code>, <code>34</code>, <code>66</code>, \n    <code>67</code>.</p>\n\n    <table>\n    <tr>\n        <td>offset</td>\n        <td>Sets element offset.</td>\n    </tr>\n    <tr>\n        <td>offset-sm</td>\n        <td>Sets element offset on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n        <td>offset-gt-sm</td>\n        <td>Sets element offset on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n        <td>offset-md</td>\n        <td>Sets element offset on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n        <td>offset-gt-md</td>\n        <td>Sets element offset on devices greater than 960px wide.</td>\n    </tr>\n    <tr>\n        <td>offset-lg</td>\n        <td>Sets element offset on devices between 960px and 1200px wide.</td>\n    </tr>\n    <tr>\n        <td>offset-gt-lg</td>\n        <td>Sets element offset on devices greater than 1200px wide.</td>\n    </tr>\n    </table>\n\n\n    <!-- Child Alignment -->\n    <a id=\"ChildAlignment\"></a>\n\n    <h2>Child Alignment</h2>\n\n    <p>The <code>layout-align</code> attribute takes two parameters in any order. Parameters <code>top</code>, \n    <code>middle</code>, <code>bottom</code>, <code>left</code>, <code>right</code>, and <code>center</code> determine \n    the alignment of child elements and may be combined in sensible ways (ie <code>top left</code> works but \n    <code>top bottom</code> would not).</p>\n\n    <p>Parameters <code>stretch</code>, <code>justify</code>, and <code>spread</code> determine the justification of \n    child elements. <code>Stretch</code> grows child elements perpendicular to layout axis (ie <code>layout=\"row\"</code> \n    stretches up and down). <code>Justify</code> and <code>spread</code> space out child elements evenly perpendicular \n    to layout axis either with or without side padding, respectively</p>\n\n    <p>Only one parameter is required for the attribute. For example, <code>layout=\"row\" layout-align=\"center\"</code> \n    would make the elements center horizontally and use the default behavior vertically.\n\n    <p><code>layout=\"column\" layout-align=\"right middle\"</code> would align children along the center vertically and \n    along the right horizontally.</p>\n\n    <table>\n        <tr>\n            <td>layout-align</td>\n            <td>Sets child alignment.</td>\n        </tr>\n        <tr>\n            <td>layout-align-sm</td>\n            <td>Sets child alignment on devices less than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>layout-align-gt-sm</td>\n            <td>Sets child alignment on devices greater than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>layout-align-md</td>\n            <td>Sets child alignment on devices between 600px and 960px wide.</td>\n        </tr>\n        <tr>\n            <td>layout-align-gt-md</td>\n            <td>Sets child alignment on devices greater than 960px wide.</td>\n        </tr>\n        <tr>\n            <td>layout-align-lg</td>\n            <td>Sets child alignment on devices between 960px and 1200px wide.</td>\n        </tr>\n        <tr>\n            <td>layout-align-gt-lg</td>\n            <td>Sets child alignment on devices greater than 1200px wide.</td>\n        </tr>\n    </table>\n\n    <div ng-controller=\"layoutController\">\n        <p>See below for more examples: \n        <code>layout=\"{{layout}}\" layout-align=\"{{align.first}} {{align.second}}\"</code></p>\n\n        <div layout=\"{{layout}}\" layout-align=\"{{align.first}} {{align.second}}\" class=\"small-box-container\">\n          <div class=\"small-box light-blue\">one</div>\n          <div class=\"small-box dark-blue\">two</div>\n          <div class=\"small-box light-green\">three</div>\n        </div>\n\n        <div class=\"layout-examples\" layout=\"row\" layout-align=\"top spread\">\n\n            <div layout=\"column\">\n                <span>Layout Direction</span>\n                <label>\n                    <input type=\"radio\" ng-model=\"layout\" value=\"row\" ng-click=\"swap('row')\"> row\n                </label>\n\n                <label>\n                    <input type=\"radio\" ng-model=\"layout\" value=\"column\" ng-click=\"swap('column')\"> column\n                </label>\n            </div>\n\n            <div layout=\"column\">\n                <span>Alignment in Layout Direction</span>\n\n                <label ng-repeat=\"option in options1\" for=\"{{align1}}\">\n                    <input type=\"radio\" name=\"align1\" ng-model=\"align.first\" ng-value=\"option\"> {{option}}\n                </label>\n            </div>\n\n            <div layout=\"column\">\n                <span>Alignment in Perpendicular Direction</span>\n\n                <label ng-repeat=\"option in options2\" for=\"{{align2}}\">\n                    <input type=\"radio\" name=\"align2\" ng-model=\"align.second\" ng-value=\"option\"> {{option}}\n                </label>\n            </div>\n        </div>\n    </div>\n\n\n    <!-- Options -->\n    <a id=\"Options\"></a>\n\n    <h2>Options</h2>\n\n    <h3>Responsive Layout</h3>\n\n    <div layout=\"row\" layout-sm=\"column\">\n      <div flex class=\"grow-box dark-blue\">\n        I'm above on mobile, and to the left on larger devices.\n      </div>\n      <div flex class=\"grow-box light-blue\">\n        I'm below on mobile, and to the right on larger devices.\n      </div>\n    </div>\n\n    <p>See the <a href=\"#/components/layout#Attribute\">Attribute</a> section for a basic explanation of layout \n    attributes.</p>\n    <p>To make your layout change depending upon the device size, there are other <code>layout</code> attributes \n    available:</p>\n\n    <table>\n        <tr>\n            <td>layout</td>\n            <td>Sets the default layout on all devices.</td>\n        </tr>\n        <tr>\n            <td>layout-sm</td>\n            <td>Sets the layout on devices less than 600px wide (phones).</td>\n        </tr>\n        <tr>\n            <td>layout-gt-sm</td>\n            <td>Sets the layout on devices greater than 600px wide (bigger than phones).</td>\n        </tr>\n        <tr>\n            <td>layout-md</td>\n            <td>Sets the layout on devices between 600px and 960px wide (tablets in portrait).</td>\n        </tr>\n        <tr>\n            <td>layout-gt-md</td>\n            <td>Sets the layout on devices greater than 960px wide (bigger than tablets in portrait).</td>\n        </tr>\n        <tr>\n            <td>layout-lg</td>\n            <td>Sets the layout on devices between 960 and 1200px wide (tablets in landscape).</td>\n        </tr>\n        <tr>\n            <td>layout-gt-lg</td><td>Sets the layout on devices greater than 1200px wide (computers and large \n            screens).</td>\n        </tr>\n    </table>\n\n\n    <h3>Layout Margin, Padding, and Fill</h3>\n\n    <div layout=\"row\" layout-margin layout-fill layout-padding>\n      <div flex class=\"grow-box dark-blue\">I'm on the left, and there's an empty area around me.</div>\n      <div flex class=\"grow-box light-blue\">I'm on the right, and there's an empty area around me.</div>\n    </div>\n\n    <p><code>layout-margin</code> adds margin around each <code>flex</code> child. It also adds a margin to the layout \n    container itself.</p>\n    <p><code>layout-padding</code> adds padding inside each <code>flex</code> child. It also adds padding to the layout \n    container itself.</p>\n    <p><code>layout-fill</code> forces the layout element to fill its parent container.</p>\n\n\n    <h3>Wrap</h3>\n\n    <div layout=\"row\" layout-wrap>\n      <div flex=\"33\" class=\"grow-box dark-blue\">[flex=33]</div>\n      <div flex=\"66\" class=\"grow-box light-blue\">[flex=66]</div>\n      <div flex=\"66\" class=\"grow-box light-green\">[flex=66]</div>\n      <div flex=\"33\" class=\"grow-box dark-green\">[flex=33]</div>\n    </div>\n\n    <p><code>layout-wrap</code> allows <code>flex</code> children to wrap within the container if the elements use \n    more than 100%. By default, flex elements do not wrap.</p>\n\n\n    <h3>Responsive Flex &amp; Offset Attributes</h3>\n\n    <div layout=\"row\">\n      <div flex=\"66\" flex-sm=\"33\" class=\"grow-box dark-blue\">\n        I flex to one-third of the space on mobile, and two-thirds on other devices.\n      </div>\n      <div flex=\"33\" flex-sm=\"66\" class=\"grow-box light-blue\">\n        I flex to two-thirds of the space on mobile, and one-third on other devices.\n      </div>\n    </div>\n\n    <p>See the <a href=\"#/components/layout#Grid\">Grid</a> section for a basic explanation of flex and offset \n    attributes.</p>\n\n    <table>\n        <tr>\n            <td>flex</td>\n            <td>Sets flex.</td>\n        </tr>\n        <tr>\n            <td>flex-sm</td>\n            <td>Sets flex on devices less than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-gt-sm</td>\n            <td>Sets flex on devices greater than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-md</td>\n            <td>Sets flex on devices between 600px and 960px wide..</td>\n        </tr>\n        <tr>\n            <td>flex-gt-md</td>\n            <td>Sets flex on devices greater than 960px wide.</td>\n        </tr>\n        <tr>\n            <td>flex-lg</td>\n            <td>Sets flex on devices between 960px and 1200px.</td>\n        </tr>\n        <tr>\n            <td>flex-gt-lg</td>\n            <td>Sets flex on devices greater than 1200px wide.</td>\n        </tr>\n    </table>\n\n\n    <h3>Hide and Show Attributes</h3>\n\n    <div layout layout-align=\"center center\" class=\"small-box-container\">\n      <div hide-sm class=\"grow-box dark-blue\">\n        I'm hidden on mobile and shown on larger devices.\n      </div>\n      <div hide-gt-sm class=\"grow-box dark-green\">\n        I'm shown on mobile and hidden on larger devices.\n      </div>\n    </div>\n\n    <table>\n        <tr>\n            <td>hide</td>\n            <td><code>display: none</code></td>\n        </tr>\n        <tr>\n            <td>hide-sm</td>\n            <td><code>display: none</code> on devices less than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>hide-gt-sm</td>\n            <td><code>display: none</code> on devices greater than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>hide-md</td>\n            <td><code>display: none</code> on devices between 600px and 960px wide.</td>\n        </tr>\n        <tr>\n            <td>hide-gt-md</td>\n            <td><code>display: none</code> on devices greater than 960px wide.</td>\n        </tr>\n        <tr>\n            <td>hide-lg</td>\n            <td><code>display: none</code> on devices between 960px and 1200px.</td>\n        </tr>\n        <tr>\n            <td>hide-gt-lg</td>\n            <td><code>display: none</code> on devices greater than 1200px wide.</td>\n        </tr>\n        <tr>\n            <td>show</td>\n            <td>Negates hide.</td>\n        </tr>\n        <tr>\n            <td>show-sm</td>\n            <td>Negates hide on devices less than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>show-gt-sm</td>\n            <td>Negates hide on devices greater than 600px wide.</td>\n        </tr>\n        <tr>\n            <td>show-md</td>\n            <td>Negates hide on devices between 600px and 960px wide..</td>\n        </tr>\n        <tr>\n            <td>show-gt-md</td>\n            <td>Negates hide on devices greater than 960px wide.</td>\n        </tr>\n        <tr>\n            <td>show-lg</td>\n            <td>Negates hide on devices between 960px and 1200px.</td>\n        </tr>\n        <tr>\n            <td>show-gt-lg</td>\n            <td>Negates hide on devices greater than 1200px wide.</td>\n        </tr>\n    </table>\n</div>\n",
            "less": "// Adapted from https://github.com/angular/material/commits/master/src/core/style/layout.scss\n// commit 4216d242d78f1bdadd89ebd59e1d80b9cc4f2978\n\n@import 'mixins';\n@import 'vars';\n\n/*\n * Layout\n */\n\n[layout] {\n  .box-sizing(border-box);\n  display: flex;\n}\n\n[layout=\"column\"] {\n  flex-direction: column;\n}\n\n[layout=\"row\"] {\n  flex-direction: row;\n}\n\n[layout-padding],\n[layout-padding] > [flex] {\n  padding: @layout-gutter-width / 2;\n}\n\n[layout-wrap] {\n  flex-wrap: wrap;\n}\n\n[layout-fill] {\n  margin: 0;\n  min-height: 100%;\n  width: 100%;\n}\n@-moz-document url-prefix() {\n  [layout-fill] {\n    margin: 0;\n    width: 100%;\n    min-height: auto;\n    height: inherit;\n  }\n}\n\n\n// Used to concatenate selectors with '-' delimiter or without if no value provided\n// Only works for variable name @selector\n.concat-selector(@base, @value) when not (@value = null) {\n  @selector: ~'@{base}-@{value}';\n}\n.concat-selector(@base, @value) when (@value = null) {\n  @selector: ~'@{base}';\n}\n\n\n// Vertical and horizontal margins, except on outside and on flex-ordered elements\n.layout-margin-for-name(@divisor, @suffix: null) {\n  .concat-selector('flex', @suffix);\n  [layout-margin] > [@{selector}]:not([flex-order])  {\n    margin: (@layout-gutter-width / @divisor);\n    &:first-child { margin-left: 0; }\n    &:last-child { margin-right: 0; }\n  }\n}\n\n\n.flex-order-for-name(@suffix: null) {\n  .concat-selector('flex-order', @suffix);\n  [@{selector}].margin-right {\n    margin-right: @layout-gutter-width / 2;\n  }\n  [@{selector}].margin-left {\n    margin-left: @layout-gutter-width / 2;\n  }\n  .loop (@i) when (@i < 10) {\n    [@{selector}=\"@{i}\"] { order: @i; }\n    .loop (@i + 1);\n  }\n  .loop (0);\n}\n\n.layout-for-name(@name) {\n  @selector: ~'layout-@{name}';\n  [@{selector}] {\n    .box-sizing(border-box);\n    display: flex;\n  }\n  [@{selector}=\"column\"] {\n    flex-direction: col;\n  }\n  [@{selector}=\"row\"] {\n    flex-direction: row ;\n  }\n}\n\n.offset-for-name(@suffix: null) {\n  .concat-selector('flex-offset', @suffix);\n  .loop (@i) when (@i < 20) {\n    @offset: @i * 5;\n    [@{selector}=\"@{offset}\"] {\n      margin-left: ~\"@{offset}%\";\n    }\n    .loop (@i + 1);\n  }\n  .loop (1);\n\n  [@{selector}=\"33\"], [@{selector}=\"34\"] {\n    margin-left: 33.33%;\n  }\n  [@{selector}=\"66\"], [@{selector}=\"67\"] {\n    margin-left: 66.66%;\n  }\n}\n\n\n.flex-properties-for-name(@suffix: null) {\n  .concat-selector('flex', @suffix);\n\n  [@{selector}] {\n    .box-sizing(border-box);\n    flex: 1;\n  }\n\n  // (0-20) * 5 = 0-100%\n  .loop (@i) when (@i < 21) {\n    @flex: @i * 5;\n    [@{selector}=\"@{flex}\"] {\n      flex: 0 0 ~'@{flex}%';\n    }\n    [layout=\"row\"] > [@{selector}=\"@{flex}\"] {\n      max-width: ~'@{flex}%';\n    }\n    [layout=\"column\"] > [@{selector}=\"@{flex}\"] {\n      max-height: ~'@{flex}%';\n    }\n    .loop (@i + 1);\n  }\n  .loop (0);\n\n  [@{selector}=\"33\"], [@{selector}=\"34\"] {\n    flex: 0 0 33.33%;\n  }\n  [@{selector}=\"66\"], [@{selector}=\"67\"] {\n    flex: 0 0 66.66%;\n  }\n\n  [layout=\"row\"] {\n    > [@{selector}=\"33\"], > [@{selector}=\"34\"] {\n      max-width: 33.33%;\n    }\n    > [@{selector}=\"66\"], > [@{selector}=\"67\"] {\n      max-width: 66.66%;\n    }\n  }\n  [layout=\"column\"] {\n    > [@{selector}=\"33\"], > [@{selector}=\"34\"] {\n      max-height: 33.33%;\n    }\n    > [@{selector}=\"66\"], > [@{selector}=\"67\"] {\n      max-height: 66.66%;\n    }\n  }\n}\n\n\n.layout-align-for-name(@suffix: null) {\n  .concat-selector('layout', @suffix);\n\n  [@{selector}=\"row\"] {\n    .concat-selector('layout-align', @suffix);\n\n    &[@{selector}~=\"left\"]    { justify-content: flex-start; }\n    &[@{selector}~=\"center\"]  { justify-content: center; }\n    &[@{selector}~=\"right\"]   { justify-content: flex-end; }\n    &[@{selector}~=\"justify\"] { justify-content: space-between; }\n    &[@{selector}~=\"spread\"]  { justify-content: space-around; }\n\n    &[@{selector}~=\"top\"]     { align-items: flex-start; }\n    &[@{selector}~=\"middle\"]  { align-items: center; }\n    &[@{selector}~=\"bottom\"]  { align-items: flex-end; }\n    &[@{selector}~=\"stretch\"] { align-items: stretch; }\n  }\n\n  [@{selector}=\"column\"] {\n    .concat-selector('layout-align', @suffix);\n\n    &[@{selector}~=\"top\"]     { justify-content: flex-start; }\n    &[@{selector}~=\"middle\"]  { justify-content: center; }\n    &[@{selector}~=\"bottom\"]  { justify-content: flex-end; }\n    &[@{selector}~=\"justify\"] { justify-content: space-between; }\n    &[@{selector}~=\"spread\"]  { justify-content: space-around; }\n\n    &[@{selector}~=\"left\"]    { align-items: flex-start; }\n    &[@{selector}~=\"center\"]  { align-items: center; }\n    &[@{selector}~=\"right\"]   { align-items: flex-end; }\n    &[@{selector}~=\"stretch\"] { align-items: stretch; }\n  }\n}\n\n// Flex attributes for layout children\n// ------------------------------\n\n.layout-margin-for-name(2);\n.flex-properties-for-name();\n.layout-align-for-name();\n.flex-order-for-name();\n.offset-for-name();\n\n// Adapted from https://github.com/angular/material/commits/master/src/core/style/layout.scss\n// commit 4216d242d78f1bdadd89ebd59e1d80b9cc4f2978\n\n/*\n * Responsive attributes\n */\n\n[layout-padding] {\n  & > [flex-sm],\n  & > [flex-lt-md] {\n    padding: @layout-gutter-width / 4;\n  }\n\n  & > [flex-gt-sm],\n  & > [flex-md],\n  & > [flex-lt-lg] {\n    padding: @layout-gutter-width / 2;\n  }\n\n  & > [flex-gt-md],\n  & > [flex-lg] {\n    padding: @layout-gutter-width / 1;\n  }\n}\n\n.layout-margin-for-name(4, sm);\n.layout-margin-for-name(4, lt-md);\n.layout-margin-for-name(2, gt-sm);\n.layout-margin-for-name(2, md);\n.layout-margin-for-name(2, lt-lg);\n.layout-margin-for-name(1, gt-md);\n.layout-margin-for-name(1, lg);\n\n\n/**\n * `hide-gt-sm show-gt-lg` should hide from 600px to 1200px\n * `show-md hide-gt-sm` should show from 0px to 960px and hide at > 960px\n * `hide-gt-md show-gt-sm` should show everywhere (show overrides hide)`\n */\n\n\n// SMALL SCREEN\n@media (max-width: (@layout-breakpoint-sm - 1)) {\n  [hide-sm],\n  [hide] {\n    &:not([show-sm]):not([show]) {\n      display: none;\n    }\n  }\n\n  .flex-order-for-name(sm);\n  .layout-align-for-name(sm);\n  .layout-for-name(sm);\n  .offset-for-name(sm);\n  .flex-properties-for-name(sm);\n}\n\n// BIGGER THAN SMALL SCREEN\n@media (min-width: @layout-breakpoint-sm) {\n  .flex-order-for-name(gt-sm);\n  .layout-align-for-name(gt-sm);\n  .layout-for-name(gt-sm);\n  .offset-for-name(gt-sm);\n  .flex-properties-for-name(gt-sm);\n}\n\n// MEDIUM SCREEN\n@media (min-width: @layout-breakpoint-sm) and (max-width: (@layout-breakpoint-md - 1)) {\n  [hide],\n  [hide-gt-sm] {\n    &:not([show-gt-sm]):not([show-md]):not([show]) {\n      display: none;\n    }\n  }\n  [hide-md]:not([show-md]):not([show]) {\n    display: none;\n  }\n\n  .flex-order-for-name(md);\n  .layout-align-for-name(md);\n  .layout-for-name(md);\n  .offset-for-name(md);\n  .flex-properties-for-name(md);\n}\n\n// BIGGER THAN MEDIUM SCREEN\n@media (min-width: @layout-breakpoint-md) {\n  .flex-order-for-name(gt-md);\n  .layout-align-for-name(gt-md);\n  .layout-for-name(gt-md);\n  .offset-for-name(gt-md);\n  .flex-properties-for-name(gt-md);\n}\n\n// LARGE SCREEN\n@media (min-width: @layout-breakpoint-md) and (max-width: (@layout-breakpoint-lg - 1)) {\n  [hide],\n  [hide-gt-sm],\n  [hide-gt-md] {\n    &:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]) {\n      display: none;\n    }\n  }\n  [hide-lg]:not([show-lg]):not([show]) {\n    display: none;\n  }\n\n  .flex-order-for-name(lg);\n  .layout-align-for-name(lg);\n  .layout-for-name(lg);\n  .offset-for-name(lg);\n  .flex-properties-for-name(lg);\n}\n\n// BIGGER THAN LARGE SCREEN\n@media (min-width: @layout-breakpoint-lg) {\n  [hide-gt-sm],\n  [hide-gt-md],\n  [hide-gt-lg],\n  [hide] {\n    &:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]) {\n      display: none;\n    }\n  }\n\n  .flex-order-for-name(gt-lg);\n  .layout-align-for-name(gt-lg);\n  .layout-for-name(gt-lg);\n  .offset-for-name(gt-lg);\n  .flex-properties-for-name(gt-lg);\n}\n\n\n.layout-demo {\n  .base-box {\n    height: 50px;\n    color: white;\n    font-weight: bold;\n    padding: 20px;\n    text-shadow: 0 0 4px rgba(100, 100, 100, 1);\n  }\n\n  .box {\n    &:extend(.layout-demo .base-box);\n    width: 150px;\n    margin: 10px 15px;\n  }\n\n  .flex-box {\n    &:extend(.layout-demo .base-box);\n    width: auto;\n  }\n\n  .dark-blue {\n    background-color: @blue;\n  }\n  .light-blue {\n    background-color: @light-blue;\n  }\n  .dark-green {\n    background-color: @green;\n  }\n  .light-green {\n    background-color: @light-green;\n  }\n  .orange {\n    background-color: @orange;\n  }\n\n  .small-box-container {\n    width: 95%;\n    height: 300px;\n    margin: 0 auto 10px;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.6);\n  }\n\n  .small-box {\n    &:extend(.layout-demo .base-box);\n    height: auto;\n    width: auto;\n    text-align: center;\n  }\n\n  .grow-box {\n    &:extend(.layout-demo .base-box);\n    height: auto;\n  }\n\n  .layout-examples {\n    input[type=\"radio\"] {\n      margin-right: 6px;\n    }\n\n    label {\n      margin: 10px 0 0 10px;\n    }\n  }\n\n  .flex-fix {\n      flex: 0 0 200px;\n  }\n}\n"
        }
    },
    {
        "displayName": "metadata",
        "stability": "deprecated",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "metadata",
        "moduleName": "'encore.ui.metadata'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/metadata/metadata.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/metadata/templates/rxMeta.html"
        ],
        "docs": {
            "md": "<h1>NOTICE!</h1>\n<p>This feature is deprecated in favor of the <a href=\"#/components/rxMetadata\">rxMetadata</a> component and <strong>will be removed</strong> in a future release of the framework.</p>\n<p>This component provides styles and a demo for displays of metadata.</p>\n",
            "js": "",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div class=\"metadata\">\n     <dl>\n         <dt>Status:</dt>\n         <dd>Active</dd>\n         <dt>RCN:</dt>\n         <dd>RCN-555-555-555</dd>\n         <dt>Type:</dt>\n         <dd>Cloud</dd>\n         <dt>Service Level:</dt>\n         <dd>Managed &rarr; Managed</dd>\n         <dt>Service Type:</dt>\n         <dd>DevOps &rarr; SysOps</dd>\n         <dt>Plan Change Status:</dt>\n         <dd>Pending</dd>\n         <dt>Service Team:</dt>\n         <dd><a href=\"#\">Link</a></dd>\n     </dl>\n </div>\n",
            "less": "/*\n * metadata\n */\n.metadata {\n  overflow: hidden;\n  font-size: 16px;\n  color: #727272;\n  line-height: 1.6em;\n\n  dl {\n    margin: 0;\n    clear: both;\n  }\n\n  dt {\n    float: left;\n    font-weight: 700;\n    text-align: left;\n    clear: left;\n    margin-right: 1em;\n  }\n  dd {\n    font-weight: 400;\n    text-align: left;\n    margin: 0;\n    display: list-item;\n    list-style-type: none;\n    list-style-image: url(\"\");\n  }\n}\n"
        }
    },
    {
        "displayName": "rxActiveUrl",
        "stability": "deprecated",
        "description": "Adds a class name of 'selected' to an LI if the current url matches a pre-defined value",
        "isLegacy": true,
        "keywords": [],
        "name": "rxActiveUrl",
        "moduleName": "'encore.ui.rxActiveUrl'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxActiveUrl/rxActiveUrl.module.js",
            "src/components/rxActiveUrl/scripts/rxActiveUrl.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxActiveUrl/templates/rxActiveUrl.html"
        ],
        "docs": {
            "md": "<p>Adds a class name of &#39;selected&#39; to an LI if the current url matches a pre-defined value</p>\n<p><strong>THIS COMPONENT IS MARKED TO BE REMOVED IN A FUTURE RELEASE.</strong></p>\n",
            "js": "",
            "html": "<ul>\n    <rx-active-url url=\"/servers\">\n        <a href=\"/servers\">Servers</a>\n    </rx-active-url>\n    <rx-active-url url=\"/cbs\">\n        <a href=\"/cbs\">Storage</a>\n        <ul>\n            <rx-active-url url=\"/cbs/volumes\">\n                <a href=\"/cbs/volumes/\">Volumes</a>\n            </rx-active-url>\n            <rx-active-url url=\"/cbs/snapshots\">\n                <a href=\"/cbs/snapshots/\">Snapshots</a>\n            </rx-active-url>\n        </ul>\n    </rx-active-url>\n</ul>",
            "less": ""
        }
    },
    {
        "displayName": "rxApp",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxApp",
        "moduleName": "'encore.ui.rxApp'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxApp/rxApp.module.js",
            "src/components/rxApp/scripts/rxAccountSearch.js",
            "src/components/rxApp/scripts/rxAccountUsers.js",
            "src/components/rxApp/scripts/rxApp.js",
            "src/components/rxApp/scripts/rxAppNav.js",
            "src/components/rxApp/scripts/rxAppNavItem.js",
            "src/components/rxApp/scripts/rxAppSearch.js",
            "src/components/rxApp/scripts/rxAtlasSearch.js",
            "src/components/rxApp/scripts/rxBillingSearch.js",
            "src/components/rxApp/scripts/rxPage.js",
            "src/components/rxApp/scripts/rxStatusTag.js",
            "src/components/rxApp/scripts/rxTicketSearch.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxApp/templates/rxAccountSearch.html",
            "templates/rxApp/templates/rxAccountUsers.html",
            "templates/rxApp/templates/rxApp.html",
            "templates/rxApp/templates/rxAppNav.html",
            "templates/rxApp/templates/rxAppNavItem.html",
            "templates/rxApp/templates/rxAppSearch.html",
            "templates/rxApp/templates/rxBillingSearch.html",
            "templates/rxApp/templates/rxPage.html"
        ],
        "docs": {
            "md": "<p>This component is responsible for creating the HTML necessary for a common Encore layout. It builds out the main navigation, plus breadcrumbs and page titles.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxAppCtrl', function ($scope, $location, $rootScope, $window, encoreRoutes, rxVisibility, Session) {\n    Session.getUserId = function () {\n        return 'bert3000';\n    };\n\n    $scope.subtitle = 'With a subtitle';\n\n    $scope.changeSubtitle = function () {\n        $scope.subtitle = 'With a new subtitle at ' + Date.now();\n    };\n\n    rxVisibility.addMethod(\n        'isUserDefined',\n        function () {\n            return !_.isEmpty($rootScope.user);\n        }\n    );\n\n    $scope.changeRoutes = function () {\n        var newRoute = {\n            linkText: 'Updated Route',\n            childVisibility: 'true',\n            children: [\n                {\n                    linkText: 'New child route'\n                }\n            ]\n        };\n\n        encoreRoutes.setRouteByKey('accountLvlTools', newRoute);\n    };\n\n    // Fake navigation\n    var customApp = document.getElementById('custom-rxApp');\n    customApp.addEventListener('click', function (ev) {\n        var target = ev.target;\n\n        if (target.className.indexOf('item-link') > -1) {\n            // prevent the default jump to top\n            ev.preventDefault();\n\n            var href = target.getAttribute('href');\n\n            // update angular location (if href has a value)\n            if (!_.isEmpty(href)) {\n                // we need to prevent the window from scrolling (the demo does this)\n                // so we get the current scrollTop position\n                // and set it after the demo page has run '$routeChangeSuccess'\n                var currentScollTop = document.body.scrollTop;\n\n                $location.hash(href);\n\n                $rootScope.$apply();\n\n                $window.scrollTo(0, currentScollTop);\n            }\n        }\n    });\n\n    var searchDirective = [\n        'rx-app-search placeholder=\"Enter User\"',\n        'model=\"$root.user\"',\n        'pattern=\"/^([0-9a-zA-Z._ -]{2,})$/\"'\n    ].join(' ');\n\n    $scope.customMenu = [{\n        title: 'Example Menu',\n        children: [\n            {\n                href: 'Lvl1-1',\n                linkText: '1st Order Item'\n            },\n            {\n                linkText: '1st Order Item (w/o href) w/ Children',\n                childVisibility: [ 'isUserDefined' ],\n                childHeader: '<strong class=\"current-search\">Current User:</strong>' +\n                             '<span class=\"current-result\">{{$root.user}}</span>',\n                directive: searchDirective,\n                children: [\n                    {\n                        href: 'Lvl1-2-Lvl2-1',\n                        linkText: '2nd Order Item w/ Children',\n                        children: [{\n                            href: 'Lvl1-2-Lvl2-1-Lvl3-1',\n                            linkText: '3rd Order Item'\n                        }]\n                    },\n                    {\n                        href: 'Lvl1-2-Lvl2-2',\n                        linkText: '2nd Order Item w/ Children',\n                        children: [\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-1',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-2',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-3',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-4',\n                                linkText: '3rd Order Item'\n                            }\n                        ]\n                    },\n                    {\n                        href: 'Lvl1-2-Lvl2-3',\n                        linkText: '2nd Order Item'\n                    }\n                ]\n            },\n            {\n                href: 'Lvl1-3',\n                linkText: '1st Order Item w/ Children',\n                children: [\n                    {\n                        href: 'Lvl1-3-Lvl2-1',\n                        linkText: '2nd Order Item'\n                    }\n                ]\n            }\n        ]\n    }];\n\n    // Load docs homepage ('Overview')\n    // NOTE: Trailing forward slash is not an accident.\n    // This is required to get Firefox to load the iframe.\n    //\n    // The resulting url should have double forward slashes `//`.\n    $scope.embedUrl = $location.absUrl().split('#')[0] + '/';\n});\n",
            "html": "<div ng-controller=\"rxAppCtrl\">\n  <h3>Standard rxApp</h3>\n  <rx-app id=\"standard-rxApp\">\n    <rx-page title=\"'Standard Page Title'\">\n      <p class=\"clear\">This is my page content</p>\n      <button ng-click=\"changeRoutes()\" class=\"button\">Change Routes</button>\n    </rx-page>\n  </rx-app>\n\n  <h3>Customized rxApp (collapsible)</h3>\n  <rx-app collapsible-nav=\"true\" site-title=\"My App\" id=\"custom-rxApp\" menu=\"customMenu\" new-instance=\"true\" hide-feedback=\"true\">\n    <rx-page\n      unsafe-html-title=\"'Customized Page <a href=&quot;http://rackspace.com&quot;>Title</a>'\"\n      subtitle=\"subtitle\"\n      status=\"alpha\"\n      account-number=\"12345\">\n\n      <p class=\"clear\">Click a link in the menu to see the active state change</p>\n      <p>Click the toggle to hide the menu</p>\n      <button ng-click=\"changeSubtitle()\" class=\"changeSubtitle button\">Change Subtitle</button>\n    </rx-page>\n  </rx-app>\n\n  <h3>Embedded rxApp</h3>\n  <p>\n    rxApp is smart enough to detect if it is loaded in an iframe and will hide\n    the left nav.\n  </p>\n  <iframe id=\"embedded-app\" ng-src=\"{{embedUrl}}\"></iframe>\n</div>\n\n<!--\nYou'll likely want to implement your HTML in your index.html file as:\n<div ng-app=\"sampleApp\">\n    <rx-app ng-view></rx-app>\n</div>\n\nAnd the template for each view/page will be something like:\n<rx-page title=\"'Example Page'\">\n    Example content\n</rx-page>\n-->\n",
            "less": "/*\n * Common\n */\n@import url(\"https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic\");\n@import url(\"https://fonts.googleapis.com/css?family=Roboto+Mono:400,100,100italic,300,300italic,400italic,700,700italic\");\n@import \"vars\";\n@import (inline) \"normalize.css\";\n\n// Resets for HTML elements\nhtml,\nbody {\n  height: 100%;\n  font-size: @app-font-size;\n  color: @gray-900;\n  font-family: @app-font;\n}\n\n// Resets for form inputs\ninput,\ntextarea,\nselect {\n  box-shadow: none;\n}\n\n// Set default font\nbutton,\ninput,\nselect,\n.pure-g [class *= \"pure-u\"],\n.pure-g-r [class *= \"pure-u\"] {\n  font-family: @app-font;\n}\n\n// Remove default margin/padding/etc\nheader,\nnav,\nol,\nul,\nli,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nfieldset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font: inherit;\n  font-size: 100%;\n  vertical-align: baseline;\n}\n\n// No list styles for lists\nol,\nul,\nli {\n  list-style: none;\n}\n\n// We want a little bit more line-spacing in paragraphs\np {\n  line-height: @app-line-height;\n}\n\n// Link Styles\na {\n  text-decoration: none;\n  color: @app-link-text-color;\n}\na:hover,\na:focus {\n  text-decoration: underline;\n  color: @app-link-hover-text-color;\n}\n\n/* ===== HEADINGS ===== */\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1em 0;\n\n  &.subdued {\n    color: @gray-700;\n  }\n}\n\nh1 {\n  // same as .title.xl\n  font-size: 28px;\n}\nh2 {\n  // same as .title.lg\n  font-size: 22px;\n}\nh3 {\n  // same as .title\n  font-size: 18px;\n}\nh4 {\n  // same as .title.sm\n  font-size: 16px;\n}\nh5 {\n  // same as .title.xs\n  font-size: 13px;\n}\nh6 {\n  // no legacy equivalent\n  font-size: 10px;\n}\n\n// Heading/Title Styles\n.title {\n  margin: 1em 0;\n\n  // Sizing\n  &.xl { // h1\n    font-size: 28px;\n  }\n  &.lg { // h2\n    font-size: 22px;\n  }\n  & { // h3\n    font-size: 18px;\n  }\n  &.sm { // h4\n    font-size: 16px;\n  }\n  &.xs { // h5\n    font-size: 13px;\n  }\n\n  // Colors\n  &.subdued {\n    color: @gray-700;\n  }\n}//.title\n\n// Wells\n.well {\n  background: @gray-100;\n  padding: 40px 50px;\n  box-shadow: 0 0 0 10px white inset;\n\n  p {\n    line-height: 1.5em;\n    color: @gray-700;\n  }\n\n  ul {\n    display: inline-block;\n    text-align: left;\n  }\n\n  h2 {\n    color: @gray-700;\n  }\n}\n\n.modal-well {\n  background-color: @gray-100;\n  padding: 20px 30px;\n\n  h2 {\n    font-size: 14px;\n  }\n}\n\n// Other Stuff\n.subdued {\n  color: @gray-700;\n}\n\n// Add hover style if a link or inside a link\na.subdued:hover,\na.subdued:focus,\na:hover .subdued,\na:focus .subdued {\n  color: @subduedTextHover;\n}\n\n// Hidden content\n.hidden {\n  visibility: hidden;\n}\n\n// Used to hide content visually but let them still be read\n// by screen readers (removed from the page spacing)\n// !important is required and prevents visible styling\n.visually-hidden {\n  position: absolute !important; // lesshint importantRule: false\n  clip: rect(1px, 1px, 1px, 1px);\n  padding: 0 !important; // lesshint importantRule: false\n  border: 0 !important; // lesshint importantRule: false\n  height: 1px !important; // lesshint importantRule: false\n  width: 1px !important; // lesshint importantRule: false\n  overflow: hidden;\n}\nbody:hover .visually-hidden a,\nbody:hover .visually-hidden input,\nbody:hover .visually-hidden button {\n  display: none;\n}\n\n// Clearing Floats\n.clearfix:before,\n.clearfix:after {\n  content: \" \"; /* 1 */\n  display: table; /* 2 */\n}\n\n.clearfix:after {\n  clear: both;\n}\n\n// Clearing siblings\n.clear {\n  clear: both;\n}\n.clear-left {\n  clear: left;\n}\n.clear-right {\n  clear: right;\n}\n\n// Marks content as full width (e.g. to give a button full width).\n// Requires 'display' to be defined as `inline-block` or `block`\n.full-width {\n  width: 100%;\n}\n\n// Center content\n// Requires 'display' to be defined as `inline-block` or `block`\n.centered {\n  text-align: center;\n}\n\n\n/*\n * PLACEHOLDER TEXT STYLING\n * https://css-tricks.com/snippets/css/style-placeholder-text/\n */\n::-webkit-input-placeholder { // Chrome\n  color: @inputPlaceholderColor;\n  font-weight: 300;\n  font-style: italic;\n}\n::-moz-placeholder { // Firefox 19+\n  color: @inputPlaceholderColor;\n  font-weight: 400;\n  font-style: italic;\n}\n\n//DEPRECATED: A \"filter\" style rxSearchBox\n.filter-box {\n  font-style: italic;\n}\n\n//DEPRECATED\n.action-separator {\n  font-size: 1.1em;\n  color: @subduedText;\n}\n\n@import \"vars\";\n@import \"mixins\";\n\n.account-users {\n  box-sizing: border-box;\n}\n\n.rx-app {\n  @navTransitionDuration: 0.2s;\n  @appMenuWidth: 300px;\n\n  min-height: 100%;\n  display: flex;\n  flex-direction: row;\n  background: @gray-50;\n\n  .rx-app-content {\n    flex: 1 1 0;\n  }\n\n  .rx-app-menu {\n    flex: 0 0 @appMenuWidth;\n    color: @white;\n    font-size: 15px;\n    font-weight: 300;\n    background: @gray-975;\n    line-height: @app-line-height;\n    padding-bottom: 10em;\n    position: relative;\n\n    .site-title,\n    .nav-section-title {\n      margin: 0;\n      font-size: inherit;\n    }\n  }\n\n  .site-branding {\n    border-top: 1px solid @blue-700;\n    border-bottom: 1px solid @blue-700;\n    padding: 5px 20px;\n    overflow: hidden;\n    background: @blue-900;\n    position: relative;\n\n    .site-title {\n      float: left;\n    }\n    .site-options {\n      float: right;\n      font-size: 0.8em;\n      margin-top: 1px;\n\n      .site-option {\n        color: @blue-100;\n        display: inline-block;\n        margin-left: 1em;\n        &:hover,\n        &:focus {\n          color: @white;\n        }\n      }\n    }\n\n    .collapsible-toggle {\n      position: absolute;\n      text-align: center;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      width: 2em;\n      border-left: 1px solid darken(@blue-900, 10%);\n      &:hover {\n        background: lighten(@blue-900, 10%);\n      }\n    }\n\n    .double-chevron {\n      font-size: 20px;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      left: 0;\n\n      &::before {\n        color: @blue-100;\n        content: \"\\00bb\";\n      }\n\n      &.double-chevron-left::before {\n        content: \"\\00ab\";\n      }\n\n      &:hover &::before {\n        color: @white;\n      }\n    }\n  }\n\n  &.collapsible {\n    .site-branding {\n      padding-right: calc(~\"2em + 20px\");\n    }\n  }\n\n  &.collapsed {\n    .rx-app-menu {\n      flex: 0 0 25px;\n      padding-bottom: 0;\n      position: relative;\n    }\n\n    .site-branding,\n    .collapsible-toggle {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      padding: 0;\n      width: 100%;\n    }\n\n    .site-title,\n    .site-options,\n    .rx-app-nav,\n    .rx-app-help {\n      display: none;\n    }\n\n    .page-body {\n      & > .rx-notifications {\n        left: 25px;\n      }\n    }\n  }\n\n  &.embedded {\n    .page-body {\n      & > .rx-notifications {\n        left: 0;\n      }\n    }\n  }\n\n  &.warning-bar {\n    position: absolute;\n    margin-top: 3em;\n    width: 100%;\n  }\n\n  &.warning-bar.preprod {\n    .rx-app-menu {\n      background: @preprod-background-color;\n    }\n    .rx-app-nav-item {\n      .item-link {\n        background: @preprod-background-color;\n        border-top: 1px solid @preprod-border-top-color;\n        border-bottom: 1px solid @preprod-border-bottom-color;\n        &:hover,\n        &:focus {\n          background: @preprod-focus-background-color;\n          border-top: 1px solid @preprod-focus-border-top-color;\n          border-bottom: 1px solid @preprod-focus-border-bottom-color;\n        }\n      }\n\n      // active nav, no children (orange/yellow bg, arrow right)\n      &.active:not(.has-children) > .item-link {\n        border-color: transparent;\n        background: @preprod-active-item-background-color;\n        color: @preprod-active-item-text-color;\n        &:after {\n          right: -6px;\n          border-left-color: @preprod-active-item-arrow-color;\n        }\n      }\n\n      // active nav, w/children (double arrow up, gray bg)\n      &.active.has-children > .item-link {\n        border-top-color: @preprod-border-top-color;\n        // used to show BG of arrow (because :after is rotated)\n        &:before {\n          background: @preprod-active-menu-background-color;\n        }\n        .item-content {\n          border-bottom: 1px solid @black;\n        }\n      }\n\n      .item-content {\n        background: @preprod-active-menu-background-color;\n      }\n    }\n  }\n\n  .rx-app-nav {\n    clear: both;\n\n    .nav-section {\n      padding-left: 5px;\n    }\n\n    .nav-section-title {\n      padding: 5px 15px;\n      font-size: 13px;\n    }\n\n    .nav-section-all {\n      background: @green-700;\n      border-top: 1px solid @green-500;\n    }\n\n    .nav-section-highlight {\n      background: @blue-500;\n      border-top: 1px solid lighten(@blue-500, 10%);\n    }\n\n    .nav-section-no-title {\n      background: transparent;\n      padding: 0;\n      margin: 0;\n\n      & > .nav-section-title {\n        display: none;\n      }\n    }\n  }\n\n  .rx-app-nav-item {\n    clear: both;\n\n    // common nav styles (inactive nav, no children)\n    .item-link {\n      background: @gray-975;\n      border-top: 1px solid @gray-950;\n      border-bottom: 1px solid @black;\n      padding: 10px 4em 10px 15px;\n      display: block;\n      color: @white;\n      text-decoration: none;\n      -webkit-transition: background @navTransitionDuration;\n      transition: background @navTransitionDuration;\n      position: relative;\n      &:hover,\n      &:focus {\n        background: @gray-950;\n        border-top: 1px solid @gray-900;\n        border-bottom: 1px solid @black;\n      }\n      &:before,\n      &:after {\n        content: \"\";\n        position: absolute;\n      }\n      &:after {\n        -webkit-transition: all @navTransitionDuration;\n        transition: all @navTransitionDuration;\n      }\n    }\n\n    &:not(.has-children) > .item-link:after {\n      right: 0;\n      top: 0;\n      border: transparent solid;\n      border-width: calc(~\"5px + 1em\") 6px;\n      border-right: 0;\n    }\n\n    // active nav, no children (blue bg, arrow right)\n    &.active:not(.has-children) > .item-link {\n      border-color: transparent;\n      background: @blue-700;\n      &:after {\n        right: -6px;\n        border-left-color: @blue-700;\n      }\n    }\n\n    // inactive nav, w/children (double arrow down)\n    &.has-children > .item-link:after {\n      font-size: 2em;\n      content: \"\\00bb\"; // angle quotation mark, right (&raquo;)\n      -webkit-transform: rotate(90deg) scaleX(1);\n      transform: rotate(90deg) scaleX(1);\n      top: 50%;\n      line-height: 0;\n      right: 0.45em;\n    }\n\n    // active nav, w/children (double arrow up, gray bg)\n    &.active.has-children > .item-link {\n      border-top-color: @gray-900;\n      border-bottom-width: 0;\n      // used to show BG of arrow (because :after is rotated)\n      &:before {\n        width: 3em;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        background: @gray-950;\n      }\n      &:after {\n        // flip arrow around\n        -webkit-transform: rotate(90deg) scaleX(-1);\n        transform: rotate(90deg) scaleX(-1);\n      }\n      .item-content {\n        border-bottom: 1px solid @black;\n      }\n    }\n\n    .item-content {\n      background: @gray-950;\n      padding: 10px;\n    }\n\n    .item-directive:not(.ng-hide) + .item-children {\n      margin-top: 10px;\n    }\n\n    .item-children {\n      padding: 10px;\n      background: @gray-900;\n    }\n\n    .child-header {\n      margin-bottom: 1em;\n    }\n\n    .current-search {\n      text-transform: uppercase;\n      font-weight: bold;\n      color: @gray-600;\n      font-size: 10px;\n      display: block;\n    }\n\n    .current-result {\n      color: @gray-400;\n      font-size: 18px;\n    }\n\n    // Legacy select elements in navigation\n    // TODO: Deprecated\n    .field-select {\n      select {\n        background: #404140;\n        border: 1px solid #3a3a3a;\n      }\n      &:before {\n        background: #404140;\n      }\n      &:after {\n        right: 10px;\n        top: 5px;\n      }\n    }\n\n    // User select element in Account section of nav\n    // TODO: Update to 2.0 Color Variables\n    .account-users {\n      float: right;\n      width: 50%;\n\n      .rxSelect {\n        background: #404140;\n        color: #d5d5d3; // same as .current-result above\n\n        .fake-select {\n          border-color: #3a3a3a;\n\n          .select-trigger {\n            background: #404140; // same as .rxSelect bg\n          }\n        }\n      }\n    }\n  }\n\n  .rx-app-nav-level-2 {\n    .item-link {\n      background: @gray-800;\n      border-top-color: @gray-700;\n      border-bottom-color: @gray-900;\n      font-size: 13px;\n\n      &:hover,\n      &:focus {\n        background: @gray-900;\n        border-top: 1px solid @gray-700;\n        border-bottom: 1px solid @gray-900;\n      }\n    }\n    .active:not(.has-children) > .item-link {\n      margin-right: -10px;\n    }\n    .active.has-children > .item-link {\n      background: @gray-975;\n      border-color: transparent;\n    }\n\n    .item-content {\n      background: @gray-975;\n      padding: 0 0 4px 4px;\n    }\n\n    .item-children {\n      padding: 0;\n    }\n  }\n\n  .rx-app-nav-level-3 .item-link {\n    background: @gray-950;\n    border-color: transparent;\n    padding: 5px 15px;\n\n    &:hover,\n    &:focus {\n      background: @gray-900;\n      border-color: transparent;\n    }\n  }\n  .rx-app-nav-level-3 .rx-app-nav-item {\n    &:first-child {\n      border-top: 3px solid @gray-950;\n    }\n    .item-link:after {\n      border-top-width: 1em;\n      border-bottom-width: 1em;\n    }\n  }\n\n  .rx-app-search {\n    position: relative;\n    font-size: 14px;\n    color: @gray-500;\n\n    fieldset {\n      position: relative;\n    }\n\n    // NOTE: We have to have this duplication because CSS doesn't like combining the placholder selectors\n    .placeholder() {\n      font-style: italic;\n      text-overflow: ellipsis;\n    }\n\n    ::-webkit-input-placeholder {\n      .placeholder();\n    }\n    ::-moz-placeholder {\n      .placeholder();\n    }\n    :-ms-input-placeholder {\n      .placeholder();\n    }\n\n    .search-input {\n      .box-sizing(border-box);\n      background: @gray-900;\n      border: 0;\n      width: 100%;\n      padding: 9px;\n      padding-right: 30px;\n      margin: 0;\n    }\n\n    .search-input.ng-invalid:focus {\n      outline-color: @red-700;\n    }\n\n    .search-action {\n      position: absolute;\n      top: 0;\n      right: 0;\n      width: 30px;\n      height: 100%;\n      background: url(\"images/magnifying-glass.png\") no-repeat 50% 50%;\n      border: 0;\n      opacity: 0.2;\n    }\n\n    .search-option {\n      margin-top: 10px;\n    }\n  }\n\n  .rx-app-help {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: @appMenuWidth;\n    background: @gray-950;\n    border-top: 1px solid @gray-900;\n    line-height: 3em;\n    padding-bottom: 1px;\n    font-size: 0.8em;\n    text-shadow: 1px 1px 0px rgba(26, 26, 26, 0.2);\n\n    .rx-feedback .modal-link {\n      background: url(\"images/icon-feedback.png\") no-repeat 20px calc(~\"50% + 1px\");\n      vertical-align: middle;\n      color: @orange-500;\n      padding: 0 21px 0 41px;\n      float: right;\n    }\n  }\n\n  // Page Styles\n  // TODO: Update to 2.0 Color Variables\n  .page-header {\n    background: linear-gradient(to bottom, #e7e7e7 0%, #d6d6d6 100%);\n    border-bottom: 1px solid #bbbbbb;\n  }\n\n  .page-body {\n    padding: 20px 30px 50px;\n    clear: both;\n\n    .page-titles {\n      float: left;\n\n      .page-title {\n        margin: 0;\n        position: relative;\n        word-break: break-all;\n      }\n\n      .page-subtitle {\n        margin-top: 0;\n        word-break: break-all;\n      }\n    }\n\n    & > .rx-notifications {\n      position: fixed;\n      z-index: 20; // accommodate rxSelect .fake-select class\n      top: 0;\n      left: 300px;\n      right: 0px;\n      opacity: 0.95;\n    }\n\n    .page-actions {\n      float: right;\n      margin: 0 0 2em 2em;\n    }\n  }\n}\n\n.warning-bar.rx-notifications {\n  position: fixed;\n  z-index: 3;\n  width: 100%;\n  margin-bottom: 0;\n}\n\n.status-tag {\n  &.alpha-status,\n  &.beta-status {\n    margin-left: 10px;\n    text-transform: uppercase;\n    font-size: 9px;\n    border: 1px solid;\n    padding: 1px 2px;\n    .border-radius(2px);\n    top: 9px;\n    color: @blue-900;\n  }\n}\n\na.disabled {\n  color: #d5d3d3;\n  cursor: default;\n  pointer-events: none;\n  text-decoration: none;\n}\n"
        }
    },
    {
        "displayName": "rxAttributes",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxAttributes",
        "moduleName": "'encore.ui.rxAttributes'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxAttributes/rxAttributes.module.js",
            "src/components/rxAttributes/scripts/rxAttributes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>This component allows you to add attributes based on a value in scope being defined or not.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxAttributesCtrl', function ($scope) {\n    $scope.customStyles = 'color: red; font-weight: bold;';\n    $scope.customContent = '\"Custom Content\"';\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxAttributesCtrl\">\n    <p><strong>The following content gets replaced by the value of ng-bind. It also gets some styles applied to it:</strong></p>\n    <p rx-attributes=\"{'ng-bind': customContent, 'style': customStyles}\">Content that's replaced</p>\n\n    <p><strong>The following content doesn't get replaced, since 'nothing' isn't a property on the scope:</strong></p>\n    <p rx-attributes=\"{'ng-bind': nothing}\">Non-replaced content</p>\n\n    <p><strong>The following content (you can't see it) does get replaced, but by nothing, since 'nothing' isn't a property on the scope. This is what rx-attributes avoids</strong></p>\n    <p ng-bind=\"nothing\">Content that's unintentionally replaced</p>\n</div>",
            "less": ""
        }
    },
    {
        "displayName": "rxBulkSelect",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxBulkSelect",
        "moduleName": "'encore.ui.rxBulkSelect'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxBulkSelect/rxBulkSelect.module.js",
            "src/components/rxBulkSelect/scripts/rxBatchActions.js",
            "src/components/rxBulkSelect/scripts/rxBulkSelect.js",
            "src/components/rxBulkSelect/scripts/rxBulkSelectHeaderCheck.js",
            "src/components/rxBulkSelect/scripts/rxBulkSelectMessage.js",
            "src/components/rxBulkSelect/scripts/rxBulkSelectRow.js",
            "src/components/rxBulkSelect/scripts/rxBulkSelectValidate.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxBulkSelect/templates/rxBatchActions.html",
            "templates/rxBulkSelect/templates/rxBulkSelectMessage.html"
        ],
        "docs": {
            "md": "<p>Used to perform an action on multiple items in a table.</p>\n<h1>Styling</h1>\n<p>The styles for the table are applied just by using the directives.  There are no directives provided for the modal, but it should follow a few design conventions:</p>\n<ul>\n<li>The first view has a warning at the top, and a table listing the selected items. The table should be paginated with 8 items per page, and items may be removed via an &quot;X&quot; icon (see the <a href=\"#/styleguide/tables\">Delete &quot;X&quot; action</a>).</li>\n<li>In the second view, the table has a status column with text describing the state of each item, and another column with an icon to indicate the state. A <a href=\"#/components/progressbar\">progressbar</a> should be included as well as a link that opens the current page in a new tab.</li>\n<li>Once the process is complete a &quot;Return to [x]&quot; button should appear in the footer, and the progressbar should be replaced with some text indicating the process is complete.</li>\n</ul>\n",
            "js": "// This file is used to help build the 'demo' documentation page and should be updated with example code\nangular.module('demoApp')\n.controller('rxBulkSelectCtrl', function ($scope) {\n\n    $scope.datacenters = [\n        { name: 'ORD1', city: 'Chicago' },\n        { name: 'DFW1', city: 'Grapevine' },\n        { name: 'DFW2', city: 'Richardson' },\n        { name: 'IAD2', city: 'Ashburn' },\n        { name: 'IAD3', city: 'Ashburn' },\n        { name: 'LON1', city: 'West Drayton' },\n        { name: 'LON3', city: 'Berkshire' },\n        { name: 'LON5', city: 'Crawley' },\n        { name: 'HKG1', city: 'Honk Kong' },\n        { name: 'SYD2', city: 'Sydney' }\n    ];\n\n    // cloned to avoid interference with first demo table\n    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);\n\n    $scope.filter = { keyword: '' };\n\n    $scope.getSelectedDatacenters = function () {\n        return _.cloneDeep(_.where($scope.datacenters, { rowIsSelected: true }));\n    };\n\n})\n.controller('ShutdownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, PageTracking) {\n    $scope.sort = rxSortUtil.getDefault('name');\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    var itemsPerPage = 8;\n    $scope.pager = PageTracking.createInstance({ itemsPerPage: itemsPerPage });\n    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;\n\n    $scope.removeDatacenter = function (dc) {\n        _.remove($scope.selectedDatacenters, dc);\n    };\n\n    $scope.submit = function () {\n        $scope.setState('working');\n\n        $scope.numCompleted = 0;\n\n        var delay = 1000;\n        $scope.selectedDatacenters.forEach(function (dc, i) {\n            $timeout(function () {\n                dc.status = 'pending';\n            }, i * delay);\n            $timeout(function () {\n                dc.status = i % 4 === 0 ? 'failure' : 'success';\n                $scope.numCompleted++;\n            }, ++i * delay);\n        });\n        $timeout(function () {\n            $scope.setState('complete');\n            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });\n        }, $scope.selectedDatacenters.length * delay);\n    };\n\n    $scope.cancel = $modalInstance.dismiss;\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how the component can be used -->\n<div ng-controller=\"rxBulkSelectCtrl\">\n    <table rx-bulk-select bulk-source=\"datacenters\" selected-key=\"rowIsSelected\" class=\"table-striped\" rx-floating-header>\n        <thead>\n            <tr>\n                <th colspan=\"3\" class=\"filter-header\">\n                    <rx-search-box ng-model=\"filter.keyword\" rx-placeholder=\"'Filter by any...'\"></rx-search-box>\n                    <rx-batch-actions>\n                        <li class=\"actions-item\">\n                            <rx-modal-action\n                                template-url=\"shutdownDatacenters.html\"\n                                pre-hook=\"this.selectedDatacenters = getSelectedDatacenters()\"\n                                controller=\"ShutdownDatacentersCtrl\"\n                                classes=\"msg-info\">\n                                <i class=\"fa fa-fw fa-power-off\"></i> Shutdown Selected Datacenters\n                            </rx-modal-action>\n                        </li>\n                    </rx-batch-actions>\n                </th>\n            </tr>\n            <tr>\n                <th rx-bulk-select-header-check></th>\n                <th>Name</th>\n                <th>City</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"dc in datacenters | filter:filter.keyword\"\n                ng-class=\"{selected: dc.rowIsSelected}\">\n                <td rx-bulk-select-row row=\"dc\"></td>\n                <td>{{ dc.name }}</td>\n                <td>{{ dc.city }}</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <script type=\"text/ng-template\" id=\"shutdownDatacenters.html\">\n        <rx-modal-form title=\"Shut Down Datacenters\" submit-text=\"Shut Down Datacenters\">\n            <div ng-switch=\"state\">\n                <div ng-switch-when=\"editing\">\n                    <rx-notification type=\"warning\">\n                        Are you sure you want to shut down these datacenters?\n                    </rx-notification>\n                </div>\n                <div ng-switch-when=\"complete\">\n                    Batch process complete! <span ng-if=\"errorsPresent\">See table below to make note of any failures.</span>\n                </div>\n                <div ng-switch-when=\"working\">\n                    <div>Batch request to shut down datacenters in progress. Please <a href=\"#/components/rxBulkSelect\" target=\"_blank\">open a new tab to continue reading rxBulkSelect documentation.</a></div>\n                    <br />\n                    <progressbar\n                        class=\"progress-striped\"\n                        ng-class=\"{active: numCompleted === selectedDatacenters.length}\"\n                        value=\"numCompleted\"\n                        max=\"selectedDatacenters.length\">\n                        {{ numCompleted }} of {{ selectedDatacenters.length }} processed\n                    </progressbar>\n                </div>\n            </div>\n\n            <br />\n\n            <table class=\"table-striped batch-action-modal-table\">\n                <thead>\n                    <tr>\n                        <th>\n                            <rx-sortable-column\n                                sort-method=\"sortCol(property)\"\n                                sort-property=\"name\"\n                                predicate=\"sort.predicate\"\n                                reverse=\"sort.reverse\">\n                                Name\n                            </rx-sortable-column>\n                        </th>\n                        <th ng-if=\"state === 'editing'\">City</th>\n                        <th ng-if=\"state !== 'editing'\">\n                            <rx-sortable-column\n                                sort-method=\"sortCol(property)\"\n                                sort-property=\"status\"\n                                predicate=\"sort.predicate\"\n                                reverse=\"sort.reverse\">\n                                Status\n                            </rx-sortable-column>\n                        </th>\n                        <th class=\"actions\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr ng-repeat=\"dc in selectedDatacenters | orderBy: sort.predicate:sort.reverse | Paginate:pager\">\n                        <td>{{ dc.name }}</td>\n                        <td ng-if=\"state === 'editing'\">{{ dc.city }}</td>\n                        <td ng-if=\"state === 'editing'\"><i class=\"fa fa-times\" ng-click=\"removeDatacenter(dc)\"></i></td>\n                        <td class=\"{{dc.status}}-status\" ng-if=\"state !== 'editing'\" ng-switch=\"dc.status\">\n                            <span ng-switch-when=\"pending\">Shutting down...</span>\n                            <span ng-switch-when=\"success\">Successfully shut down!</span>\n                            <span ng-switch-when=\"failure\">Failed to shut down.</span>\n                            <span ng-switch-default>Queued to shut down...</span>\n                        </td>\n                        <td class=\"{{dc.status}}-status\" ng-if=\"state !== 'editing'\">\n                            <i ng-if=\"dc.status === 'success'\" class=\"fa fa-lg fa-check-circle-o\"></i>\n                            <i ng-if=\"dc.status === 'failure'\" class=\"fa fa-lg fa-ban\"></i>\n                        </td>\n                    </tr>\n                </tbody>\n                <tfoot ng-if=\"showPagination\">\n                    <tr class=\"paginate-area\">\n                        <td colspan=\"3\">\n                            <rx-paginate page-tracking=\"pager\"></rx-paginate>\n                        </td>\n                    </tr>\n                </tfoot>\n\n            </table>\n        </rx-modal-form>\n\n        <rx-modal-footer state=\"complete\">\n            <button class=\"button finish\" ng-click=\"cancel()\">Return to Datacenters</button>\n        </rx-modal-footer>\n    </script>\n\n    <hr />\n\n    <!-- Demo for using rxBulkSelectValidate with rxBulkSelect in a form -->\n    <div>\n        <h4>Demo for rxBulkSelectValidate</h4>\n        <rx-modal-action\n             classes=\"button\"\n             template-url=\"selectDatacenters.html\"\n             id=\"selectDatacenters\">\n            Select Datacenters\n        </rx-modal-action>\n\n        <script type=\"text/ng-template\" id=\"selectDatacenters.html\">\n            <rx-modal-form title=\"Datacenters\">\n                <table rx-bulk-select rx-bulk-select-validate bulk-source=\"validateDatacenters\" selected-key=\"rowIsSelected\" class=\"table-striped\">\n                    <thead>\n                        <tr>\n                            <th rx-bulk-select-header-check></th>\n                            <th>Name</th>\n                            <th>City</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat=\"dc in validateDatacenters | filter:filter.keyword\"\n                            ng-class=\"{selected: dc.rowIsSelected}\">\n                            <td rx-bulk-select-row row=\"dc\"></td>\n                            <td>{{ dc.name }}</td>\n                            <td>{{ dc.city }}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </rx-modal-form>\n        </script>\n    </div>\n\n</div>\n",
            "less": "/*\n * rxBulkSelect\n */\n\nthead th.bulk-select-header {\n  background: @app-selected-row-background-color;\n  text-align: center;\n  color: @rxBulkSelect-header-text-color;\n  font-weight: normal;\n}\n\nthead th[rx-bulk-select-header-check] {\n  width: @rxCheckbox-size;\n}\n\n.header-button.btn-link {\n  color: @app-link-text-color;\n  &:focus {\n    color: @app-link-text-color;\n  }\n  &:hover {\n    color: @app-link-hover-text-color;\n  }\n}\n\n.batch-action-menu-container {\n  position: relative;\n  width: 5px;\n  height: 0;\n  & > i {\n    cursor: pointer;\n    color: @gray-700;\n    &:hover {\n      color: @gray-800;\n    }\n  }\n}\n\n.batch-actions-area {\n  font-size: 115%;\n  line-height: 2em;\n}\n\n.batch-action-list-hideable {\n  float: left;\n  z-index: 99;\n  position: absolute;\n  top: 0;\n  right: -115px;\n  min-width: 20em;\n  font-size: 12px;\n  border: 4px solid @white;\n  border-radius: 4px;\n  background: @white;\n  text-shadow: rgba(0, 0, 0, 0.09) 1px 1px 1px;\n  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 4px 0px;\n  padding: 6px;\n\n  &:before {\n    content: \"\\f0d8\";\n    text-shadow: rgba(0, 0, 0, 0.35) 0 -1px 1px;\n    font-family: FontAwesome;\n    text-decoration: inherit;\n    color: @white;\n    font-size: 24px;\n    display: block;\n    left: 230px;\n    position: absolute;\n    top: -23px;\n    width: 0;\n    z-index: 1;\n  }\n\n  i {\n    margin-right: 5px;\n  }\n}\n\n.batch-action-list {\n  float: right;\n  z-index: 5;\n}\n\n.selected td:not(.status) {\n  background: @app-selected-row-background-color;\n}\n\n.batch-action-modal-table .pagination {\n  & > li:nth-child(1) {\n    display: none;\n  }\n  & > li:nth-child(2) {\n    display: none;\n  }\n  .pagination-per-page {\n    display: none;\n  }\n}\n"
        }
    },
    {
        "displayName": "rxCharacterCount",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxCharacterCount",
        "moduleName": "'encore.ui.rxCharacterCount'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxCharacterCount/rxCharacterCount.module.js",
            "src/components/rxCharacterCount/scripts/rxCharacterCount.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>A component designed for <code>&lt;textarea&gt;</code> elements that provides character count functionality.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxCharacterCountCtrl', function ($scope) {\n    $scope.data = {\n        comment1: '',\n        comment2: '',\n        comment3: '',\n        comment4: '',\n        comment5: 'I have an initial value',\n        comment6: ''\n    };\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how the component can be used -->\n<div ng-controller=\"rxCharacterCountCtrl\">\n    <div>\n        <h3>Default Values</h3>\n        <textarea\n            ng-model=\"data.comment1\"\n            rows=\"10\" cols=\"50\"\n            rx-character-count\n            class=\"demo-default-values\">\n        </textarea>\n    </div>\n    <div>\n        <h3>Custom <code>max-characters=\"25\"</code></h3>\n        <textarea\n            ng-model=\"data.comment2\"\n            rows=\"10\" cols=\"50\"\n            rx-character-count\n            max-characters=\"25\"\n            class=\"demo-custom-max-characters\">\n        </textarea>\n    </div>\n    <div>\n        <h3>Custom <code>low-boundary=\"250\"</code></h3>\n        <textarea\n            ng-model=\"data.comment3\"\n            rows=\"10\" cols=\"50\"\n            rx-character-count\n            low-boundary=\"250\"\n            class=\"demo-custom-low-boundary\">\n        </textarea>\n    </div>\n    <div>\n        <h3>Count leading and trailing spaces</h3>\n        <textarea\n            ng-model=\"data.comment4\"\n            rows=\"10\" cols=\"50\"\n            rx-character-count\n            ng-trim=\"false\"\n            class=\"demo-custom-do-not-trim\">\n        </textarea>\n    </div>\n    <div>\n        <h3>Accounts for initial values</h3>\n        <textarea\n            ng-model=\"data.comment5\"\n            rows=\"10\" cols=\"50\"\n            rx-character-count\n            class=\"demo-initial-value\">\n        </textarea>\n    </div>\n    <div>\n        <h3>With highlighting</h3>\n        <textarea\n            ng-model=\"data.comment6\"\n            rows=\"10\" cols=\"50\"\n            rx-character-count\n            highlight=\"true\"\n            max-characters=\"10\"\n            class=\"demo-highlighting\">\n        </textarea>\n    </div>\n</div>\n",
            "less": "/*\n * rxCharacterCount\n */\n\n// Wrapper provides proper width for text area and positioning\n// character count. For specific use cases in a project,\n// custom wrappers with custom widths can be set.\n.counted-input-wrapper {\n  width: 375px;\n  position: relative;\n  background-color: @rxCharacterCount-input-background-color;\n\n  // These two selectors must always be styled with the same width.\n  .input-highlighting,\n  textarea {\n    width: 370px;\n  }\n\n  input,\n  textarea {\n    // Ensure the input is layered over the highlighting without z-index\n    position: relative;\n    background-color: transparent;\n    resize: none;\n    .inputBorderPadding;\n  }\n\n  .input-highlighting {\n    position: absolute;\n    top: 4px;\n    left: 6px;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n    color: transparent;\n\n    .over-limit-text {\n      background-color: @rxCharacterCount-highlight-background-color;\n      opacity: 0.3;\n    }\n  }\n\n  .character-countdown {\n    text-align: right;\n    color: @app-label-text-color;\n\n    &.near-limit {\n      color: @orange-700;\n    }\n    &.over-limit {\n      color: @rxCharacterCount-error-countdown-text-color;\n    }\n  }\n}\n"
        }
    },
    {
        "displayName": "rxCollapse",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxCollapse",
        "moduleName": "'encore.ui.rxCollapse'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxCollapse/rxCollapse.module.js",
            "src/components/rxCollapse/scripts/rxCollapse.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxCollapse/templates/rxCollapse.html"
        ],
        "docs": {
            "md": "<p><code>rxCollapse</code> component is used to display and hide content on a page.</p>\n",
            "js": "",
            "html": "<rx-collapse class=\"demo-with-title\" title=\"A Custom Title\" expanded=\"true\">\n    You can put whatever content you want to inside here\n</rx-collapse>\n\n<h3>'See more/See less' for use with metadata</h3>\n<rx-metadata>\n    <section>\n        <rx-meta label=\"Name\">Lorem ipsum dolor sit amet</rx-meta>\n        <rx-meta label=\"ID\">1aa2bfa9-de8d-42f7-9f6de6437855b36e</rx-meta>\n        <rx-meta label=\"Region\">ORD</rx-meta>\n        <rx-meta label=\"Created\">December 2, 2014 @ 14:28</rx-meta>\n        <rx-collapse class=\"demo-no-title\" expanded=\"false\">\n            <rx-meta label=\"Name\">Lorem ipsum dolor sit amet</rx-meta>\n            <rx-meta label=\"ID\">1aa2bfa9-de8d-42f7-9f6de6437855b36e</rx-meta>\n            <rx-meta label=\"Region\">ORD</rx-meta>\n            <rx-meta label=\"Created\">December 2, 2014 @ 14:28</rx-meta>\n        </rx-collapse>\n    </section>\n</rx-metadata>\n",
            "less": "/*\n * rxCollapse\n */\nrx-collapse {\n  display: block;\n\n  .collapse-container {\n\n    .double-chevron-cell {\n      display: inline-block;\n      .box-sizing(border-box);\n      width: 30px;\n      padding: 0 10px;\n      background-color: @gray-500;\n      vertical-align: middle;\n      cursor: pointer;\n\n      .double-chevron {\n        &:after {\n          display: inline-block;\n          color: @white;\n          font-size: 28px;\n          .chevron-mixin;\n        }\n      }\n\n      &.expanded {\n        .double-chevron {\n          &:after {\n            .chevron-mixin(-1);\n          }\n        }\n      }\n    }\n\n    border: 2px solid @gray-500;\n\n    .rx-collapse-title {\n      display: inline-block;\n      margin: 0 10px;\n      vertical-align: middle;\n    }\n\n    .collapse-body {\n      margin: 0;\n      padding: 10px;\n    }\n  }\n  .sml-title {\n    cursor: pointer;\n    color: @gray-700;\n    font-size: 10pt;\n  }\n\n  .hide-border {\n    border: 0;\n  }\n}\n"
        }
    },
    {
        "displayName": "rxCompile",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxCompile",
        "moduleName": "'encore.ui.rxCompile'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxCompile/rxCompile.module.js",
            "src/components/rxCompile/scripts/rxCompile.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>A component that allows compilation of expressions inside of other expressions.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxCompileCtrl', function ($scope) {\n    $scope.world = 'wrrrld';\n    $scope.myExpression = 'Hello {{world}}';\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxCompileCtrl\">\n    <input type=\"text\" ng-model=\"world\">\n    <div rx-compile=\"myExpression\"></div>\n    <div>{{myExpression}}</div>\n</div>",
            "less": ""
        }
    },
    {
        "displayName": "rxEnvironment",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxEnvironment",
        "moduleName": "'encore.ui.rxEnvironment'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxEnvironment/rxEnvironment.module.js",
            "src/components/rxEnvironment/scripts/rxIfEnvironment.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>Component built to detect and provide the current environment (e.g. dev, staging, prod)</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxEnvironmentCtrl', function ($scope, Environment) {\n    $scope.Environment = Environment;\n});\n",
            "html": "<div ng-controller=\"rxEnvironmentCtrl\">\n    <p>Url built from Environment data: {{ { tld: 'cloudatlas', path: 'some/path' } | rxEnvironmentUrl }}</p>\n\n    <p>Content shows if on GitHub demo page:\n        <span rx-if-environment=\"ghPages\">\n            You're on the GitHub demo page\n        </span>\n    </p>\n\n    <p>Content shows if not on GitHub demo page:\n        <span rx-if-environment=\"!ghPages\">\n            You're not on the GitHub demo page\n        </span>\n    </p>\n\n    <p>\n    Are we in the <code>ghPages</code> environment? {{ 'ghPages' | rxEnvironmentMatch }}\n    </p>\n</div>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFloatingHeader",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxFloatingHeader",
        "moduleName": "'encore.ui.rxFloatingHeader'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxFloatingHeader/rxFloatingHeader.module.js",
            "src/components/rxFloatingHeader/scripts/rxFloatingHeader.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p><code>rxFloatingHeader</code> component maintains the visibility of column titles in a table as a user scrolls down the page.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxFloatingHeaderCtrl', function ($scope) {\n    $scope.searchText = '';\n    $scope.data = [\n        { name: 'First', value: 1 },\n        { name: 'A', value: 2 },\n        { name: 'B', value: 3 },\n        { name: 'C', value: 4 },\n        { name: 'D', value: 5 },\n        { name: 'E', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'Middle', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'G', value: 2 },\n        { name: 'H', value: 3 },\n        { name: 'I', value: 4 },\n        { name: 'J', value: 5 },\n        { name: 'K', value: 1 },\n        { name: 'Last', value: 2 }\n    ];\n\n    $scope.clearFilter = function () {\n        $scope.searchText = '';\n    };\n});\n",
            "html": "<table rx-floating-header class=\"no-filter\">\n    <thead>\n        <tr>\n            <th>Column One Header</th>\n            <th>Column Two Header</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class=\"first-row\">\n            <td>table1 data1</td>\n            <td>table1 data1</td>\n        </tr>\n        <tr>\n            <td>table1 data2</td>\n            <td>table1 data2</td>\n        </tr>\n        <tr>\n            <td>table1 data3</td>\n            <td>table1 data3</td>\n        </tr>\n        <tr class=\"middle-row\">\n            <td>table1 data4</td>\n            <td>table1 data4</td>\n        </tr>\n        <tr>\n            <td>table1 data5</td>\n            <td>table1 data5</td>\n        </tr>\n        <tr class=\"last-row\">\n            <td>table1 data6</td>\n            <td>table1 data6</td>\n        </tr>\n    </tbody>\n</table>\n\n<p>\n  A common pattern is to include a filter with tables. You can have that as part of the floating header by setting\n  it in a separate `&lt;tr&gt;` element.\n</p>\n\n\n<div ng-controller=\"rxFloatingHeaderCtrl\">\n    <table rx-floating-header class=\"filter\">\n        <thead>\n            <tr>\n                <th colspan=\"2\">\n                    <rx-search-box\n                        ng-model=\"searchText\"\n                        class=\"filter-box\"\n                        rx-placeholder=\"'Filter by any...'\"></rx-search-box>\n                </th>\n            </tr>\n            <tr>\n                <th>Column One Header</th>\n                <th>Column Two Header</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"datum in data | filter:searchText\"\n                class=\"row_{{datum.value}}\"\n                ng-class=\"{'first-row': $index===0, 'middle-row': $index===11, 'last-row': $index===21}\">\n                <td>{{datum.name}}</td>\n                <td>{{datum.value}}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
            "less": "/*\n * rxFloatingHeader\n */\n.rx-floating-header {\n  position: fixed;\n  z-index: 3;\n  opacity: 0.96;\n}\n\n\n// For tables with filters, style filter th differently\nth.filter-header {\n  font-weight: normal;\n  background: rgba(255, 255, 255, 0.95);\n\n  input.filter-box {\n    color: @gray-900;\n  }\n  button {\n    margin: 0;\n  }\n  [rx-form] {\n    margin: 10px 0;\n    rx-form-section {\n      margin: 0;\n      rx-field {\n        margin-bottom: 0;\n      }\n    }\n  }\n}\n\n// Batch actions menu is visible even when header floats\n// There's some black magic here. For whatever reason, we have to\n// add z-index:2 to the other rows in the header, *not* the row\n// that the batch actions menu lives in.\ntr.rx-floating-header:not(.rx-table-filter-row) {\n  z-index: 2;\n}\n\n// Added to accommodate dropdown boxes to display \"on top\" of rx-floating-header\n// components\nthead .rx-floating-header:first-child {\n  z-index: 3;\n}\n"
        }
    },
    {
        "displayName": "rxForm",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxForm",
        "moduleName": "'encore.ui.rxForm'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxForm/rxForm.module.js",
            "src/components/rxForm/scripts/rxField.js",
            "src/components/rxForm/scripts/rxFieldContent.js",
            "src/components/rxForm/scripts/rxFieldName.js",
            "src/components/rxForm/scripts/rxForm.js",
            "src/components/rxForm/scripts/rxFormFieldset.js",
            "src/components/rxForm/scripts/rxFormItem.js",
            "src/components/rxForm/scripts/rxFormSection.js",
            "src/components/rxForm/scripts/rxHelpText.js",
            "src/components/rxForm/scripts/rxInfix.js",
            "src/components/rxForm/scripts/rxInlineError.js",
            "src/components/rxForm/scripts/rxInput.js",
            "src/components/rxForm/scripts/rxPrefix.js",
            "src/components/rxForm/scripts/rxSuffix.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxForm/templates/rxFieldName.html",
            "templates/rxForm/templates/rxFormFieldset.html",
            "templates/rxForm/templates/rxFormItem.html"
        ],
        "docs": {
            "md": "<p><code>rxForm</code> component is used to create forms throughout Encore.  It provides common HTML layout and style for all form\nelements, which helps ensure form accessibility and makes creating advanced forms easier.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxFormDemoCtrl', function ($scope) {\n    /* ========== DATA ========== */\n    $scope.volumeTypes = [\n        {\n            'value': 'SATA',\n            'label': 'SATA'\n        },\n        {\n            'value': 'SSD',\n            'label': 'SSD'\n        },\n        {\n            'value': 'CD',\n            'label': 'CD'\n        },\n        {\n            'value': 'DVD',\n            'label': 'DVD'\n        },\n        {\n            'value': 'BLURAY',\n            'label': 'BLURAY'\n        },\n        {\n            'value': 'TAPE',\n            'label': 'TAPE'\n        },\n        {\n            'value': 'FLOPPY',\n            'label': 'FLOPPY'\n        },\n        {\n            'value': 'LASERDISC',\n            'label': 'LASERDISC'\n        },\n        {\n            'value': 'JAZDRIVE',\n            'label': 'JAZDRIVE'\n        },\n        {\n            'value': 'PUNCHCARDS',\n            'label': 'PUNCHCARDS'\n        },\n        {\n            'value': 'RNA',\n            'label': 'RNA'\n        }\n    ];\n\n    $scope.services = [\n        {\n            'value': 'good',\n            'label': 'Good Service'\n        },\n        {\n            'value': 'cheap',\n            'label': 'Cheap Service'\n        },\n        {\n            'value': 'fast',\n            'label': 'Fast Service'\n        },\n        {\n            'value': 'custom',\n            'label': 'Custom Service'\n        }\n    ];\n\n    $scope.beatles = [\n        'Paul McCartney',\n        'John Lennon',\n        'Ringo Starr',\n        'George Harrison'\n    ];\n\n    $scope.nevers = [\n        'Give you up',\n        'Let you down',\n        'Run around',\n        'Desert you',\n        'Make you cry',\n        'Say goodbye',\n        'Tell a lie',\n        'Hurt you'\n    ];\n\n    $scope.optionTableData = [\n        {\n            'id': 'option1_id',\n            'name': 'Option #1',\n            'value': 0,\n            'obj': {\n                'name': 'Nested Name 1'\n            }\n        }, {\n            'id': 'option2_id',\n            'name': 'Option #2',\n            'value': 1,\n            'obj': {\n                'name': 'Nested Name 2'\n            }\n        }, {\n            'id': 'option3_id',\n            'name': 'Option #3',\n            'value': 2,\n            'obj': {\n                'name': 'Nested Name 3'\n            }\n        }, {\n            'id': 'option4_id',\n            'name': 'Option #4',\n            'value': 3,\n            'obj': {\n                'name': 'Nested Name 4'\n            }\n        }\n    ];\n\n    $scope.optionTableColumns = [\n        {\n            'label': 'Name',\n            'key': 'name',\n            'selectedLabel': '(Already saved data)'\n        }, {\n            'label': 'Static Content',\n            'key': 'Some <strong>Text &</strong> HTML'\n        }, {\n            'label': 'Expression 2',\n            'key': '{{ value * 100 | number:2 }}'\n        }, {\n            'label': 'Expression 3',\n            'key': '{{ obj.name | uppercase }}'\n        }, {\n            'label': 'Expression 4',\n            'key': '{{ value | currency }}'\n        }\n    ];\n\n    $scope.optionTableCheckboxData = [\n        {\n            'name': 'Item 1'\n        }, {\n            'name': 'Item 2',\n            'value': 'checked',\n            'falseValue': 'unchecked'\n        }\n    ];\n\n    $scope.optionTableEmptyData = [];\n\n    /* ========== FUNCTIONS ========== */\n    $scope.disableOption = function (tableId, fieldId, rowId) {\n        return rowId === 'option4_id';\n    };\n\n    /* ========== FORM MODELS ========== */\n    $scope.simple = {\n        userEmail: '',\n        // TODO: use isNameRequired for rxFieldName \"required\" midway tests\n        // TODO: remove this comment after completed\n        isNameRequired: true,\n        volumeName: ''\n    };\n\n    $scope.intermediate = {\n        volumeType: _.first($scope.volumeTypes).value, // select the first type by default\n        services: [],\n        favoriteBeatle: 'all',\n        settings: {\n            first: true,\n            second: false,\n            third: true,\n            fourth: false\n        },\n        table: {\n            radio: 0,\n            checkbox: [true, 'unchecked'], // example with first checkbox automatically checked\n            empty: [true, 'unchecked']\n        }\n    };\n\n    $scope.advanced = {\n        radChoice: 'default',\n        inputEnabled: false\n    };\n});\n\n// A dummy directive only used within the rxForm demo page.\n// It's used to check that some string contains 'foo', and works\n// with ngForm to set the appropriate `.$error` value\n// Note: This code is easier to write in Angular 1.3, because\n// you can use `.$validators` instead of `.$parsers`\nangular.module('encore.ui.rxForm')\n.directive('foocheck', function () {\n    return {\n        require: 'ngModel',\n        link: function (scope, elm, attrs, ctrl) {\n            // Put a new validator on the beginning\n            ctrl.$parsers.unshift(function (viewValue) {\n                if (_.contains(viewValue, 'foo')) {\n                    ctrl.$setValidity('foocheck', true);\n                    return viewValue;\n                } else {\n                    ctrl.$setValidity('foocheck', false);\n                    return undefined;\n                }\n            });\n        }\n    };\n});\n",
            "html": "<div ng-controller=\"rxFormDemoCtrl\">\n  <form rx-form name=\"demoForm\" style=\"max-width: 1100px\">\n    <h2>Simple Controls</h2>\n\n    <h3>Text Inputs</h3>\n    <rx-help-text>\n      Three <code>rx-field</code> elements each consume between 250px and 1/3 of the width.\n    </rx-help-text>\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name id=\"fieldNamePlainTextbox\">Plain Textbox:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <input type=\"text\" id=\"txtPlain\" />\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n\n      <rx-field>\n        <rx-field-name>IP Address:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <input name=\"ipaddress\"\n              type=\"text\"\n              disabled\n              placeholder=\"127.0.0.1\" />\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n\n      <rx-field>\n        <rx-field-name>Monthly Cost:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-prefix>$</rx-prefix>\n            <input type=\"number\" />\n            <rx-suffix>million</rx-suffix>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <h2>Text Area</h2>\n    <rx-help-text>\n      One <code>rx-field</code> element consumes the full width.\n    </rx-help-text>\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name>Life Story:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <textarea name=\"lifeStory\" rows=\"10\"></textarea>\n          </rx-input>\n          <rx-help-text>\n            The <code>cols</code> attribute is moot, CSS will handle the width.\n          </rx-help-text>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n\n    <h2>Intermediate Controls</h2>\n\n    <h3>Text Inputs With Validation</h3>\n    <rx-help-text>\n      Two <code>rx-field</code> elements each consume between 250px and 1/2 of the width.\n    </rx-help-text>\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name\n          ng-required=\"simple.isNameRequired\"\n          id=\"fieldNameVolumeName\">Volume Name:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <input type=\"text\"\n              id=\"txtVolumeName\"\n              name=\"txtVolumeName\"\n              ng-model=\"simple.volumeName\"\n              ng-required=\"simple.isNameRequired\"\n              ng-pattern=\"/^\\b(\\w)?(\\w)\\w?\\2\\1$/\" />\n          </rx-input>\n          <rx-help-text>Must be 2-5 letter palindrome (e.g. 'dewed')</rx-help-text>\n          <rx-help-text>Bound Value: {{simple.volumeName}}</rx-help-text>\n\n          <rx-input>\n            <input rx-checkbox\n              id=\"chkVolumeNameRequired\"\n              ng-model=\"simple.isNameRequired\" />\n            <label for=\"chkVolumeNameRequired\">\n              Check and uncheck with empty volume name to see border\n            </label>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n\n      <rx-field>\n        <rx-field-name>Email Address:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <input name=\"userEmail\" type=\"email\" ng-model=\"simple.userEmail\" foocheck />\n          </rx-input>\n\n          <rx-help-text>Must contain foo.</rx-help-text>\n\n          <rx-inline-error ng-show=\"demoForm.userEmail.$error.email\">Invalid Email</rx-inline-error>\n          <rx-inline-error ng-show=\"demoForm.userEmail.$error.foocheck\">Your email must contain 'foo'</rx-inline-error>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <h3>Drop-Down Selection</h3>\n    <rx-form-section>\n      <!-- rxSelect -->\n      <rx-field>\n        <h4>Single Selection</h4>\n        <rx-field-name>Volume Type:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <select rx-select ng-model=\"intermediate.volumeType\" id=\"selVolumeType\">\n              <option ng-repeat=\"type in volumeTypes\"\n                value=\"{{type.value}}\"\n                ng-selected=\"{{type.value == model}}\">{{type.label}}</option>\n            </select>\n          </rx-input>\n          <rx-help-text>Bound Value: {{intermediate.volumeType}}</rx-help-text>\n        </rx-field-content>\n      </rx-field>\n\n      <!-- rxMultiSelect -->\n      <rx-field>\n        <h4>Multiple Selection</h4>\n        <rx-field-name>Service Options:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-multi-select ng-model=\"intermediate.services\" id=\"mselServices\">\n              <rx-select-option ng-repeat=\"service in services\" value=\"{{service.value}}\">{{service.label}}</rx-select-option>\n            </rx-multi-select>\n          </rx-input>\n          <rx-help-text>Bound Value: {{intermediate.services}}</rx-help-text>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <h3>Input Groups</h3>\n    <rx-form-section>\n      <!-- rxRadio -->\n      <rx-field>\n        <h4>Radio Group</h4>\n        <rx-field-name>Favorite Beatles Member:</rx-field-name>\n        <rx-field-content>\n          <rx-input ng-repeat=\"beatle in beatles\">\n            <input rx-radio\n              name=\"favBeatle\"\n              id=\"favBeatle_{{$index}}\"\n              value=\"{{beatle}}\"\n              ng-model=\"intermediate.favoriteBeatle\" />\n            <label for=\"favBeatle_{{$index}}\">{{beatle}}</label>\n          </rx-input>\n          <rx-input>\n            <input rx-radio\n              name=\"favBeatle\"\n              id=\"favBeatle_all\"\n              value=\"all\"\n              ng-model=\"intermediate.favoriteBeatle\" />\n            <label for=\"favBeatle_all\">All of the above</label>\n          </rx-input>\n          <rx-input>\n            <input rx-radio\n              name=\"favBeatle\"\n              id=\"favBeatle_none\"\n              value=\"none\"\n              disabled\n              ng-model=\"intermediate.favoriteBeatle\" />\n            <label for=\"favBeatle_none\">None of the above</label>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n\n      <!-- rxCheckbox -->\n      <rx-field>\n        <h4>Checkbox Group</h4>\n        <rx-field-name>Rick Astley Will Never:</rx-field-name>\n        <rx-field-content>\n          <rx-input ng-repeat=\"never in nevers\">\n            <input rx-checkbox\n              id=\"chkNever_{{$index}}\"\n              checked\n              value=\"{{never}}\" />\n            <label for=\"chkNever_{{$index}}\">{{never}}</label>\n          </rx-input>\n          <rx-input>\n            <input rx-checkbox\n              id=\"chkNever_all\"\n              value=\"all\"\n              checked\n              disabled />\n            <label for=\"chkNever_all\">All of the above</label>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n\n      <!-- rxToggleSwitch -->\n      <rx-field>\n        <h4>Toggle Switches</h4>\n        <rx-field-name>Settings:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-prefix>\n              <rx-toggle-switch\n                id=\"setting1\"\n                ng-model=\"intermediate.settings.first\"\n                ></rx-toggle-switch>\n              <label for=\"setting1\">Setting 1</label>\n            </rx-prefix>\n          </rx-input>\n\n          <rx-input>\n            <rx-prefix>\n              <rx-toggle-switch\n                id=\"setting2\"\n                ng-model=\"intermediate.settings.second\"\n                ></rx-toggle-switch>\n              <label for=\"setting2\">Setting 2</label>\n            </rx-prefix>\n          </rx-input>\n\n          <rx-input>\n            <rx-prefix>\n              <rx-toggle-switch\n                id=\"setting3\"\n                ng-model=\"intermediate.settings.third\"\n                disabled=\"true\"\n                ></rx-toggle-switch>\n              <label for=\"setting3\">Setting 3</label>\n            </rx-prefix>\n          </rx-input>\n\n          <rx-input>\n            <rx-prefix>\n              <rx-toggle-switch\n                id=\"setting4\"\n                ng-model=\"settings.fourth\"\n                disabled=\"true\"\n                ></rx-toggle-switch>\n              <label for=\"setting4\">Setting 4</label>\n            </rx-prefix>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <h3>rxOptionTable</h3>\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name>Radio Option Table</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-option-table\n                id=\"radioOptionTable\"\n                data=\"optionTableData\"\n                columns=\"optionTableColumns\"\n                type=\"radio\"\n                model=\"intermediate.table.radio\"\n                field-id=\"optionTable\"\n                selected=\"0\"\n                class=\"full-width\"\n                disable-fn=\"disableOption(tableId, fieldId, rowId)\"\n                ></rx-option-table>\n          </rx-input>\n          <rx-help-text>Bound Value: {{intermediate.table.radio}}</rx-help-text>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name>Checkbox Option Table</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-option-table\n                columns=\"optionTableColumns\"\n                type=\"checkbox\"\n                id=\"checkboxOptionTable\"\n                model=\"intermediate.table.checkbox\"\n                field-id=\"optionCheckboxTable\"\n                data=\"optionTableCheckboxData\"\n                required=\"true\"\n                ></rx-option-table>\n          </rx-input>\n          <rx-help-text ng-repeat=\"val in intermediate.table.checkbox\">\n            Item {{$index + 1}} Value: {{val}}\n          </rx-help-text>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name>Empty Option Table</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-option-table\n                columns=\"optionTableColumns\"\n                type=\"checkbox\"\n                id=\"emptyOptionTable\"\n                model=\"intermediate.table.empty\"\n                field-id=\"optionCheckboxTable\"\n                data=\"optionTableEmptyData\"\n                empty-message=\"You don't have any data!\"\n                ></rx-option-table>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n\n    <h2>Advanced Controls</h2>\n    <h3>With <code>stacked</code> section attribute</h3>\n    <rx-help-text>\n      To obtain a stacked layout, place the <code>stacked</code>\n      attribute on <code>rx-form-section</code>.\n    </rx-help-text>\n\n    <rx-form-section stacked>\n      <!-- Radio Option + Select -->\n      <rx-field>\n        <rx-field-name>Radio + Select</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-prefix>\n              <input rx-radio\n              id=\"radDefault\"\n              name=\"radAdvanced\"\n              ng-model=\"advanced.radChoice\"\n              value=\"default\" />\n              <label for=\"radDefault\">Default</label>\n            </rx-prefix>\n          </rx-input>\n          <rx-input>\n            <rx-prefix>\n              <input rx-radio\n                   id=\"radCustom\"\n                   name=\"radAdvanced\"\n                   ng-model=\"advanced.radChoice\"\n                   value=\"custom\" />\n              <label for=\"radCustom\">Custom:</label><br />\n            </rx-prefix>\n            <select rx-select ng-disabled=\"advanced.radChoice !== 'custom'\">\n              <option>Option 1</option>\n              <option>Option 2</option>\n              <option>Option 3</option>\n            </select>\n          </rx-input>\n          <rx-help-text>\n            Useful for condensing large radio groups.\n          </rx-help-text>\n        </rx-field-content>\n      </rx-field>\n\n      <!-- Checkbox + Text -->\n      <rx-field>\n        <rx-field-name>Checkbox + Text Input</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-prefix>\n              <input rx-checkbox ng-model=\"advanced.inputEnabled\" />\n              <label>Label:</label>\n            </rx-prefix>\n            <input type=\"text\"\n                   ng-disabled=\"!advanced.inputEnabled\"\n                   placeholder=\"Enter Text\" />\n          </rx-input>\n          <rx-help-text>\n            Useful for if you want the user to add an optional value, but displaying\n            the field as disabled by default.\n          </rx-help-text>\n        </rx-field-content>\n      </rx-field>\n\n    </rx-form-section>\n\n    <h3>With <code>controlled-width</code> section attribute</h3>\n    <rx-help-text>\n      To prevent fields from taking up too much horizontal space, use the <code>controlled-width</code> attribute on <code>rx-form-section</code>.\n      The fields will still stack if horizontal space is constrained, but they will not exceed a reasonable field width.\n    </rx-help-text>\n    <rx-form-section controlled-width>\n      <!-- Dropdown + Text + Dropdown -->\n      <rx-field>\n        <rx-field-name>Name:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-prefix>\n              <select rx-select>\n                <option></option>\n                <option>Mr.</option>\n                <option>Mrs.</option>\n                <option>Ms.</option>\n              </select>\n            </rx-prefix>\n            <input type=\"text\" />\n            <rx-suffix>\n              <select rx-select>\n                <option></option>\n                <option>Jr.</option>\n                <option>Sr.</option>\n              </select>\n            </rx-suffix>\n          </rx-input>\n          <rx-help-text>Dropdown + Text Input + Dropdown</rx-help-text>\n        </rx-field-content>\n      </rx-field>\n\n      <rx-field>\n        <rx-field-name>Search Box:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <rx-search-box\n              ng-model=\"demoSearch\"\n              rx-placeholder=\"'Filter by...'\"></rx-search-box>\n          </rx-input>\n          <rx-help-text>\n            Using <code>rx-search-box</code>.\n          </rx-help-text>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <h2>Advanced Text Area</h2>\n    <h3 class=\"subdued\">With additional info side-by-side.</h3>\n    <rx-form-section>\n      <rx-field>\n        <rx-field-name\n          id=\"fieldNameRequiredTextarea\"\n          ng-required=\"true\">Required Textarea:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <textarea\n              name=\"lifeStory\"\n              rows=\"10\"\n              ng-required=\"true\"\n              ng-model=\"lifeStory\"\n              rx-character-count></textarea>\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n\n      <div>\n        <rx-help-text>\n          <p>Oh look! It's using <code>rx-character-count</code></p>\n          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus id ligula sit amet rhoncus. Quisque semper mi vel tortor sodales, eget dapibus turpis consectetur. Ut tristique nibh porttitor diam porta finibus. Vivamus porttitor ligula sed ipsum rhoncus, id lobortis ex volutpat. Ut ut metus erat. Nam et convallis enim. Proin efficitur quam tortor, vitae hendrerit libero auctor ac. Sed vitae lobortis quam, quis commodo metus. Vestibulum felis arcu, consectetur ut vulputate nec, commodo ut odio.</p>\n        </rx-help-text>\n        <span ng-if=\"demoForm.lifeStory.$dirty\">\n          <rx-inline-error ng-show=\"demoForm.lifeStory.$error.required\">Cannot Be Blank</rx-inline-error>\n        </span>\n      </div>\n    </rx-form-section>\n\n    <!-- form actions, no special class required -->\n    <h2>Form Actions</h2>\n    <rx-help-text>No CSS class required</rx-help-text>\n    <rx-form-section>\n      <div>\n        <button class=\"button submit\" type=\"submit\">Submit Form</button>\n        <button class=\"button cancel\" type=\"submit\">Cancel</button>\n      </div>\n    </rx-form-section>\n  </form>\n</div>\n",
            "less": "/*\n * rxForm\n */\n\n@import \"vars\";\n@import \"mixins\";\n\n/* Form Fields & Fieldsets */\n\n// deprecated\n.rx-form {\n  margin: 15px 0 0;\n}\n\n// deprecated\n.form-item {\n  margin-top: 5px;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: baseline;\n}\n\n// deprecated\n.text-area-label {\n  &.form-item {\n    align-items: flex-start;\n  }\n}\n\n// deprecated\n.rx-form-fieldset > fieldset {\n  width: 100%;\n  .full-width .rx-option-table {\n    width: 100%;\n  }\n}\n\n// deprecated\n.form-description,\n.form-item {\n  margin-bottom: 15px;\n}\n\n// deprecated\n.field-label,\n.field-legend {\n  color: @inputLabelColor;\n  font-size: 1.1em;\n  flex: 0 0 @inputLabelWidth;\n}\n\n// deprecated\n.field-content {\n  display: flex;\n  flex: 1 auto;\n  flex-flow: row wrap;\n  justify-content: flex-start;\n  align-items: center;\n\n  .field-prefix,\n  .field-suffix {\n    font-size: 1.2em;\n  }\n  .field-prefix {\n    margin-right: 5px;\n  }\n  .field-suffix {\n    margin-left: 5px;\n  }\n\n  .field-description {\n    flex: 1 100%;\n    font-size: 0.8em;\n    font-style: italic;\n    margin-top: 5px;\n  }\n}\n\n/* Input fields */\n// deprecated\n.field-input {\n  input,\n  select {\n    color: @inputColor;\n    font-size: 1.2em;\n\n    &.ng-invalid.ng-dirty {\n      border-color: @inputBorderColorInvalid;\n    }\n  }\n\n  input,\n  .field-select {\n    background: @white;\n    max-width: 100%;\n    box-sizing: border-box;\n  }\n\n  textarea {\n    .inputBorderPadding;\n    background-color: @white;\n    width: 100%;\n    position: relative;\n    z-index: 2;\n    box-sizing: border-box;\n  }\n\n  input {\n    width: @inputWidth;\n    .inputBorderPadding;\n\n    &[type=\"number\"] {\n      width: @inputNumberWidth;\n    }\n\n    &[type=\"radio\"],\n    &[type=\"checkbox\"] {\n      width: auto;\n      max-width: none;\n      font-size: 1em;\n      vertical-align: middle;\n    }\n\n    &[disabled] {\n      color: @inputColorDisabled;\n      background-color: @inputBackgroundDisabled;\n      cursor: not-allowed;\n    }\n  }\n}\n\n/*\n * @bugfix Input field is marked as invalid before a user has done anything on form\n * @browsers FF\n * @see http://stackoverflow.com/questions/17209057/firefox-draws-red-border-on-required-select-box\n */\n// NOTE: KEEP\n.ng-pristine .field-input .ng-invalid-required {\n  box-shadow: none;\n}\n\n\n/* Inline error messages */\n// deprecated\n.field-input-wrapper {\n  .inline-error {\n    color: #ff2400;\n    font-weight: 900;\n    margin-top: 5px;\n  }\n}\n\n/* Dropdowns */\n// deprecated\n.field-select {\n  display: inline-block;\n  position: relative;\n  width: @inputSelectWidth;\n\n  select {\n    width: 100%;\n    margin: 0;\n    .border-radius(0);\n    background: @white;\n    border: 0;\n    outline: none;\n    display: inline-block;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    cursor: pointer;\n    .inputBorderPadding;\n  }\n\n  &:before {\n    // background so long text doesn't show behind caret\n    content: \"\";\n    right: 1px;\n    top: 1px;\n    width: 20px;\n    height: 93%;\n    background: @white;\n    position: absolute;\n    pointer-events: none;\n    display: block;\n  }\n\n  &:after {\n    // down caret from font awesome\n    content: \"\\f0d7\";\n    font-family: FontAwesome;\n    font-size: 15px;\n    color: #aaaaaa;\n    right: 10px;\n    top: 7px;\n    padding: 0;\n    position: absolute;\n    pointer-events: none;\n  }\n}\n\n/* Submit buttons */\n\n.form-actions {\n  padding: 20px 0;\n}\n\n// DEPRECATED - UNUSED\n.form-action {\n  // override default button styles\n  background: transparent;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  font-size: 1.2em;\n\n  &.submit {\n    color: @actionGreen;\n    margin-right: 1em;\n    &:hover,\n    &:focus {\n      color: @actionGreenHover;\n    }\n    &[disabled] {\n      color: @subduedText;\n      cursor: not-allowed;\n    }\n  }\n  &.cancel {\n    color: @subduedText;\n    &:hover,\n    &:focus {\n      color: @subduedTextHover;\n    }\n  }\n}\n\n\n/* Compressed Layout */\n// DEPRECATED - No longer valid\n.rx-form.layout-compressed {\n  .rx-form-row {\n    display: flex;\n    flex-wrap: nowrap;\n    flex: 1 auto;\n\n    .form-item {\n      padding: 0 3px;\n      flex: 1;\n    }\n  }\n\n  .form-item {\n    display: block;\n\n    .field-input {\n      width: 100%;\n      display: block;\n\n      select,\n      textarea {\n        width: 100%;\n      }\n\n      input {\n        &:not([type=\"checkbox\"]),\n        &:not([type=\"radio\"]) {\n          width: 100%;\n        }\n\n        &[type=\"checkbox\"],\n        &[type=\"radio\"] {\n          width: 1em;\n        }\n      }\n    }\n\n    .field-label,\n    .field-legend {\n      font-size: 0.8em;\n      display: block;\n    }\n  }\n\n  // This is selecting based off of the element so that we can be sure to set\n  // this if there is a prefix OR a suffix set. We can't assume they'll both\n  // always be there.\n  rx-form-item[suffix],\n  rx-form-item[prefix] {\n    .field-input {\n      display: inline-block;\n      width: auto;\n    }\n  }\n}\n\n\n/* NEW rxForm \"2.0\" STYLES  */\ninput,\ntextarea,\nselect {\n  box-sizing: border-box;\n  border: 0;\n  outline: none;\n}\n\n[rx-form],\nrx-form-section,\nrx-field,\nrx-field-name,\nrx-field-content,\nrx-input,\nrx-inline-error,\nrx-help-text {\n  box-sizing: border-box;\n  display: block;\n  margin: 0;\n  padding: 0;\n}\n\nrx-inline-error {\n  color: @rxForm-error-text-color;\n  font-weight: 900;\n}\n\nrx-help-text {\n  font-size: 0.8em;\n  font-style: italic;\n  margin: 1em 0em;\n}\n\nrx-field-name {\n  color: @app-label-text-color;\n  font-size: @app-label-font-size;\n\n  .wrapper {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n\n    .required-symbol {\n      font-weight: 900;\n      color: @app-required-symbol-color;\n    }\n  }\n}//rx-field-name\n\n[rx-form] {\n  font-size: @rxForm-font-size;\n  margin: @rxForm-gutter 0;\n\n  rx-field-name,\n  rx-help-text,\n  rx-inline-error,\n  rx-input {\n    margin-bottom: (@rxForm-gutter / 2);\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  rx-form-section {\n    // as flex container\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: flex-start;\n\n    margin: 0 (@rxForm-gutter / 2);\n\n    & > div,\n    rx-field {\n      margin: 0 (@rxForm-gutter / 2) (@rxForm-gutter * 1.25);\n\n      // http://www.w3.org/TR/css3-flexbox/images/rel-vs-abs-flex.svg\n      // as dynamic flex item (3rd arg acts like min-width)\n      flex: 1 0 @rxForm-field-min-width;\n    }\n\n    rx-field {\n      // as flex container\n      display: flex;\n      flex-flow: column nowrap;\n      justify-content: flex-start;\n\n      rx-field-content {\n        flex: 1 0 auto; // as flex item\n        margin-bottom: @rxForm-gutter;\n\n        &:last-child {\n          margin-bottom: 0;\n        }\n\n        .validInput() {\n          padding: 3px 5px;\n          border: 1px solid @rxForm-input-border-color;\n        }//.validInput()\n\n        .invalidInput() {\n          border: 2px solid @rxForm-invalid-input-border-color;\n          // MUST differ with valid padding by 1px to\n          // account for thicker border\n          padding: 2px 4px;\n        }//.invalidInput()\n\n        .disabledInput() {\n          border: 1px solid @rxForm-input-border-color;\n          color: @app-disabled-text-color;\n          background: @app-disabled-background-color;\n          cursor: not-allowed !important; // lesshint importantRule: false\n        }//.disabledInput()\n\n        rx-input {\n          // as a flex container\n          display: flex;\n          flex-flow: row nowrap;\n          justify-content: flex-start;\n          align-items: stretch;\n\n         .button {\n            margin-bottom: 0;\n          }\n\n          & > input,\n          & > textarea {\n            flex: 1 1 auto; // as dynamic flex item\n\n            min-height: @rxForm-input-min-height;\n\n            &,\n            &.ng-valid {\n              .validInput();\n            }\n\n            &.ng-invalid.ng-dirty {\n              .invalidInput();\n\n              // DISABLED STYLING\n              // (these should trump all other styles)\n              &[disabled] {\n                .disabledInput();\n              }\n            }\n\n            // DISABLED STYLING\n            // (these should trump all other styles)\n            &[disabled] {\n              .disabledInput();\n            }\n          }\n\n          rx-prefix,\n          rx-suffix,\n          rx-infix {\n            box-sizing: border-box;\n            min-height: @rxForm-input-min-height;\n            padding: 0 (@rxForm-gutter / 4);\n            flex: 0 0 auto; // as static flex item\n\n            // as flex container\n            display: flex;\n            align-items: center; // content is vertically centered\n          }\n\n          rx-prefix:first-child {\n            padding-left: 0;\n          }\n          rx-suffix:last-child {\n            padding-right: 0;\n          }\n\n          /* ===== Other Directive Support ===== */\n          .rxSelect {\n            flex: 1 1 auto; // as dynamic flex item\n          }\n\n          rx-multi-select {\n            flex: 1 1 auto; // as dynamic flex item\n          }\n\n          rx-date-picker {\n            flex: 0 0 auto; // as static flex item\n          }\n\n          .rxCheckbox,\n          .rxRadio,\n          rx-toggle-switch {\n            flex: 0 0 auto; // as static flex item\n\n            & + label {\n              margin-left: 5px;\n            }\n          }\n\n          .rxCheckbox,\n          .rxRadio,\n          rx-toggle-switch {\n            &[disabled] + label {\n              color: @app-disabled-text-color;\n            }\n          }\n\n          .rx-option-table {\n            table-layout: fixed;\n            width: 100%;\n          }\n\n          // rxCharacterCount support\n          .counted-input-wrapper {\n            flex: 1 0;\n\n            input,\n            textarea {\n              width: 100%;\n\n              .validInput();\n\n              &.ng-invalid.ng-dirty {\n                .invalidInput();\n\n                // DISABLED STYLING\n                // (these should trump all other styles)\n                &[disabled] {\n                  .disabledInput();\n                }\n              }\n\n              // DISABLED STYLING\n              // (these should trump all other styles)\n              &[disabled] {\n                .disabledInput();\n              }\n            }\n          }\n\n          rx-search-box {\n            flex: 1 1;\n          }\n        }//rx-input\n      }//rx-field-content\n    }//rx-field\n\n    // replaces .form-actions\n    // [rx-form] > rx-form-section > div\n    & > div {\n      margin-top: (@rxForm-gutter / 2);\n\n      .button {\n        margin: 2px;\n\n        &:first-of-type {\n          margin-left: 0;\n        }\n        &:last-of-type {\n          margin-right: 0;\n        }\n      }\n    }\n\n    &[stacked] {\n      flex-flow: column nowrap;\n\n      & > div,\n      rx-field {\n        flex: 1 0; // grows vertically, does not shrink\n        max-width: @rxForm-field-max-width;\n        margin-bottom: (@rxForm-gutter * 1.25);\n      }\n    }\n\n    &[controlled-width] {\n      & > div,\n      rx-field {\n        max-width: @rxForm-field-max-width;\n      }\n    }\n  }//rx-form-section\n}//[rx-form]\n"
        }
    },
    {
        "displayName": "rxInfoPanel",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxInfoPanel",
        "moduleName": "'encore.ui.rxInfoPanel'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxInfoPanel/rxInfoPanel.module.js",
            "src/components/rxInfoPanel/scripts/rxInfoPanel.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxInfoPanel/templates/rxInfoPanel.html"
        ],
        "docs": {
            "md": "<p>This is a generic info panel intended for use at the top of pages.</p>\n",
            "js": "",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<rx-info-panel panel-title=\"A Custom Title\">\n    You can put whatever content you want to inside here\n</rx-info-panel>\n",
            "less": "/*\n * rxInfoPanel\n */\n.info-panel {\n  clear: both;\n  background: @white;\n  border-color: @blue-700;\n  border-width: 0 5px 5px 5px;\n  border-style: solid;\n  padding: 0 10px 10px 10px;\n  overflow: hidden;\n\n  .info-title {\n    background: @blue-700;\n    color: @white;\n    width: 100%;\n    padding: 8px 10px;\n    margin: 0 0 10px -10px;\n  }\n}\n"
        }
    },
    {
        "displayName": "rxLogout",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxLogout",
        "moduleName": "'encore.ui.rxLogout'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxLogout/rxLogout.module.js",
            "src/components/rxLogout/scripts/rxLogout.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>The rxLogout component provides logic to apply logout functionality to an element.</p>\n",
            "js": "",
            "html": "<div>\n    <button rx-logout id=\"rxLogout\">Logout</button>\n    <button rx-logout=\"/overview\">Logout (with custom redirect)</button>\n</div>",
            "less": ""
        }
    },
    {
        "displayName": "rxMisc",
        "stability": "unstable",
        "description": "A module for shared functionality across framework components.",
        "isLegacy": true,
        "keywords": [],
        "name": "rxMisc",
        "moduleName": "'encore.ui.rxMisc'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxMisc/rxMisc.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxMiscCtrl', function ($scope, $timeout, $q, rxNotify, rxAutoSave) {\n    $scope.formData = {\n        checkbox: false,\n        name: '',\n        description: '',\n        sensitive: ''\n    };\n\n    var autosave = rxAutoSave($scope, 'formData', {\n        exclude: ['sensitive'],\n        ttl: 86400000\n    });\n\n    $scope.status = {\n        loading: false,\n        disable: false,\n        deferredLoading: false,\n        deferredDisable: false\n    };\n\n    var clearMsg = [\n        'rxAutoSave data has been cleared!',\n        'Navigate away and return, and the form will not be auto-populated'\n    ].join(' ');\n\n    // Clear with an explicit autosave.clear() call\n    $scope.clearStorage = function () {\n        $scope.status.loading = true;\n        $timeout(function () {\n            $scope.status.loading = false;\n            autosave.clear();\n            rxNotify.add(clearMsg, { type: 'success' });\n        }, 1000);\n    };\n\n    // Clear by resolving the associated promise\n    $scope.deferredClear = function () {\n        var deferred = $q.defer();\n\n        autosave.clearOnSuccess(deferred.promise);\n        $scope.status.deferredLoading = true;\n\n        $timeout(function () {\n            $scope.status.deferredLoading = false;\n            deferred.resolve();\n            rxNotify.add(clearMsg, { type: 'success' });\n        }, 1000);\n    };\n});\n",
            "html": "<div ng-controller=\"rxMiscCtrl\">\n    <h3>Form with automatically saved state</h3>\n    <p>\n        Try entering some data into this form, and then navigating away to a different page. When you return here,\n        the form data will automatically be populated with what you had previously entered.\n    </p>\n    <p>\n        Once you've tried that, you can clear the stored data with either of the \"Clear\" buttons below. Clicking those\n        will <em>not</em> erase the form, but will erase the rxAutoSave stored data. If you navigate away after clicking\n        one of the buttons, and then return here, the form will not be auto-populated, because rxAutoSave will have no data for it!\n    </p>\n\n    <p>\n        Finally, we have set a Time-To-Live of 24 hours for this form, and explicitly told it not to save the \"Sensitive data\" field\n        into storage. If you enter data here, and come back &gt;24 hours later, the form will not be auto-populated, as the data will\n        have expired.\n    </p>\n    <form name=\"demoForm\" rx-form>\n      <rx-form-section stacked>\n        <rx-field>\n          <rx-field-name>A checkbox field!:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input rx-checkbox id=\"chkCheckbox\" ng-model=\"formData.checkbox\" />\n              <label for=\"chkCheckbox\">I likely don't disagree</label>\n            </rx-input>\n            <div class=\"subdued\">\n              <div ng-if=\"formData.checkbox\" ng-hide=\"formData.hideCheckbox\">\n                I am possibly not un-authorizing the above: {{ formData.checkbox }}\n              </div>\n              <a id=\"hideCheckbox\" ng-click=\"formData.hideCheckbox = !formData.hideCheckbox\" ng-if=\"formData.checkbox\">\n                ({{ formData.hideCheckbox ? 'Show' : 'Hide this' }} message)\n              </a>\n            </div>\n          </rx-field-content>\n        </rx-field>\n\n        <rx-field>\n          <rx-field-name>Name:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input type=\"text\" ng-model=\"formData.name\" />\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n\n        <rx-field>\n          <rx-field-name>Description:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <textarea rows=\"10\" ng-model=\"formData.description\"></textarea>\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n\n        <rx-field>\n          <rx-field-name>Sensitive Data:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input type=\"text\" ng-model=\"formData.sensitive\" />\n            </rx-input>\n            <rx-help-text>We'll tell rxAutoSave NOT to save this data.</rx-help-text>\n          </rx-field-content>\n        </rx-field>\n      </rx-form-section>\n\n      <rx-form-section>\n        <div>\n          <rx-button\n              ng-click=\"clearStorage()\"\n              toggle=\"status.loading\"\n              default-msg=\"Clear rxAutoSave\"\n              toggle-msg=\"Clearing rxAutoSave data\"\n              disable=\"status.disable\">\n          </rx-button>\n\n          <rx-button\n              ng-click=\"deferredClear()\"\n              toggle=\"status.deferredLoading\"\n              default-msg=\"Clear rxAutoSave by resolving a promise\"\n              toggle-msg=\"Clearing rxAutoSave data\"\n              disable=\"status.deferredDisable\">\n          </rx-button>\n        </div>\n      </rx-form-section>\n    </form>\n\n</div>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxModalAction",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxModalAction",
        "moduleName": "'encore.ui.rxModalAction'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxModalAction/rxModalAction.module.js",
            "src/components/rxModalAction/scripts/rxModalAction.js",
            "src/components/rxModalAction/scripts/rxModalFooter.js",
            "src/components/rxModalAction/scripts/rxModalForm.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxModalAction/templates/rxModalAction.html",
            "templates/rxModalAction/templates/rxModalActionForm.html",
            "templates/rxModalAction/templates/rxModalFooters.html"
        ],
        "docs": {
            "md": "<p>The rxModalAction component provides a hook to open and perform operations on a modal window.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxModalActionCtrl', function ($scope, rxNotify) {\n    $scope.password = 'guest';\n\n    $scope.populate = function (modalScope) {\n        modalScope.user = 'hey_dude';\n    };\n\n    $scope.changePass = function (fields) {\n        $scope.password = fields.password;\n        rxNotify.add('Password Updated!', {\n            type: 'success'\n        });\n    };\n\n    $scope.notifyDismissal = function () {\n        rxNotify.add('Password Unchanged', {\n            type: 'info'\n        });\n    };\n})\n.controller('rxModalStateCtrl', function ($scope, $modalInstance, $timeout, rxNotify) {\n    var complete = function () {\n        $scope.loaded = true;\n        $scope.setState('complete');\n        rxNotify.add('Operation Success!', {\n            stack: 'modal',\n            type: 'success'\n        });\n    };\n\n    $scope.submit = function () {\n        $scope.setState('confirm');\n    };\n\n    $scope.confirm = function () {\n        $scope.loaded = false;\n        $scope.setState('pending');\n        rxNotify.add('Performing Operation...', {\n            stack: 'modal',\n            loading: true,\n            dismiss: [$scope, 'loaded']\n        });\n        $timeout(complete, 2000);\n    };\n\n    $scope.cancel = function () {\n        rxNotify.clear('modal');\n\n        /*\n         * You may place custom dismiss logic here,\n         * if you do not wish to use a `dismiss-hook` function.\n         **/\n\n        // This must be called to dismiss the modal.\n        $modalInstance.dismiss();\n    };\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxModalActionCtrl\">\n\n    <h3>Regular Modals</h3>\n    <p>Use modals whenever a user needs to take an action that needs their\n    attention, or you want to interrupt a user's current task to redirect a \n    user's full attention to something more important.</p>\n\n    <p>Password: {{password}}</p>\n    <p>\n        <rx-modal-action\n            pre-hook=\"populate(this)\"\n            post-hook=\"changePass(fields)\"\n            dismiss-hook=\"notifyDismissal()\"\n            classes=\"button\"\n            template-url=\"changePassword.html\"\n            id=\"modChangePassword\">\n            Change Password\n        </rx-modal-action>\n    </p>\n\n    <h3>Multi-View Modals</h3>\n    <p>A multi-view modal breaks apart complex interactions so modal content\n    isn't too long. Multi-view modals also work well when the user must \n    complete multiple sequential steps.</p>\n\n    <p>It works for cases when removing or deleting something needing a\n    confirmation click, such as \"Are You Sure you want to Remove this?\"</p>\n\n    <p>\n        <rx-modal-action\n            classes=\"button\"\n            controller=\"rxModalStateCtrl\"\n            template-url=\"multiview.html\"\n            disable-esc>\n            Multi-View Example\n        </rx-modal-action>\n\n    </p>\n    <p>\n\n        <rx-modal-action\n            controller=\"rxModalStateCtrl\"\n            template-url=\"multiview.html\"\n            id=\"disabledModal\">\n            Multi-View Example\n        </rx-modal-action>\n\n    </p>\n\n    <p>\n        <h3> Disabled Modal </h3>\n\n        <rx-modal-action\n            disabled=\"true\"\n            classes=\"button\"\n            controller=\"rxModalStateCtrl\"\n            template-url=\"multiview.html\"\n            id=\"btnDisabledModal\">\n            Edit Account\n        </rx-modal-action>\n\n    </p>\n\n    <p>\n        <rx-modal-action\n            disabled=\"'user' !== 'racker'\"\n            controller=\"rxModalStateCtrl\"\n            template-url=\"multiview.html\"\n            id=\"lnkDisabledModal\">\n            Edit Account\n        </rx-modal-action>\n\n    </p>\n\n    <script type=\"text/ng-template\" id=\"changePassword.html\">\n        <rx-modal-form rx-form\n            title=\"Change {{user}} Admin Password\"\n            submit-text=\"Submit Password\"\n            cancel-text=\"Cancel Request\"\n            subtitle=\"Please read instructions below\">\n            <rx-form-section>\n              <rx-field>\n                <rx-help-text>\n                  <h1>Password must:</h1>\n                  <ul class=\"list\">\n                    <li>have at least one uppercase letter</li>\n                    <li>have at least one number</li>\n                    <li>be inspirational</li>\n                    <li>be in haiku form</li>\n                    <li>reference Star Wars</li>\n                  </ul>\n                </rx-help-text>\n                <rx-field-name ng-required=\"true\">New Password:</rx-field-name>\n                <rx-field-content>\n                  <rx-input>\n                    <input type=\"text\" name=\"password\" ng-model=\"fields.password\" required=\"true\" />\n                  </rx-input>\n                  <rx-inline-error class=\"error-message\" ng-show=\"modalActionForm.password.$error.required\">This field is required.</rx-inline-error>\n                </rx-field-content>\n              </rx-field>\n            </rx-form-section>\n        </rx-modal-form>\n    </script>\n\n    <script type=\"text/ng-template\" id=\"multiview.html\">\n        <rx-modal-form title=\"State-Changing Modal\"\n            submit-text=\"Send Request\"\n            return-text=\"Finish &amp; Close\">\n            <rx-notifications stack=\"modal\"></rx-notifications>\n            <div ng-switch=\"state\">\n                <div ng-switch-when=\"editing\">\n                    <p>Press \"Send Request\" to start the fake process.</p>\n                </div>\n                <div ng-switch-when=\"confirm\">\n                    <h3>Are you sure you want to continue?</h3>\n                    <p>This action cannot be undone.</p>\n                </div>\n                <p ng-switch-when=\"pending\">Man, this takes forever!</p>\n                <p ng-switch-when=\"complete\">Nothing left to do here.</p>\n            </div>\n        </rx-modal-form>\n\n        <rx-modal-footer state=\"confirm\">\n            <button class=\"button\" ng-click=\"confirm()\">Yes</button>\n            <button class=\"button cancel\" ng-click=\"setState('editing')\">No</button>\n        </rx-modal-footer>\n    </script>\n\n    <h3>Do's and Don'ts</h3>\n    <ul>\n        <li>Do use modals to perform actions requiring the users full attention.</li>\n        <li>Don't display a modal without an action button, or a way to close the modal by closing the modal via X or pressing the Cancel button.</li>\n        <li>Don't use modals as pop-ups, having them appear without the user clicking something</li>\n        <li>Don't use modals referring to information on the originating page</li>\n        <li>Don't use a modal to display a set of info or metadata without any direct actions</li>\n    </ul>\n\n</div>\n",
            "less": "@import \"mixins\";\n@import \"vars\";\n\n/**\n * rxModalAction.less\n *\n * Stylesheet for modals, repurposed from the modal component of http://angular-ui.github.io/bootstrap\n *\n * @version 1.0\n * @author Ernie Hsiung\n */\n\n .modal-link {\n     &[disabled],\n     &[disabled]:hover {\n         cursor: not-allowed;\n         color: @gray-600;\n\n         &.button {\n             background-color: @gray-300;\n         }\n     }\n }\n\n.modal,\n.modal-backdrop {\n  .transition();\n  .opacity(0);\n  &.fade.in {\n    .opacity(1);\n  }\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background: @black;\n  &.fade.in {\n    .opacity(0.4);\n  }\n}\n\n.modal {\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  z-index: 1050;\n  width: 560px;\n  background: @white;\n  border: 1px solid rgba(0, 0, 0, 0.3);\n  transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  -moz-transform: translate(-50%, 0);\n  .box-shadow(0 3px 7px rgba(0, 0, 0, 0.3));\n  .background-clip();\n  outline: none;\n}\n\n.modal-header {\n  padding: @rxModalAction-padding;\n  border-bottom: 1px solid @gray-200;\n  position: relative;\n\n  .modal-title {\n    line-height: 1;\n    font-size: 1.75em;\n    margin: 0;\n  }\n  .modal-subtitle {\n    line-height: 1.5;\n    font-size: 1em;\n    font-wieght: bold;\n    color: @gray-700;\n    margin: 0;\n  }\n  .modal-close {\n    position: absolute;\n    top: @rxModalAction-padding;\n    right: @rxModalAction-padding;\n    font-size: 2em;\n    width: 1em;\n    height: 1em;\n    text-align: center;\n    color: @gray-600;\n    &:hover,\n    &:focus {\n      color: @gray-800;\n    }\n\n    &:before {\n      content: \"\\00D7\";\n      position: absolute;\n      line-height: 0;\n      right: 0;\n      width: 1em;\n    }\n  }\n}\n.modal-body {\n  position: relative;\n  overflow-y: auto;\n  max-height: 400px;\n  padding: @rxModalAction-body-padding @rxModalAction-padding;\n\n  .loading {\n    margin: 0 auto;\n    width: 1em;\n  }\n\n  .form-radio {\n    border: 0;\n  }\n\n  .rx-form.modal-form {\n    margin: 0;\n  }\n}\n\n.modal-footer {\n  padding: @rxModalAction-padding;\n  border-top: 1px solid @gray-200;\n}\n\n@media (max-width:480px) {\n  @padding: 10px;\n  .modal {\n    position: absolute;\n    top: @padding;\n    left: @padding;\n    right: @padding;\n  }\n  .modal-header .close {\n    padding: @padding;\n    margin: -@padding;\n  }\n}\n"
        }
    },
    {
        "displayName": "rxMultiSelect",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxMultiSelect",
        "moduleName": "'encore.ui.rxMultiSelect'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxMultiSelect/rxMultiSelect.module.js",
            "src/components/rxMultiSelect/scripts/rxMultiSelect.js",
            "src/components/rxMultiSelect/scripts/rxSelectOption.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxMultiSelect/templates/rxMultiSelect.html",
            "templates/rxMultiSelect/templates/rxSelectOption.html"
        ],
        "docs": {
            "md": "<p>This component is a multi-select dropdown with checkboxes for each option. It is a replacement for <code>&lt;select multiple&gt;</code> when space is an issue, such as in the header of a table.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxMultiSelectCtrl', function ($scope) {\n    $scope.data = {\n        classification: []\n    };\n\n    $scope.validEnabled = 'C';\n    $scope.validDisabled = '';\n\n    $scope.invalidEnabled = 'D';\n    $scope.invalidDisabled = '';\n\n});\n",
            "html": "<div ng-controller=\"rxMultiSelectCtrl\">\n  <h3>rxMultiSelect Input</h3>\n  <p class=\"multi-select-container\">\n    <span class=\"field-label\">Classification:</span>\n    <rx-multi-select ng-model=\"data.classification\" id=\"classification\">\n      <rx-select-option value=\"A\">Type A</rx-select-option>\n      <rx-select-option value=\"B\">Type B</rx-select-option>\n      <rx-select-option value=\"C\">Type C</rx-select-option>\n      <rx-select-option value=\"D\">Type D</rx-select-option>\n    </rx-multi-select>\n  </p>\n  <span>Model value: [{{ data.classification.join(', ') }}]</span>\n\n  <p class=\"multi-select-container\">\n    <span class=\"field-label\">Disabled rxMultiSelect:</span>\n    <rx-multi-select ng-model=\"data.other\" ng-disabled=\"true\">\n      <rx-select-option value=\"Not allowed\"></rx-select-option>\n    </rx-multi-select>\n  </p>\n  <br />\n\n  <h3>rxMultiSelect States</h3>\n  <p>\n    Below you'll find examples of how <code>rxMultiSelect</code> will appear in different states.\n  </p>\n\n  <table>\n    <thead>\n      <tr>\n        <th></th>\n        <th>Enabled</th>\n        <th>Disabled</th>\n      </tr>\n    </thead>\n    <tbody>\n      <!-- Valid States -->\n      <tr>\n        <th>Valid</th>\n        <!-- Valid Enabled -->\n        <td>\n          <rx-multi-select\n            id=\"msValidEnabled\"\n            ng-model=\"validEnabled\">\n\n            <rx-select-option value=\"A\">Type A</rx-select-option>\n            <rx-select-option value=\"B\">Type B</rx-select-option>\n            <rx-select-option value=\"C\">Type C</rx-select-option>\n            <rx-select-option value=\"D\">Type D</rx-select-option>\n          </rx-multi-select>\n        </td>\n        <!-- Valid Disabled -->\n        <td>\n          <rx-multi-select\n            id=\"msValidDisabled\"\n            ng-model=\"validDisabled\"\n            ng-disabled=\"true\">\n\n            <rx-select-option value=\"Not allowed\">Not Allowed</rx-select-option>\n          </rx-multi-select>\n        </td>\n      </tr>\n      <!-- Invalid States -->\n      <tr>\n        <th>Invalid</th>\n        <!-- Invalid Enabled -->\n        <td>\n          <rx-multi-select\n            id=\"msInvalidEnabled\"\n            ng-model=\"invalidEnabled\"\n            always-invalid>\n\n            <rx-select-option value=\"A\">Type A</rx-select-option>\n            <rx-select-option value=\"B\">Type B</rx-select-option>\n            <rx-select-option value=\"C\">Type C</rx-select-option>\n            <rx-select-option value=\"D\">Type D</rx-select-option>\n          </rx-multi-select>\n        </td>\n\n        <!-- Invalid Disabled -->\n        <td>\n          <rx-multi-select\n            id=\"msInvalidDisabled\"\n            ng-model=\"invalidDisabled\"\n            always-invalid\n            ng-disabled=\"true\">\n\n            <rx-select-option value=\"Not allowed\">Not Allowed</rx-select-option>\n          </rx-multi-select>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n",
            "less": "/*\n * rxMultiSelect\n */\nrx-multi-select {\n  #vars.rxMultiSelect();\n  z-index: auto;\n  box-sizing: border-box;\n  display: block;\n  color: @container-list-text-color;\n  background: @container-background-color;\n  position: relative;\n\n  // Element should be resizable via wrapper alone\n  min-width: @container-min-width;\n\n  border: 1px solid @container-border-color;\n\n  .control {\n    box-sizing: border-box;\n    display: flex;\n    flex-flow: row no-wrap;\n    justify-content: space-around;\n    align-items: stretch;\n    height: @container-height;\n    cursor: pointer;\n\n    .preview {\n      flex: 1 1;\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      margin: 0 5px;\n      overflow: hidden;\n      white-space: nowrap;\n    }\n\n    .select-trigger {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex: 0 0 @trigger-width;\n      color: @trigger-color;\n    }\n  }\n\n  .menu {\n    z-index: 100;\n    position: absolute;\n    cursor: pointer;\n    top: -1px;\n    left: -1px;\n    width: 100%;\n    border: 1px solid @container-border-color;\n    background: @container-background-color;\n    box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.35);\n  }\n\n  .disabled() {\n    color: @container-list-disabled-text-color;\n    cursor: not-allowed ;\n    border-color: @container-disabled-border-color;\n    border-width: @container-border-width;\n    background: @container-disabled-background-color;\n\n    .select-trigger {\n      background: @trigger-disabled-background-color;\n      border-left-color: @trigger-disabled-color;\n      color: @trigger-disabled-color;\n    }\n  }//.disabled()\n\n  &.ng-invalid.ng-dirty {\n    border-color: @container-invalid-border-color;\n    border-width: 2px;\n\n    .select-trigger {\n      color: @trigger-invalid-color;\n    }\n\n    &[disabled] {\n      .disabled();\n    }\n  }//.ng-invalid.ng-dirty\n\n  &[disabled] {\n    .disabled();\n  }\n\n  rx-select-option[value=\"all\"] label {\n    border-bottom: 1px solid @container-border-color;\n  }\n\n  .backdrop {\n    z-index: 90;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: transparent;\n  }\n}//rx-multi-select\n\n.rx-select-option {\n  label {\n    display: block;\n    padding: 4px 6px;\n\n    &:hover {\n      background: @blue-100;\n      cursor: pointer;\n    }\n  }\n\n  .rxCheckbox {\n    width: @app-font-size;\n    height: @app-font-size;\n    vertical-align: middle;\n  }\n}//.rx-select-option\n"
        }
    },
    {
        "displayName": "rxNotify",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxNotify",
        "moduleName": "'encore.ui.rxNotify'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxNotify/rxNotify.module.js",
            "src/components/rxNotify/scripts/rxNotification.js",
            "src/components/rxNotify/scripts/rxNotifications.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxNotify/templates/rxNotification.html",
            "templates/rxNotify/templates/rxNotifications.html"
        ],
        "docs": {
            "md": "<p>The rxNotify component provides status message notifications on a page.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxNotifyCtrl', function ($rootScope, $scope, $window, rxNotify) {\n    $scope.message = 'My message';\n\n    $scope.types = [ 'info', 'success', 'warning', 'error' ];\n\n    $scope.options = {\n        type: 'info',\n        timeout: -1,\n        show: 'immediate',\n        repeat: true\n    };\n\n    $scope.ondismiss = {\n        should: false,\n        method: function (msg) {\n            $window.alert('We are dismissing the message: ' + msg.text);\n        }\n    };\n\n    $scope.routeChange = function (stack) {\n        $rootScope.$broadcast('$routeChangeStart', {});\n        $rootScope.$broadcast('$routeChangeSuccess', {});\n\n        rxNotify.add('Route Changed', {\n            stack: stack\n        });\n    };\n\n    $scope.add = function (stack) {\n        var messageOptions = _.clone($scope.options);\n\n        if ($scope.ondismiss.should) {\n            messageOptions.ondismiss = _.clone($scope.ondismiss.method);\n        }\n\n        messageOptions.stack = stack;\n\n        rxNotify.add($scope.message, messageOptions);\n    };\n\n    // add a default messages (to custom stack so they don't show on the main page)\n    rxNotify.add('Helpful Information', {\n        stack: 'demo'\n    });\n    rxNotify.add('Loading', {\n        loading: true,\n        stack: 'demo'\n    });\n    rxNotify.add('You did it!', {\n        type: 'success',\n        stack: 'demo'\n    });\n    rxNotify.add('Careful now...', {\n        type: 'warning',\n        stack: 'demo'\n    });\n    rxNotify.add('Under Attack by Aliens', {\n        type: 'error',\n        stack: 'custom'\n    });\n\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxNotifyCtrl\">\n  <div layout=\"row\">\n    <div rx-form flex>\n      <rx-form-section>\n        <rx-field>\n          <rx-field-name>Message Text:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input type=\"text\" ng-model=\"message\" />\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n\n        <rx-field>\n          <rx-field-name>Timeout:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input type=\"number\" min=\"-1\" ng-model=\"options.timeout\" />\n              <rx-suffix>seconds</rx-suffix>\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n      </rx-form-section>\n\n      <rx-form-section>\n        <rx-field>\n          <rx-field-name>Type:</rx-field-name>\n          <rx-field-content>\n            <rx-input ng-repeat=\"type in types\">\n              <input rx-radio name=\"notify-type\" id=\"radType_{{$index}}\" ng-model=\"options.type\" value=\"{{type}}\" />\n              <label for=\"radType_{{$index}}\">{{type| rxCapitalize}}</label>\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n\n        <rx-field>\n          <rx-field-name>Show:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input rx-radio name=\"notify-show\" id=\"radNotify_immediate\" ng-model=\"options.show\" value=\"immediate\" />\n              <label for=\"radNotify_immediate\">Immediately</label>\n            </rx-input>\n            <rx-input>\n              <input rx-radio name=\"notify-show\" id=\"radNotify_next\" ng-model=\"options.show\" value=\"next\" />\n              <label for=\"radNotify_next\">Next</label>\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n      </rx-form-section>\n\n      <rx-form-section>\n        <rx-field>\n          <rx-field-name>Options:</rx-field-name>\n          <rx-field-content>\n            <rx-input>\n              <input rx-checkbox id=\"chkRepeat\" ng-model=\"options.repeat\" />\n              <label for=\"chkRepeat\">Repeat</label>\n            </rx-input>\n            <rx-input>\n              <input rx-checkbox id=\"chkAlertOnDismiss\" ng-model=\"ondismiss.should\" />\n              <label for=\"chkAlertOnDismiss\">Alert On Dismiss</label>\n            </rx-input>\n            <rx-input>\n              <input rx-checkbox id=\"chkLoading\" ng-model=\"options.loading\" />\n              <label for=\"chkLoading\">Loading? (shows spinner)</label>\n            </rx-input>\n          </rx-field-content>\n        </rx-field>\n      </rx-form-section>\n\n      <rx-form-section>\n        <div>\n          <button class=\"button\" ng-click=\"add('demo')\">Add to Demo Stack</button>\n          <button class=\"button\" ng-click=\"add('custom')\">Add to Custom Stack</button>\n        </div>\n      </rx-form-section>\n\n      <rx-form-section>\n        <div>\n          <h3>rxPromiseNotifications</h3>\n          <p>Please see <a href=\"#/utilities/rxPromiseNotifications\">rxPromiseNotifications</a> demo.</p>\n        </div>\n      </rx-form-section>\n\n      <rx-form-section>\n        <div>\n          <h3>Simulated Route Changes</h3>\n          <button class=\"button\" ng-click=\"routeChange()\">Simulate Route Change</button>\n        </div>\n      </rx-form-section>\n    </div>\n\n    <div flex layout=\"column\" layout-align=\"top stretch\">\n      <div>\n        <h2>Demo Stack</h2>\n        <rx-notifications stack=\"demo\"></rx-notifications>\n      </div>\n\n      <div>\n        <h2>Custom Stack</h2>\n        <rx-notifications stack=\"custom\"></rx-notifications>\n      </div>\n    </div>\n  </div>\n\n  <hr />\n\n  <h2>Using rxNotification</h2>\n  <rx-notification type=\"error\">Hello, world! <a href=\"#\">This is a link.</a></rx-notification>\n  <rx-notification type=\"warning\">Hello, world! <a href=\"#\">This is a link.</a></rx-notification>\n  <rx-notification type=\"info\">Hello, world! <a href=\"#\">This is a link.</a></rx-notification>\n  <rx-notification type=\"success\">Hello, world! <a href=\"#\">This is a link.</a></rx-notification>\n\n  <h3>Using rxNotification with custom stack</h3>\n  <div layout=\"row\">\n    <div flex>\n      <h4>Demo Stack (demo-stack)</h4>\n      <rx-notifications stack=\"demo-stack\"></rx-notifications>\n    </div>\n\n    <div flex>\n      <h4>Custom Stack (custom-stack)</h4>\n      <rx-notifications stack=\"custom-stack\"></rx-notifications>\n    </div>\n  </div>\n\n  <rx-notification stack=\"demo-stack\" type=\"info\">Hello, world in demo-stack stack!</rx-notification>\n  <rx-notification stack=\"custom-stack\" type=\"warning\">Hello, world in custom-stack stack!</rx-notification>\n</div>\n",
            "less": "@import \"mixins\";\n\n.rx-notifications {\n  margin-bottom: 1.5em;\n\n  .rx-notification {\n    clear: both;\n    font-weight: 800;\n    font-size: 1.2em;\n    padding: 10px 50px;\n    margin-bottom: 2px;\n    position: relative;\n    background: no-repeat 18px 50%;\n    background-size: 20px 20px;\n\n    .button {\n      font-weight: normal;\n      margin-bottom: 0;\n    }\n    a {\n      text-decoration: underline;\n    }\n\n    &.notification-success {\n      background-color: @green-100;\n      background-image: url(\"images/green-checkmark-circled.svg\");\n      color: @gray-950;\n      a {\n        color: @gray-950;\n      }\n    }\n    &.notification-info {\n      background-color: @blue-100;\n      background-image: url(\"images/info-circled.svg\");\n      color: @gray-950;\n      a {\n        color: @gray-950;\n      }\n    }\n    &.notification-warning {\n      background-color: @orange-100;\n      background-image: url(\"images/warning-triangle.svg\");\n      color: @gray-950;\n      a {\n        color: @gray-950;\n      }\n    }\n    &.notification-error {\n      background-color: @red-700;\n      background-image: url(\"images/error-stop.svg\");\n      color: @white;\n      a {\n        color: @white;\n      }\n    }\n    &.notification-loading {\n      // Hide icon since it's replaced by spinner\n      background-image: none;\n      .rx-spinner {\n        position: absolute;\n        left: 19px;\n        top: 50%;\n        margin-top: -9px;\n        border-bottom-color: @gray-950;\n        border-right-color: @gray-950;\n      }\n    }\n  }\n\n  .notification-dismiss {\n    position: absolute;\n    right: 0;\n    top: 0;\n    height: 100%;\n    padding: 0 15px;\n    content: \"\\00D7\";\n    .opacity(.75);\n    color: @gray-950;\n    &:hover,\n    &:focus {\n      .opacity(1);\n      text-decoration: none;\n    }\n  }\n  .notification-error {\n    .notification-dismiss {\n      .opacity(1);\n      color: @white;\n    }\n  }\n}\n\n.animate-fade {\n  &.ng-enter,\n  &.ng-leave {\n    -webkit-transition: 0.25s cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\n    -moz-transition: 0.25s cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\n    -ms-transition: 0.25s cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\n    -o-transition: 0.25s cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\n    transition: 0.25s cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n  }\n\n  &.ng-leave.ng-leave-active,\n  &.ng-enter {\n    opacity: 0;\n  }\n\n  &.ng-leave,\n  &.ng-enter.ng-enter-active {\n    opacity: 1;\n  }\n}//.animate-fade\n"
        }
    },
    {
        "displayName": "rxOptionTable",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxOptionTable",
        "moduleName": "'encore.ui.rxOptionTable'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxOptionTable/rxOptionTable.module.js",
            "src/components/rxOptionTable/scripts/rxFormOptionTable.js",
            "src/components/rxOptionTable/scripts/rxOptionTable.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxOptionTable/templates/rxOptionTable.html"
        ],
        "docs": {
            "md": "<p>The rxOptionTable component provides functionality to create a series of radio or checkbox inputs within a table.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxOptionTableCtrl', function ($scope) {\n    $scope.radioValue = 0;\n    $scope.checkboxValues = [true, 'unchecked'];\n\n    $scope.optionTableData = [\n        {\n            'id': 'option1',\n            'name': 'Option #1',\n            'value': 0,\n            'obj': {\n                'name': 'Nested Name 1'\n            }\n        }, {\n            'id': 'option2',\n            'name': 'Option #2',\n            'value': 1,\n            'obj': {\n                'name': 'Nested Name 2'\n            }\n        }, {\n            'id': 'option3',\n            'name': 'Option #3',\n            'value': 2,\n            'obj': {\n                'name': 'Nested Name 3'\n            }\n        }, {\n            'id': 'option4',\n            'name': 'Option #4',\n            'value': 3,\n            'obj': {\n                'name': 'Nested Name 4'\n            }\n        }\n    ];\n\n    $scope.optionTableColumns = [\n        {\n            'label': 'Name',\n            'key': 'name',\n            'selectedLabel': '(Already saved data)'\n        }, {\n            'label': 'Static Content',\n            'key': 'Some <strong>Text &</strong> HTML'\n        }, {\n            'label': 'Expression 2',\n            'key': '{{ value * 100 | number:2 }}'\n        }, {\n            'label': 'Expression 3',\n            'key': '{{ obj.name | uppercase }}'\n        }, {\n            'label': 'Expression 4',\n            'key': '{{ value | currency }}'\n        }\n    ];\n\n    $scope.optionTableCheckboxData = [\n        {\n            'name': 'Item 1'\n        }, {\n            'name': 'Item 2',\n            'value': 'checked',\n            'falseValue': 'unchecked'\n        }\n    ];\n\n    $scope.optionTableEmptyData = [];\n\n    $scope.disableOption = function (tableId, fieldId, rowId) {\n        return rowId === 'option4';\n    };\n});\n",
            "html": "<div ng-controller=\"rxOptionTableCtrl\">\n  <h3>Radio Option Table</h3>\n  <rx-option-table\n      id=\"radioOptionTable\"\n      data=\"optionTableData\"\n      columns=\"optionTableColumns\"\n      type=\"radio\"\n      model=\"radioValue\"\n      field-id=\"optionTable\"\n      selected=\"0\"\n      class=\"full-width\"\n      disable-fn=\"disableOption(tableId, fieldId, rowId)\"\n      ></rx-option-table>\n\n  <p>Bound Value: {{radioValue}}</p>\n\n  <br />\n\n  <h3>Checkbox Option Table</h3>\n  <rx-option-table\n      id=\"checkboxOptionTable\"\n      columns=\"optionTableColumns\"\n      type=\"checkbox\"\n      model=\"checkboxValues\"\n      field-id=\"optionCheckboxTable\"\n      data=\"optionTableCheckboxData\"\n      required=\"true\"\n      ></rx-option-table>\n\n  <p ng-repeat=\"val in checkboxValues\">\n    Item {{$index + 1}} Value: {{val}}\n  </p>\n\n  <br />\n\n  <h3>Empty Option Table</h3>\n  <rx-option-table\n      id=\"emptyOptionTable\"\n      columns=\"optionTableColumns\"\n      type=\"checkbox\"\n      model=\"emptyValue\"\n      field-id=\"optionCheckboxTable\"\n      data=\"optionTableEmptyData\"\n      empty-message=\"You don't have any data!\"\n      ></rx-option-table>\n</div>\n",
            "less": "/*\n * rxOptionTable\n */\n.rx-option-table {\n  // we want the table to not look ugly when stretched across the screen\n  width: auto;\n  // we also want a semi-consistent width, but not too wide for modals\n  min-width: 39em;\n\n  td:not(.empty-message) {\n    // remove default padding from td's so that we can make the label take up the full room\n    padding: 0;\n  }\n  .fillWrapper {\n    box-sizing: border-box;\n    display: inline-block;\n    height: 100%;\n    width: 100%;\n    position: relative;\n\n    label {\n      box-sizing: border-box;\n      width: 100%;\n      height: 100%;\n      padding: @app-table-cell-padding;\n      cursor: pointer;\n\n      display: flex;\n      // vertically centered content in label\n      align-items: center;\n\n      .alignWrapper {\n        flex: 1 1 auto;\n      }\n    }\n\n    rx-help-text {\n      margin: 0;\n    }\n  }\n  input[disabled] {\n    cursor: not-allowed;\n  }\n  .disabled {\n    label {\n      cursor: default;\n      color: @gray-600;\n    }\n  }\n  .option-table-input {\n    text-align: center;\n    line-height: 0;\n  }\n  .current td {\n    color: @green-700;\n  }\n  // @note KL: I'd like to stick with just adding the background to the <tr>, but\n  // we need to make the selector more specific to override the table-stripe styles.\n  .selected td {\n    background: @app-selected-row-background-color;\n    border-color: @green-100;\n    // this 'double' makes it so that the border-color applies to the top border as well\n    // @see http://stackoverflow.com/questions/7942212/css-table-row-border-color-with-border-collapse\n    border-style: double;\n  }\n\n  thead {\n    tr {\n      th:first-child {\n        width: @rxCheckbox-size;\n      }\n    }\n  }\n}\n"
        }
    },
    {
        "displayName": "rxPaginate",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxPaginate",
        "moduleName": "'encore.ui.rxPaginate'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxPaginate/rxPaginate.module.js",
            "src/components/rxPaginate/scripts/rxLoadingOverlay.js",
            "src/components/rxPaginate/scripts/rxPaginate.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxPaginate/templates/rxPaginate.html"
        ],
        "docs": {
            "md": "<p>The rxPaginate component adds pagination to a table.</p>\n<p>Two different forms of pagination are supported:</p>\n<ol>\n<li>UI-based pagination, where all items are retrieved at once, and paginated in the UI</li>\n<li>Server-side pagination, where the pagination directive works with a paginated API</li>\n</ol>\n",
            "js": "angular.module('demoApp')\n.controller('rxPaginateCtrl', function ($scope, $q, $timeout, $filter, rxPaginateUtils,\n                                        PageTracking, rxSortUtil, SelectFilter) {\n    $scope.pager = PageTracking.createInstance({ itemsPerPage: 3 });\n\n    var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];\n    var makeServers = function (serverCount) {\n        var servers = [];\n        for (var i = 1; i < serverCount + 1; i++) {\n            var server = {\n                id: i,\n                name: 'Server ' + i,\n                os: os[i % os.length]\n            };\n            servers.push(server);\n        }\n        return servers;\n    };\n\n    $scope.servers = makeServers(21);\n\n    $scope.removeServers = function () {\n        if ($scope.servers.length > 2) {\n            $scope.servers = $scope.servers.splice(2);\n        }\n    };\n\n    $scope.addServers = function () {\n        $scope.servers = $scope.servers.concat(makeServers(2));\n    };\n\n    var allLazyServers = makeServers(701);\n\n    var serverInterface = {\n        getItems: function (pageNumber, itemsPerPage, params) {\n            var deferred = $q.defer();\n            var filterText = params.filterText;\n            var sortColumn = params.sortColumn;\n            var sortDirection = params.sortDirection;\n\n            if (sortColumn === 'name') {\n                sortColumn = 'id';\n            }\n\n            if (sortDirection === 'DESCENDING') {\n                sortColumn = '-' + sortColumn;\n            }\n\n            $timeout(function () {\n                var first = pageNumber * itemsPerPage;\n                var added = first + itemsPerPage;\n                var last = (added > allLazyServers.length) ? allLazyServers.length : added;\n\n                var filteredServers = $filter('filter')(allLazyServers, filterText);\n                filteredServers = $scope.osFilter.applyTo(filteredServers);\n                filteredServers = $filter('orderBy')(filteredServers, sortColumn);\n\n                // Return 100 items more than the user's `itemsPerPage`. i.e. if the\n                // user is asking for 25 items per page, return 125 in total\n                var lazyServers = filteredServers.slice(first, last + 100);\n\n                var response = {\n                    items: lazyServers,\n                    pageNumber: pageNumber,\n                    totalNumberOfItems: filteredServers.length\n                };\n\n                if (filterText === 'error') {\n                    deferred.reject();\n                } else {\n                    deferred.resolve(response);\n                }\n            }, 300);\n            return deferred.promise;\n        }\n    };\n\n    $scope.sort = rxSortUtil.getDefault('name', false);\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n    $scope.data = { searchText: '' };\n    $scope.clearFilter = function () {\n        $scope.data.searchText = '';\n    };\n    $scope.osFilter = SelectFilter.create({\n        properties: ['os'],\n        available: {\n            os: os\n        }\n    });\n    $scope.serverInterface = serverInterface;\n    $scope.pagedServers = PageTracking.createInstance({ itemsPerPage: 25 });\n});\n",
            "html": "<div ng-controller=\"rxPaginateCtrl\">\n  <h3>UI-Based Pagination</h3>\n  <table class=\"table-striped demo-ui-pagination\">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>OS</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat=\"server in servers | orderBy: sorter.predicate:sorter.reverse | Paginate:pager \">\n        <td>{{server.name}}</td>\n        <td>{{server.os}}</td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr class=\"paginate-area\">\n        <td colspan=\"2\">\n          <rx-paginate page-tracking=\"pager\"></rx-paginate>\n        </td>\n      </tr>\n    </tfoot>\n  </table>\n\n  <p>\n    Use these buttons to adjust the number of pages displayed. The pagination will hide when there is only one page\n    available.\n  </p>\n  <p>\n    <button ng-click=\"removeServers()\" class=\"button sm negative\">Remove first 2 servers</button>\n    <button ng-click=\"addServers()\" class=\"button sm positive\">Add 2 servers</button>\n  </p>\n\n  <h3>API-Based Pagination</h3>\n  <p>\n    The API used by this demo is returning 100 items more than the user's selected <code>itemsPerPage</code>. If the\n    user's <code>itemsPerPage</code> is 25, then the API will return 125 items on each request. This means with the\n    default <code>itemsPerPage</code> of 25, five pages of results are coming back at a time. You should be able to\n    click through pages 1-5 without a loading message, and then the loading message will appear for page 6.\n  </p>\n\n  <p>\n    Click the \"Refresh\" button to see how the current page can be reloaded without the user interacting with the\n    <code>&lt;rx-paginate&gt;</code> buttons.\n  </p>\n\n  <p>Enter a search string of \"error\" to see the default error handling.</p>\n\n  <button ng-click=\"pagedServers.refresh()\" class=\"button sm\">Refresh</button>\n  <table rx-floating-header rx-loading-overlay class=\"table-striped demo-api-pagination\">\n    <thead>\n      <tr>\n        <th colspan=\"2\" class=\"filter-header\">\n          <form rx-form>\n            <rx-form-section controlled-width>\n              <rx-field>\n                <rx-field-name> Filter Data </rx-field-name>\n                <rx-field-content>\n                  <rx-input>\n                    <rx-search-box\n                      rx-placeholder=\"'Filter by any...'\"\n                      ng-model=\"data.searchText\">\n                    </rx-search-box>\n                  </rx-input>\n                </rx-field-content>\n              </rx-field>\n              <rx-select-filter filter=\"osFilter\"></rx-select-filter>\n            </rx-form-section>\n          </form>\n        </th>\n      </tr>\n      <tr>\n        <th>\n          <rx-sortable-column\n            sort-method=\"sortCol(property)\"\n            sort-property=\"name\"\n            predicate=\"sort.predicate\"\n            reverse=\"sort.reverse\">\n            Name\n          </rx-sortable-column>\n        </th>\n        <th>\n          <rx-sortable-column\n            sort-method=\"sortCol(property)\"\n            sort-property=\"os\"\n            predicate=\"sort.predicate\"\n            reverse=\"sort.reverse\">\n            OS\n          </rx-sortable-column>\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat=\"server in pagedServers.items\">\n        <td>{{server.name}}</td>\n        <td>{{server.os}}</td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr class=\"paginate-area\">\n        <td colspan=\"2\">\n          <rx-paginate\n            page-tracking=\"pagedServers\"\n            server-interface=\"serverInterface\"\n            error-message=\"Error loading page!\"\n            filter-text=\"data.searchText\"\n            selections=\"osFilter.selected\"\n            sort-column=\"sort.predicate\"\n            sort-direction=\"sort.reverse\">\n          </rx-paginate>\n        </td>\n      </tr>\n    </tfoot>\n  </table>\n</div>\n",
            "less": "/*\n * rxPaginate\n */\n\n.back-to-top {\n  padding: 10px 20px;\n  color: @blue-700;\n  background: transparent;\n  position: relative;\n  &:before {\n    content: \".\";\n    font-size: 0;\n    position: absolute;\n    border: 6px solid transparent;\n    border-bottom-color: @blue-700;\n    border-top: 0;\n    left: 0;\n    top: 55%;\n    margin-top: -4px;\n  }\n}\n\n.page-links > div > a {\n  padding: 6px 12px;\n  text-decoration: none;\n  border-top: 2px solid transparent;\n  color: @rxPaginate-pagination-text-color;\n}\n\n.page-links > div > a:hover,\n.page-links > div > span:hover,\n.page-links > div > a:focus,\n.page-links > div > span:focus {\n  border-top: 2px solid @gray-300;\n  padding-top: 3px;\n  cursor: pointer;\n}\n\n.page-links > .active > a,\n.page-links > .active > a:hover,\n.page-links > .active > a:focus {\n  cursor: default;\n  border-top-color: @black;\n  color: @black;\n  padding-top: 3px;\n  cursor: pointer;\n}\n\n.pagination .disabled > span,\n.pagination .disabled > span:hover,\n.pagination .disabled > span:focus,\n.pagination .disabled > a,\n.pagination .disabled > a:hover,\n.pagination .disabled > a:focus {\n  visibility: hidden;\n}\n\n.pagination-next,\n.pagination-prev,\n.pagination-first,\ndiv.pagination-last {\n  white-space: nowrap;\n  a {\n    padding: 6px 2px;\n  }\n}\n\n.pagination-per-page {\n  padding-top: 10px;\n  button {\n    border: 0;\n    background: transparent;\n    color: @blue-700;\n    padding: 0 6px;\n  }\n  button[disabled] {\n    color: @rxPaginate-pagination-text-color;\n  }\n  div:last-child { // don't apply right padding to the last number\n    button {\n      padding: 0 0 0 6px;\n    }\n  }\n  div { // only put pipes between numbers\n    &:nth-child(n+3):before {\n      content: \" | \";\n    }\n  }\n}\n\n@media (min-width: @layout-breakpoint-md) {\n  .pagination-per-page { // remove padding when flex order changes\n    padding-top: 0;\n  }\n\n  .back-to-top { // remove padding when flex order changes\n    padding: 0 20px;\n    cursor: pointer;\n  }\n}\n\n.loading-overlay {\n  z-index: 100;\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  width: ~\"calc(100% + 2px)\";\n  height: ~\"calc(100% + 2px)\";\n  background: rgba(250, 250, 250, 0.8); // == @gray-25 at 80%\n  .loading-text-wrapper {\n    width: 100px;\n    margin: 20% auto;\n  }\n  .loading-text {\n    font-size: 18px;\n    margin-top: 15%;\n    text-align: center;\n    color: @gray-700;\n }\n  i {\n    font-size: 30px;\n    margin-left: 25px;\n    color: @gray-700;\n  }\n}\n"
        }
    },
    {
        "displayName": "rxPermission",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxPermission",
        "moduleName": "'encore.ui.rxPermission'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxPermission/rxPermission.module.js",
            "src/components/rxPermission/scripts/rxPermission.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxPermission/templates/rxPermission.html"
        ],
        "docs": {
            "md": "<p>The rxPermission component provides functionality to perform checks against existing user permissions in EncoreUI.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxPermissionCtrl', function ($scope, Session, rxNotify) {\n    rxNotify.add('Respect My Authority!!', {\n        stack: 'permission',\n        type: 'warning'\n    });\n\n    $scope.storeToken = function () {\n        Session.storeToken({\n            access: {\n                user: {\n                    roles: [{ name: 'test' }]\n                }\n            }\n        });\n    };\n\n    $scope.clearToken = function () {\n        Session.logout();\n    };\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxPermissionCtrl\">\n    <button class=\"storeToken button\" name=\"button\" ng-click=\"storeToken()\">Store Token</button>\n    <button class=\"clearToken button button-negative\" name=\"button\" ng-click=\"clearToken()\">Clear Token</button>\n\n    <rx-permission role=\"test\">\n        <rx-notifications stack=\"permission\"></rx-notifications>\n    </rx-permission>\n</div>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxRadio",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxRadio",
        "moduleName": "'encore.ui.rxRadio'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxRadio/rxRadio.module.js",
            "src/components/rxRadio/scripts/rxRadio.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>The rxRadio component wraps a native radio element in markup required for styling purposes.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxRadioCtrl', function ($scope) {\n    $scope.validEnabled = 1;\n    $scope.validDisabled = 1;\n    $scope.validNgDisabled = 1;\n\n    $scope.invalidEnabled = 1;\n    $scope.invalidDisabled = 1;\n    $scope.invalidNgDisabled = 1;\n\n    $scope.radCreateDestroy = 'destroyed';\n    $scope.plainHtmlRadio = 'isChecked';\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how the component can be used -->\n<div ng-controller=\"rxRadioCtrl\">\n  <h3>Examples</h3>\n\n  <h3>Show/Hide Input</h3>\n  <p>\n    <strong>Do you like bacon?</strong>\n    <small ng-show=\"likesbacon\">({{likesbacon}})</small>\n  </p>\n  <p>\n    <input rx-radio\n           id=\"radHateBacon\"\n           value=\"hate it\"\n           ng-model=\"likesbacon\"\n           ng-required=\"true\" />\n    <label for=\"radHateBacon\">I hate bacon</label>\n  </p>\n  <p>\n    <input rx-radio\n           id=\"radLikeBacon\"\n           value=\"like it\"\n           ng-model=\"likesbacon\"\n           ng-required=\"true\" />\n    <label for=\"radLikeBacon\">I like bacon</label>\n  </p>\n  <p ng-show=\"likesbacon && likesbacon !== 'hate it'\">\n    <input rx-radio\n           id=\"radLoveBacon\"\n           value=\"love it\"\n           ng-model=\"likesbacon\"\n           ng-required=\"true\" />\n    <label for=\"radLoveBacon\">Actually, I LOVE bacon</label>\n  </p>\n\n  <br />\n\n  <h3>Destroy Input</h3>\n  <p>Support for <code>$destroy</code> events.</p>\n  <p>\n    <span>\n      <input rx-radio\n             id=\"radDestroyed\"\n             value=\"destroyed\"\n             ng-model=\"radCreateDestroy\" />\n      <label for=\"radDestroy\">Destroyed</label>\n    </span>\n    &nbsp;\n    <span>\n      <input rx-radio\n             id=\"radCreated\"\n             value=\"created\"\n             ng-model=\"radCreateDestroy\" />\n      <label for=\"radCreate\">Created</label>\n    </span>\n  </p>\n  <p>\n    The following radio is <code>{{radCreateDestroy}}</code>:\n    <input rx-radio\n           checked\n           id=\"radTargetCreated\"\n           ng-if=\"radCreateDestroy === 'created'\" />\n  </p>\n\n  <!-- END DEMO CODE -->\n  <!-- END DEMO CODE -->\n  <!-- END DEMO CODE -->\n\n  <h3>Radio States</h3>\n  <table>\n    <thead>\n      <tr>\n        <th></th>\n        <th>Enabled</th>\n        <th>Disabled (ng-disable)</th>\n        <th>Disabled (disabled)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <th>Valid</th>\n\n        <!-- Valid Enabled -->\n        <td>\n          <p>\n            <input rx-radio\n                   id=\"radValidEnabledOne\"\n                   value=\"1\"\n                   ng-model=\"validEnabled\" />\n            <label for=\"radValidEnabledOne\">Selected</label>\n          </p>\n          <p>\n            <input rx-radio\n                   id=\"radValidEnabledTwo\"\n                   value=\"2\"\n                   ng-model=\"validEnabled\" />\n            <label for=\"radValidEnabledTwo\">Unselected</label>\n          </p>\n        </td>\n\n        <!-- Valid NG-Disabled -->\n        <td>\n          <p>\n            <input rx-radio\n                   id=\"radValidNgDisabledOne\"\n                   value=\"1\"\n                   ng-disabled=\"true\"\n                   ng-model=\"validNgDisabled\" />\n            <label for=\"radValidNgDisabledOne\">Selected</label>\n          </p>\n          <p>\n            <input rx-radio\n                   id=\"radValidNgDisabledTwo\"\n                   value=\"2\"\n                   ng-disabled=\"true\"\n                   ng-model=\"validNgDisabled\" />\n            <label for=\"radValidNgDisabledTwo\">Unselected</label>\n          </p>\n        </td>\n\n        <!-- Valid Disabled -->\n        <td>\n          <p>\n            <input rx-radio\n                   id=\"radValidDisabledOne\"\n                   value=\"1\"\n                   disabled\n                   ng-model=\"validDisabled\" />\n            <label for=\"radValidDisabledOne\">Selected</label>\n          </p>\n          <p>\n            <input rx-radio\n                   id=\"radValidDisabledTwo\"\n                   value=\"2\"\n                   disabled\n                   ng-model=\"validDisabled\" />\n            <label for=\"radValidDisabledTwo\">Unselected</label>\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <th>Invalid</th>\n\n        <!-- Invalid Enabled -->\n        <td>\n          <p>\n            <input rx-radio\n                   id=\"radInvalidEnabledOne\"\n                   value=\"1\"\n                   ng-model=\"invalidEnabled\"\n                   always-invalid />\n            <label for=\"radInvalidEnabledOne\">Selected</label>\n          </p>\n          <p>\n            <input rx-radio\n                   id=\"radInvalidEnabledTwo\"\n                   value=\"2\"\n                   ng-model=\"invalidEnabled\"\n                   always-invalid />\n            <label for=\"radInvalidEnabledTwo\">Unselected</label>\n          </p>\n        </td>\n\n        <!-- Invalid NG-Disabled -->\n        <td>\n          <p>\n            <input rx-radio\n                   id=\"radInvalidNgDisabledOne\"\n                   value=\"1\"\n                   ng-disabled=\"true\"\n                   ng-model=\"invalidNgDisabled\"\n                   always-invalid />\n            <label for=\"radInvalidNgDisabledOne\">Selected</label>\n          </p>\n          <p>\n            <input rx-radio\n                   id=\"radInvalidNgDisabledTwo\"\n                   value=\"2\"\n                   ng-disabled=\"true\"\n                   ng-model=\"invalidNgDisabled\"\n                   always-invalid />\n            <label for=\"radInvalidNgDisabledTwo\">Unselected</label>\n          </p>\n        </td>\n\n        <!-- Invalid Disabled -->\n        <td>\n          <p>\n            <input rx-radio\n                   id=\"radInvalidDisabledOne\"\n                   value=\"1\"\n                   disabled\n                   ng-model=\"invalidDisabled\"\n                   always-invalid />\n            <label for=\"radInvalidDisabledOne\">Selected</label>\n          </p>\n          <p>\n            <input rx-radio\n                   id=\"radInvalidDisabledTwo\"\n                   value=\"2\"\n                   disabled\n                   ng-model=\"invalidDisabled\"\n                   always-invalid />\n            <label for=\"radInvalidDisabledTwo\">Unselected</label>\n          </p>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n  <h3>Plain HTML Radios (for comparison)</h3>\n  <p>\n    <input type=\"radio\"\n           id=\"plainHtmlNormal\"\n           ng-model=\"plainHtmlRadio\"\n           value=\"plain\"\n           ng-required=\"true\" />\n    <label for=\"plainHtmlNormal\">A plain radio</label>\n  </p>\n  <p>\n    <input type=\"radio\"\n           id=\"plainHtmlDisabled\"\n           value=\"disabled\"\n           ng-model=\"plainHtmlRadio\"\n           disabled />\n    <label for=\"plainHtmlDisabled\">A plain radio (disabled)</label>\n  </p>\n  <p>\n    <input type=\"radio\"\n           id=\"plainHtmlChecked\"\n           value=\"isChecked\"\n           ng-model=\"plainHtmlRadio\" />\n    <label for=\"plainHtmlChecked\">A plain radio (checked)</label>\n  </p>\n  <p>\n    <input type=\"radio\"\n           id=\"plainRadRemoveRadio\"\n           value=\"shows\"\n           ng-model=\"plainHtmlRadio\"/>\n    <label for=\"plainRadRemoveRadio\">Add Following Radio:</label>\n\n    <input type=\"radio\"\n           id=\"plainRadRemoveable\"\n           value=\"hidden\"\n           ng-if=\"plainHtmlRadio === 'shows'\" />\n  </p>\n</div>\n",
            "less": "/*\n * rxRadio\n */\n.rxRadio {\n  display: inline-block;\n  width: @rxRadio-size;\n  height: @rxRadio-size;\n  background-color: transparent;\n  position: relative;\n\n  input[type=\"radio\"],\n  .fake-radio {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n  }\n\n  .fake-radio {\n    .box-sizing(border-box);\n    z-index: 0;\n    width: 100%;\n    height: 100%;\n    .border-radius(100%);\n    overflow: hidden;\n    border: @rxRadio-border-width solid @rxRadio-border-color;\n    background-color: @rxRadio-background-color;\n\n    // perfect center alignment for tick\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n    justify-content: center;\n\n    .tick {\n      flex: 0 0 auto;\n      .box-sizing(border-box);\n      border-radius: @rxRadio-tick-border-radius;\n      width: @rxRadio-tick-size;\n      height: @rxRadio-tick-size;\n      background-color: transparent;\n    }\n  }//.fake-radio\n\n  &.rx-disabled + label {\n    color: @app-disabled-text-color;\n  }\n\n  input[type=\"radio\"] {\n    z-index: 1;\n    height: 110%;\n    width: 110%;\n    opacity: 0;\n    cursor: pointer;\n\n    // enabled checked\n    &:checked + .fake-radio {\n      border-color: @rxRadio-selected-border-color;\n\n      .tick {\n        background-color: @rxRadio-selected-background-color;\n      }\n    }\n\n    .disabled() {\n      cursor: not-allowed;\n\n      // disabled, unchecked\n      & + .fake-radio {\n        border: 1px solid @app-disabled-background-color;\n\n        .tick {\n          width: @rxRadio-tick-size;\n          height: @rxRadio-tick-size;\n        }\n      }\n\n      &:checked + .fake-radio .tick {\n        background: @app-disabled-background-color;\n      }\n    }//.disabled()\n\n    &.ng-invalid.ng-dirty {\n      // enabled unchecked error\n      & + .fake-radio {\n        border: @rxRadio-invalid-border-width solid @rxRadio-invalid-border-color;\n\n        .tick {\n          border-radius: @rxRadio-invalid-tick-border-radius;\n          width: @rxRadio-invalid-tick-size;\n          height: @rxRadio-invalid-tick-size;\n        }\n      }\n\n      &:checked + .fake-radio .tick {\n        background: @rxRadio-invalid-background-color;\n      }\n\n      // disabled trumps invalid\n      &[disabled] {\n        .disabled();\n      }\n    }\n\n    // disabled trumps invalid\n    &[disabled] {\n      .disabled();\n    }\n  }//input\n}//.rxRadio\n"
        }
    },
    {
        "displayName": "rxSearchBox",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxSearchBox",
        "moduleName": "'encore.ui.rxSearchBox'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxSearchBox/rxSearchBox.module.js",
            "src/components/rxSearchBox/scripts/rxSearchBox.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxSearchBox/templates/rxSearchBox.html"
        ],
        "docs": {
            "md": "<p>The rxSearchBox component provides functionality around creating a search input box.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxSearchBoxCtrl', function ($scope) {\n    $scope.searchModel = '';\n    $scope.filterPlaceholder = 'Filter by any...';\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how the component can be used -->\n<div ng-controller=\"rxSearchBoxCtrl\">\n    <h4>Default</h4>\n    <rx-search-box\n      class=\"default-search-box\"\n      ng-model=\"searchModel\"></rx-search-box>\n\n    <h4>Disabled (shared search model)</h4>\n    <rx-search-box\n        class=\"disabled-search-box\"\n        ng-model=\"searchModel\"\n        ng-disabled=\"true\"></rx-search-box>\n\n    <h4>Customized (100% width, custom placeholder text)</h4>\n    <rx-search-box\n        class=\"wide-search-box\"\n        ng-model=\"customSearchModel\"\n        rx-placeholder=\"filterPlaceholder\"></rx-search-box>\n</div>\n",
            "less": "/*\n * rxSearchBox\n */\nrx-search-box {\n  display: inline-block;\n  width: @rxSearchBox-width;\n  min-width: @rxSearchBox-min-width;\n\n  // wrapper fits full width\n  .rxSearchBox-wrapper {\n    .box-sizing(border-box);\n    border: @rxSearchBox-border;\n    min-height: @rxSearchBox-min-height;\n    min-width: @rxSearchBox-min-width;\n    padding: 0;\n\n    background: @rxSearchBox-background-color;\n    color: @rxSearchBox-text-color;\n\n    // as flex container\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: flex-start;\n\n    .rxSearchBox-input {\n      .ResetFormInput();\n      flex: 1 1;\n      .box-sizing(border-box);\n\n      background: transparent;\n      padding: @rxSearchBox-padding-vertical @rxSearchBox-padding-horizontal;\n\n      // This gets around FireFox setting the min-width to a value\n      // that overflows content out of the .rxSearch container.\n      min-width: (@rxSearchBox-min-width - @rxSearchBox-clear-width - (2 * @rxSearchBox-padding-horizontal));\n\n      &[disabled] {\n        color: @rxSearchBox-disabled-text-color;\n        background: @rxSearchBox-disabled-background-color;\n        cursor: not-allowed;\n      }\n    }//.rxSearchBox-input\n\n    .rxSearchBox-clear {\n      .box-sizing(border-box);\n      cursor: pointer;\n      //font-size: 0.75em;\n      color: @rxSearchBox-icon-color;\n\n      // as flex item\n      flex: 0 0 @rxSearchBox-clear-width;\n\n      // as flex container\n      display: flex;\n      align-items: center;\n      justify-content: center;\n\n      .rxSearchBox-clear-icon {\n        min-width: @rxSearchBox-clear-width;\n      }\n    }//.rxSearchBox-clear\n  }//.rxSearchBox-wrapper\n}//rx-search-box\n"
        }
    },
    {
        "displayName": "rxSelect",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxSelect",
        "moduleName": "'encore.ui.rxSelect'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxSelect/rxSelect.module.js",
            "src/components/rxSelect/scripts/rxSelect.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>A component that wraps a native <code>&lt;select&gt;</code> element in markup required for styling purposes.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxSelectCtrl', function ($scope) {\n    $scope.radCreateDestroy = 'destroyed';\n\n    $scope.validEnabled = 3;\n    $scope.validNgDisabled = 'na';\n    $scope.validDisabled = 'na';\n\n    $scope.invalidEnabled = 4;\n    $scope.invalidNgDisabled = 'na';\n    $scope.invalidDisabled = 'na';\n\n    $scope.htmlSelectAlternativeValue = 'second';\n});\n",
            "html": "<div ng-controller=\"rxSelectCtrl\">\n  <div class=\"demoContainer\">\n    <h3>Examples</h3>\n\n    <h3>With Validation</h3>\n    <p>\n      <strong>How do you like your bacon?</strong>\n      <small ng-if=\"baconPrep\">({{baconPrep}})</small>\n      <br />\n      <select rx-select\n              id=\"selBaconPrep\"\n              ng-model=\"baconPrep\"\n              ng-required=\"true\">\n        <option value=\"\">I do not like bacon</option>\n        <option value=\"thin\">Thin (light and crispy)</option>\n        <option value=\"medium\">Medium (perfect balance of flavor)</option>\n        <option value=\"thick\">Thick (borderline jerky)</option>\n        <option value=\"crumbled\">Crumbled (great on salads)</option>\n      </select>\n    </p>\n    <br />\n\n    <h3>Show/Hide Select</h3>\n    <p>\n      <input rx-checkbox id=\"chkShow\" ng-model=\"isShown\" />\n      <label for=\"chkShow\">Show?</label><br />\n      <span ng-show=\"isShown\">\n        <select rx-select id=\"selTargetShow\">\n          <option>I'm visible!</option>\n        </select>\n      </span>\n    </p>\n\n    <h3>Destroy Select</h3>\n    <p>Support for <code>$destroy</code> events.</p>\n    <p>\n      <span>\n        <input rx-radio\n               id=\"radDestroyed\"\n               value=\"destroyed\"\n               ng-model=\"radCreateDestroy\" />\n        <label for=\"radDestroyed\">Destroyed</label>\n      </span>\n      <span>\n        <input rx-radio\n               id=\"radCreated\"\n               value=\"created\"\n               ng-model=\"radCreateDestroy\" />\n        <label for=\"radCreated\">Created</label>\n      </span>\n    </p>\n    <p>\n      The following select is <code>{{radCreateDestroy}}</code>:\n      <select rx-select\n              id=\"selTargetCreated\"\n              ng-if=\"radCreateDestroy === 'created'\">\n        <option>CREATED!</option>\n      </select>\n    </p>\n    <br />\n  </div>\n\n  <h3>Select States</h3>\n  <table>\n    <thead>\n      <tr>\n        <th></th>\n        <th>Enabled</th>\n        <th>Disabled (ng-disabled)</th>\n        <th>Disabled (disabled)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <!-- Valid -->\n      <tr>\n        <th>Valid</th>\n        <!-- Valid Enabled -->\n        <td>\n          <select rx-select\n                  id=\"selValidEnabled\"\n                  ng-model=\"validEnabled\">\n            <option value=\"1\">First</option>\n            <option value=\"2\">Second</option>\n            <option value=\"3\">Third</option>\n            <option value=\"4\">Fourth</option>\n          </select>\n        </td>\n        <!-- Valid Ng-Disabled -->\n        <td>\n          <select rx-select\n                  id=\"selValidNgDisabled\"\n                  ng-model=\"validNgDisabled\"\n                  ng-disabled=\"true\">\n            <option value=\"na\">Disabled by 'ng-disabled' attribute</option>\n          </select>\n        </td>\n\n        <!-- Valid Disabled -->\n        <td>\n          <select rx-select\n                  id=\"selValidDisabled\"\n                  disabled\n                  ng-model=\"validDisabled\">\n            <option value=\"na\">Disabled by 'disabled' attribute</option>\n          </select>\n        </td>\n      </tr>\n\n      <!-- Invalid -->\n      <tr>\n        <th>Invalid</th>\n        <!-- Invalid Enabled -->\n        <td>\n          <select rx-select\n                  id=\"selInvalidEnabled\"\n                  always-invalid\n                  ng-model=\"invalidEnabled\">\n            <option value=\"1\">First</option>\n            <option value=\"2\">Second</option>\n            <option value=\"3\">Third</option>\n            <option value=\"4\">Fourth</option>\n          </select>\n        </td>\n\n        <!-- Invalid Ng-Disabled -->\n        <td>\n          <select rx-select\n                  id=\"selInvalidNgDisabled\"\n                  always-invalid\n                  ng-model=\"invalidNgDisabled\"\n                  ng-disabled=\"true\">\n            <option value=\"na\">Disabled by 'ng-disabled' attribute</option>\n          </select>\n        </td>\n\n        <!-- Invalid Disabled -->\n        <td>\n          <select rx-select\n                  id=\"selInvalidDisabled\"\n                  disabled\n                  always-invalid\n                  ng-model=\"invalidDisabled\">\n            <option value=\"na\">Disabled by 'disabled' attribute</option>\n          </select>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n    <h3>Plain HTML Select Boxes (for comparison)</h3>\n  <p>\n    <select id=\"plainHtmlNormal\" ng-required=\"true\">\n      <option value=\"\">Plain HTML Select Option</option>\n      <option value=\"first\">First Option</option>\n      <option value=\"second\">Second Option</option>\n      <option value=\"third\">Third Option</option>\n      <option value=\"fourth\">Fourth Option</option>\n    </select>\n  </p>\n  <p>\n    <select id=\"plainHtmlDisabled\" disabled>\n      <option value=\"\">Disabled HTML Select Option</option>\n      <option value=\"first\">First Option</option>\n      <option value=\"second\">Second Option</option>\n      <option value=\"third\">Third Option</option>\n      <option value=\"fourth\">Fourth Option</option>\n    </select>\n  </p>\n  <p>\n    <select id=\"plainHtmlSecondSelected\"\n            ng-model=\"htmlSelectAlternativeValue\">\n      <option value=\"\">Starts on Second Option</option>\n      <option value=\"first\">First Option</option>\n      <option value=\"second\">Non Default Starting Option</option>\n      <option value=\"third\">Third Option</option>\n      <option value=\"fourth\">Fourth Option</option>\n    </select>\n  </p>\n  <p>\n    <select id=\"plainSelShowSelect\"\n            ng-model=\"plainHtmlSelect\">\n      <option value=\"hide\">Hide Next Select Box</option>\n      <option value=\"show\">Show Next Select Box</option>\n    </select>\n\n    <select id=\"plainSelRemoveable\"\n            value=\"hidden\"\n            ng-if=\"plainHtmlSelect !== 'hide'\">\n      <option value=\"\">Is Present</option>\n    </select>\n  </p>\n</div>\n",
            "less": "/*\n * rxSelect\n */\n.rxSelect {\n  z-index: 0; // creates local z-index stacking context\n  .box-sizing(border-box);\n  display: block;\n  position: relative;\n  color: @rxSelect-text-color;\n  background: @rxSelect-background-color;\n  .border-radius(@rxSelect-border-radius);\n\n  // Element should be resizable via wrapper alone\n  min-width: @rxSelect-min-width;\n  height: @rxSelect-height;\n\n  &.rx-disabled {\n    color: @rxSelect-disabled-text-color;\n    background: @rxSelect-disabled-background-color;\n  }\n\n  // position elements in wrapper\n  select,\n  .fake-select {\n    .box-sizing(border-box);\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n\n  .disabledSelect() {\n    cursor: not-allowed;\n\n    & + .fake-select {\n      border-color: @rxSelect-disabled-border-color;\n      border-width: 1px;\n\n      .select-trigger {\n        background: @rxSelect-disabled-background-color;\n        border-left-width: 0px;\n        border-left-color: @rxSelect-disabled-border-color;\n        color: @rxSelect-disabled-trigger-color;\n      }\n    }\n  }//.disabledSelect()\n\n  .invalidSelect() {\n    & + .fake-select {\n      border-color: @rxSelect-invalid-border-color;\n      border-width: 2px;\n\n      .select-trigger {\n        color: @rxSelect-invalid-trigger-color;\n      }\n    }\n\n    &[disabled] {\n      .rxSelect.disabledSelect();\n    }\n  }//.invalidSelect()\n\n  select {\n    z-index: 0;\n    cursor: pointer;\n\n    // reset native styling\n    // !important is required to reset native styling and avoid any additional styling\n    border: 0 !important; // lesshint importantRule: false\n    outline: none !important; // lesshint importantRule: false\n    background: transparent;\n    &:-moz-focusring {\n      // FF uses text color to draw ring. Make it transparent\n      color: transparent;\n      // However, we still need to display our select <option> text\n      text-shadow: 0 0 0 @rxSelect-text-color;\n    }\n\n    & + .fake-select {\n      border-color: @rxSelect-border-color;\n      border-width: 1px;\n    }\n\n    &.ng-invalid.ng-dirty {\n      .invalidSelect();\n    }\n\n    // Disabled Trumps All\n    &[disabled] {\n      .disabledSelect();\n    }\n  }//select\n\n  .fake-select {\n    z-index: 10;\n    border: @rxSelect-border-width solid @rxSelect-border-color;\n    overflow: hidden;\n    .border-radius(@rxSelect-border-radius);\n    display: flex;\n    justify-content: flex-end;\n    flex-flow: row nowrap;\n\n    // This allow pointer events to pass THROUGH to the\n    // native <select> element\n    pointer-events: none !important; // lesshint importantRule: false\n\n    // Custom trigger button will cover native <select> button\n    .select-trigger {\n      .box-sizing(border-box);\n      width: @rxSelect-trigger-width;\n      background: @rxSelect-background-color;\n      color: @rxSelect-trigger-color;\n\n      // perfectly center the trigger icon\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }//.select-trigger\n  }//.fake-select\n}//.rxSelect\n"
        }
    },
    {
        "displayName": "rxSelectFilter",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxSelectFilter",
        "moduleName": "'encore.ui.rxSelectFilter'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxSelectFilter/rxSelectFilter.module.js",
            "src/components/rxSelectFilter/scripts/rxSelectFilter.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxSelectFilter/templates/rxSelectFilter.html"
        ],
        "docs": {
            "md": "<p>A component that provides a multi-select dropdown interface intended for table filtering.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxSelectFilterCtrl', function ($scope, SelectFilter) {\n    $scope.filter = SelectFilter.create({\n        properties: ['account', 'status'],\n        selected: {\n            account: ['A']\n        }\n    });\n\n    $scope.tickets = [\n        { account: 'A', status: 'NEW', description: 'A new ticket' },\n        { account: 'A', status: 'IN_PROGRESS', description: 'Fix all the bugs' },\n        { account: 'B', status: 'TRANSFERRED', description: 'Don\\'t stop believing' },\n        { account: 'B', status: 'VENDOR', description: 'Hold on to that feeling' },\n        { account: 'A', status: 'TRANSFERRED', description: 'qwertyuiop' }\n    ];\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how the component can be used -->\n<div ng-controller=\"rxSelectFilterCtrl\">\n    <h3>Filtered Table</h3>\n    <table class=\"table-striped\">\n        <thead>\n            <th colspan=\"3\" class=\"filter-header\">\n                <form rx-form>\n                    <rx-form-section controlled-width>\n                        <rx-select-filter filter=\"filter\"></rx-select-filter>\n                    </rx-form-section>\n                </form>\n            </th>\n            <tr>\n                <th>Account</th>\n                <th>Status</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"ticket in (filteredTickets = (tickets | Apply:filter))\">\n                <td>{{ticket.account}}</td>\n                <td>{{ticket.status}}</td>\n                <td>{{ticket.description}}</td>\n            </tr>\n            <tr ng-if=\"filteredTickets.length === 0\">\n                <td colspan=\"6\">\n                    <div ng-if=\"tickets.length === 0\">No tickets were found.</div>\n                    <div ng-if=\"tickets.length !== 0\">No results match those criteria.</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
            "less": "/*\n * rxSelectFilter\n */\nrx-select-filter {\n  flex: 1;\n  display: flex;\n  flex-flow: row wrap;\n  word-break: break-all;\n}\n"
        }
    },
    {
        "displayName": "rxSortableColumn",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxSortableColumn",
        "moduleName": "'encore.ui.rxSortableColumn'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxSortableColumn/rxSortableColumn.module.js",
            "src/components/rxSortableColumn/scripts/rxSortableColumn.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxSortableColumn/templates/rxSortableColumn.html"
        ],
        "docs": {
            "md": "<p>The rxSortableColumn component provides functionality to sort a table on a single property value.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxSortableColumnCtrl', function ($scope, rxSortUtil) {\n    $scope.sort = rxSortUtil.getDefault('name', false);\n\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    $scope.talentPool = [\n        {\n            name: 'Andrew Yurisich',\n            jobTitle: 'Mailroom Associate IV'\n        },\n        {\n            name: 'Patrick Deuley',\n            jobTitle: 'Design Chaplain'\n        },\n        {\n            name: null,\n            jobTitle: 'Chief Mastermind'\n        },\n        {\n            jobTitle: 'Assistant Chief Mastermind'\n        },\n        {\n            name: 'Hussam Dawood',\n            jobTitle: 'Evangelist of Roger Enriquez'\n        },\n        {\n            name: 'Kerry Bowley',\n            jobTitle: 'Dev Mom'\n        },\n    ];\n});\n",
            "html": "<div ng-controller=\"rxSortableColumnCtrl\">\n    <p>Note: The demo table is also using <code>rx-floating-header</code>, which is not required. We've only done this to illustrate that <code>rxSortableColumn</code> works properly with <code>rxFloatingHeader</code>. The table is also using <code>rxSortEmptyTop</code>.</p>\n    <table rx-floating-header>\n        <thead>\n            <tr>\n                <th scope=\"col\">\n                    <rx-sortable-column\n                        sort-method=\"sortCol(property)\"\n                        sort-property=\"name\"\n                        predicate=\"sort.predicate\"\n                        reverse=\"sort.reverse\">\n                        Name\n                    </rx-sortable-column>\n                </th>\n                <th scope=\"col\">\n                    <rx-sortable-column\n                        sort-method=\"sortCol(property)\"\n                        sort-property=\"jobTitle\"\n                        predicate=\"sort.predicate\"\n                        reverse=\"sort.reverse\">\n                        Occupation\n                    </rx-sortable-column>\n                </th>\n                <th scope=\"col\">\n                    <rx-sortable-column\n                        sort-method=\"sortCol\"\n                        sort-property=\"none\"\n                        predicate=\"sort.predicate\"\n                        reverse=\"sort.reverse\">\n                        Testing Sort Errors (see Protractor Tab)\n                    </rx-sortable-column>\n                </th>\n            </tr>\n        </thead>\n        <tbody id=\"talentPoolData\">\n            <tr ng-repeat=\"resource in talentPool | rxSortEmptyTop:sort.predicate:sort.reverse\">\n                <th scope=\"row\" class=\"talent-name\">\n                    {{resource.name}}\n                </th>\n                <td class=\"talent-job\">\n                    {{resource.jobTitle}}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
            "less": "/*\n * rxSortableColumn\n */\n.rx-sortable-column {\n  .btn-link {\n    // This needs to be set explicitly, otherwise `.table-filters button`\n    // applies a font size of 93% and sortable columns have smaller headers.\n    font-size: 13px;\n  }\n\n  .sort-action {\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n\n    &:focus {\n      // since we underline on focus, we can remove the outline rectangle that sticks around\n      outline: none;\n    }\n\n    .display-value {\n      flex: 1;\n      text-align: left;\n    }\n\n    .sort-icon {\n      flex: 0 0 16px;\n      width: 13px;\n      height: 13px;\n      line-height: 13px;\n\n      .bg {\n        color: @gray-600;\n      }\n      .sort-direction-icon {\n        color: @gray-900;\n      }\n    }\n  }\n}\n"
        }
    },
    {
        "displayName": "rxSpinner",
        "stability": "stable",
        "description": "Adds a spinner icon to any element",
        "isLegacy": true,
        "keywords": [],
        "name": "rxSpinner",
        "moduleName": "'encore.ui.rxSpinner'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxSpinner/rxSpinner.module.js",
            "src/components/rxSpinner/scripts/rxSpinner.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>A component adds a spinner icon to any element</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxSpinnerCtrl', function ($scope) {\n    $scope.loading = true;\n});\n",
            "html": "<div ng-controller=\"rxSpinnerCtrl\">\n  <button rx-toggle=\"loading\" class=\"button\">Toggle Loading</button>\n  <div rx-spinner toggle=\"loading\"></div>\n  Spinning = {{loading}}\n</div>\n",
            "less": "@import \"vars\";\n\n/*********************************************************\n*  CSS3 Animation spinner\n *\n*  Based on: http://cssdeck.com/labs/css3-animation-spinner\n*  Copyright 2013 - birkof.ro\n *********************************************************/\n\n.rx-spinner {\n  background-color: transparent;\n  border: 2px solid @gray-600;\n  border-top-color: transparent;\n  border-left-color: transparent;\n  .border-radius(150px);\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  margin-bottom: 3px;\n  vertical-align: middle;\n  -webkit-animation: spin 0.8s infinite linear;\n  -moz-animation: spin 0.8s infinite linear;\n  -ms-animation: spin 0.8s infinite linear;\n  -o-animation: spin 0.8s infinite linear;\n  animation: spin 0.8s infinite linear;\n}\n\n@-webkit-keyframes spin { /* Safari and Chrome */\n  from {\n    -webkit-transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n  }\n}\n\n@-moz-keyframes spin { /* Firefox */\n  from {\n    -moz-transform: rotate(0deg);\n  }\n  to {\n    -moz-transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n"
        }
    },
    {
        "displayName": "rxStatusColumn",
        "stability": "experimental",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxStatusColumn",
        "moduleName": "'encore.ui.rxStatusColumn'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxStatusColumn/rxStatusColumn.module.js",
            "src/components/rxStatusColumn/scripts/rxStatusColumn.js",
            "src/components/rxStatusColumn/scripts/rxStatusHeader.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxStatusColumn/templates/rxStatusColumn.html"
        ],
        "docs": {
            "md": "<p>This component provides directives and styles for putting status columns into tables.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxStatusColumnCtrl', function ($scope, rxStatusMappings, rxSortUtil) {\n    $scope.servers = [\n        { status: 'ACTIVE', title: 'ACTIVE status' },\n        { status: 'ERROR', title: 'ERROR status' },\n        { status: 'DISABLED', title: 'DISABLED status' },\n        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },\n        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },\n        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },\n        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },\n        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },\n        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },\n        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },\n        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }\n    ];\n\n    // We have a few different ways of adding mappings. We've tried to show them all here\n    rxStatusMappings.addGlobal({\n        'DELETING': 'PENDING'\n    });\n    rxStatusMappings.mapToInfo('RESCUE');\n    rxStatusMappings.mapToWarning('SUSPENDED');\n    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);\n    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);\n    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });\n    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n    $scope.sort = rxSortUtil.getDefault('status');\n});\n",
            "html": "<div ng-controller=\"rxStatusColumnCtrl\">\n    <table class=\"table-striped demo-status-column-table\">\n        <thead>\n            <tr>\n                <th rx-status-header>\n                    <rx-sortable-column\n                      sort-method=\"sortCol(property)\"\n                      sort-property=\"status\"\n                      predicate=\"sort.predicate\"\n                      reverse=\"sort.reverse\">\n                        Status\n                    </rx-sortable-column>\n                </th>\n                <th>Title</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"server in servers | orderBy: sort.predicate:sort.reverse \">\n                <!-- Both `api` and `tooltip-content` are optional -->\n                <td rx-status-column status=\"{{ server.status }}\" api=\"{{ server.api }}\" tooltip-content=\"{{ server.status }}\"></td>\n                <td>{{ server.title }}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
            "less": "/*\n * rxStatusColumn\n */\n\nth.rx-status-header {\n  width: 55px;\n}\n\ntd.rx-status-column {\n  text-align: center;\n  i {\n    padding-left: 2px;\n  }\n  &.status-ACTIVE {\n    background: @green-100;\n  }\n  &.status-PENDING {\n    background: @orange-100;\n    background-image: url(\"images/status-pending.gif\");\n  }\n  &.status-WARNING {\n    background: @orange-100;\n    i {\n      color: @gray-950;\n    }\n  }\n  &.status-ERROR {\n    background: @red-700;\n    i {\n      color: @white;\n    }\n  }\n  &.status-INFO {\n    background: @blue-100;\n    i {\n      color: @gray-950;\n    }\n  }\n  &.status-DISABLED {\n    background: @app-disabled-background-color;\n  }\n\n  .fa-exclamation-circle {\n    color: transparent;\n  }\n\n\n}\n"
        }
    },
    {
        "displayName": "rxToggle",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxToggle",
        "moduleName": "'encore.ui.rxToggle'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxToggle/rxToggle.module.js",
            "src/components/rxToggle/scripts/rxToggle.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>This component provides an attribute directive to handle toggling a boolean\nscope property for show/hide purposes (normally used in conjunction with\nng-show to toggle hidden content).</p>\n",
            "js": "",
            "html": "<div>\n    <button rx-toggle=\"visible\" id=\"vacillator\" class=\"button\">Toggle Div</button>\n\n    <p>Current state: {{visible}}</p>\n\n    <div ng-show=\"visible\" id=\"vacillated\">Shows when $scope.visibile == true</div>\n</div>",
            "less": ""
        }
    },
    {
        "displayName": "rxToggleSwitch",
        "stability": "experimental",
        "description": "Displays a boolean toggle switch",
        "isLegacy": true,
        "keywords": [],
        "name": "rxToggleSwitch",
        "moduleName": "'encore.ui.rxToggleSwitch'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxToggleSwitch/rxToggleSwitch.module.js",
            "src/components/rxToggleSwitch/scripts/rxToggleSwitch.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxToggleSwitch/templates/rxToggleSwitch.html"
        ],
        "docs": {
            "md": "<p> A component that creates a boolean toggle switch</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxToggleSwitchCtrl', function ($scope, $timeout, rxNotify) {\n    $scope.toggle3 = true;\n    $scope.toggle5 = true;\n\n    $scope.attemptChange = function () {\n        $scope.loading = true;\n        rxNotify.clear('page');\n        rxNotify.add('Saving...', {\n            loading: true\n        });\n\n        // Simulate an API request\n        $timeout(function () {\n            $scope.loading = false;\n            rxNotify.clear('page');\n            rxNotify.add('Change saved', {\n                type: 'success'\n            });\n        }, 1000);\n    };\n\n    $scope.attemptFailedChange = function (value) {\n        $scope.loading5 = true;\n        rxNotify.clear('page');\n        rxNotify.add('Attempting to activate...', {\n            loading: true\n        });\n\n        // Simulate a failed API request\n        $timeout(function () {\n            $scope.loading5 = false;\n            rxNotify.clear('page');\n            rxNotify.add('Asynchronous operation failed', {\n                type: 'error',\n            });\n\n            // Reset toggle switch to original value to simulate failed async operation\n            $scope.toggle5 = !value;\n        }, 1000);\n    };\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how the component can be used -->\n<div ng-controller=\"rxToggleSwitchCtrl\">\n    <p>\n        <h3>Simple use</h3>\n        <rx-toggle-switch class=\"demo-default-values\" ng-model=\"encoreSuperpowers\"></rx-toggle-switch>\n        <span>Do you have powers? {{ encoreSuperpowers }}</span>\n    </p>\n    <p>\n        <h3>Specific model values</h3>\n        <rx-toggle-switch class=\"demo-model-values\"\n            ng-model=\"toggle2\"\n            true-value=\"active\"\n            false-value=\"disabled\">\n        </rx-toggle-switch>\n        <span>Model value: {{ toggle2 }}</span>\n    </p>\n    <p>\n        <h3>Performing an asynchronous operation</h3>\n        <rx-toggle-switch class=\"demo-post-hook\"\n            ng-model=\"toggle3\"\n            post-hook=\"attemptChange(value)\"\n            disabled=\"loading\">\n        </rx-toggle-switch>\n    </p>\n    <p>\n        <h3>Attempting a failed asynchronous operation</h3>\n        <rx-toggle-switch class=\"demo-failed-async\"\n            ng-model=\"toggle5\"\n            post-hook=\"attemptFailedChange()\"\n            true-value=\"active\"\n            disabled=\"loading5\">\n        </rx-toggle-switch>\n    </p>\n    <p>\n        <h3>Disabled</h3>\n        <rx-toggle-switch class=\"demo-disabled\" ng-model=\"toggle4\" disabled=\"true\"></rx-toggle-switch>\n    </p>\n</div>\n",
            "less": ".rx-toggle-switch {\n  font-size: 0.8em;\n  line-height: @rxToggleSwitch-line-height;\n\n  display: inline-block;\n\n  border: 1px @rxToggleSwitch-border-color solid;\n  border-radius: 9px;\n  background-color: @rxToggleSwitch-off-state-color;\n  color: @rxToggleSwitch-text-color;\n\n  padding: 0 @rxToggleSwitch-padding 0 @rxToggleSwitch-padding;\n\n  width: 5em;\n\n  cursor: pointer;\n  position: relative;\n  text-align: right;\n\n  .box-shadow(inset 1px 2px @rxToggleSwitch-blur-dist @rxToggleSwitch-blur-spread rgba(0, 0, 0, 0.50));\n  .user-select(none);\n  .box-sizing(border-box);\n\n  &[disabled] {\n    background-color: @app-disabled-background-color;\n    color: @app-disabled-text-color;\n    &.on {\n      background-color: desaturate(lighten(@rxToggleSwitch-on-state-color, 40%), 30%);\n      color: darken(@app-disabled-text-color, 10%);\n    }\n    cursor: not-allowed;\n    .knob {\n      background-color: @app-disabled-background-color;\n      border: 1px @app-disabled-text-color solid;\n    }\n  }\n  &.on {\n    background-color: @rxToggleSwitch-on-state-color;\n    text-align: left;\n    .knob {\n      left: 100%;\n      -webkit-transform: translate(-100%, 0);\n      -moz-transform: translate(-100%, 0);\n      transform: translate(-100%, 0);\n    }\n  }\n  .knob {\n    .transition-value(all 0.1s ease-out);\n\n    position: absolute;\n    display: inline-block;\n    top: 0;\n    left: 0;\n\n    width: @rxToggleSwitch-knob-size;\n    height: @rxToggleSwitch-knob-size;\n    border-radius: (@rxToggleSwitch-knob-size/2)+1;\n    background-color: @rxToggleSwitch-knob-color;\n    border: 1px @rxToggleSwitch-knob-border-color solid;\n\n    .box-shadow(0 0 @rxToggleSwitch-blur-dist @rxToggleSwitch-blur-spread rgba(0, 0, 0, 0.55));\n    overflow: hidden;\n  }\n}\n"
        }
    },
    {
        "displayName": "tooltips",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "tooltips",
        "moduleName": "'encore.ui.tooltips'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/tooltips/tooltips.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>The tooltips component provides styles to raw HTML elements and custom directive templates.</p>\n",
            "js": "angular.module('demoApp')\n.controller('tooltipsCtrl', function ($scope) {\n    $scope.dynamicTooltip = 'I was defined in the controller!';\n});\n",
            "html": "<div ng-controller=\"tooltipsCtrl\">\n  <h3>Tooltip Placement</h3>\n  <rx-button tooltip=\"Left tooltip\" tooltip-placement=\"left\" default-msg=\"Left tooltip\"></rx-button>\n  &nbsp;\n  <rx-button tooltip=\"Right tooltip\" tooltip-placement=\"right\" default-msg=\"Right tooltip\"></rx-button>\n  &nbsp;\n  <rx-button tooltip=\"A top tooltip\" tooltip-placement=\"top\" default-msg=\"Top tooltip\"></rx-button>\n  &nbsp;\n  <rx-button tooltip=\"A bottom tooltip\" tooltip-placement=\"bottom\" default-msg=\"Bottom tooltip\"></rx-button>\n\n  <h3>Simple Tooltip Defined in the Controller</h3>\n  <rx-button tooltip=\"{{dynamicTooltip}}\" default-msg=\"Hover to see text coming from the controller.\"></rx-button>\n\n  <h3>HTML Tooltip</h3>\n  <span tooltip-html-unsafe=\"<span class='tooltip-header'>A Tooltip Title</span><p>You can use HTML</p>\"><span>Hover over this text to see HTML in a tooltip</span>\n</div>\n",
            "less": "@import \"vars\";\n\n// Base class\n.tooltip {\n  position: absolute;\n  z-index: @tooltip-z-index;\n  display: block;\n  visibility: visible;\n  font-size: @app-font-size;\n  line-height: @app-line-height;\n  .opacity(0);\n\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n\n  &.in {\n    .opacity(@tooltip-opacity);\n  }\n\n  // Make room for arrow\n  &.top {\n    margin-top: -@tooltip-arrow-length;\n  }\n\n  &.right {\n    margin-left: @tooltip-arrow-length;\n  }\n\n  &.bottom {\n    margin-top: @tooltip-arrow-length;\n  }\n\n  &.left {\n    margin-left: -@tooltip-arrow-length;\n  }\n}\n\n// Wrapper for the tooltip content\n.tooltip-inner {\n  border: @tooltip-border-width solid @tooltip-border-color;\n  max-width: @tooltip-max-width;\n  color: @tooltip-text-color;\n  text-align: center;\n  text-decoration: none;\n  background-color: @tooltip-background-color;\n  .border-radius(4px);\n  box-shadow: rgba(0, 0, 0, 0.35) 1px 1px 4px 0px;\n  padding: 15px;\n\n  .tooltip-header {\n    color: @tooltip-header-text-color;\n    text-align: left;\n    font-size: 15px;\n    padding-bottom: 5px;\n    font-weight: 600;\n  }\n}\n\n// Arrows\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: @tooltip-arrow-border-length solid transparent;\n  text-shadow: rgba(0, 0, 0, 0.09) 1px 1px 1px;\n\n  &:before {\n    pointer-events: none;\n    content: \" \";\n    position: absolute;\n    border: @tooltip-arrow-length solid transparent;\n  }\n}\n\n.tooltip {\n  &.left,\n  &.right {\n    .tooltip-arrow {\n      top: 50%;\n      margin-top: -(@tooltip-arrow-border-width / 2);\n\n      &:before { // arrow fill\n        margin-top: -(@tooltip-arrow-width / 2);\n      }\n    }\n  }\n\n  &.top,\n  &.bottom {\n    .tooltip-arrow {\n      left: 50%;\n      margin-left: -(@tooltip-arrow-border-width / 2);\n\n      &:before { // arrow fill\n        margin-left: -(@tooltip-arrow-width / 2);\n      }\n    }\n  }\n\n  &.top .tooltip-arrow {\n    bottom: -(@tooltip-arrow-length);\n    border-bottom-width: 0;\n    border-top-color: @tooltip-arrow-border-color;\n\n    &:before {\n      top: -(@tooltip-arrow-border-length + @tooltip-border-width);\n      border-top-color: @tooltip-arrow-fill-color;\n    }\n  }\n\n  &.right .tooltip-arrow {\n    left: -(@tooltip-arrow-length);\n    border-left-width: 0;\n    border-right-color: @tooltip-arrow-border-color;\n\n    &:before {\n      right: -(@tooltip-arrow-border-length + @tooltip-border-width);\n      border-right-color: @tooltip-arrow-fill-color;\n    }\n  }\n\n  &.bottom .tooltip-arrow {\n    top: -(@tooltip-arrow-length);\n    border-top-width: 0;\n    border-bottom-color: @tooltip-arrow-border-color;\n\n    &:before {\n      bottom: -(@tooltip-arrow-border-length + @tooltip-border-width);\n      border-bottom-color: @tooltip-arrow-fill-color;\n    }\n  }\n\n  &.left .tooltip-arrow {\n    right: -(@tooltip-arrow-length);\n    border-right-width: 0;\n    border-left-color: @tooltip-arrow-border-color;\n\n    &:before {\n      left: -(@tooltip-arrow-border-length + @tooltip-border-width);\n      border-left-color: @tooltip-arrow-fill-color;\n    }\n  }\n}\n"
        }
    },
    {
        "displayName": "typeahead",
        "stability": "unstable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "typeahead",
        "moduleName": "'encore.ui.typeahead'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/typeahead/typeahead.module.js",
            "src/components/typeahead/scripts/typeahead.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "<p>This component provides styles and a demo for the <a href=\"https://github.com/angular-ui/bootstrap/tree/master/src/typeahead\">the Angular-UI Bootstrap Typeahead plugin</a>, which is included as a dependency for EncoreUI.</p>\n",
            "js": "angular.module('demoApp')\n.controller('typeaheadCtrl', function ($scope) {\n    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',\n        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',\n        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',\n        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',\n        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',\n        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',\n        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];\n});\n",
            "html": "<div ng-controller=\"typeaheadCtrl\">\n  <div rx-form>\n    <h3>Standard Use</h3>\n    <rx-form-section stacked>\n      <rx-field>\n        <rx-field-name>States:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <input type=\"text\"\n              ng-model=\"selected1\"\n              typeahead=\"state for state in states | filter:$viewValue | limitTo:8\" />\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n\n    <h3>Show List on Focus</h3>\n    <rx-form-section stacked>\n      <rx-field>\n        <rx-field-name>States:</rx-field-name>\n        <rx-field-content>\n          <rx-input>\n            <input type=\"text\"\n              id=\"typeahead\"\n              ng-model=\"selected2\"\n              typeahead=\"state for state in states | filter:$viewValue:allowEmpty\" />\n          </rx-input>\n        </rx-field-content>\n      </rx-field>\n    </rx-form-section>\n  </div>\n</div>\n",
            "less": "@import \"vars\";\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  margin-top: -1px;\n  display: none;\n  list-style: none;\n  background: @white;\n  border: 1px solid @gray-400;\n  padding: 6px 0;\n  z-index: 3; // Will display over a textarea element\n  max-height: 300px;\n  overflow-y: auto;\n\n  a {\n    display: block;\n    margin: 0;\n    padding: 5px 10px;\n    color: @gray-900;\n  }\n  .active a {\n    background: @blue-700;\n    color: @white;\n  }\n}\n"
        }
    },
    {
        "displayName": "Account Info",
        "stability": "stable",
        "description": "Responsible for drawing an account info box.",
        "api": "directive:rxAccountInfo",
        "keywords": [
            "account",
            "info",
            "information",
            "rxAccountInfo"
        ],
        "name": "AccountInfo",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/AccountInfo/scripts/rxAccountInfo.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/AccountInfo/templates/rxAccountInfo.html",
            "templates/AccountInfo/templates/rxAccountInfoBanner.html"
        ],
        "docs": {
            "md": "",
            "js": "// Note that these factories are only present for the purposes of this demo. In a real application,\n// SupportAccount, Teams, AccountStatusGroup, and Encore will have to be provided from elsewhere,\n// outside of encore-ui. Specifically, we implement them in encore-ui-svcs.\n\nangular.module('demoApp')\n.value('Badges',\n       [{\n           url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',\n           description: 'Enables the free distribution of an otherwise copyrighted work.',\n           name: 'Creative Commons'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',\n           description: ['You must give appropriate credit, provide a link to the',\n                         'license, and indicate if changes were made.'].join(' '),\n           name: 'Attribution'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',\n           description: 'You may not use the material for commercial purposes.',\n           name: 'Non-Commercial'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',\n           description: 'Waives as many rights as legally possible, worldwide.',\n           name: 'Public Domain'\n       }]\n)\n.value('TeamBadges',\n       [{\n           url: 'http://mirrors.creativecommons.org/presskit/icons/share.large.png',\n           description: ['Licensees may distribute derivative works only under a license',\n                         'identical to the license that governs the original work.'].join(' '),\n           name: 'ShareAlike'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/nd.large.png',\n           description: ['Licensees may copy, distribute, display and perform only verbatim',\n                         'copies of the work, not derivative works based on it.'].join(' '),\n           name: 'No-Derivs'\n       }]\n)\n.factory('SupportAccount', function ($q, Badges) {\n    return {\n        getBadges: function (config, success, failure) {\n            var deferred = $q.defer();\n\n            if (config.accountNumber === '6789') {\n                deferred.reject();\n            } else {\n                deferred.resolve(Badges);\n            }\n\n            deferred.promise.then(success, failure);\n\n            return deferred.promise;\n        }\n    };\n})\n.factory('Teams', function ($q, TeamBadges) {\n    return {\n        badges: function (config) {\n            var deferred = $q.defer();\n\n            if (config.id === '9876') {\n                deferred.reject();\n            } else {\n                deferred.resolve(TeamBadges);\n            }\n\n            deferred.$promise = deferred.promise;\n\n            return deferred;\n        }\n    };\n})\n.factory('Encore', function ($q) {\n    return {\n        getAccount: function (config, success, failure) {\n            var deferred = $q.defer();\n\n            if (config.id === '9876') {\n                deferred.reject();\n            } else if (config.id === '5623') {\n                deferred.resolve({ name: 'DelinquentAccount', status: 'Delinquent', accessPolicy: 'Full' });\n            } else if (config.id === '3265') {\n                deferred.resolve({ name: 'UnverifiedAccount', status: 'Unverified', accessPolicy: 'Full' });\n            } else {\n                deferred.resolve({ name: 'Mosso', status: 'Active', accessPolicy: 'Full' });\n            }\n\n            deferred.promise.then(success, failure);\n\n            return deferred.promise;\n        }\n    };\n})\n.factory('AccountStatusGroup', function () {\n    var warning = ['suspended', 'delinquent'];\n    var info = ['unverified', 'pending approval', 'approval denied', 'teststatus', 'terminated'];\n\n    return function (statusText) {\n        var lower = statusText.toLowerCase();\n        if (_.contains(warning, lower)) {\n            return 'warning';\n        } else if (_.contains(info, lower)) {\n            return 'info';\n        }\n        return '';\n    };\n});\n",
            "html": "<h3><rx-permalink>Account Info Demonstrating <code>rxPage</code> Usage </rx-permalink></h3>\n<p>\n  This element is used to draw an account info box at the top of each page,\n  directly underneath the breadcrumbs.\n</p>\n<p>\n  When <code>account-number=\"...\"</code> is passed to <code>&lt;rx-page&gt;</code>, the account info\n  banner will automatically be drawn underneath the breadcrumbs, as shown here.\n</p>\n<rx-example name=\"accountInfo.rxPage\"></rx-example>\n\n<p>\n  The rest of the examples just show the affect of different conditions on the account info banner, rather than\n  showing an entire <code>rxApp</code> sample again.\n</p>\n\n<h3><rx-permalink>Simple Account Info Implementation</rx-permalink></h3>\n<rx-example class=\"demo-simple-account\" name=\"accountInfo.simple\"></rx-example>\n\n<h3><rx-permalink>Deliquent Account</rx-permalink></h3>\n<p>Note the changed styling on \"Account Status\".<p>\n<rx-example class=\"delinquent-account\" name=\"accountInfo.deliquent\"></rx-example>\n\n<h3><rx-permalink>Account Info Implementation with Team Badges</rx-permalink></h3>\n<rx-example class=\"unverified-account\" name=\"accountInfo.withTeamBadges\"></rx-example>\n\n<h3><rx-permalink>Can't Load Badges</rx-permalink></h3>\n<rx-example name=\"accountInfo.errorBadges\"></rx-example>\n\n<h3><rx-permalink>Can't Load Team Badges</rx-permalink></h3>\n<rx-example name=\"accountInfo.errorTeamBadges\"></rx-example>\n\n<h3><rx-permalink>Can't Load Account Name</rx-permalink></h3>\n<rx-example name=\"accountInfo.unknownAccount\"></rx-example>\n\n<h3><rx-permalink>Deprecated Account Format</rx-permalink></h3>\n<p>\n  The Account Info box is intended to appear as a banner directly beneath a page's breadcrumbs, and\n  <code>rxPage</code> has been augmented to support this. In the past though, we supported a different\n  format for the Account Info, which you would explicitly place wherever on the page you liked.\n</p>\n<p>\n  This old format is still available. Simply use <code>rx-account-info</code> as above, but leave out the\n  <code>account-info-banner='true'</code> attribute. This style is considered deprecated, and should not be\n  used for new work.\n</p>\n<rx-example name=\"accountInfo.deprecated\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Action Menu",
        "stability": "stable",
        "description": "Display configurable action menu",
        "api": "directive:rxActionMenu",
        "keywords": [
            "rxActionMenu",
            "action",
            "menu",
            "table",
            "context"
        ],
        "name": "ActionMenu",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/ActionMenu/scripts/rxActionMenu.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/ActionMenu/templates/rxActionMenu.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxActionMenuCtrl', function ($scope, rxNotify) {\n    $scope.add = function () {\n        rxNotify.add('Added!', {\n            type: 'success',\n            repeat: false,\n            timeout: 3\n        });\n    };\n\n    $scope.remove = function () {\n        rxNotify.add('Deleted!', {\n            type: 'error',\n            repeat: false,\n            timeout: 3\n        });\n    };\n});\n",
            "html": "<p>A component to create a configurable action menu.</p>\n<h3 id=\"typical-usage\">Typical Usage</h3>\n<p>The cog in the first row is dismissable by clicking anywhere, but the second\n  cog can only be dismissed by clicking on the cog itself.\n</p>\n\n<rx-example name=\"ActionMenu.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Breadcrumbs",
        "stability": "stable",
        "description": "Displays navigation breadcrumbs on a page",
        "api": "directive:rxBreadcrumbs",
        "keywords": [
            "breadcrumbs",
            "navigation",
            "menu",
            "rxBreadcrumbs"
        ],
        "name": "Breadcrumbs",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Breadcrumbs/scripts/rxBreadcrumbs.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Breadcrumbs/templates/rxBreadcrumbs.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('BreadcrumbsSimpleCtrl', function ($scope, rxBreadcrumbsSvc) {\n    rxBreadcrumbsSvc.set([{\n        path: '#/elements',\n        name: 'Elements',\n    }, {\n        name: '<strong>All Elements</strong>',\n        status: 'demo'\n    }]);\n});\n",
            "html": "<p>\n  Displays navigation breadcrumbs on a page.\n</p>\n\n<rx-example class=\"site-breadcrumbs\" name=\"Breadcrumbs.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Buttons",
        "stability": "unstable",
        "description": "Several examples and styles of Buttons available for different contexts.",
        "api": "directive:rxButton",
        "keywords": [
            "button",
            "cancel",
            "rxButton",
            "submit"
        ],
        "name": "Buttons",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Buttons/scripts/rxButton.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Buttons/templates/rxButton.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('buttonAnimatedExampleCtrl', function ($scope, $timeout) {\n    $scope.status = {\n        loading: false,\n        disable: false\n    };\n\n    $scope.clickMe = function () {\n        $scope.status.loading = true;\n        $timeout(function () {\n            $scope.status.loading = false;\n        }, 4000);\n    };\n});\n\nangular.module('demoApp')\n.controller('buttonGroupExampleCtrl', function ($scope) {\n    $scope.status = 'off';\n});\n\nangular.module('demoApp')\n.controller('rxButtonDisableCtrl', function ($scope, $timeout) {\n    $scope.status = {\n        loading: false,\n        disable: true\n    };\n\n    $scope.login = function () {\n        $scope.status.loading = true;\n\n        $timeout(function () {\n            $scope.status.loading = false;\n        }, 4000);\n    };//login()\n});\n\nangular.module('demoApp')\n.controller('rxButtonSimpleCtrl', function ($scope, $timeout) {\n    $scope.isLoading = false;\n\n    $scope.login = function () {\n        $scope.isLoading = true;\n\n        $timeout(function () {\n            $scope.isLoading = false;\n        }, 4000);\n    };//login()\n});\n",
            "html": "<h2><rx-permalink>Basics</rx-permalink></h2>\n<p>\n  You can style most of your buttons using this <code>.button</code> class.\n  Exceptions can include <code>input type=\"button\"</code> or\n  <a href=\"#/elements/Buttons#rxButton\">rxButton</a> for dynamic loading indicators.\n</p>\n\n<h3><rx-permalink>Button Sizing</rx-permalink></h3>\n<p>\n  Buttons are sized using xl, lg, sm and xs classes. Not adding the additional\n  class defaults the size to medium.\n</p>\n<rx-example name=\"button.sizing\"></rx-example>\n\n<h3><rx-permalink>Types &amp; Colors</rx-permalink></h3>\n\n<h4><rx-permalink>Progression Button</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    If the form you are submitting results in EDITING something or something\n    auxiliary like getting metadata from a different source, keep it blue.\n  </li>\n  <li>\n    If you are providing a button for the user to continue through a series\n    of modals (with no submit), use blue.\n  </li>\n</ul>\n<rx-example name=\"button.colors.progression\"></rx-example>\n\n<h4><rx-permalink>Submit Button</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    If the form you are submitting results in CREATING or ADDING something,\n    use green.\n  </li>\n  <li>If the form you are submitting is within a modal, use green.</li>\n</ul>\n<rx-example name=\"button.colors.submit\"></rx-example>\n\n<h4><rx-permalink>Negative Button</rx-permalink></h4>\n<rx-example name=\"button.colors.negative\"></rx-example>\n\n<h4><rx-permalink>Cancel Button</rx-permalink></h4>\n<rx-example name=\"button.colors.cancel\"></rx-example>\n\n<h4><rx-permalink>Finish Button</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    If you are providing a button for the user to exit a series of modals\n    where no other action is required by the user, use the \"Finish &amp; Close\"\n    button with a blue outline.\n  </li>\n</ul>\n<rx-example name=\"button.colors.finish\"></rx-example>\n\n<h4><rx-permalink>Disabled Button</rx-permalink></h4>\n<rx-example name=\"button.colors.disabled\"></rx-example>\n\n\n<h3><rx-permalink>Button with Animation</rx-permalink></h3>\n<p>\n  You can use the spinner style with buttons. Different spinner styles are\n  used when content is loading or being fetched (see Using Colors and Icons\n  With Links demo).\n</p>\n<p>\n  When a user takes an action with results that can't be immediately\n  displayed, a spinner is shown on a disabled button state until the call\n  completes or the results of the user's action can be displayed in the UI.\n  Text for your buttons with spinners should describe the action taken using\n  \"-ing\" verbs, so the user understands why the button appearance has\n  changed. The disabled state ensures the user can't submit the same data\n  multiple times while the initial action completes.\n</p>\n<rx-example name=\"button.animated\"></rx-example>\n\n<h3><rx-permalink>Button Groups</rx-permalink></h3>\n<p>\n  This control should NOT be used as a replacement for radio inputs. Instead,\n  it should be used to indicate state on a page. For example, the legend of a\n  time plot may allow the user to select a range of week, month, or year. In\n  this situation, there is no form being submitted, but there is an indication\n  of the graph's state that can be interacted with. Conversely, radio inputs\n  are the correct way to implement a form input where one of a few options can\n  be selected.\n</p>\n<p>\n  Also, this type of control should only be used with at most four segments.\n</p>\n<rx-example name=\"button.group\"></rx-example>\n\n\n<h3><rx-permalink>rxButton</rx-permalink></h4>\n<p>\n  <code>rxButton</code> is used to create buttons based on the dynamic state of the\n  application.\n</p>\n\n<h4><rx-permalink>Typical Usage</rx-permalink></h4>\n<rx-example name=\"rxButton.simple\"></rx-example>\n\n<h4><rx-permalink>rxButton with <code>disable</code> attribute</rx-permalink></h4>\n<rx-example name=\"rxButton.disable\"></rx-example>\n",
            "less": "/*\n * rxButton\n */\n@import \"vars\";\n\n.button {\n  display: inline-block;\n  background: @rxButton-default-background-color;\n  color: @rxButton-default-text-color;\n  border: 0;\n  font-size: 14px;\n  padding: 7px 13px;\n  margin-bottom: 10px;\n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275);\n\n  &:hover,\n  &:focus {\n    background: @rxButton-default-hover-background-color;\n    cursor: pointer;\n    // in case the buttons are created using the <a> tag\n    color: @rxButton-default-text-color;\n    text-decoration: none;\n  }\n\n  // Size Variations\n  &.xl {\n    font-size: 16px;\n    padding: 20px 30px;\n  }\n\n  &.lg {\n    font-size: 15px;\n    padding: 15px 26px;\n  }\n\n  &.sm {\n    padding: 5px 10px;\n    font-size: 13px;\n  }\n\n  &.xs {\n    padding: 3px 7px;\n    margin-bottom: 5px;\n    font-size: 12px;\n  }\n\n  // Color Variations\n  &.positive,\n  &.submit {\n    background: @rxButton-positive-background-color;\n\n    &:hover,\n    &:focus {\n      background: @rxButton-positive-hover-background-color;\n    }\n  }\n\n  &.negative {\n    background: @rxButton-negative-background-color;\n\n    &:hover,\n    &:focus {\n      background: @rxButton-negative-hover-background-color;\n    }\n  }\n\n  &.finish {\n    background: @rxButton-finish-background-color;\n    color: @rxButton-finish-text-color;\n    // Inset line is created with .box-shadow instead of border property, because it avoids changing button height.\n    .box-shadow(inset 0 0 0 2px @rxButton-finish-outline-color);\n\n    &:hover,\n    &:focus {\n      color: @rxButton-finish-hover-text-color;\n      .box-shadow(inset 0 0 0 2px @rxButton-finish-hover-outline-color);\n    }\n  }\n\n  &.cancel {\n    background: @rxButton-cancel-background-color;\n\n    &:hover,\n    &:focus {\n      background: @rxButton-cancel-hover-background-color;\n    }\n  }\n\n  // Disabled styles should always come last in the cascade for color\n  // variations styles, or else they won't override other colors properly.\n  &[disabled],\n  &[disabled]:hover {\n    cursor: not-allowed;\n    color: @rxButton-disabled-text-color;\n    background: @rxButton-disabled-background-color;\n  }\n\n  &.inline {\n    vertical-align: middle;\n  }\n\n  // Spinner styles\n  .spinner {\n    display: inline-block;\n    position: relative;\n    left: 3px;\n\n    i {\n      width: 5px;\n      height: 5px;\n      background: @rxButton-spinner-background-color;\n\n      .border-radius(100%);\n      display: inline-block;\n      -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n      animation: bouncedelay 1.4s infinite ease-in-out;\n      /* Prevent first frame from flickering when animation starts */\n      -webkit-animation-fill-mode: both;\n      animation-fill-mode: both;\n\n      &.pos1 {\n        -webkit-animation-delay: -0.32s;\n        animation-delay: -0.32s;\n      }\n\n      &.pos2 {\n        -webkit-animation-delay: -0.16s;\n        animation-delay: -0.16s;\n      }\n    }\n  }\n\n  @-webkit-keyframes bouncedelay {\n    0%,\n    80%,\n    100% {\n      -webkit-transform: scale(0.0);\n    }\n    40% {\n      -webkit-transform: scale(1.0);\n    }\n  }\n\n  @keyframes bouncedelay {\n    0%,\n    80%,\n    100% {\n      transform: scale(0.0);\n      -webkit-transform: scale(0.0);\n    }\n    40% {\n      transform: scale(1.0);\n      -webkit-transform: scale(1.0);\n    }\n  }\n}//.button\n\n// Make buttons look like plain links\n.btn-link {\n  color: @app-link-text-color;\n  background: none;\n  border: 0;\n  padding: 0;\n  cursor: pointer;\n  font-size: inherit;\n\n  &:hover,\n  &:focus {\n    text-decoration: underline;\n  }\n\n  &[disabled],\n  &[disabled]:hover {\n    cursor: not-allowed;\n    color: @rxButton-disabled-background-color;\n  }\n}\n\nthead th .btn-link {\n  color: @app-table-header-text-color;\n  &:hover,\n  &:focus {\n    color: @app-table-header-text-color;\n  }\n}\n\n.button-group {\n  display: flex;\n  border: @rxButton-button-group-border;\n  border-radius: @rxButton-button-group-border-radius + 2;\n  font-size: 1.1em;\n\n  input {\n    display: none;\n  }\n\n  label {\n    flex: 1;\n    text-align: center;\n    padding: 7px 13px;\n    color: @gray-700;\n\n    &:first-of-type {\n      border-top-left-radius: @rxButton-button-group-border-radius;\n      border-bottom-left-radius: @rxButton-button-group-border-radius;\n    }\n\n    &:last-of-type {\n      border-top-right-radius: @rxButton-button-group-border-radius;\n      border-bottom-right-radius: @rxButton-button-group-border-radius;\n    }\n\n    &:not(:last-of-type) {\n      border-right: @rxButton-button-group-border;\n    }\n\n    &:hover,\n    &:focus {\n      cursor: pointer;\n      color: @white;\n      background: @rxButton-cancel-hover-background-color;\n    }\n  }//label\n\n  input:checked + label {\n    color: @white;\n    background: @gray-700;\n  }\n}//.button-group\n"
        }
    },
    {
        "displayName": "Feedback",
        "stability": "stable",
        "description": "Gather and send user feedback",
        "api": "directive:rxFeedback",
        "keywords": [
            "rxFeedback",
            "feedback",
            "form",
            "modal"
        ],
        "name": "Feedback",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Feedback/scripts/rxFeedback.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Feedback/templates/feedbackForm.html",
            "templates/Feedback/templates/rxFeedback.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('feedbackSimpleExampleCtrl', function ($scope, rxNotify) {\n    $scope.alwaysSucceed = function () {\n        rxNotify.add('Thanks for your feedback!', {\n            type: 'success',\n            timeout: 3\n        });\n    };\n\n    $scope.alwaysFail = function () {\n        rxNotify.add('Feedback not received!', {\n            type: 'error',\n            timeout: 3\n        });\n    };\n});\n",
            "html": "<p>\n  The rxFeedback component gathers and sends user feedback to a default or specifiable email list.\n</p>\n\n<rx-example name=\"feedback.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Forms",
        "stability": "unstable",
        "description": "Usage and examples of different Form usage patterns.",
        "hasApi": false,
        "keywords": [
            "checkbox",
            "date",
            "dropdown",
            "form",
            "input",
            "multi select",
            "option",
            "picker",
            "radio",
            "rxCheckbox",
            "rxDatePicker",
            "rxField",
            "rxFieldContent",
            "rxForm",
            "rxFormSection",
            "rxInfix",
            "rxPrefix",
            "rxSuffix",
            "rxTimePicker",
            "select",
            "text area",
            "text",
            "time",
            "validation"
        ],
        "name": "Forms",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Forms/scripts/rxCheckbox.js",
            "src/elements/Forms/scripts/rxDatePicker.js",
            "src/elements/Forms/scripts/rxTimePicker.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Forms/templates/rxDatePicker.html",
            "templates/Forms/templates/rxTimePicker.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxCheckboxCtrl', function ($scope) {\n    $scope.chkValidEnabledOne = true;\n    $scope.chkValidEnabledTwo = false;\n    $scope.chkValidDisabledOne = true;\n    $scope.chkValidDisabledTwo = false;\n    $scope.chkValidNgDisabledOne = true;\n    $scope.chkValidNgDisabledTwo = false;\n\n    $scope.chkInvalidEnabledOne = true;\n    $scope.chkInvalidEnabledTwo = false;\n    $scope.chkInvalidDisabledOne = true;\n    $scope.chkInvalidDisabledTwo = false;\n    $scope.chkInvalidNgDisabledOne = true;\n    $scope.chkInvalidNgDisabledTwo = false;\n});\n\nangular.module('demoApp')\n.controller('rxDatePickerCtrl', function ($scope) {\n    $scope.enabledValid = '2015-12-15';\n    $scope.disabledValid = '2015-12-15';\n\n    $scope.enabledInvalid = '2015-12-15';\n    $scope.disabledInvalid = '2015-12-15';\n});\n\nangular.module('demoApp')\n.controller('rxTimePickerCtrl', function ($scope) {\n    $scope.enabledValid = '06:00-06:00';\n    $scope.disabledValid = '20:00+08:00';\n\n    $scope.enabledInvalid = '17:45+05:00';\n    $scope.disabledInvalid = '05:15+00:00';\n});\n\nangular.module('demoApp')\n.controller('formsAutoSaveExampleController', function ($scope, rxAutoSave) {\n    $scope.forms = { autosave: '' };\n    rxAutoSave($scope, 'forms');\n});\n\nangular.module('demoApp')\n.controller('formsDisabledExamplesCtrl', function ($scope) {\n    $scope.txtDisabled = 'Disabled Text Input';\n    $scope.selDisabled = 'disabled';\n    $scope.radDisabled = 1;\n    $scope.chkDisabledOne = true;\n    $scope.chkDisabledTwo = false;\n    $scope.togDisabledOn = true;\n    $scope.togDisabledOff = false;\n    $scope.txtAreaDisabled = 'Disabled Textarea';\n});\n\nangular.module('demoApp')\n.controller('formsManualSaveExampleController', function ($scope, $timeout, rxNotify) {\n    $scope.saving = false;\n    $scope.save = function () {\n        $scope.saving = true;\n        rxNotify.clear('page');\n        $timeout(function () {\n            $scope.saving = false;\n            $scope.lastSaved = Date.now();\n            rxNotify.add('Data successfully saved!', {\n                type: 'success'\n            });\n        }, 1000);\n    };\n});\n\nangular.module('demoApp')\n.controller('formsInvalidExamplesCtrl', function ($scope) {\n    $scope.txtInvalid = 'Invalid text input';\n    $scope.selInvalid = 'invalid';\n    $scope.radInvalid = 1;\n    $scope.chkInvalidOne = true;\n    $scope.chkInvalidTwo = false;\n    $scope.togInvalidOn = true;\n    $scope.togInvalidOff = false;\n    $scope.txtAreaInvalid = 'Invalid Value';\n});\n\nangular.module('demoApp')\n.controller('rxCheckboxShowHideCtrl', function ($scope) {\n    $scope.amSure = false;\n    $scope.amReallySure = false;\n\n    $scope.$watch('amSure', function (newVal) {\n        if (newVal === false) {\n            $scope.amReallySure = false;\n        }\n    });\n});\n\nangular.module('demoApp')\n.controller('rxDatePickerEmptyCtrl', function ($scope) {\n    $scope.emptyDate = '';\n\n    $scope.undefinedDate = undefined;\n});\n\nangular.module('demoApp')\n.controller('rxDatePickerSimpleCtrl', function ($scope) {\n    $scope.dateModel = moment(new Date()).format('YYYY-MM-DD');\n});\n\nangular.module('demoApp')\n.controller('rxTimePickerSimpleCtrl', function ($scope) {\n    $scope.emptyValue = '';\n    $scope.predefinedValue = '22:10-10:00';\n});\n",
            "html": "<h2 class=\"clear\"><rx-permalink>Directives</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Many of the rxForm directives are designed for layout\n    and positioning. However, there are some that are for stylistic\n    purposes.\n  </li>\n  <li>\n    See\n    <a href=\"ngdocs/index.html#/api/rxForm\">rxForm API Documentation</a>\n    for a more comprehensive list of available directives.\n  </li>\n</ul>\n\n<h3><rx-permalink>Labels and Inputs</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    You should remember that the rxFieldName isn't an HTML label element.\n    <ul>\n      <li>\n        rxFieldName is a descriptive design element for a particular\n        form field.\n      </li>\n      <li>An HTML label is used for accessibility.</li>\n    </ul>\n  </li>\n  <li>\n    You should use the <code>&lt;label for=\"formControlId\"&gt;</code>\n    format when defining your HTML labels.\n    <ul>\n      <li>\n        The <code>for</code> attribute connects the label to an\n        appropriate form control. When the label is clicked, wherever it\n        is placed in the DOM, it will focus or activate its\n        corresponding form control.\n      </li>\n      <li>\n        <strong class=\"msg-warn\">\n          DO NOT wrap the control within a label element.\n        </strong>\n        <ul>\n          <li>\n            CSS does not have proper selectors to style label text based\n            on control state\n          </li>\n        </ul>\n      </li>\n      <li>\n        You should place an HTML label around text in an appropriate\n        rxFieldName element.\n      </li>\n      <li>\n        Inline HTML label elements should only be used with radios,\n        checkboxes, and toggle switches.\n        <ul>\n          <li>\n            Place the label\n            <strong>immediately after the form control</strong>.\n            <ul>\n              <li>\n                This enables you to style the label based on the state\n                of the control.\n              </li>\n              <li>\n                See <a href=\"#/elements/Forms#checkboxes\">checkboxes</a>,\n                <a href=\"#/components/rxRadio\">rxRadio</a>,\n                and <a href=\"#/components/rxForm\">rxForm</a> for markup\n                examples.\n              </li>\n            </ul>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </li>\n  <li>\n    In contrast to its predecessor (rxFormItem), rxField and children\n    provides you the flexibility to create form field inputs that make\n    use of one or more controls.\n    <ul>\n      <li>See \"Advanced Controls\" in\n        <a href=\"#/components/rxForm\">rxForm</a> demo for examples.\n      </li>\n    </ul>\n  </li>\n</ul>\n\n<h3><rx-permalink>Error Messages</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Inline Error messages should make use of the\n    <a href=\"ngdocs/index.html#/api/rxForm.directive:rxInlineError\">\n      rxInlineError\n    </a> directive.\n  </li>\n  <li>\n    This directive is styled with bold and red text. It is not\n    constrained by DOM hierarchy, so you may place it wherever it is\n    necessary.\n  </li>\n</ul>\n\n<h3><rx-permalink>Help Text</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Help text should make use of the\n    <a href=\"ngdocs/index.html#/api/rxForm.directive:rxHelpText\">\n      rxHelpText\n    </a> directive.\n  </li>\n  <li>\n    This directive is styled in a slightly smaller, italicized font and\n    is not constrained by DOM hierarchy, so you can place it wherever it\n    is necessary.\n  </li>\n</ul>\n\n<h3><rx-permalink>Buttons</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Reference the <a href=\"#/elements/Links\">links</a> and\n    <a href=\"#/elements/Buttons\">buttons</a> elements and the\n    <a href=\"#/layout/page/form\">Form Page</a> layout for details about how\n    to style and color buttons.\n    <ul>\n      <li>\n        Submit buttons should use the green <code>.submit</code> class unless\n        you are performing a destructive action, in which case, you should use\n        the <code>.negative</code> class.\n      </li>\n    </ul>\n  </li>\n  <li>\n    If you need to use a button in your form field for auxiliary purposes,\n    use the default blue.\n  </li>\n</ul>\n\n<h3><rx-permalink>Selects</rx-permalink></h3>\n<ul class=\"list\">\n  <li>For single item selection, use the\n    <a href=\"#/components/rxSelect\">rxSelect</a> component.\n  </li>\n  <li>\n    For multi-item selection, use the rxMultiSelect element defined in\n    the <a href=\"#/components/rxMultiSelect\">rxMultiSelect</a>\n    component.\n  </li>\n</ul>\n\n<!-- BEGIN: checkboxes -->\n<h3>\n  <rx-permalink>Checkboxes</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxCheckbox/\">View API</a>\n  <!-- (NOTE) stability: 'READY' -->\n</h3>\n<ul class=\"list\">\n  <li>Use the rxCheckbox directive for checkbox controls.</li>\n  <li>\n    If you intend to use a label element, place it <strong>immediately\n    after the rxCheckbox</strong> to style the label when the control\n    is disabled.\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap rxCheckbox in a label element.\n    </strong>\n  </li>\n</ul>\n\n<h4>Show/Hide Input</h4>\n<rx-example name=\"rxCheckbox.showHide\"></rx-example>\n\n<h4>Destroy Input</h4>\n<p>Support for <code>$destroy</code> events.</p>\n<rx-example name=\"rxCheckbox.destroy\"></rx-example>\n\n<h4>Checkbox States</h3>\n<table ng-controller=\"rxCheckboxCtrl\">\n  <thead>\n    <tr>\n      <th></th>\n      <th>Enabled</th>\n      <th>Disabled (ng-disabled)</th>\n      <th>Disabled (disabled)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n      <!-- Valid Enabled-->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidEnabledOne\"\n                 ng-model=\"chkValidEnabledOne\" />\n          <label for=\"chkValidEnabled\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidEnabledTwo\"\n                 ng-model=\"chkValidEnabledTwo\" />\n          <label for=\"chkValidEnabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Valid NG-Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidNgDisabledOne\"\n                 ng-disabled=\"true\"\n                 ng-model=\"chkValidNgDisabledOne\" />\n          <label for=\"chkValidNgDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidNgDisabledTwo\"\n                 ng-disabled=\"true\"\n                 ng-model=\"chkValidNgDisabledTwo\" />\n          <label for=\"chkValidNgDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Valid Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidDisabledOne\"\n                 disabled\n                 ng-model=\"chkValidDisabledOne\" />\n          <label for=\"chkValidDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidDisabledTwo\"\n                 disabled\n                 ng-model=\"chkValidDisabledTwo\" />\n          <label for=\"chkValidDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n      <!-- Invalid Enabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidEnabledOne\"\n                 ng-model=\"chkInvalidEnabledOne\"\n                 always-invalid />\n          <label for=\"chkInvalidEnabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidEnabledTwo\"\n                 ng-model=\"chkInvalidEnabledTwo\"\n                 always-invalid />\n          <label for=\"chkInvalidEnabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Invalid NG-Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidNgDisabledOne\"\n                 ng-model=\"chkInvalidNgDisabledOne\"\n                 ng-disabled=\"true\"\n                 always-invalid />\n          <label for=\"chkInvalidNgDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidNgDisabledTwo\"\n                 ng-model=\"chkInvalidNgDisabledTwo\"\n                 ng-disabled=\"true\"\n                 always-invalid />\n          <label for=\"chkInvalidNgDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Invalid Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidDisabledOne\"\n                 ng-model=\"chkInvalidDisabledOne\"\n                 disabled\n                 always-invalid />\n          <label for=\"chkInvalidDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidDisabledTwo\"\n                 ng-model=\"chkInvalidDisabledTwo\"\n                 disabled\n                 always-invalid />\n          <label for=\"chkInvalidDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n    </tr>\n  </tbody>\n</table>\n\n<rx-debug>\n  <h3>Plain HTML Checkboxes (for comparison)</h3>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainHtmlNormal\"\n           ng-required=\"true\" />\n    <label for=\"plainHtmlNormal\">A plain checkbox</label>\n  </p>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainHtmlDisabled\"\n           disabled />\n    <label for=\"plainHtmlDisabled\">A plain checkbox (disabled)</label>\n  </p>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainHtmlChecked\"\n           checked />\n    <label for=\"plainHtmlChecked\">A plain checkbox (checked)</label>\n  </p>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainChkRemoveCheckbox\"\n           ng-model=\"plainChkIsRemoved\" />\n    <label for=\"plainChkRemoveCheckbox\">Remove Following Checkbox:</label>\n\n    <input type=\"checkbox\"\n           checked\n           id=\"plainChkRemoveable\"\n           ng-if=\"!plainChkIsRemoved\" />\n  </p>\n</rx-debug>\n<!-- END: checkboxes -->\n\n\n<h3><rx-permalink>Toggle Switches</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    You can use the\n    <a href=\"#/components/rxToggleSwitch\">rxToggleSwitch</a> component\n    for toggle switch controls.\n  </li>\n  <li>\n    If you intend to use a label element, place it <strong> immediately\n    after the rxToggleSwitch</strong> to style the label when the\n    control is disabled.\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap rxToggleSwitch in a label element.\n    </strong>\n  </li>\n  <li>\n    <strong class=\"msg-info\">NOTE:</strong>\n    An rxToggleSwitch does not toggle when clicking its label. However,\n    CSS styles are still applied if the control is disabled within an\n    rxForm.\n  </li>\n  <li>\n    For consistency, and future compatibility, assume that rxToggleSwitch\n    and label works as expected.\n  </li>\n</ul>\n\n<h3><rx-permalink>Radios</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Use the <a href=\"#/components/rxRadio\">rxRadio</a> component for\n    radio controls.\n  </li>\n  <li>\n    If you intend to use a label element, place it <strong>immediately\n    after the rxRadio</strong> so that CSS rules may style the label when\n    the control is disabled.\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap rxRadio in a label element.\n    </strong>\n  </li>\n</ul>\n<rx-example name=\"forms.radios\"></rx-example>\n\n<h3><rx-permalink>Using a Character Counter</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Character counters provide color feedback to the user in addition to\n    numeric feedback. As a user approaches the character limit, the\n    numeric value turns from gray to yellow, then yellow to red.\n  </li>\n  <li>\n    The character counter is already styled and has the correct width\n    needed to be positioned next to a textarea. If you need to change the\n    textarea width, a custom wrapper class and textarea width can be set.\n  </li>\n  <li>\n    If you intend to use a counter on text inputs, instead of the more\n    commonly used text area, be aware the framework does not support\n    these fields. You may experience unexpected results. Make sure to\n    test your code.\n  </li>\n  <li>\n    See <a href=\"#/components/rxCharacterCount/\">rxCharacterCount</a> for\n    more specific documentation about implementing a counter on a\n    textarea or text input field.\n  </li>\n</ul>\n\n<h3><rx-permalink>Disabled State</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    When an input is disabled, styles are automatically applied to\n    gray out the field with a \"not-allowed\" pointer style.\n  </li>\n  <li>\n    When label rules (seen above) are applied correctly to a radio,\n    checkbox, or toggle switch, the label will also be styled.\n  </li>\n</ul>\n<rx-example name=\"forms.disabled\"></rx-example>\n\n<!-- BEGIN: rxDatePicker -->\n<h3>\n  <rx-permalink>Date Picker</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxDatePicker/\">View API</a>\n  <!-- (NOTE) stability: 'PROTOTYPE' -->\n</h3>\n<rx-notification type=\"info\">\n  <p>\n    This element is designed to be used in conjunction with other picker\n    elements to compose a valid ISO 8601 DateTime string in the format of\n    <code>YYYY-MM-DDTHH:mmZ</code>.\n  </p>\n</rx-notification>\n\n<ul class=\"list\">\n  <li>\n    This element will generate a <strong>String</strong> in the format of\n    <code>YYYY-MM-DD</code> to be used as the date portion of the ISO 8601\n    standard DateTime string mentioned above.\n  </li>\n  <li>\n    This element will never generate anything other than a String.\n  </li>\n</ul>\n\n<h4>Simple Example</h4>\n<p>\n  Sometimes, a form may need to prepopulate a value for Date Picker. The\n  example below shows how the element behaves when its model is defaulted\n  to today's date.  When a different date is selected, a gray circle around\n  the current date provides additional context to users as they find their\n  selection in the date picker.\n</p>\n<rx-example name=\"rxDatePicker.simple\"></rx-example>\n\n<h4>Behavior with Empty Model</h4>\n<p>\n  A typical use case is to use rxDatePicker without a default value set. The\n  example below shows how it will behave if you have a blank (empty string) or\n  undefined value for your model.\n</p>\n<rx-example name=\"rxDatePicker.empty\"></rx-example>\n\n<h4>Date Picker States</h4>\n<p>\n  Below you'll find examples of how <code>Date Picker</code> will appear in\n  different states.\n</p>\n<table ng-controller=\"rxDatePickerCtrl\">\n  <thead>\n    <th></th>\n    <th>Enabled</th>\n    <th>Disabled</th>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n      <td>\n        <rx-date-picker\n          id=\"dpEnabledValid\"\n          ng-model=\"enabledValid\">\n        </rx-date-picker>\n      </td>\n      <td>\n        <rx-date-picker\n          id=\"dpDisabledValid\"\n          ng-disabled=\"true\"\n          ng-model=\"disabledValid\">\n        </rx-date-picker>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n      <td>\n        <rx-date-picker\n          id=\"dpEnabledInvalid\"\n          always-invalid\n          ng-model=\"enabledInvalid\">\n        </rx-date-picker>\n      </td>\n      <td>\n        <rx-date-picker\n          id=\"dpDisabledInvalid\"\n          ng-disabled=\"true\"\n          always-invalid\n          ng-model=\"disabledInvalid\">\n        </rx-date-picker>\n      </td>\n    </tr>\n  </tbody>\n</table>\n<!-- END: rxDatePicker -->\n\n<!-- BEGIN: rxTimePicker -->\n<h3>\n  <rx-permalink>Time Picker</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxTimePicker/\">View API</a>\n  <!-- (NOTE) stability: 'PROTOTYPE' -->\n</h3>\n<rx-notification type=\"info\">\n  <p>\n    This element is designed to be used in conjunction with other picker\n    elements to compose a valid ISO 8601 DateTime string in the format of\n    <code>YYYY-MM-DDTHH:mmZ</code>.\n  </p>\n</rx-notification>\n\n<ul class=\"list\">\n  <li>\n    This element will generate a <strong>String</strong> in the format of\n    <code>HH:mmZ</code> to be used as the time portion of the ISO 8601\n    standard DateTime string mentioned above.\n    <ul>\n      <li><code>HH</code> is the 24-hour format from 00 to 23</li>\n      <li><code>mm</code> is the minutes from 00 to 59</li>\n      <li><code>Z</code> is the UTC offset that matches <code>[-+]\\d{2}:\\d{2}</code></li>\n    </ul>\n  </li>\n  <li>\n    This element will never generate anything other than a String.\n  </li>\n</ul>\n\n<h4>Simple Example</h4>\n<rx-example name=\"rxTimePicker.simple\"></rx-example>\n\n<h4>Time Picker States</h4>\n<p>\n  Below you'll find examples of how <code>Time Picker</code> will appear in\n  different states.\n</p>\n<table ng-controller=\"rxTimePickerCtrl\">\n  <thead>\n    <th></th>\n    <th>Enabled</th>\n    <th>Disabled</th>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n      <td>\n        <rx-time-picker\n          id=\"tpEnabledValid\"\n          ng-disabled=\"false\"\n          ng-model=\"enabledValid\">\n        </rx-time-picker>\n      </td>\n      <td>\n        <rx-time-picker\n          id=\"tpDisabledValid\"\n          ng-disabled=\"true\"\n          ng-model=\"disabledValid\">\n        </rx-time-picker>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n      <td>\n        <rx-time-picker\n          id=\"tpEnabledInvalid\"\n          always-invalid\n          ng-disabled=\"false\"\n          ng-model=\"enabledInvalid\">\n        </rx-time-picker>\n      </td>\n      <td>\n        <rx-time-picker\n          id=\"tpDisabledInvalid\"\n          ng-disabled=\"true\"\n          always-invalid\n          ng-model=\"disabledInvalid\">\n        </rx-time-picker>\n      </td>\n    </tr>\n  </tbody>\n</table>\n<!-- END: rxTimePicker -->\n\n<h3><rx-permalink>Form Validation</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    EncoreUI is built on Angular and uses ngModel directives for validation.\n    As a result, you will see custom CSS styling if an element has the\n    <code>.ng-invalid</code> and/or <code>.ng-dirty</code> classes, which are\n    dynamically added by ngModel validation logic.\n  </li>\n  <li>\n    Some components will style based on both classes being present (typical\n    use case), while others will only use <code>.ng-invalid</code>.\n  </li>\n  <li>\n    Creating an EncoreUI-specific design pattern for placement of form\n    validation messages is on our roadmap.\n  </li>\n  <li>At present, there are no styles for invalid toggle switches.</li>\n</ul>\n<rx-example name=\"forms.validation\"></rx-example>\n\n\n<h2><rx-permalink>Saving Form Data</rx-permalink></h2>\n\n<h3><rx-permalink>Saving In-Progress Form State</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Saving a form state can help with user experience. You can use rxAutoSave\n    to activate this feature.\n  </li>\n  <li>\n    rxAutoSave interacts exclusively with your model layer. Your UI/template\n    code will be unaware that its state is being saved.\n  </li>\n  <li>\n    See <a href=\"#/utilities/rxAutoSave\">rxAutoSave</a> for further details.\n  </li>\n</ul>\n<rx-example name=\"forms.autoSave\"></rx-example>\n\n<h3><rx-permalink>Manual Form Saving</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    If you require form data to be completed before submitting, or require\n    interactive form experiences, a conditional save button and notification\n    is used.\n  </li>\n  <li>\n    The notification should only be shown after a change has been made to the\n    form, not on page load.\n  </li>\n  <li>\n    The subtitle of the page should indicate when the form was last saved and\n    contain the save button.\n  </li>\n</ul>\n<rx-example name=\"forms.manualSave\"></rx-example>\n\n<h2><rx-permalink>Design Patterns within Encore</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Forms can be used on their own page. You can see this in Encore when\n    you create a new object such as a Cloud Server or a Database under\n    Encore Cloud.\n  </li>\n  <li>\n    Forms are also used within modals. You can see this when modifying\n    content that requires form fields such as actions performed on a Cloud\n    Server instance.\n  </li>\n  <li>\n    You can use <a href=\"#/layout/wells\">Wells</a> to create additional\n    context for the form.\n  </li>\n</ul>\n\n<h2><rx-permalink>UI Roadmap / Possible Future-work</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Fleshing out a design pattern for edit states.\n    <ul>\n      <li>\n        Up until now, the editing of content has been relegated to using\n        modals to edit individual line items. As a result, different\n        products have handled the concept of an edit state differently.\n      </li>\n      <li>\n        There should be conformity for this, but we have not designed a\n        user pattern yet.\n      </li>\n    </ul>\n  </li>\n</ul>\n",
            "less": ""
        }
    },
    {
        "displayName": "Links",
        "stability": "unstable",
        "description": "Usage and examples of different link and status message patterns.",
        "hasApi": false,
        "keywords": [
            "action link",
            "create link",
            "delete link",
            "destroy link",
            "edit link",
            "link",
            "page action",
            "pending link",
            "reserved",
            "spinner link",
            "update link"
        ],
        "name": "Links",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<h2><rx-permalink>Link Types</rx-permalink></h2>\n<h3 class=\"clear\"><rx-permalink>Action Link Icons</rx-permalink></h3>\n<p>\n  To visualize and distinguish actionable items, you can use the included\n  <a href=\"https://fortawesome.github.io/Font-Awesome/\" target=\"_blank\">\n    Font Awesome\n  </a>\n  library. Iconography with action links remains unique to one action (with\n  the exception of \"create\", \"delete\", \"change\", \"edit\", and \"go to\" actions,\n  which use the same icons in many places regardless of context). However, in\n  the case of two opposite actions that you can take on a single unit (for\n  example, choosing to enable connection throttling on a load balancer when\n  throttling is disabled, or disabling throttling when throttling is enabled),\n  then the same icon and color can be used. In the case of opposite actions,\n  only one action should display at a time, depending on the state. Any\n  \"enable\" or \"disable\" actions should be yellow in color, as they're causing\n  changes to something rather than creating something new (green) or\n  destroying something (red).\n</p>\n<p>\n  For the majority of Encore, actionable links are used in two places &mdash;\n  in the upper right hand section of a details page, flushed right with the\n  page-actions and actions-area classes, or in the rxActionMenu directive.\n</p>\n<p>\n  The following icons have been used throughout Encore, as well as the actions\n  associated with the icons. Use this as a reference for which icons are\n  already in use and should not be duplicated.\n</p>\n<p>\n  <strong>HEADS UP:</strong> Most icons have been chosen based on the verb (Add ,Edit, Delete,\n  Restart, etc) but there are a couple of icons chosen on the noun (consoles,\n  tachometers for throttling). This is a design pattern discrepancy that will\n  need to be resolved in a future iteration.\n</p>\n\n<rx-example name=\"link.icons.reserved\"></rx-example>\n\n<h3><rx-permalink>Types &amp; Colors</rx-permalink></h3>\n<p>\n  Status Classes are used to provide a clearer status regarding a simple\n  message. Within the context of Encore, the following colors are used\n  to convey action links:\n</p>\n<h4><rx-permalink>Create/Add Actions</rx-permalink></h4>\n<p>\n  Green (<code>.msg-action</code>) is for create/add actions.\n  When part of a list, they appear at the top.\n</p>\n<rx-example name=\"link.colors.create\"></rx-example>\n<h4><rx-permalink>Download Actions</rx-permalink></h4>\n<p>\n  Blue (<code>.msg-info-blue</code>) is for download actions.\n  When part of a list, they appear second.\n</p>\n<rx-example name=\"link.colors.download\"></rx-example>\n<h4><rx-permalink>Edit/Modify Actions</rx-permalink></h4>\n<p>\n  Orange (<code>.msg-info</code>) is for edit/modify actions.\n  When part of a list, they appear third.\n</p>\n<rx-example name=\"link.colors.modify\"></rx-example>\n<h4><rx-permalink>Destructive Actions</rx-permalink></h4>\n<p>\n  Red (<code>.msg-warn</code>) is for destructive actions.\n  When part of a list, they appear last.\n</p>\n<rx-example name=\"link.colors.destructive\"></rx-example>\n\n<h3><rx-permalink>Links with Spinners</rx-permalink></h3>\n<p>\n  You can use a spinner style for action links. Different spinner styles are\n  available when a user takes action by clicking a button\n  (see <a href=\"#/elements/Buttons\">Buttons Demo Page</a>).\n</p>\n<p>\n  When an action link must first fetch data or determine state before the user\n  can click it, a spinner is shown to the right of the action link, and both\n  spinner and link have a disabled gray color and are not clickable.\n</p>\n<p>\n  <strong>HEADS UP:</strong> The spinner with action link is being styled on a per-project\n  basis currently, since the current implementation of <code>rxSpinner</code> needs to be\n  updated to support this use case more easily.\n</p>\n<rx-example name=\"link.spinner\"></rx-example>\n",
            "less": "// Link and Status Messages\n.link-action,\n.link-action a,\n.link-warn,\n.link-warn a {\n  font-size: 1.2em;\n  cursor: pointer;\n}\n\n.link-action:before,\n.link-action a:before {\n  content: \"+ \";\n}\n\n.link-warn:before,\n.link-warn a:before {\n  content: \"- \";\n}\n\n/* Disabled link styles */\n.link-disabled {\n  pointer-events: none;\n  a {\n    color: @gray-600;\n  }\n  .rx-spinner {\n    margin-left: 10px;\n    border-bottom-color: @gray-600;\n    border-right-color: @gray-600;\n  }\n}\n\n.msg-action,\n.msg-action a {\n  color: @green-700;\n  &:hover,\n  &:focus {\n    color: saturate(@green-700, 15%);\n  }\n}\n\n.msg-warn,\n.msg-warn a {\n  color: @red-700;\n  &:hover,\n  &:focus {\n    color: saturate(@red-700, 15%);\n  }\n}\n\n.msg-info,\n.msg-info a {\n  color: @orange-700;\n  &:hover,\n  &:focus {\n    color: saturate(@orange-700, 15%);\n  }\n}\n\n.msg-info-blue,\n.msg-info-blue a {\n  color: @blue-700;\n  &:hover,\n  &:focus {\n    color: saturate(@blue-700, 15%);\n  }\n}\n"
        }
    },
    {
        "displayName": "Lists",
        "stability": "unstable",
        "description": "Usage and examples of different List patterns.",
        "hasApi": false,
        "keywords": [
            "bulleted",
            "list",
            "numbered",
            "ordered",
            "unordered"
        ],
        "name": "Lists",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<h2><rx-permalink>List Types</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Lists by default do not have styles. You can add\n    bullets/decimals to lists with the <code>.list</code> class.\n    It is also possible to build non-semantic lists using the\n    additional <code>.item</code> class.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span>\n    Use this in conjunction with icons, colors and helper classes\n    such as <code>.flush-right</code> to build out action menus.\n    Look at the detail pages in Cloud Servers and view-source\n    for additional context.\n  </li>\n</ul>\n<rx-example name=\"typography.lists\"></rx-example>\n",
            "less": "// Lists\n.list {\n  li,\n  .item {\n    display: list-item;\n    margin: 5px 0 0 30px;\n  }\n\n  ul&,\n  &.bulleted {\n    li,\n    .item {\n      list-style: disc;\n    }\n  }\n\n  ol&,\n  &.decimal {\n    li,\n    .item {\n      list-style: decimal;\n    }\n  }\n}\n"
        }
    },
    {
        "displayName": "Metadata",
        "stability": "stable",
        "description": "Metadata contains directives to provide consistent styling for the display of metadata information",
        "hasApi": false,
        "keywords": [
            "description",
            "metadata",
            "rxMeta",
            "rxMetadata"
        ],
        "name": "Metadata",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Metadata/scripts/rxMeta.js",
            "src/elements/Metadata/scripts/rxMetadata.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Metadata/templates/rxMeta.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('metadataSimpleExampleCtrl', function ($scope) {\n    $scope.someDate = new Date('January 6 1989');\n    $scope.someAmount = 192.68;\n});\n",
            "html": "<p>\n  Metadata contains directives to provide consistent styling for the display of\n  metadata information.\n</p>\n\n<rx-example name=\"metadata.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Tables",
        "stability": "unstable",
        "description": "Usage and examples of different Table patterns.",
        "hasApi": false,
        "keywords": [
            "table",
            "row",
            "column",
            "striped",
            "null data",
            "actions",
            "filter",
            "filtering",
            "floating header",
            "nested",
            "nested content",
            "nested metadata",
            "nested table",
            "option table",
            "pagination",
            "paginate",
            "paginated",
            "sortable",
            "sorting",
            "sort",
            "status column"
        ],
        "name": "Tables",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('tableFilteringExampleCtrl', function ($scope) {\n    $scope.people = [\n        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },\n        { name: 'Hussam Dawood', occupation: 'Cat Lover' },\n        { name: 'Kevin Lamping', occupation: 'Framework Father' },\n        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff' },\n        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane' },\n        { name: 'Chris Cantu', occupation: 'Texan Tornado' },\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableFilteringCollapsibleExampleCtrl', function ($scope) {\n    $scope.filter = { region: '' };\n\n    $scope.regions = [\n        { name: 'DFW', city: 'Dallas-Fort Worth' }, { name: 'ORD', city: 'Chicago' },\n        { name: 'IAD', city: 'Northern Virginia' }, { name: 'LON', city: 'London' },\n        { name: 'HKG', city: 'Hong Kong' }, { name: 'SYD', city: 'Sydney' }\n    ];\n\n    $scope.servers = [\n        { name: 'General1-1', ram: '1 GB', cpu: 1, disk: '20GB SSD', region: 'DFW' },\n        { name: 'General1-2', ram: '2 GB', cpu: 2, disk: '40GB SSD', region: 'ORD' },\n        { name: 'General1-4', ram: '4 GB', cpu: 4, disk: '80GB SSD', region: 'IAD' },\n        { name: 'General1-8', ram: '8 GB', cpu: 8, disk: '160GB SSD', region: 'LON' },\n        { name: 'I/O1-15', ram: '15 GB', cpu: 4, disk: '40GB SSD', region: 'HKG' },\n        { name: 'I/O1-30', ram: '30 GB', cpu: 8, disk: '40GB SSD', region: 'SYD' }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableNestedMetadataExampleCtrl', function ($scope) {\n    $scope.people = [\n        {\n            name: 'Patrick Deuley',\n            occupation: 'Design Chaplain',\n            pet: {\n                name: 'Shelly',\n                animal: 'Turtle',\n                age: 1\n            }\n        },\n        {\n            name: 'Hussam Dawood',\n            occupation: 'Cat Lover',\n            pet: {\n                name: 'Sassy',\n                animal: 'Cat',\n                age: 6\n            }\n        }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableNestedTableExampleCtrl', function ($scope) {\n    $scope.people = [\n        {\n            name: 'Patrick Deuley',\n            occupation: 'Design Chaplain',\n            pets: [\n                {\n                    name: 'Shelly',\n                    animal: 'Turtle',\n                    age: 1\n                },\n                {\n                    name: 'Spike',\n                    animal: 'Porcupine',\n                    age: 10\n                }\n            ]\n        },\n        {\n            name: 'Hussam Dawood',\n            occupation: 'Cat Lover',\n            pets: [\n                {\n                    name: 'Sassy',\n                    animal: 'Cat',\n                    age: 6\n                }\n            ]\n        }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tablePaginateExampleController', function ($scope, PageTracking) {\n    $scope.pager = PageTracking.createInstance();\n    $scope.people = [\n        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },\n        { name: 'Hussam Dawood', occupation: 'Cat Lover' }\n    ];\n});\n",
            "html": "<h2><rx-permalink>Basic Tables</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Tables have default styles: regular rows have white backgrounds, while\n    headers use white text with a gray background. An additional\n    <code>.table-striped</code> class is available for alternate row striping.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> You can use tables to show\n    data-table related details, such as listing of objects.\n  </li>\n  <li>\n    If you need to show summary-style important pieces of metadata that aren't\n    necessarily related to each other, consider using an\n    <a href=\"#/components/rxMetadata\">rxMetadata</a> component.\n  </li>\n  <li>\n    In Support Services, some exceptions exist where it is appropriate to use\n    different table styling. See the\n    <a href=\"#/elements/tables#non-data-tables\">Non-Data based Tables</a>\n    section for more information.\n  </li>\n</ul>\n<rx-example name=\"table.basic\"></rx-example>\n\n<h2><rx-permalink>Directives</rx-permalink></h2>\n\n<h3><rx-permalink>Cog Menus via rxActionMenu</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    For implementation and examples, see the\n    <a href=\"#/components/rxActionMenu\">rxActionMenu</a> directive.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> If you need to show\n    actionable items for every row, cogs are helpful. For example: most main\n    table listings show cog menus with actionable items, such as Cloud Server\n    pages showing FirstGen/NextGen actions or Cloud Block Storage Volumes.\n  </li>\n  <li>\n    To help you choose which icons and colors to use, read more about\n    <a href=\"#/styles/links\">icons and colors here</a>.\n  </li>\n  <li>\n    There may be cases where an action is not available on a particular row.\n    In this scenario, you can disable those links using the\n    <code>.disabled</code> class.\n  </li>\n  <li>\n    The <code>.actions</code> class is used on a column header\n    (<code>th</code> tag) to add a 15px width for action cogs in the\n    table body.\n  </li>\n  <li>\n    Are you using LBaaS connection nodes or Support Service user tables?\n    There is a design exception to these tables described in the\n    <a href=\"#/elements/tables#delete-x-action\">Delete \"X\" actions</a> section.\n  </li>\n</ul>\n<rx-example name=\"table.actionMenu\"></rx-example>\n\n\n<h3><rx-permalink>Table Footer Pagination via rxPaginate</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    For implementation and examples, see the\n    <a href=\"#/components/rxPaginate\">rxPaginate</a> directive.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> To show how mark-up will be\n    implemented, pagination is visible in this example. The pagination\n    directive doesn't display if there is only one page of data available. It\n    is hidden using AngularJS.\n  </li>\n  <li>\n    It's a known issue that the footer wraps into a second line, if the table\n    is 50% of the screen. Use the <code>display:none</code> CSS property to\n    hide all elements not directly related to pagination. See the CSS example\n    below. This has not been implemented in EncoreUI.\n  </li>\n</ul>\n<pre>\n  .my-custom-class-name .pagination {\n      &amp; > li.nth-child(1) { display: none; }\n      &amp; > li.nth-child(2) { display: none; }\n      .pagination-per-page { display: none; }\n  }\n</pre>\n<rx-example name=\"table.paginate\"></rx-example>\n\n\n<h2><rx-permalink>Design Patterns</rx-permalink></h2>\n\n<h3><rx-permalink>Null Pattern</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> If you have no table data,\n    choose a default message to inform your user. Encore shows data table\n    headers to communicate this.\n  </li>\n</ul>\n<rx-example name=\"table.zeroData\"></rx-example>\n\n<h3><rx-permalink>Delete \"X\" Action</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> For data tables involving\n    objects that only require deleting (tables related to LBaaS connection\n    nodes and Support Service user tables) there's a design pattern that\n    replaces the cog with an X.\n  </li>\n  <li>\n    Add the <code>.delete-x</code> class to the icon element to automatically\n    apply the red hover style.  This should always be done when using this\n    design pattern.\n  </li>\n  <li>\n    For some examples, view\n    <a href=\"https://github.com/rackerlabs/supportservice-ui/search?utf8=%E2%9C%93&q=times\">\n      these set of tables used in Support Services\n    </a>.\n  </li>\n</ul>\n<rx-example name=\"table.delete\"></rx-example>\n\n<h4><rx-permalink>Other Single Action</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    A button link is used for tables where each row has a single\n    action that is not a deletion.\n  </li>\n  <li>\n    If the action is unavailable for a row, the link should be\n    disabled and have a tooltip indicating why.\n  </li>\n</ul>\n<rx-example name=\"table.singleAction\"></rx-example>\n\n<h3><rx-permalink>Status Columns</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> You can add consistency and\n    color code your status columns using the <code>.rx-status-column</code>\n    class. Ticket Queues have their own styling that predates this. Your new\n    project should use\n    <a href=\"#/components/rxStatusColumn\">rxStatusColumn</a>. However, if\n    rxStatusColumn classes are not suitable, please send feedback through the\n    \"Submit Feedback\" link.\n  </li>\n</ul>\n\n<h2><rx-permalink>Filters</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> Tables have also been used\n    for filtering. In the past there was no common design pattern for this,\n    and different products implemented it on their own:\n    <ul class=\"list\">\n      <li>\n        Data-based filters, seen in Encore Cloud (Servers, Volumes, Images,\n        Database, Load Balancers)\n      </li>\n      <li>Ticket Queues (Filtering by ticket queues and status)</li>\n      <li>Billing (Filtering by billing data and transactional status)</li>\n    </ul>\n  </li>\n  <li>\n    You now have a standard way of adding table filters using\n    <a href=\"#/components/rxFloatingHeader\">rxFloatingHeader</a>.\n    You can add a new <code>&lt;tr&gt;</code> into the\n    <code>&lt;thead&gt;</code> of the table.\n    The <code>.rx-floating-header</code> class will add appropriate\n    styling.\n  </li>\n</ul>\n<rx-example name=\"table.filtering\"></rx-example>\n\n<h3><rx-permalink>Collapsible Component for Table Filters</rx-permalink></h3>\n<ul class=\"list\">\n  <li>You can add filters inside of a collapsible element.</li>\n  <li>The initial display can be expanded or collapsed.</li>\n  <li>\n    To show and hide the inner contents while keeping the header and\n    border visible, you can use a chevron.\n  </li>\n</ul>\n<rx-example name=\"table.filteringCollapsible\"></rx-example>\n\n\n<h2><rx-permalink>Nested Content</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    When a dataset includes a parent-child relationship, the nested\n    tables style should be used to optionally show the related content.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> Use the double chevron in\n    the right most column as the toggle switch for the hidden content.\n  </li>\n</ul>\n\n<h3><rx-permalink>Nested Table</rx-permalink></h3>\n<rx-example name=\"table.nestedTable\"></rx-example>\n\n<h3><rx-permalink>Nested Metadata</rx-permalink></h3>\n<rx-example name=\"table.nestedMetadata\"></rx-example>\n\n\n<h2>UI Roadmap / Possible Future-work</h2><!-- TODO: Do we keep? -->\n<ul class=\"list\">\n  <li>\n    Checkboxes for table rows with design patterns related to\n    \"Select/Unselect All\" behavior\n  </li>\n  <li>Loading Styles for Tables</li>\n  <li>Submit actions for Server-Side Filtering</li>\n</ul>\n\n",
            "less": ""
        }
    },
    {
        "displayName": "Tabs",
        "stability": "stable",
        "description": "Styling for ngBootstrap Tabs plugin",
        "hasApi": false,
        "keywords": [
            "tabs"
        ],
        "name": "Tabs",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This component provides styles and a demo for the\n  <a href=\"http://angular-ui.github.io/bootstrap/#/tabs\">the Angular-UI Bootstrap Tabs plugin</a>,\n  which is included as a dependency for EncoreUI. Usage is the exact same as\n  demoed on the Angular-UI Bootstrap documentation.\n</p>\n\n<h3>Disclaimer</h3>\n<ul class=\"list\">\n  <li>Only the default horizontal tabs are supported by these styles.</li>\n  <li>\n    <code>vertical</code>, <code>pills</code>, and <code>justified</code>\n    tabs are currently unsupported.\n  </li>\n</ul>\n\n<rx-example name=\"tabs.simple\"></rx-example>\n\n<div class=\"example-case do\">\n  <h4>DO</h4>\n  <ul class=\"list\">\n    <li>\n      Do use tabs for complex forms that use option tables. Tabs are a good way\n      to display \"either/or\" choices to the user.\n    </li>\n    <li>\n      Do use tabs to show closely related information cleanly.\n    </li>\n  </ul>\n  <br />\n\n  <tabset>\n    <tab>\n      <tab-heading>Rackspace Images (3)</tab-heading>\n      <table class=\"table-striped\">\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Min Ram</th>\n            <th>Min Disk</th>\n            <th>Created On</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Arch 2015.7</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>Debian 7 (Wheezy)</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>Ubuntu 14.04 LTS (Trusty Tahr)</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n        </tbody>\n      </table>\n    </tab>\n    <tab>\n      <tab-heading>Saved Images (3)</tab-heading>\n      <table class=\"table-striped\">\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Min Ram</th>\n            <th>Min Disk</th>\n            <th>Created On</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>TestImageOne</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>Woof Meow</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>GoldenTicket</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n        </tbody>\n      </table>\n    </tab>\n  </tabset>\n</div>\n\n<div class=\"example-case avoid\">\n  <h4>DON'T</h4>\n  <ul class=\"list\">\n    <li>\n      Don't use non-standard tab patterns, like the accordion example below.\n    </li>\n    <li>\n      Don't use more than 5 tabs. If more than 5 tabs are required, then\n      consider whether tabs are the right pattern.\n    </li>\n    <li>\n      Don't use tabs with a total width of more than 500px. If the width is\n      more than 500px, consider shorter tab labels.\n    </li>\n    <li>\n      Don't use tabs as navigation with entire pages inside. Rather than putting\n      extensive or lengthy content in a tabbed area, create a new page with an\n      additional link in the left hand nav.\n    </li>\n  </ul>\n  <br />\n  <img src=\"images/tabs_avoid.png\" />\n</div>\n",
            "less": ""
        }
    },
    {
        "name": "Tags",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "description": "",
        "stability": "experimental",
        "keywords": [],
        "displayName": "Tags",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Tags/scripts/rxTags.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Tags/templates/rxTags.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('tagsSimpleExampleCtrl', function ($scope) {\n    $scope.tagOptions = [\n        { text: 'apple', category: 'fruit' },\n        { text: 'orange', category: 'fruit' },\n        { text: 'banana', category: 'fruit' },\n        { text: 'squash', category: 'vegetable' }\n    ];\n    $scope.tags = ['apple'];\n});\n",
            "html": "<p>\n  A component used to apply predetermined descriptions to an entity.\n</p>\n\n<rx-example name=\"tags.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Progress Bars",
        "stability": "experimental",
        "description": "Provides feedback on the progress of a workflow or action",
        "hasApi": false,
        "keywords": [
            "bar",
            "load",
            "loading",
            "progress",
            "progressbar"
        ],
        "name": "progressbar",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This component may be used to provide feedback on the progress of a workflow or action.\n</p>\n\n<p>\n  Encore Framework utilizes Angular Bootstrap <em>progressbar</em>. See the\n  <a href=\"http://angular-ui.github.io/bootstrap/#/progressbar\">Angular Bootstrap page</a>\n  for more details.\n</p>\n\n<ul class=\"list\">\n    <li>\n      There are two states for progress bars: active and complete.\n      Active progress bars have animated stripes, which are produced\n      by the class <code>.active</code>. Full progress bars do not\n      have this class, and are solid and static in appearance.</li>\n    <li>\n      Several options for displaying text with a progress bar are\n      available: no text, a percentage (not italicized), and detailed\n      text (italicized). Always try to show a percentage. Your focus\n      should be to enter specific text, since it reveals both numeric\n      progress and provides context for what progress is being tracked.\n      See demo below.\n    </li>\n</ul>\n<br />\n\n<rx-example name=\"progressbar.simple\"></rx-example>\n",
            "less": "@import 'vars';\n\n// Bar animations\n// -------------------------\n// WebKit\n@-webkit-keyframes progress-bar-stripes {\n  from  { background-position: 40px 0; }\n  to    { background-position: 0 0; }\n}\n\n// Spec and IE10+\n@keyframes progress-bar-stripes {\n  from  { background-position: 40px 0; }\n  to    { background-position: 0 0; }\n}\n\n// Bar itself\n// -------------------------\n\n.progress-bar-variant(@color) {\n  background-color: @color;\n\n  // Deprecated parent class requirement as of v3.2.0\n  .progress-striped & {\n    #gradient > .striped();\n  }\n}\n\n// Outer container\n.progress {\n  overflow: hidden;\n  height: @progressbar-line-height-computed;\n  margin-bottom: @progressbar-line-height-computed;\n  background-color: @progressbar-background-color;\n  border: 1px solid @progressbar-border-color;\n  padding: 1px;\n}\n\n// Bar of progress\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: @progressbar-font-size;\n  line-height: @progressbar-line-height-computed;\n  color: @progressbar-default-text-color;\n  text-align: center;\n  background-color: @progressbar-default-background-color;\n  .transition(width .6s ease);\n}\n\n// Striped bars\n//\n// `.progress-striped .progress-bar` is deprecated as of v3.2.0 in favor of the\n// `.progress-bar-striped` class, which you just add to an existing\n// `.progress-bar`.\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  #gradient > .striped();\n  background-size: 40px 40px;\n}\n\n// Call animation for the active one\n//\n// `.progress.active .progress-bar` is deprecated as of v3.2.0 in favor of the\n// `.progress-bar.active` approach.\n.progress.active .progress-bar,\n.progress-bar.active {\n  .animation(progress-bar-stripes 2s linear infinite);\n}\n\n// Variations\n// -------------------------\n\n.progress-bar-secondary {\n  .progress-bar-variant(@progressbar-secondary-background-color);\n  color: @progressbar-secondary-text-color;\n}\n\n.progress-bar-tertiary {\n  .progress-bar-variant(@progressbar-tertiary-background-color);\n  color: @progressbar-tertiary-text-color;\n}\n\n#gradient {\n\n  // Horizontal gradient, from left to right\n  //\n  // Creates two color stops, start and end, by specifying a color and position for each color stop.\n  // Color stops are not available in IE9 and below.\n  .horizontal(@start-color: @gray-800; @end-color: @gray-950; @start-percent: 0%; @end-percent: 100%) {\n    background-image: -webkit-linear-gradient(left, @start-color @start-percent, @end-color @end-percent); // Safari 5.1-6, Chrome 10+\n    background-image: -o-linear-gradient(left, @start-color @start-percent, @end-color @end-percent); // Opera 12\n    background-image: linear-gradient(to right, @start-color @start-percent, @end-color @end-percent); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+\n    background-repeat: repeat-x;\n    filter: e(%(\"progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)\",argb(@start-color),argb(@end-color))); // IE9 and down\n  }\n\n  // Vertical gradient, from top to bottom\n  //\n  // Creates two color stops, start and end, by specifying a color and position for each color stop.\n  // Color stops are not available in IE9 and below.\n  .vertical(@start-color: @gray-800; @end-color: @gray-950; @start-percent: 0%; @end-percent: 100%) {\n    background-image: -webkit-linear-gradient(top, @start-color @start-percent, @end-color @end-percent);  // Safari 5.1-6, Chrome 10+\n    background-image: -o-linear-gradient(top, @start-color @start-percent, @end-color @end-percent);  // Opera 12\n    background-image: linear-gradient(to bottom, @start-color @start-percent, @end-color @end-percent); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+\n    background-repeat: repeat-x;\n    filter: e(%(\"progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=0)\",argb(@start-color),argb(@end-color))); // IE9 and down\n  }\n\n  .directional(@start-color: @gray-800; @end-color: @gray-950; @deg: 45deg) {\n    background-repeat: repeat-x;\n    background-image: -webkit-linear-gradient(@deg, @start-color, @end-color); // Safari 5.1-6, Chrome 10+\n    background-image: -o-linear-gradient(@deg, @start-color, @end-color); // Opera 12\n    background-image: linear-gradient(@deg, @start-color, @end-color); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+\n  }\n\n  .horizontal-three-colors(@start-color: @blue-accent; @mid-color: @purple-500; @color-stop: 50%; @end-color: @red-700) {\n    background-image: -webkit-linear-gradient(left, @start-color, @mid-color @color-stop, @end-color);\n    background-image: -o-linear-gradient(left, @start-color, @mid-color @color-stop, @end-color);\n    background-image: linear-gradient(to right, @start-color, @mid-color @color-stop, @end-color);\n    background-repeat: no-repeat;\n    filter: e(%(\"progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)\",argb(@start-color),argb(@end-color))); // IE9 and down, gets no color-stop at all for proper fallback\n  }\n\n  .vertical-three-colors(@start-color: @blue-accent; @mid-color: @purple-500; @color-stop: 50%; @end-color: @red-700) {\n    background-image: -webkit-linear-gradient(@start-color, @mid-color @color-stop, @end-color);\n    background-image: -o-linear-gradient(@start-color, @mid-color @color-stop, @end-color);\n    background-image: linear-gradient(@start-color, @mid-color @color-stop, @end-color);\n    background-repeat: no-repeat;\n    filter: e(%(\"progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=0)\",argb(@start-color),argb(@end-color))); // IE9 and down, gets no color-stop at all for proper fallback\n  }\n\n  .radial(@inner-color: @gray-800; @outer-color: @gray-950) {\n    background-image: -webkit-radial-gradient(circle, @inner-color, @outer-color);\n    background-image: radial-gradient(circle, @inner-color, @outer-color);\n    background-repeat: no-repeat;\n  }\n\n  .striped(@color: rgba(255,255,255,.15); @angle: 45deg) {\n    background-image: -webkit-linear-gradient(@angle, @color 25%, transparent 25%, transparent 50%, @color 50%, @color 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(@angle, @color 25%, transparent 25%, transparent 50%, @color 50%, @color 75%, transparent 75%, transparent);\n    background-image: linear-gradient(@angle, @color 25%, transparent 25%, transparent 50%, @color 50%, @color 75%, transparent 75%, transparent);\n  }\n}\n\n.animation(@animation) {\n  -webkit-animation: @animation;\n  -o-animation: @animation;\n  animation: @animation;\n}\n"
        }
    },
    {
        "displayName": "Apply",
        "stability": "experimental",
        "description": "Used to apply an instance of SelectFilter to an array.",
        "api": "filter:Apply",
        "keywords": [],
        "name": "Apply",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Apply/scripts/Apply.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('ApplySimpleCtrl', function ($scope, SelectFilter) {\n    $scope.filter = SelectFilter.create({\n        properties: ['account', 'status'],\n        selected: {\n            account: ['A']\n        }\n    });\n\n    $scope.tickets = [\n        { account: 'A', status: 'NEW', description: 'Open a new service ticket.' },\n        { account: 'A', status: 'IN_PROGRESS', description: 'Updating server status.' },\n        { account: 'B', status: 'TRANSFERRED', description: 'Transferred account to ORD region.' },\n        { account: 'B', status: 'VENDOR', description: 'Added new third-party vendor service.' },\n        { account: 'A', status: 'TRANSFERRED', description: 'Transferred account to IAD region.' }\n    ];\n});\n",
            "html": "<p>\n  Used to apply an instance of <code><a href=\"#/utilities/SelectFilter\">SelectFilter</a></code> to an array.\n</p>\n\n<rx-example name=\"Apply.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Auth",
        "stability": "unstable",
        "description": "Provides logic for authenticating, validating permissions, and managing sessions.",
        "api": "service:Auth",
        "keywords": [],
        "name": "Auth",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Auth/scripts/Auth.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('AuthSimpleCtrl', function ($scope, $window, Auth) {\n    $scope.hasRole = function () {\n        $window.alert('Has \"superhero\" Role? : ' + Auth.hasRole('superhero'));\n    };\n\n    $scope.isAuthenticated = function () {\n        $window.alert('Is Authenticated? : ' + Auth.isAuthenticated());\n    };\n});\n",
            "html": "<p>\n  Provides logic for authenticating, validating permissions, and managing sessions.\n</p>\n\n<rx-example name=\"Auth.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "Environment",
        "stability": "unstable",
        "description": "Allows environments to be defined, and retrieving the current environment based on location.",
        "api": "service:Environment",
        "keywords": [],
        "name": "Environment",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Environment/scripts/Environment.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('EnvironmentSimpleCtrl', function ($scope, Environment) {\n    var environment = Environment.get();\n    $scope.url = environment.url;\n    $scope.name = environment.name;\n});\n",
            "html": "<p>\n  Allows environments to be defined, and retrieving the current environment based on location.\n</p>\n\n<rx-example name=\"Environment.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "ErrorFormatter",
        "stability": "stable",
        "description": "Provides a helper method to parse and format error objects.",
        "api": "service:ErrorFormatter",
        "keywords": [],
        "name": "ErrorFormatter",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/ErrorFormatter/scripts/ErrorFormatter.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('ErrorFormatterSimpleCtrl', function ($scope, ErrorFormatter) {\n    $scope.setErrorMsg = function (msg) {\n        var error = { message: msg };\n        $scope.errorMsg = ErrorFormatter.buildErrorMsg('Error: ${message}', error);\n    };\n});\n",
            "html": "<p>\n  Provides a helper method to parse and format error objects.\n</p> \n\n<rx-example name=\"ErrorFormatter.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "Identity",
        "stability": "unstable",
        "description": "This is a component designed to aid interaction with Rackspace's Identity API.",
        "api": "service:Identity",
        "keywords": [],
        "name": "Identity",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Identity/scripts/Identity.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This is a component designed to aid interaction with Rackspace's Identity API.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "NotifyProperties",
        "stability": "experimental",
        "description": "Provides a registration service for directive, controller, or other service notification updates.",
        "api": "service:NotifyProperties",
        "keywords": [],
        "name": "NotifyProperties",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/NotifyProperties/scripts/NotifyProperties.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides a registration service that allows directives, controllers, or other services to watch for\n  external property changes.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "Page",
        "stability": "stable",
        "description": "Pagination filter that is used to limit the number of pages shown.",
        "api": "filter:Page",
        "keywords": [],
        "name": "Page",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Page/scripts/Page.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Pagination filter that is used to limit the number of pages shown.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "PageTracking",
        "stability": "stable",
        "description": "Used with pagination objects to store/control page display of data tables and other items.",
        "api": "service:PageTracking",
        "keywords": [],
        "name": "PageTracking",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/PageTracking/scripts/PageTracking.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Used with pagination objects to store/control page display of data tables and other items.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "Paginate",
        "stability": "stable",
        "description": "Pagination filter that is used to calculate the division in the items list for the paging.",
        "api": "filter:Paginate",
        "keywords": [],
        "name": "Paginate",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Paginate/scripts/Paginate.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Pagination filter that is used to calculate the division in the items list for the paging.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "PaginatedItemsSummary",
        "stability": "stable",
        "description": "Provides a formatted string with the current range of items in total items.",
        "api": "filter:PaginatedItemsSummary",
        "keywords": [],
        "name": "PaginatedItemsSummary",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/PaginatedItemsSummary/scripts/PaginatedItemsSummary.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides a formatted string with the current range of items in total items, for example \"26-50 of 500 items\".\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "Permission",
        "stability": "unstable",
        "description": "Simple service for accessing roles and permissions for a user.",
        "api": "service:Permission",
        "keywords": [],
        "name": "Permission",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Permission/scripts/Permission.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Simple service for accessing roles and permissions for a user.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "SelectFilter",
        "stability": "experimental",
        "description": "A prototype for creating objects that can be used for filtering arrays.",
        "api": "service:SelectFilter",
        "keywords": [],
        "name": "SelectFilter",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/SelectFilter/scripts/SelectFilter.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A prototype for creating objects that can be used for filtering arrays.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "Session",
        "stability": "unstable",
        "description": "Manages user session",
        "api": "service:Session",
        "keywords": [],
        "name": "Session",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Session/scripts/Session.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('SessionSimpleCtrl', function ($scope, $window, Session) {\n    $scope.isAuthenticated = function () {\n        $window.alert(Session.isAuthenticated());\n    };\n});\n",
            "html": "<p>\n  Manages a user session.\n</p>\n\n<rx-example name=\"Session.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "SessionStorage",
        "stability": "unstable",
        "description": "",
        "keywords": [],
        "name": "SessionStorage",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/SessionStorage/scripts/SessionStorage.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('SessionStorageSimpleCtrl', function ($scope, $window, SessionStorage) {\n    $scope.setSideKick = function () {\n        SessionStorage.setItem('Batman', 'Robin');\n    };\n\n    $scope.getSideKick = function () {\n        $window.alert(SessionStorage.getItem('Batman'));\n    };\n});\n",
            "html": "<p>\n  A component that provides a simple wrapper around the global\n  <code>sessionStorage</code> object for interacting with session storage.\n</p>\n\n<rx-example name=\"SessionStorage.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Status",
        "stability": "stable",
        "description": "Manages notifications for rxNotify",
        "api": "service:Status",
        "keywords": [],
        "name": "Status",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Status/scripts/Status.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('StatusSimpleCtrl', function ($scope, $rootScope, Status) {\n    Status.setScope($scope);\n\n    $scope.triggerRouteChangeSuccess = function () {\n        $rootScope.$broadcast('$routeChangeSuccess');\n    };\n\n    $scope.clear = function () {\n        Status.clear();\n        $scope.notify = undefined;\n    };\n\n    $scope.setLoading = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setLoading(msg);\n    };\n\n    $scope.setSuccess = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setSuccess(msg);\n    };\n\n    $scope.setSuccessNext = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setSuccessNext(msg);\n    };\n\n    $scope.setSuccessImmediate = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setSuccessImmediate(msg);\n    };\n\n    $scope.setWarning = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setWarning(msg);\n    };\n\n    $scope.setInfo = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setInfo(msg);\n    };\n\n    $scope.setError = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setError(msg);\n    };\n\n    $scope.dismiss = function () {\n        $scope.notify && Status.dismiss($scope.notify);\n        $scope.notify = undefined;\n    };\n});\n",
            "html": "<p>\n  Manages notifications for <a href=\"#/components/rxNotify\">rxNotify</a>.\n</p>\n\n<rx-example name=\"Status.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "StatusUtil",
        "stability": "stable",
        "description": "Manipulates required references to $scope input for proper notification functionality.",
        "api": "service:StatusUtil",
        "keywords": [],
        "name": "StatusUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/StatusUtil/scripts/StatusUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Manipulates required references to <code>$scope</code> input for proper notification functionality.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "TokenInterceptor",
        "stability": "unstable",
        "description": "Adds an authorization token to all HTTP requests, which allows access to system services.",
        "api": "service:TokenInterceptor",
        "keywords": [],
        "name": "TokenInterceptor",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/TokenInterceptor/scripts/TokenInterceptor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Adds an authorization token to all HTTP requests.  This allows access to system services for\n  authenticated users.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "UnauthorizedInterceptor",
        "stability": "unstable",
        "description": "Redirects users to the login page, when user authentication fails during a system service request.",
        "api": "service:UnauthorizedInterceptor",
        "keywords": [],
        "name": "UnauthorizedInterceptor",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/UnauthorizedInterceptor/scripts/UnauthorizedInterceptor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Redirects users to the login page, when user authentication fails during a system service request.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "UtcOffsets",
        "stability": "experimental",
        "description": "List of known UTC offset values",
        "api": "constant:UtcOffsets",
        "keywords": [],
        "name": "UtcOffsets",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/UtcOffsets/scripts/UtcOffsets.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  List of known UTC Offset Values as found at\n  <a href=\"https://en.wikipedia.org/wiki/List_of_UTC_time_offsets\"\n    target=\"_blank\">\n    https://en.wikipedia.org/wiki/List_of_UTC_time_offsets\n  </a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "devicePaths",
        "stability": "stable",
        "description": "Device Paths configuration",
        "api": "value:devicePaths",
        "keywords": [],
        "name": "devicePaths",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/devicePaths/scripts/devicePaths.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides configuration for device paths.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "encoreRoutes",
        "stability": "unstable",
        "description": "Allows apps to make updates to the navigation.",
        "api": "service:encoreRoutes",
        "keywords": [],
        "name": "encoreRoutes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/encoreRoutes/scripts/encoreRoutes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Allows apps to make updates to the navigation.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "feedbackApi",
        "stability": "stable",
        "description": "Provides the feedback URL.",
        "api": "constant:feedbackApi",
        "keywords": [],
        "name": "feedbackApi",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/feedbackApi/scripts/feedbackApi.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides the feedback URL.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "feedbackTypes",
        "stability": "unstable",
        "description": "Provides default feedback types with placeholder text.",
        "api": "value:feedbackTypes",
        "keywords": [],
        "name": "feedbackTypes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/feedbackTypes/scripts/feedbackTypes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides default feedback types.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "hotkeys",
        "stability": "unstable",
        "description": "",
        "api": "service:hotkeys",
        "keywords": [],
        "name": "hotkeys",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/hotkeys/scripts/hotkeys.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('hotkeysVolumeCtrl', function ($scope, hotkeys) {\n    $scope.volume = 5;\n\n    // Remove combos so we don't add them multiple times\n    hotkeys.del('ctrl+up');\n    hotkeys.del('ctrl+down');\n\n    // Add desired combos\n    hotkeys.add({\n        combo: 'ctrl+up',\n        description: 'Turn up the volume!',\n        callback: function () {\n            $scope.volume += 1;\n        }\n    });\n\n    hotkeys.add({\n        combo: 'ctrl+down',\n        description: 'Turn it down!',\n        callback: function () {\n            $scope.volume -= 1;\n        }\n    });\n});\n",
            "html": "<p>\n  This is simply a reference guide to using\n  <a href=\"http://chieffancypants.github.io/angular-hotkeys/\">the angular-hotkeys plugin</a>\n  from within EncoreUI.\n</p>\n\n<rx-example name=\"hotkeys.volume\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "routesCdnPath",
        "stability": "stable",
        "description": "",
        "api": "service:routesCdnPath",
        "keywords": [],
        "name": "routesCdnPath",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/routesCdnPath/scripts/routesCdnPath.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides the CDN locations from which to load the nav JSON.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxAge",
        "stability": "stable",
        "description": "Filters to parse dates",
        "api": "filter:rxAge",
        "keywords": [],
        "name": "rxAge",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAge/scripts/rxAge.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxAgeCtrl', function ($scope) {\n    var day = 1000 * 60 * 60 * 24;\n    $scope.ageHours = new Date((Date.now() - (day / 2.3))).toString();\n    $scope.ageDays = new Date((Date.now() - (day * 1.5))).toString();\n    $scope.ageMonths = new Date((Date.now() - (day * 40.2))).toString();\n    $scope.ageYears = new Date((Date.now() - (day * 380.1))).toString();\n});\n",
            "html": "<p>\n  <code>rxAge</code> provides several filters to parse dates.\n</p>\n\n<rx-example name=\"rxAge.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxAppRoutes",
        "stability": "unstable",
        "description": "Manage application routes and states of routes.",
        "api": "service:rxAppRoutes",
        "keywords": [],
        "name": "rxAppRoutes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAppRoutes/scripts/rxAppRoutes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Mmanages app routes and states of routes.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxAutoSave",
        "stability": "unstable",
        "description": "Service to help automatically save/load form data.",
        "api": "service:rxAutoSave",
        "keywords": [],
        "name": "rxAutoSave",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAutoSave/scripts/rxAutoSave.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxAutoSaveSimpleCtrl', function ($scope, $timeout, $q, rxNotify, rxAutoSave) {\n    $scope.formData = {\n        checkbox: false,\n        name: '',\n        description: '',\n        sensitive: ''\n    };\n\n    var autosave = rxAutoSave($scope, 'formData', {\n        exclude: ['sensitive'],\n        ttl: 86400000\n    });\n\n    $scope.status = {\n        loading: false,\n        disable: false,\n        deferredLoading: false,\n        deferredDisable: false\n    };\n\n    var clearMsg = [\n        'rxAutoSave data has been cleared!',\n        'Navigate away and return, and the form will not be auto-populated'\n    ].join(' ');\n\n    // Clear with an explicit autosave.clear() call\n    $scope.clearStorage = function () {\n        $scope.status.loading = true;\n        $timeout(function () {\n            $scope.status.loading = false;\n            autosave.clear();\n            rxNotify.add(clearMsg, { type: 'success' });\n        }, 1000);\n    };\n\n    // Clear by resolving the associated promise\n    $scope.deferredClear = function () {\n        var deferred = $q.defer();\n\n        autosave.clearOnSuccess(deferred.promise);\n        $scope.status.deferredLoading = true;\n\n        $timeout(function () {\n            $scope.status.deferredLoading = false;\n            deferred.resolve();\n            rxNotify.add(clearMsg, { type: 'success' });\n        }, 1000);\n    };\n});\n",
            "html": "<p>\n  Provides a way to store values in a form for later use.\n</p>\n<h3>Form with automatically saved state</h3>\n<p>\n  Try entering some data into this form, and then navigating away to a different page. When you return here,\n  the form data will automatically be populated with what you had previously entered.\n</p>\n<p>\n  Once you've tried that, you can clear the stored data with either of the \"Clear\" buttons below. Clicking those\n  will <em>not</em> erase the form, but will erase the rxAutoSave stored data. If you navigate away after clicking\n  one of the buttons, and then return here, the form will not be auto-populated, because rxAutoSave will have no data for it!\n</p>\n\n<p>\n  Finally, we have set a Time-To-Live of 24 hours for this form, and explicitly told it not to save the \"Sensitive data\" field\n  into storage. If you enter data here, and come back &gt;24 hours later, the form will not be auto-populated, as the data will\n  have expired.\n</p>\n\n<rx-example name=\"rxAutoSave.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxBreadcrumbsSvc",
        "stability": "unstable",
        "description": "",
        "api": "service:rxBreadcrumbsSvc",
        "keywords": [],
        "name": "rxBreadcrumbsSvc",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBreadcrumbsSvc/scripts/rxBreadcrumbsSvc.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Angular service that provides various methods to manipulate breadcrumbs.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxBulkSelectController",
        "stability": "experimental",
        "description": "Provides controller logic for rxBulkSelect",
        "api": "controller:rxBulkSelectController",
        "keywords": [],
        "name": "rxBulkSelectController",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBulkSelectController/scripts/rxBulkSelectController.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides controller logic for <a href=\"#/components/rxBulkSelect\">rxBulkSelect</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxBulkSelectUtils",
        "stability": "experimental",
        "description": "Selects or deselects all visible rows.  Support function for rxBulkSelect.",
        "api": "service:rxBulkSelectUtils",
        "keywords": [],
        "name": "rxBulkSelectUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBulkSelectUtils/scripts/rxBulkSelectUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Selects or deselects all visible rows.  Support function for\n  <a href=\"#/components/rxBulkSelect\">rxBulkSelect</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxBytesConvert",
        "stability": "unstable",
        "description": "Converts raw byte disk size into a more readable format",
        "api": "filter:rxBytesConvert",
        "keywords": [],
        "name": "rxBytesConvert",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBytesConvert/scripts/rxBytesConvert.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxBytesConvertCtrl', function ($scope) {\n    $scope.sizeGB = 42e10; // 420 GB\n    $scope.sizeTB = 125e12; // 125 TB\n    $scope.sizePB = 17134e13; // 171.34 PB\n});\n",
            "html": "<p>\n  Converts byte disk size into a more readable format (e.g. GBs, TBs, PBs)\n</p>\n\n<rx-example name=\"rxBytesConvert.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxCapitalize",
        "stability": "stable",
        "description": "Capitalizes the first word in a string",
        "api": "filter:rxCapitalize",
        "keywords": [],
        "name": "rxCapitalize",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxCapitalize/scripts/rxCapitalize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxCapitalizeCtrl', function ($scope) {\n    $scope.hello = 'hello world this is my text.';\n});\n",
            "html": "<p>\n  Capitalizes the first word in a string.\n</p>\n\n<rx-example name=\"rxCapitalize.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxDOMHelper",
        "stability": "unstable",
        "description": "A small set of useful DOM-related functions.",
        "api": "service:rxDOMHelper",
        "keywords": [],
        "name": "rxDOMHelper",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDOMHelper/scripts/rxDOMHelper.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A small set of useful DOM-related functions.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxDiskSize",
        "stability": "stable",
        "description": "Converts raw GB disk size into a more readable format",
        "api": "filter:rxDiskSize",
        "keywords": [],
        "name": "rxDiskSize",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDiskSize/scripts/rxDiskSize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxDiskSizeCtrl', function ($scope) {\n    $scope.sizeGB = 420;\n    $scope.sizeTB = 125000;\n    $scope.sizePB = 171337000;\n});\n",
            "html": "<p>\n  Converts GB disk size into a more readable format (e.g. GBs, TBs, PBs)\n</p>\n\n<rx-example name=\"rxDiskSize.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxEnvironmentMatch",
        "stability": "unstable",
        "description": "Checks if current environment matches target environment",
        "api": "filter:rxEnvironmentMatch",
        "keywords": [],
        "name": "rxEnvironmentMatch",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxEnvironmentMatch/scripts/rxEnvironmentMatch.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxEnvironmentMatchSimpleCtrl', function ($scope, Environment) {\n    $scope.Environment = Environment;\n});\n",
            "html": "<p>\n  Checks if current environment matches target environment.\n</p>\n\n<rx-example name=\"rxEnvironmentMatch.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxEnvironmentUrl",
        "stability": "unstable",
        "description": "Builds a URL based on current environment.",
        "api": "filter:rxEnvironmentUrl",
        "keywords": [],
        "name": "rxEnvironmentUrl",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxEnvironmentUrl/scripts/rxEnvironmentUrl.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxEnvironmentUrlSimpleCtrl', function ($scope, Environment) {\n    $scope.Environment = Environment;\n});\n",
            "html": "<p>\n  Builds a URL based on current environment.\n</p>\n\n<rx-example name=\"rxEnvironmentUrl.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFavicon",
        "stability": "unstable",
        "description": "Allows custom favicons between local, staging and production environments.",
        "api": "directive:rxFavicon",
        "keywords": [
            "favicon",
            "favorite",
            "icon",
            "rxFavicon"
        ],
        "name": "rxFavicon",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFavicon/scripts/rxFavicon.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Allows custom favicons between local, staging and production environments.\n</p>\n<p>See favicon of this site for an example of this. \n   On <a href=\"http://rackerlabs.github.io/encore-ui/\">the live site</a>, the favicon will be a dark blue book. \n   On <a href=\"http://localhost:9001\">the local site</a>, it will be a light blue book.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFeedbackController",
        "stability": "unstable",
        "description": "Allows the customization of the feedback modal.",
        "api": "controller:rxFeedbackController",
        "keywords": [],
        "name": "rxFeedbackController",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFeedbackController/scripts/rxFeedbackController.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Allows the customization of the feedback modal.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFeedbackSvc",
        "stability": "unstable",
        "description": "Service that supports the customization of user feedback endpoints.",
        "api": "service:rxFeedbackSvc",
        "keywords": [],
        "name": "rxFeedbackSvc",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFeedbackSvc/scripts/rxFeedbackSvc.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Service that supports the customization of user feedback endpoints.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxFormUtils",
        "stability": "unstable",
        "description": "Set of utility functions used by rxForm to access form data",
        "api": "service:rxFormUtils",
        "keywords": [],
        "name": "rxFormUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFormUtils/scripts/rxFormUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Set of utility functions used by rxForm to access form data.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxHideIfUkAccount",
        "stability": "unstable",
        "description": "Check if account number in the URL is of UK origin.",
        "api": "service:rxHideIfUkAccount",
        "keywords": [],
        "name": "rxHideIfUkAccount",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxHideIfUkAccount/scripts/rxHideIfUkAccount.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Check if account number in the URL is of UK origin.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxLocalStorage",
        "stability": "unstable",
        "description": "Simple wrapper for interacting with local storage in the browser.",
        "api": "service:rxLocalStorage",
        "keywords": [],
        "name": "rxLocalStorage",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxLocalStorage/scripts/LocalStorage.js",
            "src/utilities/rxLocalStorage/scripts/rxLocalStorage.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxLocalStorageSimpleCtrl', function ($scope, $window, rxLocalStorage) {\n    $scope.setSideKick = function () {\n        rxLocalStorage.setObject('joker', { name: 'Harley Quinn' });\n    };\n\n    $scope.getSideKick = function () {\n        var sidekick = rxLocalStorage.getObject('joker');\n        $window.alert(sidekick.name);\n    };\n});\n",
            "html": "<p>\n  Simple wrapper for interacting with local storage in the browser.\n</p>\n<h3>Simple Example</h3>\n<p>Select <code>Store Answer</code>, then <code>Answer?</code> to first store the answer in the \n   browser's <code>localStorage</code> object and later retrieve the stored content.\n</p>\n\n<rx-example name=\"rxLocalStorage.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxModalCtrl",
        "stability": "stable",
        "description": "Provides a controller for rxModalAction to use.",
        "api": "controller:rxModalCtrl",
        "keywords": [],
        "name": "rxModalCtrl",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxModalCtrl/scripts/rxModalCtrl.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides a controller for <a href=\"#/components/rxModalAction\">rxModalAction</a> to use.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxModalFooterTemplates",
        "stability": "stable",
        "description": "A cache for storing the modal footer templates.",
        "api": "service:rxModalFooterTemplates",
        "keywords": [],
        "name": "rxModalFooterTemplates",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxModalFooterTemplates/scripts/rxModalFooterTemplates.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A cache for storing the modal footer templates.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxNestedElement",
        "stability": "unstable",
        "description": "Helper function to aid in the creation of boilerplate DDO definitions",
        "api": "service:rxNestedElement",
        "keywords": [],
        "name": "rxNestedElement",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxNestedElement/scripts/rxNestedElement.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Helper function to aid in the creation of boilerplate Directive Definition Object definitions \n  required to validate nested custom elements.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxNotify",
        "stability": "stable",
        "description": "Manages page messages for an application.",
        "api": "service:rxNotify",
        "keywords": [],
        "name": "rxNotify",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxNotify/scripts/rxNotify.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxNotify/templates/rxNotification.html",
            "templates/rxNotify/templates/rxNotifications.html"
        ],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Manages page messages for an application.  See <a href=\"#/components/rxNotify\">rxNotify demo</a> for examples.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxPageTitle",
        "stability": "stable",
        "description": "Provides a service that manages page titles.",
        "api": "service:rxPageTitle",
        "keywords": [],
        "name": "rxPageTitle",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPageTitle/scripts/rxPageTitle.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxPageTitleSimpleCtrl', function ($scope, rxPageTitle) {\n    $scope.changeTitle = function () {\n        rxPageTitle.setTitle($scope.newTitle);\n    };\n\n    $scope.refreshTitle = function () {\n        $scope.pageTitle = rxPageTitle.getTitle();\n    };\n\n    $scope.refreshTitle();\n});\n",
            "html": "<p>\n  Provides a service that manages page titles.\n</p>\n\n<rx-example name=\"rxPageTitle.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxPaginateUtils",
        "stability": "stable",
        "description": "A few utilities to calculate first, last, and number of items.",
        "api": "service:rxPaginateUtils",
        "keywords": [],
        "name": "rxPaginateUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPaginateUtils/scripts/rxPaginateUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A few utilities to calculate first, last, and number of items.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxPromiseNotifications",
        "stability": "stable",
        "description": "Manages displaying messages for a notification promise.",
        "api": "service:rxPromiseNotifications",
        "keywords": [],
        "name": "rxPromiseNotifications",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPromiseNotifications/scripts/rxPromiseNotifications.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxPromiseNotificationsSimpleCtrl', function ($scope, rxNotify, rxPromiseNotifications, $q) {\n\n    $scope.add = function (stack) {\n        var messageOptions = _.clone($scope.options);\n\n        if ($scope.ondismiss.should) {\n            messageOptions.ondismiss = _.clone($scope.ondismiss.method);\n        }\n\n        messageOptions.stack = stack;\n\n        rxNotify.add($scope.message, messageOptions);\n    };\n\n    rxNotify.add('Helpful Information', {\n        stack: 'demo'\n    });\n    rxNotify.add('Additional Helpful Information', {\n        stack: 'demo'\n    });\n\n    $scope.addPromise = function () {\n        $scope.deferred = $q.defer();\n\n        rxPromiseNotifications.add($scope.deferred.promise, {\n            loading: 'Loading Service',\n            success: 'Service Succesfully Loaded',\n            error: 'Error Loading Service'\n        }, 'demo');\n    };\n});\n",
            "html": "<p>\n  Manages the displaying of notification success and failure messages.\n</p>\n<h3>Simple Example</h3>\n<p>Select <code>Create Promise</code> to simulate creating a service, then select\n   <code>Resolve Promise</code> or <code>Reject Promise</code> to simulate success or failure.\n</p>\n\n<rx-example name=\"rxPromiseNotifications.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxScreenshotSvc",
        "stability": "unstable",
        "description": "Captures a screenshot for rxFeedback submission form.",
        "api": "service:rxScreenshotSvc",
        "keywords": [],
        "name": "rxScreenshotSvc",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxScreenshotSvc/scripts/rxScreenshotSvc.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Captures a screenshot for <code>rxFeedback</code> submission form.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxSortEmptyTop",
        "stability": "unstable",
        "description": "Moves rows with an empty predicate in ascending and descending order.",
        "api": "filter:rxSortEmptyTop",
        "keywords": [],
        "name": "rxSortEmptyTop",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxSortEmptyTop/scripts/rxSortEmptyTop.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxSortEmptyTopSimpleCtrl', function ($scope, PageTracking, rxSortUtil) {\n    $scope.sort = rxSortUtil.getDefault('name');\n    $scope.sort = rxSortUtil.getDefault('name', false);\n    $scope.pager = PageTracking.createInstance();\n\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    $scope.serverVolumes = [\n        {\n            name: 'Monitor Agent 4',\n            volumeId: 'a44079a5-040b-495f-be22-35994ea03cc5'\n        },\n        {\n            name: 'Stress Volume 33',\n            volumeId: '65d89e82-9363-482e-92d1-f3f7d4f135a7'\n        },\n        {\n            name: null,\n            volumeId: '0a87a764-45f0-4a1e-8dbf-20d76291022d'\n        },\n        {\n            name: 'Stress Volume 24',\n            volumeId: ''\n        },\n        {\n            name: null,\n            volumeId: 'be827f83-8d4c-4d4c-afc3-4c9bf0fdfe00'\n        },\n    ];\n});\n",
            "html": "<p>\n  Moves rows with an empty predicate to the top of the column in\n  ascending order, and to the bottom in descending order.\n</p>\n\n<rx-example name='rxSortEmptyTop.simple'></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxSortUtil",
        "stability": "unstable",
        "description": "Service which provides utility methods for sorting collections.",
        "api": "service:rxSortUtil",
        "keywords": [],
        "name": "rxSortUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxSortUtil/scripts/rxSortUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Service which provides utility methods for sorting collections.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxStatusColumnIcons",
        "stability": "experimental",
        "description": "Mapping of internal statuses to FontAwesome icons.",
        "api": "object:rxStatusColumnIcons",
        "keywords": [],
        "name": "rxStatusColumnIcons",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatusColumnIcons/scripts/rxStatusColumnIcons.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Maps internal statuses to <a href=\"http://fontawesome.io/\">FontAwesome icons</a>.  Examples of their usage\n  are available on the <a href=\"#/components/rxStatusColumn\">rxStatusColumn demo page</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxStatusMappings",
        "stability": "experimental",
        "description": "A set of methods for creating mappings to status identifiers used in EncoreUI",
        "api": "service:rxStatusMappings",
        "keywords": [],
        "name": "rxStatusMappings",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatusMappings/scripts/rxStatusMappings.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxStatusMappingsSimpleCtrl', function ($scope, rxStatusMappings) {\n    $scope.servers = [\n        { status: 'ACTIVE', title: 'ACTIVE status' },\n        { status: 'ERROR', title: 'ERROR status' },\n        { status: 'DISABLED', title: 'DISABLED status' },\n        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },\n        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },\n        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },\n        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },\n        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },\n        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },\n        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },\n        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }\n    ];\n\n    // We have a few different ways of adding mappings. We've tried to show them all here\n    rxStatusMappings.addGlobal({\n        'DELETING': 'PENDING'\n    });\n    rxStatusMappings.mapToInfo('RESCUE');\n    rxStatusMappings.mapToWarning('SUSPENDED');\n    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);\n    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);\n    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });\n    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');\n});\n",
            "html": "<p>\n  A set of methods for creating mappings to status identifiers used in EncoreUI.\n</p>\n\n<rx-example name=\"rxStatusMappings.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxStatusTags",
        "stability": "unstable",
        "description": "Primarily used for applications to specify custom status tags.",
        "api": "service:rxStatusTags",
        "keywords": [],
        "name": "rxStatusTags",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatusTags/scripts/rxStatusTags.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Primarily used for applications to specify custom status tags.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxTimePickerUtil",
        "stability": "experimental",
        "description": "Utilities for rxTimePicker element",
        "api": "service:rxTimePickerUtil",
        "keywords": [],
        "name": "rxTimePickerUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxTimePickerUtil/scripts/rxTimePickerUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Utility service used by <a href=\"#/elements/Forms#time-picker\">rxTimePicker</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxUnsafeRemoveHTML",
        "stability": "stable",
        "description": "Removes all HTML tags from a string.",
        "api": "filter:rxUnsafeRemoveHTML",
        "keywords": [],
        "name": "rxUnsafeRemoveHTML",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxUnsafeRemoveHTML/scripts/rxUnsafeRemoveHTML.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxUnsafeRemoveHTMLSimpleCtrl', function ($scope) {\n    $scope.sample = 'Sample string <strong>without</strong> <span>HTML tags</span>.';\n});\n",
            "html": "<p>\n  Removes all HTML tags from a given string, using the browser's own parsing engine.  Any content inside of tags will be kept.\n</p>\n\n<rx-example name=\"rxUnsafeRemoveHTML.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxVisibility",
        "stability": "unstable",
        "description": "Provides an interface for adding new visibility methods for nav menus.",
        "api": "service:rxVisibility",
        "keywords": [],
        "name": "rxVisibility",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxVisibility/scripts/rxVisibility.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides an interface for adding new <code>visibility</code> methods for nav menus.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxVisibilityPathParams",
        "stability": "unstable",
        "description": "Returns an object with name and method params that can be passed to rxVisibility.addMethod().",
        "api": "service:rxVisibilityPathParams",
        "keywords": [],
        "name": "rxVisibilityPathParams",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxVisibilityPathParams/scripts/rxVisibilityPathParams.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Returns an object with name and method params that can be passed to <a href=\"#/utilities/rxVisibility\">rxVisibility</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "titleize",
        "stability": "unstable",
        "description": "Convert a string to title case, stripping out underscores and all uppercase words.",
        "api": "filter:titleize",
        "keywords": [],
        "name": "titleize",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/titleize/scripts/titleize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('titleizeSimpleCtrl', function ($scope) {\n    $scope.sample = 'HELLO_welcome TO ENCore FRamework!';\n});\n",
            "html": "<p>\n  Convert a string to title case, stripping out underscores and all uppercase words.\n</p>\n\n<rx-example name=\"titleize.simple\"></rx-example>\n\n",
            "less": ""
        }
    },
    {
        "displayName": "urlUtils",
        "stability": "unstable",
        "description": "Set of utility functions to break apart/compare URLs.",
        "api": "service:urlUtils",
        "keywords": [],
        "name": "urlUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/urlUtils/scripts/urlUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Set of utility functions to break apart/compare URLs.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "xor",
        "stability": "experimental",
        "description": "xor filter",
        "api": "filter:xor",
        "keywords": [],
        "name": "xor",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/xor/scripts/xor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>xor filter</p>\n",
            "less": ""
        }
    }
]);
