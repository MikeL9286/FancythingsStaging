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

    //add pinterest button to images
    $('.posts .post-inner img:not([src*=images\\.rewardstyle],.post-thumbnail,[src*=photobucket],[src*=googleusercontent])').each(function (index) {
        var image = $(this);
        var imageSource = image.attr('src');

        var pinitLink = 'http://pinterest.com/pin/create/button/?url=' + window.location.href + '&media=' + imageSource + '&description=' + $('.post-header h3').text();
        var pinitButton = '<a href="' + pinitLink + '"><i class="fa fa-pinterest"></i></a>';

        image.wrap('<div style="position:relative"></div>');
        image.after('<span class="share-icons">' + pinitButton + '</span>');
    });

}(window.Home = window.Home || {}, jQuery))