/********************************************************************************
*
*         Entry class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.printer.Entry');

goog.require('garafu.date.W3CDTF');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------
/**
* @public
* @constructor
* @class
*/
garafu.blogger.toc.printer.Entry = function (settings, entry) {
    // Properties.
    this._settings = settings;
    this._data = entry;

    // DOM elements.
    this.rootElement = null;

    // Initialize this instance.
    this.initialize();
};




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------
/**
* Get entry name.
* @public
*/
garafu.blogger.toc.printer.Entry.prototype.getName = function () {
    return this._data.title.$;
};




/**
* Get the root DOM element of this category.
* @public
*/
garafu.blogger.toc.printer.Entry.prototype.getRootElement = function () {
    return this.rootElement;
};




/**
* @private
*/
garafu.blogger.toc.printer.Entry.prototype.initialize = function () {
    var settings = this._settings;
    var entry = this._data;
    var container = document.createElement('span');
    var published = document.createElement('span');
    var updated = document.createElement('span');
    var thumbnail = document.createElement('span');
    var title = document.createElement('a');
    var datetime, text, img;

    // Create thumbnail
    if (settings.thumbnail.enabled) {
        thumbnail.appendChild(this.createThumbnailElement(entry.media$thumbnail));
        thumbnail.className = 'poststoc-thumbnail';
    }

    // Create published date
    if (settings.published.enabled) {
        datetime = garafu.date.W3CDTF.parse(entry.published.$t);
        text = settings.published.format.format(datetime);
        published.appendChild(document.createTextNode(text));
        published.className = 'poststoc-published';
    }

    // Create update date
    if (settings.updated.enabled) {
        datetime = garafu.date.W3CDTF.parse(entry.updated.$t);
        text = settings.updated.format.format(datetime);
        updated.appendChild(document.createTextNode(text));
        updated.className = 'poststoc-updated';
    }

    // Create title
    title.appendChild(document.createTextNode(entry.title.$t));
    title.href = entry.link[entry.link.length - 1].href;
    title.className = 'poststoc-title';

    // Compose DOM element structure
    if (settings.thumbnail.enabled) {
        container.appendChild(thumbnail);
    }
    if (settings.published.enabled) {
        container.appendChild(published);
    }
    if (settings.updated.enabled) {
        container.appendChild(updated);
    }
    container.appendChild(title);
    container.className = 'poststoc-entry';

    // Save to cache.
    this.rootElement = container;
};



garafu.blogger.toc.printer.Entry.prototype.createThumbnailElement = function (media) {
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