/********************************************************************************
*
*         TitlePrinter class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.printer.TitlePrinter');

goog.require('garafu.blogger.toc.printer.AbstractPrinter');
goog.require('garafu.blogger.toc.printer.Entry')




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @class
* @public
* @constructor
* @param    {garafu.blogger.toc.Settings}   settings    Settings object.
*/
garafu.blogger.toc.printer.TitlePrinter = function (settings) {
    goog.base(this, settings);
};
goog.inherits(garafu.blogger.toc.printer.TitlePrinter, garafu.blogger.toc.printer.AbstractPrinter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* Create DOM elements according to the feed data.
* @public
* @param    {feed}  feed    Feed data.
* @return   {DOMElement}    Created feed DOM element.
*/
garafu.blogger.toc.printer.TitlePrinter.prototype.execute = function (feed) {
    var entry = feed.entry || [];
    var list;
    
    list = this.createList(entry);
    
    return list;
};




/**
* @private
* @param    {feed.entry}    entry   Feed entry data.
* @return   {DOMElement}    Created root DOM element of feed entry list.
*/
garafu.blogger.toc.printer.TitlePrinter.prototype.createList = function (entry) {
    var ul, li, i, length;
    
    ul = document.createElement('ul');
    ul.className = 'poststoc-list';
    
    for (i = 0, length = entry.length; i < length; i++) {
        li = document.createElement('li');
        li.appendChild(this.createEntry(entry[i]));
        li.className = 'poststoc-item';
        ul.appendChild(li);
    }
    
    return ul;
};




/**
* @private
* @param    {feed.entry}    entry   Feed entry data.
* @param    {DOMElement}    Created feed entry DOM element.
*/
garafu.blogger.toc.printer.TitlePrinter.prototype.createEntry = function (entry) {
    var entry = new garafu.blogger.toc.printer.Entry(this._settings, entry);
    return entry.getRootElement();
};


