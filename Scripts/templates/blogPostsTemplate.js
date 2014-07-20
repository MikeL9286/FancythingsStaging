﻿var source1 = $("#nav-post-titles-template").html();
var source2 = $("#slideshow-images-template").html();
var source3 = $("#post-feed-template").html();

var template1 = Handlebars.compile(source1);
var template2 = Handlebars.compile(source2);
var template3 = Handlebars.compile(source3);

var data = { blogPosts: Blogger.posts.slice(0, 4) };

Handlebars.registerHelper('firstImage', function (postContent) {
    return postContent.match('<img.* src=".*"')[0].match('http.*jpg|http.*png');
});

Handlebars.registerHelper('summary', function (postContent, length) {
    var centerTextToRemove = postContent.match('<center>.*</center>');
    var smallTextToRemove = postContent.match('<span.*</span>');
    var content = postContent.split(centerTextToRemove).join(' ').split(smallTextToRemove).join(' ');

    return content.length > length ?
        $(content).text().substring(0, length) :
        $(content).text();
});

Handlebars.registerHelper('relativeDate', function (publishedDate) {
    return moment(publishedDate).startOf('day').fromNow();
});

$('#nav-post-titles-template').parent().append(template1(data));
$('#slideshow-images-template').parent().append(template2(data));
$('#post-feed-template').parent().append(template3(data));