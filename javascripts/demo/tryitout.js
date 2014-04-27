// Set blogger.toc stylesheet.
var stylesheet = (garafu && garafu.QueryString['printstyle']) || 'simple';
document.write('<link rel="stylesheet" type="text/css" href="../release/latest/' + stylesheet + '.css" />');

// Set blogger.toc options.
var POSTSTOC_SETTINGS = {
    blogURL: (garafu && garafu.QueryString['blogurl']) || 'garafu.blogspot.jp',
    orderby: (garafu && garafu.QueryString['sortorder']) || 'published',
    printby: (garafu && garafu.QueryString['printtype']) || 'title'
};