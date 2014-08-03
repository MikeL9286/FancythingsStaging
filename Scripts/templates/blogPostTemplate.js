var source1 = $("#blog-post-template").html();
var template1 = Handlebars.compile(source1);

var data = { blogPosts: Blogger.posts.items[0] };

Handlebars.registerHelper('relativeDate', function (publishedDate) {
    return moment(publishedDate).startOf('day').fromNow();
});

Handlebars.registerHelper('formattedDate', function (publishedDate) {
    return moment(publishedDate).format('MMMM Do YYYY');
});

$('#blog-post-template').parent().append(template1(data));