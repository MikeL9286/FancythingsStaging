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
        var desiredHeight = 0;
        var posts = $('.more-posts .post');
        posts.each(function (i) {
            var post = $(this);
            desiredHeight = (post.height() > desiredHeight) ? post.height() : desiredHeight;
        });
        posts.css('min-height', desiredHeight);
    });

}(window.Home = window.Home || {}, jQuery))