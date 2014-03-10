hb-pagination
=============

Paginated [Reddit](http://www.reddit.com/) json data, using [handlebars](http://handlebarsjs.com/) templates.

Adjust the options in `main.js` as necessary:

    var opts = {
        pageMax: 5,                             // number of posts per page
        postsDiv: $('#posts'),                  // post container
        dataUrl: "http://www.reddit.com/.json"  // data source; if different data, adjust the post template to match
    }
