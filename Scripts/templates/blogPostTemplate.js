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
    console.log(data.blogPosts);
    return 'https://twitter.com/intent/tweet?text=' + data.blogPosts.title + '&via=fancythingsblog&url=' + window.location.href;
});

Handlebars.registerHelper('pinterestShareLink', function () {
    return 'http://pinterest.com/pin/create/button/?url=' + window.location.href + '&media=' + data.blogPosts.thumbnailUrl + '&description=' + data.blogPosts.title;
});

$('#blog-post-template').parent().append(template1(data));