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
                Blogger.posts.forEach(function (post) {
                    convertLinkyToolsFromScript(post);
                    setThumbnail(post);
                });
            }
        });
    };

    function convertLinkyToolsFromScript(post) {
        var linkyScript = post.content.match(/\<script src="http:\/\/www.linkytools.com.*<\/script>/);

        if (linkyScript == null)
            return;

        var linkyId = linkyScript[0].match(/id=(.*)\"/)[1];
        var newLinkyLink = '<p style="text-align:center"><a href="http://www.linkytools.com/wordpress_list.aspx?id=' + linkyId + '&type=thumbnail" target="_blank" rel="nofollow">Click here</a> to join the Weekly Favorites link up!</p>';

        post.content = post.content.replace(linkyScript, newLinkyLink);
    };

    Blogger.GetArchivePosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=500&fetchImages=false&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
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
                Blogger.posts = _.chain(data.items)
                    //add published on date of MMMM YYYY
                    .map(function(post, key) {
                        post.publishedOn = moment(post.published).format('MMMM YYYY');
                        return post;
                    })
                    //group by published on
                    .groupBy('publishedOn')
                    //map the grouped object back to an array with grouped posts and publishedOn properties
                    .map(function(posts, key) {
                        return {
                            group: key,
                            posts: posts
                        }
                    })
                    .value();
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
                    Blogger.posts = data.items;
                    Blogger.posts.forEach(function (post) {
                        setThumbnail(post);
                    });

                    $('.search-description').prepend('<h4>Top search results for: ' + window.location.href.match('searchKey=(.*)')[1] + '</h4> (' + Blogger.posts.length + ' results)');
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
                    Blogger.relatedPosts = _.filter(data.items, function (post) {
                        setThumbnail(post);
                        return post.id != Blogger.posts.id && !_.contains(Blogger.relatedPosts, post);
                    });
                }
            });
        });
    };

    //TODO: Remove
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
                popularThreads.forEach(function (post) {
                    setThumbnail(post);
                });
            }
        });
    };

    //TODO: Remove
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

    //TODO: Remove
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

    //TODO: Remove
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
                Blogger.posts = data;
                convertLinkyToolsFromScript(Blogger.posts);
            }
        });
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
                setThumbnail(post);
            }
        });
        return post;
    };

    //TODO: Remove
    function AddPopularPosts(popularThreads) {
        popularThreads.forEach(function (thread) {
            var postTitle = thread.clean_title.split(': ')[1];
            var post = GetPostByTitle(postTitle).items[0];
            Blogger.postFeed.push(post);
        });
    };

    //TODO: Remove
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

    function setThumbnail(post) {
        var thumbnail = post.content.match('<img class="post-thumbnail".*/>');

        if (thumbnail != null)
            post.thumbnailUrl = thumbnail[0].match('http.*jpg|http.*png|http.*jpeg');
        else
            post.thumbnailUrl = '../img/logo250x250.png';
    };

}(window.Blogger = window.Blogger || {}, jQuery))