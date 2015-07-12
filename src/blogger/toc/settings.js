goog.provide('garafu.blogger.toc.Settings');

goog.require('garafu.i18n.DateTimeFormat');




// --------------------------------------------------------------------------------
//  garafu.blogger.toc.Settings class
// --------------------------------------------------------------------------------
/**
* @class
* @putlic
* @constructor
*/
garafu.blogger.toc.Settings = function () {
    var defaultSettings;

    // Set default settings.
    defaultSettings = {
        blogURL: 'garafu.blogspot.jp',
        maxResults: Infinity,
        orderby: 'published',
        printby: 'label',
        locale: 'ja-jp',
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

    // Apply user settings or default settings.
    this.merge(this, POSTSTOC_SETTINGS, defaultSettings);

    // Set date time formatter.
    this.published.format = new garafu.i18n.DateTimeFormat(this.published.format, this.locale);
    this.updated.format = new garafu.i18n.DateTimeFormat(this.updated.format, this.locale);
};




/**
* @private
*/
garafu.blogger.toc.Settings.prototype.getValueOrDefault = function (userSetting, defaultSetting) {
    if (undefined !== userSetting) {
        return userSetting;
    } else {
        return defaultSetting;
    }
};




/**
* @private
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




