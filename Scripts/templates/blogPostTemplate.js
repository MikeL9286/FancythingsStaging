var source1 = $("#blog-post-template").html();
var template1 = Handlebars.compile(source1);

var data = { blogPosts: Blogger.posts };

Handlebars.registerHelper('relativeDate', function (publishedDate) {
    return moment(publishedDate).startOf('day').fromNow();
});

Handlebars.registerHelper('formattedDate', function (publishedDate) {
    return moment(publishedDate).format('MMMM Do YYYY');
});

Handlebars.registerHelper('postLink', function () {
    return window.location.href;
});

Handlebars.registerHelper('twitterShareLink', function () {
    return 'https://twitter.com/intent/tweet?text=' + data.blogPosts.title + '&via=fancythingsblog&url=' + window.location.href;
});

Handlebars.registerHelper('pinterestShareLink', function () {
    return 'http://pinterest.com/pin/create/button/?url=' + window.location.href + '&media=' + data.blogPosts.thumbnailUrl + '&description=' + data.blogPosts.title;
});

Handlebars.registerHelper('googleShareLink', function () {
    return 'https://plus.google.com/share?url=' + window.location.href;
});

Handlebars.registerHelper('emailShareLink', function () {
    return 'mailto:?body=I thought you might enjoy reading this post called ' + data.blogPosts.title + ' on fancy things! ' + window.location.href;
});

$('#blog-post-template').parent().append(template1(data));