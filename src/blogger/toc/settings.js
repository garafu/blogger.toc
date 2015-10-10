/********************************************************************************
*
*         Settings class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.blogger.toc.Settings');

goog.require('garafu.i18n.DateTimeFormat');




// --------------------------------------------------------------------------------
//  constructor
// --------------------------------------------------------------------------------

/**
* @class
* @putlic
* @constructor
*/
garafu.blogger.toc.Settings = function () {
    var defaultSettings;

    // Set default settings.
    defaultSettings = this.createDefaultSettings();

    // Apply user settings or default settings.
    this.merge(this, POSTSTOC_SETTINGS, defaultSettings);

    // Backward compatibility.
    this.backwardCompatibility(POSTSTOC_SETTINGS, this);

    // Set date time formatter.
    this.published.format = new garafu.i18n.DateTimeFormat(this.published.format, this.locale);
    this.updated.format = new garafu.i18n.DateTimeFormat(this.updated.format, this.locale);
    this.newPost.term = new Date((new Date()).getTime() - this.newPost.term * 86400000)
};




// --------------------------------------------------------------------------------
//  method
// --------------------------------------------------------------------------------

/**
* Create default settings object.
*
* @private
* @return   {object}    Default settings object.
*/
garafu.blogger.toc.Settings.prototype.createDefaultSettings = function () {
    return {
        blogURL: 'garafu.blogspot.jp',
        maxResults: Infinity,
        sort: {
            key: 'published',
            order: 'default'
        },
        printby: 'label',
        locale: 'ja-jp',
        newPost: {
            enabled: false,
            symbol: 'NEW !',
            term: 30,
            target: 'published'
        },
        thumbnail: {
            enabled: false,
            noImageURL: 'http://garafu.github.io/blogger.toc/release/0.0.5/noimage.png'
        },
        published: {
            enabled: false,
            format: 'yyyy/MM/dd HH:mm:ss'
        },
        updated: {
            enabled: false,
            format: 'yyyy/MM/dd HH:mm:ss'
        }
    };
};




/**
* Get the value which specified by user or default.
*
* @private
* @param    {object}    specifiedValue      Value specified by user.
* @param    {object}    defaultValue        Default value.
* @return   {object}    Value which specified by user or default.
*/
garafu.blogger.toc.Settings.prototype.getValueOrDefault = function (specifiedValue, defaultValue) {
    if (undefined !== specifiedValue) {
        return specifiedValue;
    } else {
        return defaultValue;
    }
};




/**
* Merge user settings and default settings.
*
* @private
* @param    {object}    Settings object which is merged user settings and default settings.
* @param    {object}    Specified value by user.
* @param    {object}    Default value.
*/
garafu.blogger.toc.Settings.prototype.merge = function (settings, userSettings, defaultSettings) {
    var key;

    userSettings = userSettings || {};

    for (key in defaultSettings) {
        if (typeof (defaultSettings[key]) === 'object') {
            settings[key] = settings[key] || {};
            this.merge(settings[key], userSettings[key], defaultSettings[key]);
        } else {
            settings[key] = this.getValueOrDefault(userSettings[key], defaultSettings[key]);
        }
    }
};




/**
* To be backward compatibility.
*
* @private
* @param    {object}    userSettings    User settings.
* @param    {object}    settings        Settings object.
*/
garafu.blogger.toc.Settings.prototype.backwardCompatibility = function (userSettings, settings) {
    // v0.0.6 -> current
    settings.sort.key = userSettings.orderby || settings.sort.key;
};



