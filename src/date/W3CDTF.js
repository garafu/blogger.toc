/********************************************************************************
*
*         W3CDTF class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.date.W3CDTF');

goog.require('garafu.string');




// --------------------------------------------------------------------------------
//  static property
// --------------------------------------------------------------------------------

/**
* Regular expression for dividing W3C-DTF string.
*
* @private
* @type {RegExp}
*/
garafu.date.W3CDTF.regexp = /^(\d{4})-?(\d{2})?-?(\d{2})?T?(\d{2})?:?(\d{2})?:?(\d{2})?(\.\d+)?(\+|-|Z)?(\d{2})?:?(\d{2})?$/;




/**
* W3CDTF format type enumeration.
*
* @public
*/
garafu.date.W3CDTF.FormatType = {
    YYYY: 1,
    YYYYMM: 2,
    YYYYMMDD: 3,
    YYYYMMDD_hhmmTZD: 4,
    YYYYMMDD_hhmmssTZD: 5,
    YYYYMMDD_hhmmsssTZD: 6
};




// --------------------------------------------------------------------------------
//  static method
// --------------------------------------------------------------------------------

/**
* Convert W3C-DTF string to Date object.
*
* @public
* @static
* @param    {string}    text    W3C-DTF string.
* @return   {Date}              Date object.
*/
garafu.date.W3CDTF.parse = function (text) {
    var splitted;
    var year, month, day, hour, minute, second, millisecond;
    var date;
    var timezoneOffset, machineTimezoneOffset, dataTimezoneOffset;
    
    // Split string using regular expression.
    splitted = text.match(garafu.date.W3CDTF.regexp);
    year = splitted[1];
    month = splitted[2] ? parseInt(splitted[2], 10) - 1 : 0;
    day = splitted[3] ? parseInt(splitted[3], 10) : 1;
    hour = splitted[4] ? parseInt(splitted[4], 10) : 0;
    minute = splitted[5] ? parseInt(splitted[5], 10) : 0;
    second = splitted[6] ? parseInt(splitted[6], 10) : 0;
    millisecond = splitted[7] ? parseFloat(splitted[7]) * 1000 : 0;
    
    // Create Date object.
    date = new Date(year, month, day, hour, minute, second);
    date.setMilliseconds(millisecond);
    
    // Calculate timezone.（unit is miunites）
    machineTimezoneOffset = date.getTimezoneOffset();
    if (splitted[8]) {
        switch (splitted[8]) {
            case '+':
                dataTimezoneOffset = -(parseInt(splitted[9], 10) * 60 + parseInt(splitted[10], 10));
                break;
            case '-':
                dataTimezoneOffset = parseInt(splitted[9], 10) * 60 + parseInt(splitted[10], 10);
                break;
            case 'Z':
                dataTimezoneOffset = 0;
                break;
        }
        timezoneOffset = machineTimezoneOffset - dataTimezoneOffset;
        date.setTime(date.getTime() - timezoneOffset * 60 * 1000);
    }
    
    return date;
};




/**
* Parse to string from Date object.
*
* @public
* @static
* @param    {Date}    date      Date object.
* @return   {string}            W3C-DTF format string.
*/
garafu.date.W3CDTF.stringify = function (date, formatType) {
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hour = date.getUTCHours();
    var minute = date.getUTCMinutes();
    var second = date.getUTCSeconds();
    var millisecond = Math.round(date.getUTCMilliseconds() / 100.0);
    var text = '';

    // Concat string to the W3C-DTF type of YYYY-MM-DDThh:mm:ss.sTZD.
    switch (formatType) {
        case garafu.date.W3CDTF.FormatType.YYYY:
            text += year;
            break;
        case garafu.date.W3CDTF.FormatType.YYYYMM:
            text += year;
            text += '-';
            text += garafu.string.paddingNumber(month, 2);
            break;
        case garafu.date.W3CDTF.FormatType.YYYYMMDD:
            text += year;
            text += '-';
            text += garafu.string.paddingNumber(month, 2);
            text += '-';
            text += garafu.string.paddingNumber(day, 2);
            break;
        case garafu.date.W3CDTF.FormatType.YYYYMMDD_hhmmTZD:
            text += year;
            text += '-';
            text += garafu.string.paddingNumber(month, 2);
            text += '-';
            text += garafu.string.paddingNumber(day, 2);
            text += 'T';
            text += garafu.string.paddingNumber(hour, 2);
            text += ':';
            text += garafu.string.paddingNumber(minute, 2);
            text += 'Z';
            break;
        case garafu.date.W3CDTF.FormatType.YYYYMMDD_hhmmssTZD:
            text += year;
            text += '-';
            text += garafu.string.paddingNumber(month, 2);
            text += '-';
            text += garafu.string.paddingNumber(day, 2);
            text += 'T';
            text += garafu.string.paddingNumber(hour, 2);
            text += ':';
            text += garafu.string.paddingNumber(minute, 2);
            text += ':';
            text += garafu.string.paddingNumber(second, 2);
            text += 'Z';
            break;
        default:
            text += year;
            text += '-';
            text += garafu.string.paddingNumber(month, 2);
            text += '-';
            text += garafu.string.paddingNumber(day, 2);
            text += 'T';
            text += garafu.string.paddingNumber(hour, 2);
            text += ':';
            text += garafu.string.paddingNumber(minute, 2);
            text += ':';
            text += garafu.string.paddingNumber(second, 2);
            text += '.';
            text += millisecond;
            text += 'Z'; // timezone;
            break;
    }

    return text;
};
