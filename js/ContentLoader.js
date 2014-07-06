(function (ContentLoader, $, undefined) {

    ContentLoader.Redirect = function(route) {
        var baseUrl = "http://thefancythings.com";
        //var baseUrl = "http://localhost:34503";
        window.location.href = baseUrl + "?route=" + route;
    }

    ContentLoader.Load = function () {
        $('footer').css('display', 'none');
        Main.AttachEventListeners();

        var currentUrl = window.location.href;
        var body = $("div#body");

        if (currentUrl.indexOf("Blog") != -1) {
            body.load("views/blog/Index.html");
        }
        else if (currentUrl.indexOf("Services") != -1) {
            body.load("views/services/index.html");
        }
        else if (currentUrl.indexOf("About") != -1) {
            body.load("views/about/index.html");
        }
        else {
            body.load("views/home/Index.html");
        }
    };

} (window.ContentLoader = window.ContentLoader || {}, jQuery))