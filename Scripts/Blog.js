(function (Blog, $, undefined) {
    InitializeFB();

    var blogObj = {};
    var blogPosts = [];
    var postHistory = [];

    Blog.GetPosts = function (ctrl) {
        var url;

        if (ctrl === undefined)
            url = 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=5&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk';
        else if (ctrl.selectedIndex !== 0)
            url = ctrl.options[ctrl.selectedIndex].value;
        else
            return;

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            //async: false,
            processData: "false",
            beforeSend: function (jqXHR, settings) {
                //start timer gif
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error: " + url);
            },
            success: function (data) {
                $('div#body div#blog').empty();

                blogObj = data;
                $.each(blogObj.items, function (index, post) {
                    //blogPosts.push(post);
                    //WritePost(post);
                    WriteTile(post);
                });
                RemoveAnnoyingBloggerStyles();
                AddPinitButton();

                if (ctrl === undefined)
                    WriteFooter();
                else
                    $('div#body div#footerLinks').remove();
            }
        });
    };

    Blog.ShowMorePosts = function () {
        $.ajax({
            type: "GET",
            url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=5&pageToken=' + blogObj.nextPageToken + '&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
            dataType: "json",
            //async: false,
            processData: "false",
            beforeSend: function (jqXHR, settings) {
                //start timer gif
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error: " + textStatus);
            },
            success: function (data) {
                blogObj = data;
                $('div#body div#footerLinks').remove();
                $.each(blogObj.items, function (index, post) {
                    WritePost(post);
                });
                WriteFooter();
            }
        });
    };

    Blog.PopulatePostArchive = function () {
        var year = moment().year();
        var month = moment().month();
        var startDate = moment([year, month, '01']);
        var endDate = moment();
        var url;

        function AddMonthToArchive() {
            $.ajax({
                type: "GET",
                url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?endDate=' + endDate.format('YYYY-MM-DD') + 'T00%3A00%3A00Z&fetchBodies=false&startDate=' + startDate.format('YYYY-MM-DD') + 'T00%3A00%3A00Z&fields=items(id%2Ctitle%2Curl)&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
                dataType: "json",
                async: true,
                processData: "false",
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("error: " + textStatus);
                },
                success: function (data) {
                    if (data.items !== undefined && data.items.length > 0) {
                        url = 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=20&endDate=' + endDate.format('YYYY-MM-DD') + 'T00%3A00%3A00Z&startDate=' + startDate.format('YYYY-MM-DD') + 'T00%3A00%3A00Z&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk';
                        $('select#postArchive').append('<option value="' + url + '">' + startDate.format('MMMM') + ' (' + data.items.length + ')' + '</option>');

                        startDate.subtract('months', 1);
                        endDate.date(0);
                        AddMonthToArchive();
                    }
                }
            });
        }

        AddMonthToArchive();
    };

    function WriteTile(post) {
        $('div#body div#blog').append(
            "<div class='tileWrapper'>" +
            "<a href='" + post.url + "'>" +
            "<div class='tile'>" +
            "<div class='tileSnapshot'>" + GetPostImage(post.content) + "</div>" +
            "<div class='tilePreview'>" +
            "<div class='tileTitle'>" + post.title + "</div>" +
            "<div class='tileDate'>" + FormatDate(post.published) + "</div>" +
            "<div class='tileSummary'>" + GetPostSummary(post.content) + "</div>" +
            "</div>" +
            "</div>" +
            "</a>" +
            "</div>"
        );
    }

    function GetPostImage(content) {
        return content.match("<img.*?/>");
    }

    function GetPostSummary(content) {
        return "this is a fake post summary";
    }

    function WritePost(post) {
        $('div#body div#blog').append(
            "<div class='post'>" +
            "<h4 style='text-align:center'>" + FormatDate(post.published) + "</h4>" +
            "<hr/>" +
            "<h2 style='text-align:center'>" +
            "<a href='" + post.url + "'>" + post.title + "</a>" +
            "</h2>" +
            "<hr/>" +
            "<div style='width:100%;height:20px' />" +
            "<div>" + post.content + "</div>" +
            "<div style='width:100%;height:50px' />" +
            "</div>"
        );
    }

    function WriteFooter() {
        $('div#body').append(
            "<div id='footerLinks' style='width:100%;margin-bottom:20px;text-align:center'>" +
                "<div class='moreLink' onclick='Blog.ShowMorePosts()'>Show More...</div>" +
            "</div>"
        );
    }

    function FormatDate(date) {
        return date.split('T')[0];
    }

    function RemoveAnnoyingBloggerStyles() {
        $('div#blog div.separator > a').css('margin-left', '0');
    }

    function AddPinitButton() {
        $('div#blog div.separator img').each(function () {
            var title = $(this).closest('div.post').find('h2 > a').html();
            var newTitle = title.split(' ').join('%20');
            var imgUrl = $(this).attr('src');
            var url = "http://pinterest.com/pin/create/button/?url=www.fancythingsblog.com&media=" + imgUrl + "&description=" + newTitle;

            $(this).wrap('<div class="pinContainer"></div>');

            $(this).after('<a href=' + url + ' class="pinIt" target="_blank"><img alt="Pin this!" src="https://lh5.googleusercontent.com/-_a9-rHFeeFA/URb4Q0Ai96I/AAAAAAAAFYo/vb4GZfsUops/s100/PinIt.png" /></a>');
        });
    }

    function InitializeFB() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '339913236114724', // App ID
                channelURL: 'http://www.fancythingsblog.com', // Channel File
                status: true, // check login status
                cookie: true, // enable cookies to allow the server to access the session
                oauth: true, // enable OAuth 2.0
                xfbml: true  // parse XFBML
            });
        };

        // Load the SDK Asynchronously
        (function (d) {
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) { return; }
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        } (document));
    }

} (window.Blog = window.Blog || {}, jQuery))