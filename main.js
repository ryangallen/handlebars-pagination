$(function(){
    var opts = {
        pageMax: 5,
        postsDiv: $('#posts'),
        dataUrl: "http://www.reddit.com/.json"
    }

    function range(i){return i?range(i-1).concat(i):[]}

    function loadPosts(posts){
        opts.postsDiv.empty();
        posts.each(function(){
            var source = $("#post-template").html();
            var template = Handlebars.compile(source);
            var context = {
                author: this.data.author, 
                domain: this.data.domain,
                id: this.data.id,
                ups: this.data.ups,
                downs: this.data.downs,
                num_comments: this.data.num_comments,
                subreddit: this.data.subreddit,
                title: this.data.title,
                url: this.data.url,
                permalink: this.data.permalink,
            };
            var html = template(context);
            opts.postsDiv.append(html);
        });
    }

    function paginate(pageCount){
        var source = $("#pagination-template").html();
        var template = Handlebars.compile(source);
        var context = {pages: range(pageCount)};
        var html = template(context);
        opts.postsDiv.before(html).after(html);

        function changePage(pageNumber){
            pageItems.removeClass('active');
            pageItems.filter('[data-page="' + pageNumber + '"]').addClass('active');
            loadPosts(data.slice(pageNumber * opts.pageMax - opts.pageMax, pageNumber * opts.pageMax));
        }

        var pageItems = $('.pagination>li.pagination-page');

        pageItems.on('click', function(){
            changePage(this.getAttribute('data-page'));
        }).filter('[data-page="1"]').addClass('active');

        $('.pagination>li.pagination-prev').on('click', function(){
            gotoPageNumber = parseInt($('.pagination>li.active').attr('data-page')) - 1;
            if (gotoPageNumber <= 0){gotoPageNumber = pageCount;}
            changePage(gotoPageNumber);
        });

        $('.pagination>li.pagination-next').on('click', function(){
            gotoPageNumber = parseInt($('.pagination>li.active').attr('data-page')) + 1;
            if (gotoPageNumber > pageCount){gotoPageNumber = 1;}
            changePage(gotoPageNumber);
        });
    }

    $.ajax({
        dataType: 'json',
        url: opts.dataUrl,
        success: function(response_json){
                    data = $(response_json.data.children);
                    dataCount = data.length;

                    pageCount = Math.ceil(dataCount/opts.pageMax);

                    if (dataCount > opts.pageMax){
                        paginate(pageCount);
                        posts = data.slice(0, opts.pageMax);
                    } else {
                        posts = data;
                    }
                    loadPosts(posts);
                }
    });
});