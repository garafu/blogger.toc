goog.provide('garafu.blogger.toc.sorter.PublishedDateSorter');

goog.require('garafu.blogger.toc.sorter.AbstractSorter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @putlic
* @constructor
* @class
*/
garafu.blogger.toc.sorter.PublishedDateSorter = function (settings) {
    goog.base(this, settings);
};
goog.inherits(garafu.blogger.toc.sorter.PublishedDateSorter, garafu.blogger.toc.sorter.AbstractSorter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* @public
* @return   {string}    The value of the key named "orderby" of  query parameter.
*/
garafu.blogger.toc.sorter.PublishedDateSorter.prototype.getOrderByValue = function () {
    return 'published';
};




/**
* @public
*/
garafu.blogger.toc.sorter.PublishedDateSorter.prototype.execute = function (feed) {
    // No execution
};
