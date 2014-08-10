var source1 = $("#post-feed-template").html();

var template1 = Handlebars.compile(source1);

var data = { feedPosts: Blogger.postFeed };

Handlebars.registerHelper('firstImage', function (postContent) {
    return postContent.match('<img.* src=".*"')[0].match('http.*jpg|http.*png');
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

$('#post-feed-template').parent().append(template1(data));