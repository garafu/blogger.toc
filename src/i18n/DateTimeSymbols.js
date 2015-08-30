/********************************************************************************
*
*         DateTimeSymbols class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.i18n.DateTimeSymbols');




/**
* Initialize a new instance of the DateTimeSymbols class.
*
* @constructor
* @param    {string}    locale  Locale string.
*
* @class    Containes and provide Date symbols.
*/
garafu.i18n.DateTimeSymbols = function (locale) {
    var symbols = null;

    switch (locale) {
        case 'en-us':
            symbols = garafu.i18n.DateTimeSymbols.en_us;
            break;
        case 'ja-jp':
            symbols = garafu.i18n.DateTimeSymbols.ja_jp;
            break;
        default:
            symbols = garafu.i18n.DateTimeSymbols.en_us;
    }

    return symbols;
};


/**
* Date/time formatting symbols for locale "en-us".
*/
garafu.i18n.DateTimeSymbols.en_us = {
    ERAS: ['BC', 'AD'],
    SHORTMONTH: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    AMPMS: ['AM', 'PM'],
    DATEFORMATS: ['EEEE dd MMMM y', 'dd MMMM y', 'dd MMM y', 'yyyy/MM/dd'],
    TIMEFORMATS: ['h:mm:ss t zzzz', 'h:mm:ss t z', 'h:mm:ss t', 'h:mm t']
};



/**
* Date/time formatting symbols for locale "ja-jp".
*/
garafu.i18n.DateTimeSymbols.ja_jp = {
    ERAS: ['紀元前', '西暦'],
    SHORTMONTH: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    MONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    SHORTWEEKDAYS: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    WEEKDAYS: ['日', '月', '火', '水', '木', '金', '土'],
    AMPMS: ['午前', '午後'],
    DATEFORMATS: ['y年M月d日(EEEE)', 'y年M月d日', 'yyyy/MM/dd', 'yy/MM/dd'],
    TIMEFORMATS: ['H時mm分ss秒 zzzz', 'H:mm:ss z', 'H:mm:ss', 'H:mm']
};


