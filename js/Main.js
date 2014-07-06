(function (Main, $, undefined) {

    Main.IsSafari = function () {
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
            return true;
        return false;
    }

    Main.AttachEventListeners = function () {
        $(window).bind('resize orientationchange', function () {
            $('footer').css('display', 'block');
        });

        $(window).bind('load', function () {
            $('footer').css('display', 'block');
        });
    }

    Main.AttachEventListeners();

} (window.Main = window.Main || {}, jQuery))