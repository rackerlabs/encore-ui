/**
 * @ngdoc object
 * @name test.helpers
 * @description
 * A group of functions to be used in testing
 * @object
 */
helpers = {
    /**
     * @ngdoc function
     * @name test.helpers.clickElement
     * @memberOf test.helpers
     * @description
     * Used to click an object since PhantomJS doesn't always follow the right
     * click element
     * @param {Object} element The element that you wish to click on
     */
    clickElement: function (el) {
        if (el.click) {
            el.click();
        } else {
            // Phantom doesn't go for 'click':
            // http://stackoverflow.com/questions/17468611/triggering-click-event-phantomjs
            var ev = document.createEvent('MouseEvent');
            ev.initMouseEvent(
                'click',
                true /* bubble */, true /* cancelable */,
                window, null,
                0, 0, 0, 0, /* coordinates */
                false, false, false, false, /* modifier keys */
                0 /*left*/, null
            );

            if (!el.dispatchEvent && el[0].dispatchEvent) {
                el = el[0];
            }
            el.dispatchEvent(ev);
        }
    },
    /**
     * @ngdoc function
     * @name test.helpers.createDirective
     * @memberOf test.helpers
     * @description
     * Used to generate a directive and compile it for use in the tests
     * @param {string} template The string content of the template that has the
     * directive definition.
     * @param {function} compile This is the AngularJS $compile function
     * @param {Object} scope This is the scope of the directive that should be
     * compiled.
     *
     * @returns {Object} The compiled directive
     */
    createDirective: function (template, compile, scope) {
        var elm, linkFn;

        // Create directive
        linkFn = compile(template);
        scope.$digest();
        elm = linkFn(scope);
        scope.$digest();

        // Return
        return elm;
    },
    /**
     * @ngdoc function
     * @name test.helpers.resultSlice
     * @memberOf test.helpers
     * @description
     * Used to slice apart the result of an element's .children lookup
     * @param {Array} children This is the list of the elements found using a
     * .children lookup on a div
     * @param {integer} start This is the index of the first element you wish
     * to return
     * @param {integer=children.length} end This is the index of the last
     * element you wish to return. Non-inclusive.
     * @param {Boolean=false} convertToElements If `true`, the elements will
     * be converted to angular jQueryLite elements.
     *
     * @returns {Array} The sliced list of elements.
     */
    resultSlice: function (obj, start, end, convertToElements) {
        var ret = [];

        if (typeof end === 'undefined') {
            end = obj.length;
        }

        for (start; start < end; start++) {
            if (start < obj.length) {
                ret.push((convertToElements) && angular.element(obj[start]) || obj[start]);
            }
        }

        return ret;
    },
    /**
     * @ngdoc function
     * @name test.helpers.getChildDiv
     * @memberOf test.helpers
     * @description
     * Used to find a child div based on an attribute.
     * @param {Object} parentElement This is the element that contains the
     * child you wish to find.
     * @param {string} childAttributeValue This is the value of the attribute
     * on the child element that you wish to search by.
     * @param {string='data-title'} dataAttributeName This is the name of the
     * data attribute that you will search on.
     *
     * @returns {Object|undefined} The AngularJS jQueryLite element or undefined if no
     * matching element is found.
     */
    getChildDiv: function (par, childTitle, dataAttribute) {
        var children = angular.element(par).children('div');
        if (!dataAttribute) {
            dataAttribute = 'data-title';
        }

        var foundChildDiv = _.find(children, _.bind(function (child) {
            if (this.dataAttribute == 'class') {
                return angular.element(child).hasClass(this.childTitle);
            } else {
                return (angular.element(child).attr(this.dataAttribute) === this.childTitle);
            }
        }, {childTitle: childTitle, dataAttribute: dataAttribute}));

        // We're going to massage this into a jQueryLite element
        if (foundChildDiv) {
            foundChildDiv = angular.element(foundChildDiv);
        }

        return foundChildDiv;
    },
    /**
     * @ngdoc function
     * @name test.helpers.getChildDivText
     * @memberOf test.helpers
     * @description
     * Used to find the text of the child div that matches the attribute value
     * @param {Object} parentElement This is the element that contains the
     * child you wish to find.
     * @param {string} childAttributeValue This is the value of the attribute
     * on the child element that you wish to search by.
     * @param {string='data-title'} dataAttributeName This is the name of the
     * data attribute that you will search on.
     *
     * @returns {string|undefined} This is the Leading & Trailing whitespace-trimmed text
     * of the matching child element. Returns undefined if no element is found.
     */
    getChildDivText: function (par, childTitle, dataAttribute) {
        var child = this.getChildDiv(par, childTitle, dataAttribute);
        if (child) {
            return child.text().replace(/(^\s+|\s+$)/g,'');
        }
    }
};


// PhantomJS does not currently have a 'bind' function on functions. This polyfills it in
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            FNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof FNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        FNOP.prototype = this.prototype;
        fBound.prototype = new FNOP();

        return fBound;
    };
}
