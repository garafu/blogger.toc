/********************************************************************************
*
*         DateTimeFormat class
*
*   description : 
*********************************************************************************/
goog.provide('garafu.i18n.DateTimeFormat');

goog.require('garafu.i18n.DateTimeSymbols');
goog.require('garafu.string');



// -------------------------------------------------------------------------------------------------
//      constructor
// -------------------------------------------------------------------------------------------------


/**
* Initialize a new instance of the DateFormat class.
*
* @public
* @constructor
* @param    {string|garafu.i18n.DateTimeFormat.Format}   pattern The format pattern.
* @param    {string}    locale  Locale string.
*
* @class    This class provide internationalize the Date format function.
* <pre>
* Symbol  Meaning                                                                                       Example
* ------  ------                                                                                        ------
* d       The day of the month. Single-digit days do not have a leading zero.                            3
* dd      The day of the month. Single-digit days have a leading zero.                                  03
* E       The abbreviated name of the day of the week, as defined in "DateTimeSymbols.SHORTWEEKDAYS".   Tue  
* EE      The full name of the day of the week, as defined in "DateTimeSymbols.WEEKDAYS".               Tuesday
* G       The period or era.                                                                            AD
* h       The hour in a 12-hour clock. Single-digit hours do not have a leading zero.                    5
* hh      The hour in a 12-hour clock. Single-digit hours have a leading zero.                          05
* H       The hour in a 24-hour clock. Single-digit hours do not have a leading zero.                    8
* HH      The hour in a 24-hour clock. Single-digit hours have a leading zero.                          08
* m       The minute. Single-digit minuites do not have a leading zero.                                  2
* mm      The minute. Single-digit minuites have a leading zero.                                        02
* M       The numeric month.                                                                            6
* MM      The numeric month. Single-digit months have a leading zero.                                   06
* MMM     The abbreviated name of the month, as defined in "DateTimeSymbols.SHORTMONTH"                 Jun
* MMMM    The full name of the month, as defined in "DateTimeSymbols.MONTHS"                            June
* s       The second. Single-digit months do not have a leading zero.                                   6
* ss      The second. Single-digit minuites have a leading zero.                                        06
* t       The first character in the AM/PM designator, as defined in "DateTimeSymbols.AMPMS"            AM
* yy      The year without the century.                                                                 98
* yyyy    The year in four digits, including the century.                                               1998
* z       The time zone offset. Single-digit hours do not have a leading zero.                          -8
* zz      The time zone offset. Single-digit hours have a leading zero.                                 -08
* zzz     The full time zone offset. Single-digit hours and minutes have leading zeros.                 -08:00
* </pre>
* @property {string}    pattern         Date format pattern string.
* @property {string[]}  patternParts    Separated pattern string.
* @property {string}    locale          Locale string.
*/
garafu.i18n.DateTimeFormat = function (pattern, locale) {
    this.symbols = new garafu.i18n.DateTimeSymbols(locale);

    if (typeof pattern === 'number') {
        pattern = this.getStandardPattern(pattern);
    }

    this.pattern = pattern;
    this.patternParts = [];
    this.locale = locale;

    this.initialize();
};


// -------------------------------------------------------------------------------------------------
//      enum
// -------------------------------------------------------------------------------------------------

/**
* Enum to identify predefined Date/Time format pattern.
* <ul>
*     <li>FULL_DATE</li>
*     <li>LONG_DATE</li>
*     <li>MEDIUM_DATE</li>
*     <li>SHORT_DATE</li>
*     <li>FULL_TIME</li>
*     <li>LONG_TIME</li>
*     <li>MEDIUM_TIME</li>
*     <li>SHORT_TIME</li>
*     <li>FULL_DATETIME</li>
*     <li>LONG_DATETIME</li>
*     <li>MEDIUM_DATETIME</li>
*     <li>SHORT_DATETIME</li>
* </ul>
*
* @public
* @constant
* @type     enum
* @see  garafu.i18n.DateTimeSymbols
*/
garafu.i18n.DateTimeFormat.Format = {
    FULL_DATE: 0,
    LONG_DATE: 1,
    MEDIUM_DATE: 2,
    SHORT_DATE: 3,
    FULL_TIME: 4,
    LONG_TIME: 5,
    MEDIUM_TIME: 6,
    SHORT_TIME: 7,
    FULL_DATETIME: 8,
    LONG_DATETIME: 9,
    MEDIUM_DATETIME: 10,
    SHORT_DATETIME: 11
};



/**
* Enum of field type.
* <ul>
*     <li>LITERAL</li>
*     <li>FIELD</li>
* </ul>
*
* @private
* @constant
* @type     enum
*/
garafu.i18n.DateTimeFormat.PatternType = {
    LITERAL: 0,
    FIELD: 1
};


// -------------------------------------------------------------------------------------------------
//      methods
// -------------------------------------------------------------------------------------------------

/**
* Format the given date object according to preset pattern and current locale.
*
* @public
* @param    {Date}      date    The Date object that is being formatted.
* @return   {string}            Formatted string for the given date.
*/
garafu.i18n.DateTimeFormat.prototype.format = function (date) {
    var patternParts = this.patternParts;
    var i, max;
    var text;
    var out = [];

    for (i = 0, max = patternParts.length; i < max; i++) {
        text = patternParts[i].text;
        if (garafu.i18n.DateTimeFormat.PatternType.FIELD === patternParts[i].type) {
            out.push(this.formatField(text, date));
        } else {
            out.push(text);
        }
    }

    return out.join('');
};


/**
* 
* @private
* @param    {garafu.i18n.DateTimeFormat.Format}  patternType     Enum of defined pattern.
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.getStandardPattern = function (formatType) {
    var pattern = '';

    if (formatType < 4) {
        pattern += this.symbols.DATEFORMATS[formatType];
    } else if (formatType < 8) {
        pattern += this.symbols.TIMEFORMATS[formatType - 4];
    } else {
        pattern += this.symbols.DATEFORMATS[formatType - 8];
        pattern += ' ';
        pattern += this.symbols.TIMEFORMATS[formatType - 8];
    }

    return pattern;
};


/**
* Initialize this instance. Create and set formatt pattern string array.
*
* @private
*/
garafu.i18n.DateTimeFormat.prototype.initialize = function () {
    var parts = this.breakDownPattern(this.pattern);

    this.patternParts = parts;
};


/**
* Break down formatt pattern string to convertable format.
*
* @private
* @param    {string}    pattern     Format pattern string.
* @return   {string[]}  String that has been splitted.
*/
garafu.i18n.DateTimeFormat.prototype.breakDownPattern = function (pattern) {
    var tokens = [
        new RegExp('^[^\\\'GyMdHhtmsEz]+'),
        new RegExp('^(?:G+|y+|M+|d+|H+|h+|t+|m+|s+|E+|z+)')
    ];
    var parts = [];
    var part, m, i;

    while (pattern) {
        for (i = tokens.length; i--;) {
            m = pattern.match(tokens[i]);
            if (m) {
                part = m[0];
                pattern = pattern.substring(part.length);
                parts.push({ text: part, type: i });
                break;
            }
        }
    }

    return parts;
};




/**
* Format Era field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatEra = function (count, date) {
    var value = date.getFullYear() > 0 ? 1 : 0;
    return this.symbols.ERAS[value];
};




/**
* Format Year field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatYear = function (count, date) {
    var value = date.getFullYear();
    if (value < 0) {
        value = -value;
    }
    return count === 2 ? garafu.string.paddingNumber(value % 100, 2) : String(value);
};




/**
* Format Month field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatMonth = function (count, date) {
    var value = date.getMonth();
    switch (count) {
        case 3:
            return this.symbols.SHORTMONTH[value];
        case 4:
            return this.symbols.MONTHS[value];
        default:
            return garafu.string.paddingNumber(value + 1, count);
    }
};




/**
* Format Date field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatDate = function (count, date) {
    return garafu.string.paddingNumber(date.getDate(), count);
};




/**
* Formats (0..23) hours field according pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.format24Hours = function (count, date) {
    return garafu.string.paddingNumber(date.getHours(), count);
};




/**
* Formats (0..11) hours field according pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.format12Hours = function (count, date) {
    return garafu.string.paddingNumber(date.getHours() % 12, count);
};




/**
* Formats Am/Pm field according pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatAmPm = function (count, date) {
    var hours = date.getHours();
    return this.symbols.AMPMS[hours >= 12 && hours < 24 ? 1 : 0];
};




/**
* Formats Minutes field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatMinutes = function (count, date) {
    return garafu.string.paddingNumber(date.getMinutes(), count);
};



/**
* Formats Seconds field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatSeconds = function (count, date) {
    return garafu.string.paddingNumber(date.getSeconds(), count);
};




/**
* Formats Day of week field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatDayOfWeek = function (count, date) {
    var value = date.getDay();
    return count >= 4 ? this.symbols.WEEKDAYS[value] : this.symbols.SHORTWEEKDAYS[value];
};




/**
* Formats Timezone field according to pattern specified.
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatTimeZone = function (count, date) {
    var value = date.getTimezoneOffset() / 60;
    return value < 0 ? value : '+' + value;
};




/**
* 
*
* @private
* @return   {string}
*/
garafu.i18n.DateTimeFormat.prototype.formatField = function (pattern, date) {
    var count = pattern.length;
    switch (pattern.charAt(0)) {
        case 'G':
            return this.formatEra(count, date);
        case 'y':
            return this.formatYear(count, date);
        case 'M':
            return this.formatMonth(count, date);
        case 'd':
            return this.formatDate(count, date);
        case 'H':
            return this.format24Hours(count, date);
        case 'h':
            return this.format12Hours(count, date);
        case 't':
            return this.formatAmPm(count, date);
        case 'm':
            return this.formatMinutes(count, date);
        case 's':
            return this.formatSeconds(count, date);
        case 'E':
            return this.formatDayOfWeek(count, date);
        case 'z':
            return this.formatTimeZone(count, date);
        default:
            return '';
    }
};
