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
    });

} (window.Home = window.Home || {}, jQuery))