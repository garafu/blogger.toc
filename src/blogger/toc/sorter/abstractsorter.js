// --------------------------------------------------------------------------------
//  garafu.blogger.toc.sorter.AbstractSorter class
// --------------------------------------------------------------------------------
goog.provide('garafu.blogger.toc.sorter.AbstractSorter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @putlic
* @constructor
* @class
*/
garafu.blogger.toc.sorter.AbstractSorter = function () {
};




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* @public
* @return   {string}    The value of the key named "orderby" of  query parameter.
*/
garafu.blogger.toc.sorter.AbstractSorter.prototype.getOrderByValue = function () {
    return 'published';
};




/**
* @public
*/
garafu.blogger.toc.sorter.AbstractSorter.prototype.execute = function (feed) {
};
