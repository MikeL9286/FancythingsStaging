(function (Blogger, $, undefined) {

    Blogger.blog = {};

    Blogger.GetPosts = function (ctrl) {
        var url;

        if (ctrl === undefined)
            url = 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?maxResults=4&key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk';
        else if (ctrl.selectedIndex !== 0)
            url = ctrl.options[ctrl.selectedIndex].value;
        else
            return;

        $.ajax({
            type: "GET",
            url: url,
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
            }
        });
    };

}(window.Blogger = window.Blogger || {}, jQuery))