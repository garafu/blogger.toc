// --------------------------------------------------------------------------------
//  garafu.blogger.toc.sorter.UpdatedDateSorter class
// --------------------------------------------------------------------------------
goog.provide('garafu.blogger.toc.sorter.UpdatedDateSorter');

goog.require('garafu.blogger.toc.sorter.AbstractSorter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @putlic
* @constructor
* @class
*/
garafu.blogger.toc.sorter.UpdatedDateSorter = function () {
    goog.base(this);
};
goog.inherits(garafu.blogger.toc.sorter.UpdatedDateSorter, garafu.blogger.toc.sorter.AbstractSorter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* @public
* @return   {string}    The value of the key named "orderby" of  query parameter.
*/
garafu.blogger.toc.sorter.UpdatedDateSorter.prototype.getOrderByValue = function () {
    return 'updated';
};




/**
* @public
*/
garafu.blogger.toc.sorter.UpdatedDateSorter.prototype.execute = function (feed) {
    // No execution.
};
