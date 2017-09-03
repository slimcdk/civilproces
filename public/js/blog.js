
$.get('/blog:length').then(function(responseData) {
    for(var i = 1; i <= responseData.length; i++){
        readPost(i, function(data){
            var thispost = template_to_json(data);
            createFrontPost(thispost);
        });
    }
});

function createFrontPost(post) {
    //console.log(post);
    var box = "";
    var thisPost = "post_" + post.index;
    var thisImg = "img_" + post.index;

    box += "<a href='/blog:" + post.index + "'>";

    box += "<div class='post-block'>";

    box += "<div class='post-image-box'>";
    box += "<img src='/image/blog/front/" + post.image + "' alt='some_text' id='" + thisImg + "'>";

    box += "<div class='post-headline'>";
    box += "<h2>" + post.title + "</h2>";
    box += "</div>";

    box += "</div>";

    box += "<div class='post-text-box'>";
    box += "<h4>" + post.subtitle + "</h4>";
    box += "</div>";

    box += "</div>";

    box += "</a>";

    $("#post-pool").append("<div id='" + thisPost + "' class='post-shell col-xs-12 col-sm-6 col-md-4 col-lg-3'>" + box + "</div>");

    $("#" + thisImg).on('load', function(){
        $("#" + thisPost).addClass("onPage");
    });
}
