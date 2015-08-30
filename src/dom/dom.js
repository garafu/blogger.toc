/********************************************************************************
*
*         garafu.dom namespace
*
*   description : 
*********************************************************************************/
goog.provide('garafu.dom');




// --------------------------------------------------------------------------------
//  static method
// --------------------------------------------------------------------------------

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