(function (Home, $, undefined) {

    Blogger.GetRecentPosts();

    var postFeed = document.querySelector('.post-feed');
    imagesLoaded(postFeed, function () {
        var msnry = new Masonry(postFeed, {
            //columnWidth: 270,
            itemSelector: '.post-feed-item',
            gutter: 15,
            isFitWidth: true
        });
    });

    //$('#waypoint-target').waypoint(function () {
    //    Blogger.ShowMorePosts();
    //    //reset the waypoint to the last item in the feed
    //}, { offset: 'bottom-in-view' });

}(window.Home = window.Home || {}, jQuery))