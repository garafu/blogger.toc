var garafu = garafu || {};


garafu.QueryString = function () {
    var locationSearch = document.location.search;
    var result = {};
    var query, parameters, i, item, key, val;
    
    if (locationSearch.length < 2) {
        garafu.QueryString = null;
    }
    
    query = locationSearch.substring(1);
    
    parameters = query.split('&');
    
    for (i = parameters.length; i--;) {
        item = parameters[i].split('=');
        
        key = decodeURIComponent(item[0]);
        val = decodeURIComponent(item[1]);
        
        result[key] = val;
    }
    
    garafu.QueryString = result;
};


garafu.QueryString();
