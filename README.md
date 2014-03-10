hb-pagination
=============

Paginated Reddit json data, using handlebars templates.

Adjust the options in `main.js` as necessary:
    var opts = {
        pageMax: 5,                             // number of posts per page
        postsDiv: $('#posts'),                  // post container
        dataUrl: "http://www.reddit.com/.json"  // data source; if different data, adjust the post template to match
    }
