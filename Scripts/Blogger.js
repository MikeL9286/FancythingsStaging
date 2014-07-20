(function (Blogger, $, undefined) {

    Blogger.posts = {};
    Blogger.postFeed = [];
    Blogger.postFeed.feedType = 'top';

    var postFeedLimit = 20;
    var postFeedMultiple = 4;
    var popularThreads;

    Array.prototype.clear = function () {
        while (this.length > 0) {
            this.pop();
        }
    };

    Blogger.GetPosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=' + postFeedLimit + '&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            async: false,
            processData: "false",
            beforeSend: function (jqXHR, settings) {
                //start timer gif
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error: " + url);
            },
            success: function (data) {
                Blogger.posts = data.items;
            }
        });
    };

    Blogger.GetPopularThreads = function () {
        $.ajax({
            type: "GET",
            url: 'https://disqus.com/api/3.0/threads/listPopular.json?forum=fancythingsblog&interval=90d&limit=' + postFeedLimit + '&api_key=hfBewKMoMzDCj1FeyswsLVmBC5Gi0FvDI3ED6Or1iZueKDKubbvPnh6NolyhGdaX',
            dataType: "json",
            async: false,
            processData: "false",
            beforeSend: function (jqXHR, settings) {
                //start timer gif
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error: " + url);
            },
            success: function (data) {                
                popularThreads = data.response;
                var subset = popularThreads.slice(0, postFeedMultiple);
                AddPopularPosts(subset);
            }
        });
    };

    Blogger.GetPopularPosts = function () {
        Blogger.postFeed.clear();
        Blogger.postFeed.feedType = 'top';

        var subset = popularThreads.slice(0, postFeedMultiple);
        AddPopularPosts(subset);

        var source = $('#post-feed-template').html();
        var template = Handlebars.compile(source);
        var context = { feedPosts: Blogger.postFeed };
        var html = template(context);
        
        $('#post-feed-template').parent().find('li').remove();
        $('#post-feed-template').parent().append(html);
    };

    Blogger.GetRecentPosts = function () {
        Blogger.postFeed.clear();
        Blogger.postFeed.feedType = 'recent';

        Blogger.postFeed = Blogger.posts.slice(0, postFeedMultiple);

        var source = $('#post-feed-template').html();
        var template = Handlebars.compile(source);
        var context = { feedPosts: Blogger.postFeed };
        var html = template(context);

        $('#post-feed-template').parent().find('li').remove();
        $('#post-feed-template').parent().append(html);
    };

    Blogger.ShowMorePosts = function () {
        var postsToAdd;
        var postFeedLength = Blogger.postFeed.length;

        if (Blogger.postFeed.feedType == 'top') {
            var subset = popularThreads.slice(postFeedLength, postFeedLength + postFeedMultiple);
            AddPopularPosts(subset);
            postsToAdd = Blogger.postFeed.slice(postFeedLength, postFeedLength + postFeedMultiple);
        }
        else {
            postsToAdd = Blogger.posts.slice(postFeedLength, postFeedLength + postFeedMultiple);
        }

        var source = $('#post-feed-template').html();
        var template = Handlebars.compile(source);
        var context = { feedPosts: postsToAdd };
        var html = template(context);

        $('#post-feed-template').parent().append(html);
    };

    function GetPostByTitle(postTitle) {
        var post;
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts/search?q=' + postTitle + '&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            async: false,
            processData: "false",
            beforeSend: function (jqXHR, settings) {
                //start timer gif
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error: " + url);
            },
            success: function (data) {
                post = data;
            }
        });
        return post;
    };

    function AddPopularPosts(popularThreads) {
        popularThreads.forEach(function (thread) {
            var postTitle = thread.clean_title.split(': ')[1];
            var post = GetPostByTitle(postTitle).items[0];
            Blogger.postFeed.push(post);
        });
    };

}(window.Blogger = window.Blogger || {}, jQuery))