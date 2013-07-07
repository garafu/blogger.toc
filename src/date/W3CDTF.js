goog.provide('garafu.date.W3CDTF');



/**
* W3C-DTFフォーマット文字列を分割するための正規表現
*/
garafu.date.W3CDTF.regexp = new RegExp("^(\\d{4})-?(\\d{2})?-?(\\d{2})?T?(\\d{2})?:?(\\d{2})?:?(\\d{2})?(\\.\\d+)?(\\+|-|Z)?(\\d{2})?:?(\\d{2})?$");




/**
* W3C-DTFフォーマット文字列からDateオブジェクトへ変換します。
* @param {string} text W3C-DTFフォーマット文字列
* @return {Date} Dateオブジェクト
*/
garafu.date.W3CDTF.parse = function (text) {
    var splitted;
    var year, month, day, hour, minute, second, millisecond;
    var date;
    var timezoneOffset, machineTimezoneOffset, dataTimezoneOffset;
    // 正規表現で分割
    splitted = text.match(garafu.date.W3CDTF.regexp);
    // 各値に振り分け
    year = splitted[1];
    month = splitted[2] ? parseInt(splitted[2], 10) - 1 : 0;
    day = splitted[3] ? parseInt(splitted[3], 10) : 1;
    hour = splitted[4] ? parseInt(splitted[4], 10) : 0;
    minute = splitted[5] ? parseInt(splitted[5], 10) : 0;
    second = splitted[6] ? parseInt(splitted[6], 10) : 0;
    millisecond = splitted[7] ? parseFloat(splitted[7]) * 1000 : 0;
    // Dateオブジェクトを生成
    date = new Date(year, month, day, hour, minute, second);
    date.setMilliseconds(millisecond);
    // タイムゾーンの違いを計算（単位は"分"）
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
        // タイムゾーンの違いを吸収する
        date.setTime(date.getTime() - timezoneOffset * 60 * 1000);
    }
    return date;
};

