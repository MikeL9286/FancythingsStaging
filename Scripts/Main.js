(function (Main, $, undefined) {

    $('.nav a').click(function (e) {
        $(this).tab('show');
    });

} (window.Main = window.Main || {}, jQuery))