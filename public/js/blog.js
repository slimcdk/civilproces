
$.get('/blog:length').then(function(responseData) {
    console.log(responseData);

    for(var i = 1; i <= responseData.length; i++){
        console.log(i);

        readPost(i, function(data){
            console.log(template_to_json(data));
        });
    }
});










