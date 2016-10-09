Blogger Table of Contents (blogger.toc)
==================================================

Automatic generater for Blogger table of contents(TOC).
This script creates TOC of your blogger posts using feed data.


Demo
--------------------------

[Try it out !!](//garafu.github.io/blogger.toc/demo/index.html)


Usage
--------------------------

1. Select "Pages" of left menu in the Blogger user page.
2. Select "New page" button.
3. Copy & paste following code into the editing area.
```
<script type="text/javascript">
// User Setting.
var POSTSTOC_SETTINGS = {
    blogURL: 'garafu.blogspot.jp',  // Set your blog domain name.
    sort: {
      key: 'published'              // Set enum ['title', 'published', 'updated'].
    },
    printby: 'title'                // Set enum ['title', 'label']
    thumbnail: {
      enabled: false,               // Whethere draw thumbnail or not.
      noImageURL: ''                // Set image URL which is used when the post has no image.
    },
    published: {
      enabled: false,               // Whether display published datetime or not.
      format: ''                    // Set date time format.
    },
    updated: {
      enabled: false,               // Whether display updated datetime or not.
      format: ''                    // Set date time format.
    }
};
</script>
<script type="text/javascript" src="//garafu.github.io/blogger.toc/release/0.0.7/blogger.toc.min.js"></script>

```
4. Modify user settings.
5. Select "Publish" button.


User Settings
--------------------------

Create `POSTSTOC_SETTINGS` object and sets options, if you want to customize `blogger.toc`.
For details of options are following.

|property|type|description|
|-----|-----|-----|
|`blogURL`|`string`|Your blog domain name.|
|`sort.key`|`enum`|Choose [`title`, `published`, `updated`].|
|`sort.order`|`enum`|Choose [`default`, `asc`, `desc`].|
|`printby`|`enum`|Choose [`title`, `label`, `label.nameorder`, `label.contentsorder`].|
|`thumbnail.enabled`|`boolean`|Whether draw thumbnail or not.|
|`thumbnail.noImageURL`|`string`|Set image URL which is used when the post has no images.|
|`published.enabled`|`boolean`|Whether draw published date time or not.|
|`published.format`|`string`|Set published date time format.|
|`updated.enabled`|`boolean`|Whether draw published date time or not.|
|`updated.format`|`string`|Set published date time format.|


License
--------------------------
blogger.toc plugin released under the MIT license.  
Please see [MIT-LICENSE.txt](//github.com/garafu/blogger.toc/blob/master/MIT-LICENSE.txt) for details.
