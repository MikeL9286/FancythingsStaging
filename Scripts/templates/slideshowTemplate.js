var source1 = $("#slideshow-template").html();
var template1 = Handlebars.compile(source1);

var data = { slideshowPosts: Blogger.posts.slice(0, 5) };

Handlebars.registerHelper('slideshowImage', function (postContent) {
    var image = postContent.match('<img .* class="post-image" />');
    var imageUrl;

    if (image == null)
        imageUrl = 'http://placehold.it/848x477';
    else
        imageUrl = image[0].match('http.*jpg|http.*png');

    return imageUrl;
});
var postLink = function (post) {
    var url = window.location.href;
    return url + 'blogpost.html?post=' + post.id;
};

$('#slideshow-template').parent().append(template1(data));