goog.provide('garafu.blogger.toc.Settings');




// --------------------------------------------------------------------------------
//  garafu.blogger.toc.Settings class
// --------------------------------------------------------------------------------
/**
* @putlic
* @constructor
* @class
*/
garafu.blogger.toc.Settings = function () {
    var user = window['POSTSTOC_SETTINGS'] || {};
    
    // Default settings.
    this.blogURL = this.getValueOrDefault(user['blogURL'], 'garafu.blogspot.jp');
    this.maxResults = this.getValueOrDefault(user['maxResults'], 500);
    this.style = this.getValueOrDefault(user['style'], '');
    this.orderby = this.getValueOrDefault(user['orderby'], 'published');
    this.printby = this.getValueOrDefault(user['printby'], 'label');
    this.labelListEnabled = this.getValueOrDefault(user['labelListEnabled'], true);
    this.updatedDateEnabled = this.getValueOrDefault(user['updatedDateEnabled'], false);
    this.publishedDateEnabled = this.getValueOrDefault(user['publishedDateEnabled'], true);
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
garafu.blogger.toc.Settings.prototype.merge = function () {
    var userSettings, i, key, value;
    
    // Get user settings from global object.
    userSettings = window['POSTSTOC_SETTINGS'] || {};
    
    // Merge settings.
    for (key in this) {
        if (typeof this[key] !== 'function' &&
            undefined !== userSettings[key]) {
            this[key] = userSettings[key];
        }
    }
};




