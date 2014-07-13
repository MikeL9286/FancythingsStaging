(function (Blogger, $, undefined) {

    Blogger.blog = {};
    Blogger.nextPageToken;

    Blogger.GetPosts = function (ctrl) {
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
                console.log(data);
            }
        });
    };

}(window.Blogger = window.Blogger || {}, jQuery))