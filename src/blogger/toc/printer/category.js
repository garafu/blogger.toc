/********************************************************************************
*
*         Category class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.printer.Category');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @public
* @constructor
* @class
*/
garafu.blogger.toc.printer.Category = function (settings, category) {
    // Properties.
    this._settings = settings;
    this._data = category;

    // DOM elements.
    this.rootElement = null;
    this.titleElement = null;
    this.listElement = null;

    // Initialize this instance.
    this.initialize();
};




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------

/**
* Get category name.
* @public
*/
garafu.blogger.toc.printer.Category.prototype.getName = function () {
    return this._data.term;
};




/**
* Get the root DOM element of this category.
* @public
*/
garafu.blogger.toc.printer.Category.prototype.getRootElement = function () {
    return this.rootElement;
};




/**
* Get the number of appended entries.
* @public
*/
garafu.blogger.toc.printer.Category.prototype.getEntryCounts = function () {
    return this.listElement.childNodes.length;
};




/**
* Append specific entry to the end of this category.
* @public
*/
garafu.blogger.toc.printer.Category.prototype.addEntry = function (entry) {
    var entryElement = entry.getRootElement();
    var ul = this.listElement;
    var li = document.createElement('li');
    
    li.className = 'poststoc-item';
    li.appendChild(entryElement);
    
    ul.appendChild(li);
};




/**
* @private
*/
garafu.blogger.toc.printer.Category.prototype.initialize = function () {
    var settings = this._settings;
    var categoryName = this._data.term;
    var container = document.createElement('div');
    var title = document.createElement('div');
    var anchor = document.createElement('a');
    var list = document.createElement('ul');
    var url = '';
    
    // Create label search URL.
    url += 'http://'
    url += settings.blogURL;
    url += '/search/label/';
    url += categoryName;
    
    // Set style.
    anchor.appendChild(document.createTextNode(categoryName));
    anchor.href = url;
    anchor.className = 'poststoc-category-anchor';
    
    title.appendChild(anchor);
    title.className = 'poststoc-category-title';
    
    list.className = 'poststoc-list';
    
    container.appendChild(title);
    container.appendChild(list);
    container.className = 'poststoc-category';
    
    // Save to cache.
    this.rootElement = container;
    this.titleElement = title;
    this.listElement = list;
};

