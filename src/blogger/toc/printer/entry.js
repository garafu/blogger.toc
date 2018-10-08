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
* @class
* @public
* @constructor
* @param    {garafu.blogger.toc.Settings}   settings    Settings object.
* @param    {feed.entry}                    entry       Feed entry data.
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
*
* @public
*/
garafu.blogger.toc.printer.Entry.prototype.getName = function () {
    return this._data.title.$;
};




/**
* Get the root DOM element of this category.
*
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
    var regexp = /https?:(\/\/[\w\-\.~#\$&\+\/:=\?%]+)/;
    var container, toppage, author, published, updated, image, thumbnail, anchor, title, newsymbol, datetime, text, img;

    // Create container DOM element.
    container = document.createElement('span');
    container.className = 'poststoc-entry';
    container.setAttribute('itemscope', 'itemscope');
    container.setAttribute('itemtype', 'https://schema.org/BlogPosting');

    // Create entry page meta information
    toppage = document.createElement('meta');
    toppage.setAttribute('itemprop', 'mainEntityOfPage');
    toppage.setAttribute('content', '//' + settings.blogURL);
    container.appendChild(toppage);

    // Create author meta information
    author = document.createElement('meta');
    author.setAttribute('itemprop', 'publisher author');
    author.setAttribute('content', entry.author[0].name.$t);
    container.appendChild(author);

    // Create thumbnail
    if (settings.thumbnail.enabled) {
        image = this.createThumbnailElement(entry.media$thumbnail);
        image.setAttribute('itemprop', 'image');
        thumbnail = document.createElement('span');
        thumbnail.className = 'poststoc-thumbnail';
        thumbnail.appendChild(image);
        container.appendChild(thumbnail);
    } else if(entry.media$thumbnail) {
        thumbnail = document.createElement('link');
        thumbnail.setAttribute('itemprop', 'image');
        thumbnail.setAttribute('href', entry.media$thumbnail.url);
        container.appendChild(thumbnail);
    }

    // Create published date
    if (settings.published.enabled) {
        datetime = garafu.date.W3CDTF.parse(entry.published.$t);
        text = settings.published.format.format(datetime);
        published = document.createElement('span');
        published.appendChild(document.createTextNode(text));
        published.className = 'poststoc-published';
        published.setAttribute('itemprop', 'datePublished');
        container.appendChild(published);
    } else {
        published = document.createElement('meta');
        published.setAttribute('itemprop', 'datePublished');
        published.setAttribute('content', entry.published.$t);
        container.appendChild(published);
    }

    // Create update date
    if (settings.updated.enabled) {
        updated = document.createElement('span');
        datetime = garafu.date.W3CDTF.parse(entry.updated.$t);
        text = settings.updated.format.format(datetime);
        updated.appendChild(document.createTextNode(text));
        updated.className = 'poststoc-updated';
        updated.setAttribute('itemprop', 'dateModified');
        container.appendChild(updated);
    } else {
        updated = document.createElement('meta');
        updated.setAttribute('itemprop', 'dateModified');
        updated.setAttribute('content', entry.updated.$t);
        container.appendChild(updated);
    }

    // Create title
    anchor = document.createElement('a');
    anchor.appendChild(document.createTextNode(entry.title.$t));
    anchor.href = regexp.exec(entry.link[entry.link.length - 1].href)[1];
    if (settings.target) {
        anchor.target = settings.target;
    }
    anchor.setAttribute('itemprop', 'url');
    title = document.createElement('span');
    title.className = 'poststoc-title';
    title.setAttribute('itemprop', 'name headline');
    title.appendChild(anchor);
    container.appendChild(title);

    // Create new symbol
    if (settings.newPost.enabled &&
        ((settings.newPost.target === 'published' && garafu.date.W3CDTF.parse(entry.published.$t) > settings.newPost.term) ||
         (settings.newPost.target === 'updated' && garafu.date.W3CDTF.parse(entry.updated.$t) > settings.newPost.term))) {
        newsymbol = document.createElement('span');
        newsymbol.appendChild(document.createTextNode(settings.newPost.symbol));
        newsymbol.className = 'poststoc-new';
        container.appendChild(newsymbol);
    }

    // Save to cache.
    this.rootElement = container;
};




/**
* @private
* @param    {feed.entry.media$thumbnail}    Thumbnail data.
* @return   {DOMElement}    Thumbnail image DOM element.
*/
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