(function (Main, $, undefined) {

    new Headroom(document.querySelector(".navbar"),
        {
            tolerance: 5,
            offset: 5
        }).init();

    imagesLoaded($('body'), function() {
        $('.loading-overlay').addClass('loaded');
    });

}(window.Main = window.Main || {}, jQuery))