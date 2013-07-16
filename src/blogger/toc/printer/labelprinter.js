goog.provide('garafu.blogger.toc.printer.LabelPrinter');

goog.require('garafu.blogger.toc.printer.AbstractPrinter');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @public
* @constructor
* @class
*/
garafu.blogger.toc.printer.LabelPrinter = function (settings) {
    goog.base(this, settings);
};
goog.inherits(garafu.blogger.toc.printer.LabelPrinter, garafu.blogger.toc.printer.AbstractPrinter);




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* @public
*/
garafu.blogger.toc.printer.LabelPrinter.prototype.execute = function (feed) {
    var entry = feed.entry || [];
    var category = feed.category || [];
    var count = 0;
    var i, j, hash, list;
    var fragment, entryItem, categoryList, categoryElement, ul, li;
    
    hash = {};
    for (i = category.length; i--;) {
        hash[category[i].term] = i;
    }

    fragment = document.createDocumentFragment();
    for (i = category.length; i--;) {
        fragment.appendChild(this.createCategory(category[i]));
    }
    
    for (i = entry.length; i--;) {
        entryItem = entry[i];
        categoryList = entryItem.category;
        for (j = categoryList.length; j--;) {
            categoryElement = fragment.childNodes[hash[categoryList[j].term]];
            ul = categoryElement.getElementsByTagName('ul')[0];
            li = document.createElement('li');
            li.appendChild(this.createEntry(entryItem));
            li.className = 'poststoc-item';
            ul.appendChild(li);
        }
    }
    
    //document.getElementById('poststoc').appendChild(fragment);
    return fragment;
};

garafu.blogger.toc.printer.LabelPrinter.prototype.createCategory = function (category) {
    var settings = this._settings;
    var container = document.createElement('div');
    var title = document.createElement('div');
    var anchor = document.createElement('a');
    var list = document.createElement('ul');
    var url = '';
    
    // Create label search URL.
    url += 'http://'
    url += settings.blogURL;
    url += '/search/label/';
    url += category.term;
    
    // Set style.
    anchor.appendChild(document.createTextNode(category.term));
    anchor.href = url;
    anchor.className = 'poststoc-category-anchor';
    
    title.appendChild(anchor);
    title.className = 'poststoc-category-title';
    
    list.className = 'poststoc-list';
    
    container.appendChild(title);
    container.appendChild(list);
    container.className = 'poststoc-category';
    
    return container;
};

garafu.blogger.toc.printer.LabelPrinter.prototype.createEntry = function (entry) {
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


