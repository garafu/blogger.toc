/********************************************************************************
*
*         Main class
*
*   description : Main class is entry point of this project.
*                 This script released under the MIT license (MIT-LICENSE.txt).
*   copyright   : Copyright (c) 2013 akinari tsugo
*   license     : MIT
*********************************************************************************/
goog.provide('garafu.blogger.toc.Main');

goog.require('garafu.blogger.toc.sorter.SortKey');
goog.require('garafu.blogger.toc.sorter.PublishedDateSorter');
goog.require('garafu.blogger.toc.sorter.TitleNameSorter');
goog.require('garafu.blogger.toc.sorter.UpdatedDateSorter');
goog.require('garafu.blogger.toc.printer.TitlePrinter');
goog.require('garafu.blogger.toc.printer.LabelPrinter');
goog.require('garafu.blogger.toc.printer.LabelNameOrderPrinter');
goog.require('garafu.blogger.toc.printer.LabelContentsOrderPrinter');
goog.require('garafu.blogger.toc.Settings');
goog.require('garafu.date.W3CDTF');
goog.require('garafu.dom');
goog.require('garafu.events');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @class
*
* @public
* @constructor
*/
garafu.blogger.toc.Main = function () {
    this._settings = new garafu.blogger.toc.Settings();
    this._sorter = this.createSorter();
    this._printer = this.createPrinter();
    this.requestedCount = 0;
    this.request();
};




// --------------------------------------------------------------------------------
//  static property
// --------------------------------------------------------------------------------

/**
* Canvas ID string.
*
* @private
*/
garafu.blogger.toc.Main.CANVAS_ID = '__garafu.blogger.toc__' + (new Date()).getTime();




/**
* Callback function name string.
*
* @private
*/
garafu.blogger.toc.Main.CALLBACK_NAME = 'garafu.blogger.toc.load';




/**
* Singleton instance.
*
* @private
*/
garafu.blogger.toc.Main._instance = null;




/**
* Recieved data.
*
* @private
*/
var contract = contract || undefined;
garafu.blogger.toc.Main._data = contract;




// --------------------------------------------------------------------------------
//  static method
// --------------------------------------------------------------------------------
/**
* Callback when feed data has been recieved.
*
* @public
* @static
* @param    {object}    Recieved data.
*/
garafu.blogger.toc.Main.load = function (data) {
    var self, origin, additional, merged;
    
    // Get singleton instance.
    self = garafu.blogger.toc.Main.getInstance();
    
    // Merge rcieved data.
    if (!garafu.blogger.toc.Main._data) {
        garafu.blogger.toc.Main._data = data;
    } else if (data.feed.entry && data.feed.entry.length != 0) {
        origin = garafu.blogger.toc.Main._data.feed.entry;
        additional = data.feed.entry;
        merged = origin.concat(additional);
        garafu.blogger.toc.Main._data.feed.entry = merged;
    }
    
    // Whether need to additional request.
    if (!self.isAllReceived(data)) {
        // Request additional data.
        self.request();
    } else {
        // Remove loading message.
        garafu.dom.removeChildren(document.getElementById(garafu.blogger.toc.Main.CANVAS_ID));
        
        // Sort data.
        self.sort(garafu.blogger.toc.Main._data);
        
        // Print data.
        self.print(garafu.blogger.toc.Main._data);
    }
};




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* Get the singleton instance.
*
* @public
* @return   {garafu.blogger.toc.Main}   Singleton instance.
*/
garafu.blogger.toc.Main.getInstance = function () {
    var instance = garafu.blogger.toc.Main._instance;
    
    if (!instance) {
        instance = new garafu.blogger.toc.Main();
        garafu.blogger.toc.Main._instance = instance;
    }
    
    return instance;
};




/**
* Get the value indicating whether the all feed data has been recieved or not.
*
* @public
* @param    {object}    Recieved data.
* @return   {boolean}   The value indicating whether the all feed data has been recieved.
*/
garafu.blogger.toc.Main.prototype.isAllReceived = function (data) {
    return (this._settings.maxResults <= this.requestedCount ||
            !data.feed.entry ||
            (data.feed.entry && data.feed.entry.length === 0))
};




/**
* Try to request the feed data.
*
* @public
*/
garafu.blogger.toc.Main.prototype.request = function () {
    var url, script, startIndex, endIndex;
    
    // Calculate startIndex.
    startIndex = this.requestedCount + 1;
    
    // Calculate maxResults.
    if (this.requestedCount + 500 < this._settings.maxResults) {
        endIndex = this.requestedCount + 500;
    } else {
        endIndex = this._settings.maxResults - this.requestedCount;
    }
    
    // Create request URL
    url = this.createRequestURL(startIndex, endIndex);
    
    // Create script DOM element.
    script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    
    // Append to the body DOM element.
    document.body.appendChild(script);
    
    // Update requested counter.
    this.requestedCount = endIndex;
};




/**
* Create request feed data URL.
*
* @public
* @param    {number}    startIndex  Start index to recieve.
* @param    {number}    maxResults  Max recieve count.
* @return   {string}    Created request URL.
*/
garafu.blogger.toc.Main.prototype.createRequestURL = function (startIndex, maxResults) {
    var settings = this._settings;
    var sorter = this._sorter;
    var url = '';
    
    // Create request URL.
    url += 'http:\/\/';
    url += settings.blogURL;
    url += '\/feeds\/posts\/summary?';
    url += 'redirect=false&';
    url += 'start-index=' + startIndex + '&';
    url += 'max-results=' + maxResults + '&';
    url += 'orderby=' + sorter.getOrderByValue() + '&';
    url += 'alt=json-in-script&';
    url += 'callback=';
    url += garafu.blogger.toc.Main.CALLBACK_NAME;
    
    return url;
};




/**
* Sort recieved data.
*
* @public
* @param    {object}    Recieved data.
*/
garafu.blogger.toc.Main.prototype.sort = function (data) {
    var sorter = this._sorter;
    
    // Sort recieved data.
    sorter.execute(data.feed || {});
};




/**
* Print recieved data.
*
* @public
* @param    {object}    Recieved data.
*/
garafu.blogger.toc.Main.prototype.print = function (data) {
    var printer = this._printer;
    var fragment, license;
    
    // Create contents.
    fragment = printer.execute(data.feed || {});
    
    // Create license element.
    license = this.createLicenseElement();
    
    // Append to display.
    fragment.appendChild(license);
    document.getElementById(garafu.blogger.toc.Main.CANVAS_ID).appendChild(fragment);
};




/**
*
*/
garafu.blogger.toc.Main.prototype.createLicenseElement = function () {
    var container = document.createElement('div');
    var anchor = document.createElement('a');
    var widget = document.createElement('a');
    var profile = document.createElement('a');
    
    anchor.href = 'https://github.com/garafu/blogger.toc';
    anchor.appendChild(document.createTextNode('This page uses "blogger.toc" created by garafu.'));
    
    container.appendChild(anchor);
    container.style.display = 'block';
    container.style.fontSize = 'small';
    container.style.margin = '20px 0';
    
    return container;
};




/**
* Create sorter delegated instance according to the setting.
*
* @private
* @return   {garafu.blogger.toc.AbstractSorter}     Concreate Sorter instance.
*/
garafu.blogger.toc.Main.prototype.createSorter = function () {
    var SortKey = garafu.blogger.toc.sorter.SortKey;
    var settings = this._settings;
    var orderby = settings.sort.key;
    
    switch (orderby.toLowerCase()) {
        case SortKey.PUBLISHED:
            return new garafu.blogger.toc.sorter.PublishedDateSorter(settings);
        case SortKey.UPDATED:
            return new garafu.blogger.toc.sorter.UpdatedDateSorter(settings);
        case SortKey.TITLE:
            return new garafu.blogger.toc.sorter.TitleNameSorter(settings);
        default:
            return new garafu.blogger.toc.sorter.PublishedDateSorter(settings);
    }
};




/**
* Create printer delegated instance according to the setting.
*
* @private
* @return   {garafu.blogger.toc.AbstractPrinter}    Concreate Printer instance.
*/
garafu.blogger.toc.Main.prototype.createPrinter = function () {
    var settings = this._settings;
    var printby = settings.printby;
    
    switch (printby.toLowerCase()) {
        case 'title':
            return new garafu.blogger.toc.printer.TitlePrinter(settings);
        case 'label':
            return new garafu.blogger.toc.printer.LabelPrinter(settings);
        case 'label.nameorder':
            return new garafu.blogger.toc.printer.LabelNameOrderPrinter(settings);
        case 'label.contentsorder':
            return new garafu.blogger.toc.printer.LabelContentsOrderPrinter(settings);
        default:
            return new garafu.blogger.toc.printer.TitlePrinter(settings);
    }
};




// --------------------------------------------------------------------------------
// Create initial instance.
garafu.events.addEventHandler(window, 'load', function () {
    var scriptElements, currentScriptElement, rootElement, i;
    
    // Create initial singleton instance.
    garafu.blogger.toc.Main.getInstance();
});




// --------------------------------------------------------------------------------
// Write canvas DOM element.
document.write('<div id="' + garafu.blogger.toc.Main.CANVAS_ID + '" class="poststoc">LOAD DATA ...</div>');




// --------------------------------------------------------------------------------
// Exports static function.
goog.exportSymbol(garafu.blogger.toc.Main.CALLBACK_NAME, garafu.blogger.toc.Main.load);
