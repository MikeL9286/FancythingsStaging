(function (ContentLoader, $, undefined) {

    ContentLoader.Redirect = function(route, postId) {
        //var baseUrl = "http://thefancythings.com";
        var baseUrl = "http://mikel9286.github.io/FancythingsStaging";
        //var baseUrl = "http://localhost:34503";

        var url = baseUrl + "?page=" + route;
        url = postId == undefined ? url : url + "&post=" + postId;

        window.location.href = url;
    }

    ContentLoader.Load = function () {
        var currentUrl = window.location.href;
        var body = $("div#root");

        if (currentUrl.indexOf("page=Services") != -1) {
            body.load("views/services.html");
            $('#servicesLink a').tab('show');
        }
        else if (currentUrl.indexOf("page=About") != -1) {
            body.load("views/about.html");
            $('#aboutLink a').tab('show');
        }
        else if (currentUrl.indexOf("page=Post") != -1) {
            body.load("views/blogpost.html");
            $('#homeLink a').tab('show');
        }
        else if (currentUrl.indexOf("page=Press") != -1) {
            body.load("views/press.html");
            $('#pressLink a').tab('show');
        }
        else if (currentUrl.indexOf("page=Policies") != -1) {
            body.load("views/policies.html");
            $('#policiesLink a').tab('show');
        }
        else {
            body.load("views/home.html");
            $('#homeLink a').tab('show');
        }
    };

} (window.ContentLoader = window.ContentLoader || {}, jQuery))