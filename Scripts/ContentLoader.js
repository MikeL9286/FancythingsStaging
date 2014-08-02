(function (ContentLoader, $, undefined) {

    ContentLoader.Redirect = function(route) {
        //var baseUrl = "http://thefancythings.com";
        var baseUrl = "http://mikel9286.github.io/FancythingsStaging";
        //var baseUrl = "http://localhost:34503";
        window.location.href = baseUrl + "?" + route;
    }

    ContentLoader.Load = function () {
        var currentUrl = window.location.href;
        var body = $("div#root");

        if (currentUrl.indexOf("Services") != -1) {
            body.load("views/services.html");
            $('#servicesLink a').tab('show');
        }
        else if (currentUrl.indexOf("About") != -1) {
            body.load("views/about.html");
            $('#aboutLink a').tab('show');
        }
        else {
            body.load("views/home.html");
            $('#homeLink a').tab('show');
        }
    };

} (window.ContentLoader = window.ContentLoader || {}, jQuery))