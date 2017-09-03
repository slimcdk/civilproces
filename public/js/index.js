
getData("length", function(response){
    var events = [];

    for(var i = 1; i <= response.length; i++){
        readPage(i, function(data){
            events.push(template_to_json(data));

            if (events.length == response.length) {
                eventsReady(events);
            }
        });
    }
});



$(document).ready(function() {
    $("#body_box, #top-menu-box, #info").removeClass("col-md-12").addClass("col-md-9");
    $("#index-event-box-right").removeClass("hidden-md hidden-lg");
    $("#index-event-box-bottom").removeClass("hidden-xs hidden-sm");
});



function eventsReady(events) {
    var eventlist = sortEvents(events);
    console.log(eventlist);
    $("#index-event-box-right").html('<table id="index-event-table" border="1"></table>');
    $("#index-event-box-bottom").html('');


    for (var i = 0; i < eventlist.length; i++) {
        console.log(eventlist[i]);
        var event = eventlist[i];
        var box = "";

        /* list right */

        var eventPage = 'location.href="/event:' + event.index + '"';

        box += "<button class='draw' onclick='" + eventPage + "'>";

        box += "<div>";
        box += "<h3>" + event.title + "</h3>";
        box += "<h3>" + event.time + "</h3>";
        box += "<h3>" + event.price + "</h3>";
        box += "</div>";

        box += "</button>";


        $( "#index-event-table" ).append("<tr><td>" + box + "</td></tr>");



        /* list bottom */

        box = "";

        box += "<button class='draw' onclick='" + eventPage + "'>";

        box += "<div>";
        box += "<h3>" + event.title + "</h3>";
        box += "<h3>" + event.time + "</h3>";
        box += "<h3>" + event.price + "</h3>";
        box += "</div>";

        box += "</button>";

        $("#index-event-box-bottom").append("<div class='event-btn-box col-xs-12 col-sm-6'>" + box + "</div>");
    }







    $("#index-event-box-right").addClass("onPage");
}







/*
function eventsReady(events) {
    events = sortEvents(events);

    $( "#front_event_menu" ).append('<table id="event_menu_list" border="1"></table>');

    for (var i = 0; i < events.length; i++) {
        var box = "";
        var event = events[i];
        console.log(event);

        box += "<div class='front_event_box_shell'>"; //dedicated button space
            box += "<a href='/event:" + event.index + "'>";
                box += "<div class='front_event_box'>"; //the actual button
                    box += "<div class='front_event_text_box'>"; //text box

                        box += "<p>" + event.title + "</p>";
                        box += "<p>" + event.time + "</p>";
                        box += "<p>" + event.price + "</p>";

                    box += "</div>";
                box += "</div>";
            box += "</a>";
        box += "</div>";

        $( "#event_menu_list" ).append("<tr><td>" + box + "</td></tr>");
    }
}
*/
/*
$(document).ready(function() {
    $("#body_box, #top_menu, #info").removeClass("col-md-12").addClass("col-md-9");
    //$("#front_event_menu").removeClass("invisible");
});*/
