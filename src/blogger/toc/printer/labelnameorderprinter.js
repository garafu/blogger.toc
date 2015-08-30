/********************************************************************************
*
*         LabelNameOrderPrinter class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.printer.LabelNameOrderPrinter');

goog.require('garafu.blogger.toc.printer.LabelPrinter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @class
* @public
* @constructor
* @param    {garafu.blogger.toc.Settings}   settings    Settings object.
*/
garafu.blogger.toc.printer.LabelNameOrderPrinter = function (settings) {
    goog.base(this, settings);
};
goog.inherits(garafu.blogger.toc.printer.LabelNameOrderPrinter, garafu.blogger.toc.printer.LabelPrinter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* Sort category name list.
* @public
* @param    {garafu.blogger.toc.printer.Category[]}     originalList    Category list.
* @return   {garafu.blogger.toc.printer.Category[]}     Sorted list.
*/
garafu.blogger.toc.printer.LabelNameOrderPrinter.prototype.sort = function (originalList) {
    var sortedList;
    
    sortedList = originalList.sort(function (a, b) {
        return (a.getName() < b.getName()) ? -1 : 1;
    });
    
    return sortedList;
};

