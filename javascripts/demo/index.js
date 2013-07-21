var DEFAULT_BLOG_URL = 'garafu.blogspot.jp';
var GENERATE_VERSION = '0.0.1';


var createTryItOutURL = function () {
    var url = '';

    url += './tryitout.html?';
    url += 'blogurl=' + $('#blogurl').val() + '&';
    url += 'sortorder=' + $('#sortorder').val() + '&';
    url += 'printtype=' + $('#printtype').val() + '&';
    url += 'printstyle=' + $('#printstyle').val();

    return encodeURI(url);;
};


var generateSourceCode = function () {
    var code = '';

    // Create option.
    code += '&lt;script type="text/javascript"&gt;\r\n';
    code += 'var POSTSTOC_SETTINGS = {';
    code += ' blogURL: \'' + $('#blogurl').val() + '\',';
    code += ' maxResults: 500,';
    code += ' orderby: \'' + $('#sortorder').val() + '\',';
    code += ' printby: \'' + $('#printtype').val() + '\'';
    code += '};\r\n';
    code += '&lt;/script&gt;\r\n';

    // Create stylesheet link.
    code += '&lt;link rel="stylesheet" type="text/css" href="http://garafu.github.io/blogger.toc/release/' + GENERATE_VERSION + '/' + $('#printstyle').val() + '.css" /&gt;\r\n';

    // Create core link.
    code += '&lt;script type="text/javascript" src="http://garafu.github.io/blogger.toc/release/' + GENERATE_VERSION + '/blogger.toc.min.js"&gt;&lt;/script&gt;';

    return code;
};


var document_ready = function (event) {
    // Set default value.
    $('#blogurl').val(DEFAULT_BLOG_URL);

    // Attache event handlers.
    $('#blogurl').on(
        'focus', blogurltext_onfocus
    ).on(
        'blur', blogurltext_onblur
    );
    $('#opnbtn').on('click', openbutton_onclick);
    $('#code').on('click', code_onclick);
};


var blogurltext_onfocus = function (event) {
    var val = $(this).val();
    if (val === DEFAULT_BLOG_URL) {
        $(this).val('');
    } else {
        $(this).select();
    }
};


var blogurltext_onblur = function (event) {
    if ($(this).val()) {
        return;
    }

    $(this).val(DEFAULT_BLOG_URL);
};


var openbutton_onclick = function (event) {
    var url, code;

    // Open new window.
    url = createTryItOutURL();
    window.open(url, '__garafu.blogger.toc.demo');

    // Generate source code.
    code = generateSourceCode();
    $('#code').html(code);
};


var code_onclick = function (event) {
    $(this).focus().select();
};


$(document).ready(document_ready);