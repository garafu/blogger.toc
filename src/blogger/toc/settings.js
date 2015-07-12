goog.provide('garafu.blogger.toc.Settings');




// --------------------------------------------------------------------------------
//  garafu.blogger.toc.Settings class
// --------------------------------------------------------------------------------
/**
* @class
* @putlic
* @constructor
*/
garafu.blogger.toc.Settings = function () {

    // Set default settings.
    var defaultSettings = {
        blogURL: 'garafu.blogspot.jp',
        maxResults: Infinity,
        orderby: 'published',
        printby: 'label',
        thumbnail: {
            enabled: false,
            noImageURL: 'http://garafu.github.io/blogger.toc/release/0.0.5/noimage.png'
        }
    };

    // Apply user settings or default settings.
    this.merge(this, POSTSTOC_SETTINGS, defaultSettings);
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




