var source1 = $("#nav-post-titles-template").html();
var source2 = $("#slideshow-images-template").html();
//var source3 = $("#slideshow-content-template").html();
var template1 = Handlebars.compile(source1);
var template2 = Handlebars.compile(source2);
//var template3 = Handlebars.compile(source3);

var data = { posts: Blogger.blog.items };

Handlebars.registerHelper('firstImage', function (postContent) {
    return postContent.match('<img.* src=".*"')[0].match('http.*jpg|http.*png');
});

Handlebars.registerHelper('summary', function (postContent) {
    return $(postContent).text().substring(0, 250);
});

$('#nav-post-titles-template').parent().append(template1(data));
$('#slideshow-images-template').parent().append(template2(data));
//$('#slideshow-content-template').parent().append(template3(data));