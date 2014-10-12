(function (Services, $, undefined) {

    $(window).resize(function () {
        resizeServices();
    });

    function resizeServices() {
        var services = $('.service');
        var desiredHeight = 0;

        //clear the min-height if we're in a single column view
        if (window.innerWidth < 768 && services.css('min-height') != '0px') {
            services.css('min-height', '');
            return;
        }

        //else set the min-height so that all rows are equal heights
        if (window.innerWidth >= 768) {
            services.each(function (i) {
                var serviceHeight = $(this).outerHeight();
                desiredHeight = (serviceHeight > desiredHeight) ? serviceHeight : desiredHeight;
            });

            services.css('min-height', desiredHeight + 5);
        }
    };

    $(document).ready(function() {
        resizeServices();
    });

}(window.Services = window.Services || {}, jQuery))