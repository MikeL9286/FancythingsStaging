
var delayTime = 3000;
var slideTimer;

function StartTimer() {
    slideTimer = window.setInterval(function () {
        ChangeSlide(null)
    }, delayTime);
}

function ChangeSlide(targetSlideId) {
    $('ul.SlideBlobs li').each(function () {
        $(this).removeAttr('onclick');
    });

    var currentSlide = $('.SlideContainer div.live');
    var nextSlide = GetNextSlide(currentSlide, targetSlideId);

    if (nextSlide.attr('id') != currentSlide.attr('id')) {
        if (currentSlide.attr('id') < nextSlide.attr('id')) {
            nextSlide.attr('class', 'live');
            currentSlide.attr('class', 'slideLeft');
        }
        else {
            nextSlide.attr('class', 'slideLeftQuick');
            setTimeout(function () {
                nextSlide.attr('class', 'live');
                currentSlide.attr('class', 'slideRight');
            }, 0);
        }

        ChangeBlob(currentSlide, nextSlide);

        setTimeout(function () {
            currentSlide.removeAttr('class'); //remove class "live" after animation completes
            
            $('ul.SlideBlobs li').each(function () {
                $(this).attr('onclick', 'ChangeSlide($(this).attr("data-slideFor"))');
            });
        }, 1000);
    }
}

function GetNextSlide(currentSlide, targetSlideId) {
    if (targetSlideId != null && targetSlideId != currentSlide.attr('id')) {
        clearInterval(slideTimer);
        slideTimer = window.setInterval(function () {
            ChangeSlide(null)
        }, delayTime);

        return $('.SlideContainer div#' + targetSlideId);
    }
    else if (targetSlideId != currentSlide.attr('id')) {
        var nextSlide = $('.SlideContainer div.live + div');

        if (nextSlide.length == 0) //passed the end of the slide list
            return $('.SlideContainer div.live').closest('.SlideContainer').find('div:first-child'); //return first slide in list

        return nextSlide;
    }
}

function ChangeBlob(currentSlide, nextSlide) {
    $('.SlideBlobs li[data-slideFor=' + currentSlide.attr('id') + ']').removeAttr('style');
    $('.SlideBlobs li[data-slideFor=' + nextSlide.attr('id') + ']').attr('style', 'background-color:#f9bac3');
}