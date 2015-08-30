/********************************************************************************
*
*         garafu.string namespace
*
*   description : 
*********************************************************************************/
goog.provide('garafu.string');




// --------------------------------------------------------------------------------
//  static method
// --------------------------------------------------------------------------------

/**
* Pads number to given length.
*
* @public
* @param    {number}    number      The number to pad.
* @param    {number}    length      The desired length.
* @return   {string}    The number string padded to given length.
*/
garafu.string.paddingNumber = function (number, length) {
    var source = String(number);
    var count = length - source.length;

    if (count <= 0) {
        return source;
    }

    while (count--) {
        source = '0' + source;
    }

    return source;
};