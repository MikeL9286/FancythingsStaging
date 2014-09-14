var source1 = $("#search-posts-template").html();

var template1 = Handlebars.compile(source1);

var data = { searchPosts: Blogger.posts };

Handlebars.registerHelper('summary', function (postContent, length) {
    var postSummary = postContent.match('<div class="post-summary">(.*)</div>');
    if (postSummary != null) {
        return postSummary[1];
    } else { //remove once all summaries are in place
        var centerTextToRemove = postContent.match('<center>.*</center>');
        var smallTextToRemove = postContent.match('<span.*</span>');
        var content = postContent.split(centerTextToRemove).join(' ').split(smallTextToRemove).join(' ');

        return content.length > length ?
            $('<div>' + content + '</div>').text().substring(0, length) + '...' :
            $('<div>' + content + '</div>').text() + '...';
    }
});

Handlebars.registerHelper('postLink', function (postId) {
    var url = window.location.origin;
    return url + '/blogpost.html?post=' + postId;
});
var postLink = function (post) {
    var url = window.location.origin;
    return url + '/blogpost.html?post=' + post.id;
};

Handlebars.registerHelper('relativeDate', function (publishedDate) {
    return moment(publishedDate).startOf('day').fromNow();
});

Handlebars.registerHelper('formattedDate', function (publishedDate) {
    return moment(publishedDate).format('MMMM Do YYYY');
});

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

$('#search-posts-template').parent().append(template1(data));