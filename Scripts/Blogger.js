(function (Blogger, $, undefined) {

    Blogger.GetPosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=9&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            async: false,
            processData: "false",
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error on GetPosts: " + url);
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

    Blogger.GetPostById = function (postId) {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts/' + postId + '?key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            async: false,
            processData: "false",
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error on GetPostById: " + url);
            },
            success: function (data) {
                Blogger.posts = data;
                convertLinkyToolsFromScript(Blogger.posts);
                setThumbnail(Blogger.posts);
            }
        });
    };

    Blogger.GetArchivePosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=500&fetchImages=false&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            async: false,
            processData: "false",
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error in GetArchivePosts: " + url);
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error on GetSearchedPosts: " + url);
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

    //Requires that Blogger.posts is an obj, not an array
    Blogger.GetRelatedPosts = function () {
        Blogger.posts.labels.forEach(function (label) {
            $.ajax({
                type: "GET",
                url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts/search?q=' + label + '&fields=items(id%2Cpublished%2Ctitle%2Ccontent)&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
                dataType: "json",
                async: false,
                processData: "false",
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error on GetRelatedPosts: " + url);
                },
                success: function (data) {
                    Blogger.relatedPosts = _.filter(data.items.splice(0,6), function (post) {
                        setThumbnail(post);
                        return post.id != Blogger.posts.id && !_.contains(Blogger.relatedPosts, post);
                    });
                }
            });
        });
    };

    function setThumbnail(post) {
        var thumbnail = post.content.match('<img class="post-thumbnail".*/>');

        if (thumbnail != null)
            post.thumbnailUrl = thumbnail[0].match('http.*jpg|http.*png|http.*jpeg');
        else
            post.thumbnailUrl = 'img/logo250x250.png';
    };

    function convertLinkyToolsFromScript(post) {
        var linkyScript = post.content.match(/\<script src="http:\/\/www.linkytools.com.*<\/script>/);

        if (linkyScript == null)
            return;

        var linkyId = linkyScript[0].match(/id=(.*)\"/)[1];
        var newLinkyLink = '<p style="text-align:center"><a href="http://www.linkytools.com/wordpress_list.aspx?id=' + linkyId + '&type=thumbnail" target="_blank" rel="nofollow">Click here</a> to join the Weekly Favorites link up!</p>';

        post.content = post.content.replace(linkyScript, newLinkyLink);
    };

}(window.Blogger = window.Blogger || {}, jQuery))

// Keep for reference in case the need for popular posts returns.
//Blogger.GetPopularThreads = function () {
//    $.ajax({
//        type: "GET",
//        url: 'https://disqus.com/api/3.0/threads/listPopular.json?forum=fancythingsblog&interval=90d&limit=9&api_key=hfBewKMoMzDCj1FeyswsLVmBC5Gi0FvDI3ED6Or1iZueKDKubbvPnh6NolyhGdaX',
//        dataType: "json",
//        async: false,
//        processData: "false",
//        beforeSend: function (jqXHR, settings) {
//            //start timer gif
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            alert("error: " + url);
//        },
//        success: function (data) {
//            popularThreads = data.response;
//            popularThreads.forEach(function (post) {
//                setThumbnail(post);
//            });
//        }
//    });
//};