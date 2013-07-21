goog.provide('garafu.blogger.toc.printer.LabelPrinter');

goog.require('garafu.blogger.toc.printer.AbstractPrinter');
goog.require('garafu.blogger.toc.printer.Category');
goog.require('garafu.blogger.toc.printer.Entry');




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
    var settings = this._settings;
    var entryList = feed.entry || [];
    var categoryList = feed.category || [];
    var i, j, length, hash, list;
    var fragment, categoryItem, entryItem, category, entry;
    
    hash = {};
    list = [];
    fragment = document.createDocumentFragment();
    
//// Create category.
//for (i = 0, length = categoryList.length; i < length; i++) {
//    categoryItem = categoryList[i];
//    category = new garafu.blogger.toc.printer.Category(settings, categoryItem);
//    hash[category.getName()] = category;
//    list[list.length] = category;
//}
    
    // Create categry & entry.
    for (i = 0, length = entryList.length; i < length; i++) {
        entryItem = entryList[i];
        categoryList = entryItem.category || [];
        for (j = categoryList.length; j--;) {
            categoryItem = categoryList[j];
            
            // Create entry object.
            entry = new garafu.blogger.toc.printer.Entry(settings, entryItem);
            
            // Try to get specific category object.
            category = hash[categoryItem.term];
            if (!category) {
                // Create category object.
                category = new garafu.blogger.toc.printer.Category(settings, categoryItem);
                
                // Add to hash array and list.
                hash[categoryItem.term] = category;
                list[list.length] = category;
            }
            
            // Add created entry object to the category object.
            category.addEntry(entry);
        }
    }
    
    // Sort category.
    list = this.sort(list);
    
    // Append to document fragment.
    for (i = 0, length = list.length; i < length; i++) {
        fragment.appendChild(list[i].getRootElement());
    }
    
    return fragment;
};



/**
* Sort category name list.
* @public
*/
garafu.blogger.toc.printer.LabelPrinter.prototype.sort = function (originalList) {
    return originalList;
};

