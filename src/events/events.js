goog.provide('garafu.events');




/**
* Add event listener to specific DOM element.
*
* @public
* @param    {DOMElement}    element     Target DOM element.
* @param    {string}        type        Event type.
* @param    {function}      handler     Callback function.
*/
garafu.events.addEventHandler = function (element, type, handler) {
    var actual;

    // Sitch usable function.
    if (window.addEventListener) {
        actual = function (element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (window.attachEvent) {
        actual = function (element, type, handler) {
            element.attachEvent('on' + type, handler);
        };
    } else {
        actual = function (element, type, handler) {
            element['on' + type] = handler;
        };
    }

    // Overwrite function for preventing waste process.
    garafu.events.addEventHandler = actual;

    // First execution.
    actual(element, type, handler);
};




/**
* Remove event handlers from specific DOM element.
*
* @public
* @param    {DOMElement}    element     Target DOM element.
* @param    {string}        type        Event type.
* @param    {function}      handler     Callback function.
*/
garafu.events.removeEventHandler = function (element, type, handler) {
    var actual;
     
    // Sitch usable function.
    if (window.removeEventListener) {
        actual = function (element, type, handler) {
            element.removeEventListener(type, handler, false);
        };
    } else if (window.detachEvent) {
        actual = function (element, type, handler) {
            element.detachEvent('on' + type, handler);
        };
    } else {
        actual = function (element, type, handler) {
            element['on' + type] = undefined;
            delete element['on' + type];
        };
    }
     
    // Overwrite function for preventing waste process.
    garafu.events.removeEventListener = actual;
     
    // First execution.
    actual(element, type, handler);
};