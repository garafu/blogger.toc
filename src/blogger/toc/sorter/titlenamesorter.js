/********************************************************************************
*
*         TitleNameSorter class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.sorter.TitleNameSorter');

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
garafu.blogger.toc.sorter.TitleNameSorter = function (settings) {
    goog.base(this, settings);
};
goog.inherits(garafu.blogger.toc.sorter.TitleNameSorter, garafu.blogger.toc.sorter.AbstractSorter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* @public
* @return   {string}    The value of the key named "orderby" of  query parameter.
*/
garafu.blogger.toc.sorter.TitleNameSorter.prototype.getOrderByValue = function () {
    return 'published';
};




/**
* Execute process of sorting entry.
*
* @public
* @param    {object}    feed    JSON object of Blogger feed.
*/
garafu.blogger.toc.sorter.TitleNameSorter.prototype.execute = function (feed) {
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
            this.executeAscendingOrder(feed);
            break;
    }
};




/**
* Sort by ascending order of published datetime.
*
* @private
* @param    {object}    feed    JSON object of Blogger feed.
*/
garafu.blogger.toc.sorter.TitleNameSorter.prototype.executeAscendingOrder = function (feed) {
    var entry = feed.entry || [];

    entry.sort(function (a, b) {
        if (a.title.$t > b.title.$t) {
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
garafu.blogger.toc.sorter.TitleNameSorter.prototype.executeDescendingOrder = function (feed) {
    var entry = feed.entry || [];

    entry.sort(function (a, b) {
        if (a.title.$t < b.title.$t) {
            return 1;
        } else {
            return -1;
        }
    });
};



