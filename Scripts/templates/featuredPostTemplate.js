var source1 = $("#featured-post-template").html();
var template1 = Handlebars.compile(source1);

var data = { featuredPost: Blogger.posts.slice(0, 1) };

Handlebars.registerHelper('firstImage', function (postContent) {
    return postContent.match('<img.* src=".*"')[0].match('http.*jpg|http.*png');
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

Handlebars.registerHelper('postLink', function (postId) {
    var url = window.location.href;
    return url + 'blogpost.html?post=' + postId;
});

$('#featured-post-template').parent().append(template1(data));