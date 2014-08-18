(function (Main, $, undefined) {

    new Headroom(document.querySelector(".navbar"),
        {
            tolerance: 5,
            offset: 5
        }).init();

}(window.Main = window.Main || {}, jQuery))