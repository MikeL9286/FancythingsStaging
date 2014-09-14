(function (BlogPost, $, undefined) {

    $('img[src*=blogspot]').addClass('img-responsive');

    //add pinterest button to images
    $('.post-content img:not([src*=images\\.rewardstyle],.post-thumbnail)').each(function (index) {
        var image = $(this);
        var imageSource = image.attr('src');

        var pinitLink = 'http://pinterest.com/pin/create/button/?url=' + window.location.href + '&media=' + imageSource + '&description=' + $('.post-header h3').text();
        var pinitButton = '<a href="' + pinitLink + '"><i class="fa fa-pinterest"></i></a>';

        image.wrap('<div style="position:relative"></div>');
        image.after('<div class="share-icons">' + pinitButton + '</div>');
    });

    //load comments
    var disqus_shortname = 'fancythingsblog';
    var disqus_title = Blogger.posts.title;
    var disqus_url = Blogger.posts.url;
    var disqus_homepage_url = 'http://thefancythings.com';

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

}(window.BlogPost = window.BlogPost || {}, jQuery))