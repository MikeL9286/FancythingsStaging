(function (Home, $, undefined) {

    $(function () {
        var slideshowNavContainer = $('.slideshow-widget .slideshow-widget-post-headers');
        $(".rslides").responsiveSlides({
            manualControls: slideshowNavContainer,
            before: function () {
                slideshowNavContainer.find('.rslides_here a').tab('show');

            }
        });

        slideshowNavContainer.find('li:first a').tab('show');

        //prevent nav pills from following the links route
        $('.nav a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

        Blogger.GetRecentPosts();

        $('#waypoint-target').waypoint(function () {
            Blogger.ShowMorePosts();
            //reset the waypoint to the last item in the feed
        }, { offset: 'bottom-in-view' });
    });

} (window.Home = window.Home || {}, jQuery))