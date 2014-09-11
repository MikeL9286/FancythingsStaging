(function (ContentLoader, $, undefined) {
    ContentLoader.Load = function () {
        var currentUrl = window.location.href;
        var body = $("div#root");

        if (currentUrl.indexOf("services.html") != -1) {
            body.load("views/services.html");
            $('#servicesLink a').tab('show');
        }
        else if (currentUrl.indexOf("about.html") != -1) {
            body.load("views/about.html");
            $('#aboutLink a').tab('show');
        }
        else if (currentUrl.indexOf("blogpost.html") != -1) {
            body.load("views/blogpost.html");
        }
        else if (currentUrl.indexOf("press.html") != -1) {
            body.load("views/press.html");
            $('#pressLink a').tab('show');
        }
        else if (currentUrl.indexOf("policies.html") != -1) {
            body.load("views/policies.html");
            $('#policiesLink a').tab('show');
        }
        else if (currentUrl.indexOf("search.html") != -1) {
            body.load("views/search.html");
        }
        else if (currentUrl.indexOf("archive.html") != -1) {
            body.load("views/archive.html");
        }
        else {
            body.load("views/home.html");
        }
    };
} (window.ContentLoader = window.ContentLoader || {}, jQuery))