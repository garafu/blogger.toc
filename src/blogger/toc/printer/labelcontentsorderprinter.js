goog.provide('garafu.blogger.toc.printer.LabelContentsOrderPrinter');

goog.require('garafu.blogger.toc.printer.LabelPrinter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @public
* @constructor
* @class
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
*/
garafu.blogger.toc.printer.LabelContentsOrderPrinter.prototype.sort = function (originalList) {
    var sortedList;
    
    sortedList = originalList.sort(function (a, b) {
        return (a.getEntryCounts() < b.getEntryCounts()) ? 1 : -1;
    });
    
    return sortedList;
};

