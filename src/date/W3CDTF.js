goog.provide('garafu.date.W3CDTF');




/**
* Regular expression for dividing W3C-DTF string.
*
* @private
* @type {RegExp}
*/
garafu.date.W3CDTF.regexp = new RegExp("^(\\d{4})-?(\\d{2})?-?(\\d{2})?T?(\\d{2})?:?(\\d{2})?:?(\\d{2})?(\\.\\d+)?(\\+|-|Z)?(\\d{2})?:?(\\d{2})?$");




/**
* Convert W3C-DTF string to Date object.
*
* @param    {string}    text    W3C-DTF string.
* @return   {Date}      Date object.
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

