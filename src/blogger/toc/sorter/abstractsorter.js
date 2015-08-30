/********************************************************************************
*
*         AbstractSorter class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.sorter.AbstractSorter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @class
* @public
* @constructor
* @param    {garafu.blogger.toc.Settings}   settings    Settings object.
*/
garafu.blogger.toc.sorter.AbstractSorter = function (settings) {
    this._settings = settings;
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
* Execute process of sorting entry.
* @public
* @param    {object}    feed    JSON object of Blogger feed.
*/
garafu.blogger.toc.sorter.AbstractSorter.prototype.execute = function (feed) {
    // NOTE: Implement actual sorting process into the method of inherited class.
};
