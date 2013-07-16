goog.provide('garafu.dom');




/**
* Remove child nodes of specific element.
*
* @public
* @param    {DOMElement}    Target element.
*/
garafu.dom.removeChildren = function (node) {
    var child;
    while ((child = node.firstChild)) {
        node.removeChild(child);
    }
};