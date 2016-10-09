/********************************************************************************
*
*         contracts
*
*   description : This file includes contracts object.
*********************************************************************************/

/**
* Data contract.
*/
var contract = {
    encoding: '',
    version: '',
    feed: {
        author: [{
            email: {
                $t: ''
            },
            gd$image: {
                height: 0,
                rel: '',
                src: '',
                width: 0
            },
            name: {
                $t: ''
            },
            uri: {
                $t: ''
            }
        }],
        category: [{
            term: ''
        }],
        entry: [{
            author: [{
                email: {
                    $t: ''
                },
                gd$image: {
                    height: 0,
                    rel: '',
                    src: '',
                    width: 0
                },
                name: {
                    $t: ''
                },
                uri: {
                    $t: ''
                }
            }],
            category: [{
                scheme: '',
                term: ''
            }],
            summary: {
                $t: '',
                type: ''
            },
            content: {
                $t: '',
                type: ''
            },
            id: {
                $t: ''
            },
            link: [{
                href: '',
                rel: '',
                title: '',
                type: ''
            }],
            media$thumbnail: {
                height: 0,
                url: '',
                width: 0,
                xmlns$media: ''
            },
            published: {
                $t: ''
            },
            thr$total: {
                $t: ''
            },
            title: {
                $t: '',
                type: ''
            },
            updated: {
                $t: ''
            }
        }],
        generator: {
            $t: '',
            uri: '',
            version: ''
        },
        id: {
            $t: ''
        },
        link: [{
            href: '',
            rel: '',
            type: ''
        }],
        openSearch$itemsPerPage: {
            $t: ''
        },
        openSearch$startIndex: {
            $t: ''
        },
        openSearch$totalResults: {
            $t: ''
        },
        subtitle: {
            $t: '',
            type: ''
        },
        title: {
            $t: '',
            type: ''
        },
        updated: {
            $t: ''
        },
        xmlns: '',
        xmlns$blogger: '',
        xmlns$gd: '',
        xmlns$georss: '',
        xmlns$openSearch: '',
        xmlns$thr: ''
    }
};




/**
* Settings contract.
*/
var POSTSTOC_SETTINGS = {
    blogURL: '',
    keyword: '',
    maxResults: Infinity,
    sort: {
        key: '',
        order: ''
    },
    orderby: '',    // [obsolete] Reccomend to use "sort" option.
    printby: '',
    locale: '',
    newPost: {
        enabled: false,
        symbol: '',
        term: 0,
        target: ''
    },
    thumbnail: {
        enabled: false,
        noImageURL: ''
    },
    published: {
        enabled: false,
        format: ''
    },
    updated: {
        enabled: false,
        format: ''
    }
};