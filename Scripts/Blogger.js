(function (Blogger, $, undefined) {

    Blogger.posts = {};
    Blogger.postFeed = [];
    Blogger.postFeed.feedType = 'top';
    Blogger.relatedPosts = [];

    var postFeedLimit = 9;
    var postFeedMultiple = 9;
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
                SetThumbnails(Blogger.posts);
            }
        });
    };

    Blogger.GetArchivePosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=500&fetchBodies=false&fetchImages=false&fields=items(id%2Cpublished%2Ctitle)&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
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
                console.log(data);
            }
        });
    };

    Blogger.GetSearchedPosts = function (searchKey) {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts/search?q=' + searchKey + '&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
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
                if (data.items != undefined) {
                    Blogger.postFeed = data.items;
                    SetThumbnails(Blogger.postFeed);
                    $('.search-description').prepend('<h4>Top search results for: ' + window.location.href.match('searchKey=(.*)')[1] + '</h4>');
                } else {
                    $('.search-description').prepend('<h4>No results found for: ' + window.location.href.match('searchKey=(.*)')[1] + '</h4>');
                }
            }
        });
    };

    //will only work on blog posts page because it assumes Blogger.posts is an obj, not an array
    Blogger.GetRelatedPosts = function () {
        Blogger.posts.labels.forEach(function (label) {
            $.ajax({
                type: "GET",
                url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts/search?q=' + label + '&fields=items(id%2Cpublished%2Ctitle%2Ccontent)&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
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
                    Blogger.relatedPosts = Blogger.relatedPosts.concat(data.items.slice(0,2));
                }
            });
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
                SetThumbnails(popularThreads);
                //var subset = popularThreads.slice(0, postFeedMultiple);
                //AddPopularPosts(subset);
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

        $('#post-feed-template').parent().find('.post-feed-item').remove();
        $('#post-feed-template').parent().append(html);

        ResetMasonry();
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

        ResetMasonry();
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

        ResetMasonry();
    };

    Blogger.GetPostById = function (postId) {
        var post;
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts/' + postId + '?key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
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
                SetThumbnail(post);
            }
        });
        return post;
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
                SetThumbnail(post);
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

    function ResetMasonry() {
        var postFeed = document.querySelector('.post-feed');
        imagesLoaded(postFeed, function () {
            var msnry = new Masonry(postFeed, {
                itemSelector: '.post-feed-item',
                gutter: 15,
                isFitWidth: true
            });
        });
    }

    function SetThumbnail(post) {
        var thumbnail = post.content.match('<img class="post-thumbnail".*/>');

        if (thumbnail == null)
            post.thumbnailUrl = 'http://placehold.it/300x300';
        else
            post.thumbnailUrl = thumbnail[0].match('http.*jpg|http.*png');
    };

    function SetThumbnails(posts) {
        posts.forEach(function (post) {
            var thumbnail = post.content.match('<img class="post-thumbnail".*/>');

            if (thumbnail == null)
                post.thumbnailUrl = 'http://placehold.it/300x300';
            else
                post.thumbnailUrl = thumbnail[0].match('http.*jpg|http.*png');
        });
    };

}(window.Blogger = window.Blogger || {}, jQuery))