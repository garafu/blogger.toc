goog.provide('garafu.blogger.toc.printer.TitlePrinter');

goog.require('garafu.blogger.toc.printer.AbstractPrinter');
goog.require('garafu.blogger.toc.printer.Entry')



// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @class
*
* @public
* @constructor
*/
garafu.blogger.toc.printer.TitlePrinter = function (settings) {
    goog.base(this, settings);
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
    
    return list;
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

    var entry = new garafu.blogger.toc.printer.Entry(this._settings, entry);
    return entry.getRootElement();

    ////var settings = this._settings;
    ////var container = document.createElement('span');
    ////var published = document.createElement('span');
    ////var updated = document.createElement('span');
    ////var thumbnail = document.createElement('span');
    ////var title = document.createElement('a');
    ////var img;

    ////// Create thumbnail
    ////if (settings.thumbnail.enabled) {
    ////    thumbnail.appendChild(this.createThumbnail(entry.media$thumbnail));
    ////    thumbnail.className = 'poststoc-thumbnail';
    ////}

    ////// Create published date
    ////published.appendChild(document.createTextNode(entry.published.$t));
    ////published.className = 'poststoc-published';
    
    ////// Create update date
    ////updated.appendChild(document.createTextNode(entry.updated.$t));
    ////updated.className = 'poststoc-updated';
    
    ////// Create title
    ////title.appendChild(document.createTextNode(entry.title.$t));
    ////title.href = entry.link[entry.link.length - 1].href;
    ////title.className = 'poststoc-title';
    
    ////// Compose DOM element structure
    ////if (settings.thumbnail.enabled) {
    ////    container.appendChild(thumbnail);
    ////}
    ////container.appendChild(published);
    ////container.appendChild(updated);
    ////container.appendChild(title);
    ////container.className = 'poststoc-entry';
    
    ////return container;
};




/**
* @private
*/
garafu.blogger.toc.printer.TitlePrinter.prototype.createThumbnail = function (media) {
    var img = document.createElement('img');

    if (media) {
        // Create image element.
        img.src = media.url;
        img.className = 'poststoc-thumbnail-image';
    } else {
        // Create no-image element.
        img.src = this._settings.thumbnail.noImageURL;
        img.className = 'poststoc-thumbnail-noimage';
    }

    return img;
};

