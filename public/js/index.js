/**
 * Created by ste on 24-08-2017.
 */

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
    events = sortEvents(events);

    $( "#front_event_menu" ).append('<ul id="event_menu_list"></ul>');

    for (var i = 0; i < events.length; i++) {
        console.log(events[i]);
        $( "#event_menu_list" ).append("<li><a href='/event:" + events[i].index + "'>" + events[i].title + "</a></li>");
    }
}

function sortEvents(events) {
    var result = [];

    for (var i = 1; i <= events.length; i++) {
        for (var j = 0; j < events.length; j++) {
            if (events[j].index == i) {
                result.push(events[j]);
            }
        }
    }

    return result;
}

$(document).ready(function() {
    $("#body_box, #top_menu, #info, #test").removeClass("col-xs-12").addClass("col-xs-9");
    $("#front_event_menu").removeClass("invisible");
});