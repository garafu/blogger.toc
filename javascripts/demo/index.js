var GENERATE_VERSION = 'latest';
var DEFAULT_BLOG_URL = 'garafu.blogspot.jp';
var DEFAULT_NOIMAGE_URL = 'http://garafu.github.io/blogger.toc/release/' + GENERATE_VERSION + '/noimage.png';
var DEFAULT_DATETIME_FORMAT = 'yyyy/MM/dd HH:mm:ss';
var DEFAULT_NEWPOST_SYMBOL = 'NEW !';
var DEFAULT_NEWPOST_TERM = '30';


var createSettings = function () {
    return {
        blogURL: $('#blogurl').val(),
        sort: {
            key: $('#sortkey').val(),
            order: $('#sortorder').val()
        },
        printby: $('#printtype').val(),
        thumbnail: $('#thumbnail-enabled').prop('checked') ? {
            enabled: true,
            noImageURL: $('#thumbnail-noimageurl').val()
        } : undefined,
        published: $('#published-enabled').prop('checked') ? {
            enabled: true,
            format: $('#published-format').val()
        } : undefined,
        updated: $('#updated-enabled').prop('checked') ? {
            enabled: true,
            format: $('#updated-format').val()
        } : undefined,
        newPost: $('#newpost-enabled').prop('checked') ? {
            enabled: true,
            symbol: $('#newpost-symbol').val(),
            term: parseInt($('#newpost-term').val()),
            target: $('#newpost-target').val()
        } : undefined
    };
};


var createTryItOutURL = function () {
    var url = '';
    var settings = createSettings();

    url += './tryitout.html?';
    url += 'printstyle=' + $('#printstyle').val() + '&';
    url += 'settings=' + encodeURIComponent(JSON.stringify(settings));

    return encodeURI(url);;
};


var generateSourceCode = function () {
    var code = '';
    var settings = createSettings();

    // Create option.
    code += '&lt;script type="text/javascript"&gt;\r\n';
    code += 'var POSTSTOC_SETTINGS = '
    code += JSON.stringify(settings);
    code += '\r\n';
    code += '&lt;/script&gt;\r\n';

    // Create stylesheet link.
    code += '&lt;link rel="stylesheet" type="text/css" href="//garafu.github.io/blogger.toc/release/' + GENERATE_VERSION + '/' + $('#printstyle').val() + '.css" /&gt;\r\n';

    // Create core link.
    code += '&lt;script type="text/javascript" src="//garafu.github.io/blogger.toc/release/' + GENERATE_VERSION + '/blogger.toc.min.js"&gt;&lt;/script&gt;';

    return code;
};


var document_ready = function (event) {
    // Set default value.
    $('#blogurl').val(DEFAULT_BLOG_URL);
    $('#thumbnail-noimageurl').val(DEFAULT_NOIMAGE_URL);
    $('#published-format').val(DEFAULT_DATETIME_FORMAT);
    $('#updated-format').val(DEFAULT_DATETIME_FORMAT);

    // Attache event handlers.
    $('#blogurl').on(
        'focus', { placeholder: DEFAULT_BLOG_URL }, textbox_onfocus
    ).on(
        'blur', { placeholder: DEFAULT_BLOG_URL }, textbox_onblur
    );
    $('#thumbnail-enabled').on('change', { target: '#thumbnailopt' }, checkbox_onchange);
    $('#thumbnail-noimageurl').on(
        'focus', { placeholder: DEFAULT_NOIMAGE_URL }, textbox_onfocus
    ).on(
        'blur', { placeholder: DEFAULT_NOIMAGE_URL }, textbox_onblur
    );
    $('#published-enabled').on('change', { target: '#published' }, checkbox_onchange);
    $('#published-format').on(
        'focus', { placeholder: DEFAULT_DATETIME_FORMAT }, textbox_onfocus
    ).on(
        'blur', { placeholder: DEFAULT_DATETIME_FORMAT }, textbox_onblur
    );
    $('#updated-enabled').on('change', { target: '#updated' }, checkbox_onchange);
    $('#updated-format').on(
        'focus', { placeholder: DEFAULT_DATETIME_FORMAT }, textbox_onfocus
    ).on(
        'blur', { placeholder: DEFAULT_DATETIME_FORMAT }, textbox_onblur
    );
    $('#newpost-enabled').on('change', { target: '#newpost' }, checkbox_onchange);
    $('#newpost-symbol').on(
        'focus', { placeholder: DEFAULT_NEWPOST_SYMBOL }, textbox_onfocus
    ).on(
        'blur', { placeholder: DEFAULT_NEWPOST_SYMBOL }, textbox_onblur
    );
    $('#newpost-term').on(
        'focus', { placeholder: DEFAULT_NEWPOST_TERM }, textbox_onfocus
    ).on(
        'blur', { placeholder: DEFAULT_NEWPOST_TERM }, textbox_onblur
    );
    $('#opnbtn').on('click', openbutton_onclick);
    $('#code').on('click', code_onclick);
};


var textbox_onfocus = function (event) {
    var placeholder = event.data.placeholder;
    var val = $(this).val();
    if (val === placeholder) {
        $(this).val('');
    } else {
        $(this).select();
    }
};


var textbox_onblur = function (event) {
    var placeholder = event.data.placeholder;
    if ($(this).val()) {
        return;
    }
    $(this).val(placeholder);
};


var checkbox_onchange = function (event) {
    var target = event.data.target;

    $(target).toggle();
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