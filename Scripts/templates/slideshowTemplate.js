﻿var source1 = $("#slideshow-template").html();

var template1 = Handlebars.compile(source1);

var data = { slideshowPosts: Blogger.posts.slice(0, 5) };

Handlebars.registerHelper('slideshowImage', function (postContent) {
    var image = postContent.match('<img .* class="post-image" />');
    var imageUrl;

    if (image == null)
        imageUrl = 'http://placehold.it/800x450';
    else
        imageUrl = image[0].match('http.*jpg|http.*png');

    return imageUrl;
});

Handlebars.registerHelper('thumbnail', function(postContent) {
    var thumbnail = postContent.match('<img class="post-thumbnail".*/>');
    var thumbnailUrl;

    if (thumbnail == null)
        thumbnailUrl = 'http://placehold.it/250x250';
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

$('#slideshow-template').parent().append(template1(data));