// --------------------------------------------------------------------------------
//  garafu.blogger.toc.printer.TitlePrinter class
// --------------------------------------------------------------------------------
goog.provide('garafu.blogger.toc.printer.TitlePrinter');

goog.require('garafu.blogger.toc.printer.AbstractPrinter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @public
* @constructor
* @class
*/
garafu.blogger.toc.printer.TitlePrinter = function () {
    goog.base(this);
};
goog.inherits(garafu.blogger.toc.printer.TitlePrinter, garafu.blogger.toc.printer.AbstractPrinter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* @public
*/
garafu.blogger.toc.printer.TitlePrinter.prototype.execute = function (feed) {
    var entry = feed.entry || [];
    var list;
    
    list = this.createList(entry);
    
    document.getElementById('poststoc').appendChild(list);
};




/**
* @private
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
*/
garafu.blogger.toc.printer.TitlePrinter.prototype.createEntry = function (entry) {
    var container = document.createElement('span');
    var published = document.createElement('span');
    var updated = document.createElement('span');
    var title = document.createElement('a');

    published.appendChild(document.createTextNode(entry.published.$t));
    published.className = 'poststoc-published';
    
    updated.appendChild(document.createTextNode(entry.updated.$t));
    updated.className = 'poststoc-updated';
    
    title.appendChild(document.createTextNode(entry.title.$t));
    title.href = entry.link[entry.link.length - 1].href;
    title.className = 'poststoc-title';
    
    container.appendChild(published);
    container.appendChild(updated);
    container.appendChild(title);
    container.className = 'poststoc-entry';
    
    return container;
};


