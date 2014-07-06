
var blogObj = {};
var blogPosts = [];

function GetPosts() {
    $.ajax({
        type: "GET",
        url: 'https://www.googleapis.com/blogger/v3/blogs/5073145937869562696/posts?key=AIzaSyBxl86QJ7gRccq_egFmP3J6Zhy3cQLluIk',
        dataType: "json",
        processData: "false",
        beforeSend: function (jqXHR, settings) {
            //start timer gif
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error: " + textStatus);
        },
        success: function (data) {
            blogObj = data.d;

//            for (post in blogObj.items) {
//                blogPosts.push(post);
//            }
        }
    });
}