var source1 = $("#nav-post-titles-template").html();
var source2 = $("#slideshow-images-template").html();
var source3 = $("#top-posts-template").html();
//var source3 = $("#recent-posts-template").html();

var template1 = Handlebars.compile(source1);
var template2 = Handlebars.compile(source2);
var template3 = Handlebars.compile(source3);
//var template4 = Handlebars.compile(source4);

var data = { posts: Blogger.blog.items };

Handlebars.registerHelper('firstImage', function (postContent) {
    return postContent.match('<img.* src=".*"')[0].match('http.*jpg|http.*png');
});

Handlebars.registerHelper('summary', function (postContent) {
    return $(postContent).text().substring(0, 250);
});

$('#nav-post-titles-template').parent().append(template1(data));
$('#slideshow-images-template').parent().append(template2(data));
$('#top-posts-template').parent().append(template3(data));
//$('#recent-posts-template').parent().append(template4(data));