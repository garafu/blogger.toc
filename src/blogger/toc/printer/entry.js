goog.provide('garafu.blogger.toc.printer.Entry');




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
    var img;

    // Create thumbnail
    if (settings.thumbnail.enabled) {
        thumbnail.appendChild(this.createThumbnailElement(entry.media$thumbnail));
        thumbnail.className = 'poststoc-thumbnail';
    }

    // Create published date
    published.appendChild(document.createTextNode(entry.published.$t));
    published.className = 'poststoc-published';

    // Create update date
    updated.appendChild(document.createTextNode(entry.updated.$t));
    updated.className = 'poststoc-updated';

    // Create title
    title.appendChild(document.createTextNode(entry.title.$t));
    title.href = entry.link[entry.link.length - 1].href;
    title.className = 'poststoc-title';

    // Compose DOM element structure
    if (settings.thumbnail.enabled) {
        container.appendChild(thumbnail);
    }
    container.appendChild(published);
    container.appendChild(updated);
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