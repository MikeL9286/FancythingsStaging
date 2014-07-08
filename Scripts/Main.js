(function (Main, $, undefined) {

    $('.nav a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

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


    //old 

    //Main.IsSafari = function () {
    //    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
    //        return true;
    //    return false;
    //}

    //Main.AttachEventListeners = function () {
    //    $(window).bind('resize orientationchange', function () {
    //        $('footer').css('display', 'block');
    //    });

    //    $(window).bind('load', function () {
    //        $('footer').css('display', 'block');
    //    });
    //}

    //Main.AttachEventListeners();

} (window.Main = window.Main || {}, jQuery))