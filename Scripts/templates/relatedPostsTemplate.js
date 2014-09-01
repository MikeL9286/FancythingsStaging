var source1 = $("#related-posts-template").html();

var template1 = Handlebars.compile(source1);

var data = { relatedPosts: Blogger.relatedPosts };

Handlebars.registerHelper('thumbnail', function (postContent) {
    var thumbnail = postContent.match('<img class="post-thumbnail".*/>');
    var thumbnailUrl;

    if (thumbnail == null)
        thumbnailUrl = 'http://placehold.it/250x250';
    else
        thumbnailUrl = thumbnail[0].match('http.*jpg|http.*png');

    return thumbnailUrl;
});

Handlebars.registerHelper('relativeDate', function (publishedDate) {
    return moment(publishedDate).startOf('day').fromNow();
});

var postLink = function (post) {
    var url = window.location.href;
    return url + 'blogpost.html?post=' + post.id;
};

Handlebars.registerHelper('twitterShareLink', function (post) {
    return 'https://twitter.com/intent/tweet?text=' + post.title + '&via=fancythingsblog&url=' + postLink(post);
});

Handlebars.registerHelper('pinterestShareLink', function (post) {
    return 'http://pinterest.com/pin/create/button/?url=' + postLink(post) + '&media=' + post.thumbnailUrl + '&description=' + post.title;
});

Handlebars.registerHelper('googleShareLink', function (post) {
    return 'https://plus.google.com/share?url=' + postLink(post);
});

Handlebars.registerHelper('emailShareLink', function (post) {
    return 'mailto:?body=I thought you might enjoy reading this post called ' + post.title + ' on fancy things! ' + postLink(post);
});

$('#related-posts-template').parent().append(template1(data));