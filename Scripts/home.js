(function (Home, $, undefined) {

    $(".rslides").responsiveSlides({
        nav: true
    });

    $('.search input').focus(function () {
        $('.search').addClass('focused');
    });
    $('.search input').blur(function () {
        $('.search').removeClass('focused');
    });

    //set more post tiles to same height
    imagesLoaded($('.more-posts'), function () {
        resizeMorePosts();
    });

    $(window).resize(function () {
        resizeMorePosts();
    });

    function resizeMorePosts() {
        var posts = $('.more-posts .post');
        var desiredHeight = 0;

        //clear the min-height if we're in a single column view
        if (window.innerWidth < 768 && posts.css('min-height') != '0px') {
            posts.css('min-height', '');
            return;
        } 

        //else set the min-height so that all rows are equal heights
        if (window.innerWidth >= 768) {
            posts.each(function(i) {
                var innerPostHeight = $(this).find('.post-inner').outerHeight();
                desiredHeight = (innerPostHeight > desiredHeight) ? innerPostHeight : desiredHeight;
            });

            posts.css('min-height', desiredHeight + 5);
        }
    };

    $('img[src*=blogspot]').addClass('img-responsive');

}(window.Home = window.Home || {}, jQuery))