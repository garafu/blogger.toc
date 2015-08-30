/********************************************************************************
*
*         LabelContentsOrderPrinter class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.printer.LabelContentsOrderPrinter');

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
garafu.blogger.toc.printer.LabelContentsOrderPrinter = function (settings) {
    goog.base(this, settings);
};
goog.inherits(garafu.blogger.toc.printer.LabelContentsOrderPrinter, garafu.blogger.toc.printer.LabelPrinter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* Sort category name list.
* @public
* @param    {garafu.blogger.toc.printer.Category[]}     originalList    Category list.
* @return   {garafu.blogger.toc.printer.Category[]}     Sorted list.
*/
garafu.blogger.toc.printer.LabelContentsOrderPrinter.prototype.sort = function (originalList) {
    var sortedList;
    
    sortedList = originalList.sort(function (a, b) {
        return (a.getEntryCounts() < b.getEntryCounts()) ? 1 : -1;
    });
    
    return sortedList;
};

