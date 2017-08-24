/**
 * Created by ste on 24-08-2017.
 */
/*$.get('/event:1').then(function(responseData) {
 //responseData is content from other page.
 //$('#someElem').append(responseData);
 //console.log(responseData);
 console.log(template_to_json(responseData));
 });*/

getData("length", function(response){
    var events = [];

    for(i = 1; i <= response.length; i++){
        readPage(i, function(data){
            events.push(template_to_json(data));

            if (events.length == response.length) {
                eventsReady(events);
            }
        });
    }
});

function getData(id, handleData) {
    $.ajax({
        type: "GET",
        url: "/data:" + id,
        dataType: 'json',
        success:function(data) {
            handleData(data);
        }
    });
}

function readPage(id, handleData) {
    $.get('/event:'+id).then(function(responseData) {
        handleData(responseData);
    });
}

function eventsReady(events) {
    console.log(events);
    for (var i = 0; i < events.length; i++) {
        console.log(events[i]);
        $( "#event_menu_list" ).append("<li><a href='/event:" + events[i].index + "'>" + events[i].title + "</a></li>");
    }
}

