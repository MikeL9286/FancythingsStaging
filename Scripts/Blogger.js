(function (Blogger, $, undefined) {

    Blogger.blog = {};
    Blogger.nextPageToken;

    Blogger.GetPosts = function (feedType) {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=4&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
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
                Blogger.blog = data;
                Blogger.nextPageToken = data.nextPageToken;
            }
        });
    };

    Blogger.SortByDate1 = function (a, b) {
        Blogger.blog.items.sort(SortByDate1);

        var source = $('#post-feed-template').html();
        var template = Handlebars.compile(source);
        var context = { posts: Blogger.blog.items };
        var html = template(context);

        $('#post-feed-template').parent().find('li').remove();
        $('#post-feed-template').parent().append(html);
    };

    Blogger.SortByDate2 = function (a, b) {
        Blogger.blog.items.sort(SortByDate2);

        var source = $('#post-feed-template').html();
        var template = Handlebars.compile(source);
        var context = { posts: Blogger.blog.items };
        var html = template(context);

        $('#post-feed-template').parent().find('li').remove();
        $('#post-feed-template').parent().append(html);
    };

    function SortByDate1(a, b) {
        if (a.published < b.published)
            return -1;
        if (a.published > b.published)
            return 1;
        return 0;
    };

    function SortByDate2(a, b) {
        if (a.published < b.published)
            return 1;
        if (a.published > b.published)
            return -1;
        return 0;
    };

    Blogger.ShowMorePosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=4&pageToken=' + Blogger.nextPageToken + '&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            async: false,
            processData: "false",
            beforeSend: function (jqXHR, settings) {
                //start timer gif
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error: " + textStatus);
            },
            success: function (data) {
                //add the new posts to the existing post list
                //Array.prototype.push.apply(Blogger.blog.items, data.items);
                
                var source = $('#post-feed-template').html();
                var template = Handlebars.compile(source);
                var context = { posts: data.items };
                var html = template(context);
                
                $('#post-feed-template').parent().append(html);
                Blogger.nextPageToken = data.nextPageToken;
            }
        });
    };

    /*
    <div>
            <a href="http://thenextweb.com/google/2013/05/03/fullscreen-beam-launches-first-youtube-app-for-google-glass-with-public-or-private-sharing/">
                <h2>Fullscreen BEAM: The first YouTube app for Google Glass comes with public or private sharing</h2>
                <h4 class="count-comments" data-disqus-url="http://thenextweb.com/google/2013/05/03/fullscreen-beam-launches-first-youtube-app-for-google-glass-with-public-or-private-sharing/"></h4>
            </a>
        </div>

    $(document).ready(function () {
                var disqusPublicKey = "YOUR_PUBLIC_KEY";
                var disqusShortname = "YOUR_SHORTNAME";
                var urlArray = [];

                $('.count-comments').each(function () {
                    var url = $(this).attr('data-disqus-url');
                    urlArray.push('link:' + url);
                });

                $('#get-counts-button').click(function () {

                    $.ajax({
                        type: 'GET',
                        url: "https://disqus.com/api/3.0/threads/set.jsonp",
                        data: { api_key: disqusPublicKey, forum : disqusShortname, thread : urlArray }, // URL method
                        cache: false,
                        dataType: "jsonp",
                        success: function (result) {
                            for (var i in result.response) {
                                var countText = " comments";
                                var count = result.response[i].posts;
                                if (count == 1) countText = " comment";
                                $('h4[data-disqus-url="' + result.response[i].link + '"]').html(count + countText);
                            }
                        }
                    });
                });
            });
    */

}(window.Blogger = window.Blogger || {}, jQuery))