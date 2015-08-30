/********************************************************************************
*
*         AbstractSorter class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.sorter.UpdatedDateSorter');

goog.require('garafu.blogger.toc.sorter.AbstractSorter');
goog.require('garafu.blogger.toc.sorter.SortOrder');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @class
* @public
* @constructor
* @param    {garafu.blogger.toc.Settings}   settings    Settings object.
*/
garafu.blogger.toc.sorter.UpdatedDateSorter = function (settings) {
    goog.base(this, settings);
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
* Execute process of sorting entry.
*
* @public
* @param    {object}    feed    JSON object of Blogger feed.
*/
garafu.blogger.toc.sorter.UpdatedDateSorter.prototype.execute = function (feed) {
    var SortOrder = garafu.blogger.toc.sorter.SortOrder;
    var orderby = (this._settings.sort.order || '').toLocaleLowerCase();

    switch (orderby) {
        case SortOrder.ASC:
            this.executeAscendingOrder(feed);
            break;
        case SortOrder.DESC:
            this.executeDescendingOrder(feed);
            break;
        default:
            this.executeDescendingOrder(feed);
            break;
    }
};




/**
* Sort by ascending order of published datetime.
*
* @private
* @param    {object}    feed    JSON object of Blogger feed.
*/
garafu.blogger.toc.sorter.UpdatedDateSorter.prototype.executeAscendingOrder = function (feed) {
    var entry = feed.entry || [];

    entry.sort(function (a, b) {
        if (a.updated.$t > b.updated.$t) {
            return 1;
        } else {
            return -1;
        }
    });
};




/**
* Sort by descending order of published datetime.
*
* @private
* @param    {object}    feed    JSON object of Blogger feed.
*/
garafu.blogger.toc.sorter.UpdatedDateSorter.prototype.executeDescendingOrder = function (feed) {
    // No execution.
};