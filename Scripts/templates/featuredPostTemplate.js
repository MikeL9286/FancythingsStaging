var source1 = $("#featured-post-template").html();
var template1 = Handlebars.compile(source1);

var data = { featuredPost: Blogger.posts.slice(0, 1) };

Handlebars.registerHelper('firstImage', function (postContent) {
    return postContent.match('<img.* src=".*"')[0];
});

Handlebars.registerHelper('thumbnail', function (postContent) {
    var thumbnail = postContent.match('<img class="post-thumbnail".*/>');
    var thumbnailUrl;

    if (thumbnail == null)
        thumbnailUrl = 'http://placehold.it/300x300';
    else
        thumbnailUrl = thumbnail[0].match('http.*jpg|http.*png');

    return thumbnailUrl;
});

Handlebars.registerHelper('summary', function (postContent, length) {
    var postSummary = postContent.match('<div class="post-summary">(.*)</div>');
    if (postSummary != null) {
        return postSummary[1];
    } else { //remove once all summaries are in place
        var centerTextToRemove = postContent.match('<center>.*</center>');
        var smallTextToRemove = postContent.match('<span.*</span>');
        var content = postContent.split(centerTextToRemove).join(' ').split(smallTextToRemove).join(' ');

        return content.length > length ?
            $(content).text().substring(0, length) :
            $(content).text();
    }
});

Handlebars.registerHelper('relativeDate', function (publishedDate) {
    return moment(publishedDate).startOf('day').fromNow();
});

Handlebars.registerHelper('formattedDate', function (publishedDate) {
    return moment(publishedDate).format('MMMM Do YYYY');
});

Handlebars.registerHelper('postLink', function () {
    return postLink();
});
var postLink = function() {
    var url = window.location.href;
    return url + 'blogpost.html?post=' + data.featuredPost[0].id;
};

Handlebars.registerHelper('twitterShareLink', function () {
    return 'https://twitter.com/intent/tweet?text=' + data.featuredPost[0].title + '&via=fancythingsblog&url=' + postLink();
});

Handlebars.registerHelper('pinterestShareLink', function () {
    return 'http://pinterest.com/pin/create/button/?url=' + postLink() + '&media=' + data.featuredPost[0].thumbnailUrl + '&description=' + data.featuredPost[0].title;
});

Handlebars.registerHelper('emailShareLink', function () {
    return 'mailto:?body=I thought you might enjoy reading this post called ' + data.featuredPost[0].title + ' on fancy things! ' + postLink();
});

$('#featured-post-template').parent().append(template1(data));