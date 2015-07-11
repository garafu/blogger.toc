// Set blogger.toc stylesheet.
var stylesheet = (garafu && garafu.QueryString['printstyle']) || 'simple';
document.write('<link rel="stylesheet" type="text/css" href="../release/latest/' + stylesheet + '.css" />');

// Set blogger.toc options.
var settings = garafu.QueryString['settings'] || '';
var POSTSTOC_SETTINGS = JSON.parse(decodeURIComponent(settings));
