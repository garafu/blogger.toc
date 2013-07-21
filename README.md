Blogger Table of Contents (blogger.toc)
==================================================

Automatic creater for Blogger table of contents(TOC).
This script creates TOC of your blogger using feed data.


Demo
--------------------------

[Try it out !!](http://garafu.github.io/blogger.toc/demo/index.html)


Usage
--------------------------

Load "blogger.toc.min.js" on Blogger page like following.
User setting should be placed before the concreate script file.

    <script type="text/javascript">
    // User Setting.
    var POSTSTOC_SETTINGS = {
        blogURL: 'garafu.blogspot.jp',  // Set your blog url.
        maxResults: 500,                // Set max recieve data.
        orderby: 'updated',             // Set enum ['title', 'published', 'updated'].
        printby: 'title'                // Set enum ['title', 'label']
    };
    </script>
    <script type="text/javascript" src=".\lib\blogger.toc.min.js"></script>


License
--------------------------
blogger.toc plugin released under the MIT license.  
Please see [MIT-LICENSE.txt](https://github.com/garafu/blogger.toc/blob/master/MIT-LICENSE.txt) for details.
