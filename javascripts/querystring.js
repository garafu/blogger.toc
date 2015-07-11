var garafu = garafu || {};


garafu.QueryString = (function () {
    var queryString, queryItems, queryItem,
    i, length, matchs, key, pkey, skey, value, list, hash, params = {};

    // Get query string.
    queryString = window.location.search || '';
    queryString = queryString.substr(1, queryString.length);

    // Split to parameters.
    queryItems = queryString.split('&');

    // Split to tupples.
    for (i = 0, length = queryItems.length; i < length; i++) {
        // Pick up a tupple.
        queryItem = (queryItems[i] || '').split('=');

        // Split to key value pair.
        key = queryItem[0];
        value = queryItem[1] ? window.decodeURIComponent(queryItem[1]) : undefined;

        // Create object according to the key string.
        matchs = (/([\w$]*)\[([\w$]*)\]/g).exec(key);
        if (matchs === null) {
            // Simple key value.
            params[key] = value;
        } else {
            pkey = matchs[1];
            skey = matchs[2];
            if (!skey) {
                // Set item in to the array item.
                list = params[pkey] = params[pkey] || [];
                list[list.length] = value;
            } else {
                // Set item in to the hash map.
                hash = params[pkey] = params[pkey] || {};
                hash[skey] = value;
            }
        }
    }

    return params;
})();