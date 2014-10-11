(function (BlogPost, $, undefined) {

    $('img[src*=blogspot]').addClass('img-responsive');

    //add pinterest button to images
    $('.post-content img:not([src*=images\\.rewardstyle],.post-thumbnail,[src*=photobucket],[src*=googleusercontent])').each(function (index) {
        var image = $(this);
        var imageSource = image.attr('src');

        var pinitLink = 'http://pinterest.com/pin/create/button/?url=' + window.location.href + '&media=' + imageSource + '&description=' + $('.post-header h3').text();
        var pinitButton = '<a href="' + pinitLink + '"><i class="fa fa-pinterest"></i></a>';

        image.wrap('<div style="position:relative"></div>');
        image.after('<span class="share-icons">' + pinitButton + '</span>');
    });

}(window.BlogPost = window.BlogPost || {}, jQuery))