goog.provide('garafu.blogger.toc.sorter.TitleNameSorter');

goog.require('garafu.blogger.toc.sorter.AbstractSorter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @putlic
* @constructor
* @class
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
* @public
*/
garafu.blogger.toc.sorter.TitleNameSorter.prototype.execute = function (feed) {
    var entry = feed.entry || [];

    entry.sort(function (a, b) {
        if (a.title.$t > b.title.$t) {
            return 1;
        } else {
            return -1;
        }
    });
    
};
