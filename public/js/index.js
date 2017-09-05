
getData("length", function(response){
    var events = [];

    for(var i = 1; i <= response.length; i++){
        readPage(i, function(data){
            events.push(slot_to_json(data));

            if (events.length == response.length) {
                eventsReady(events);
            }
        });
    }
});



$(document).ready(function() {
    $("#body_box, #top-menu-box, #info").removeClass("col-md-12").addClass("col-md-8 col-lg-9");
    $("#index-event-box-right").removeClass("hidden-md hidden-lg");
    $("#index-event-box-bottom").removeClass("hidden-xs hidden-sm");
});



function eventsReady(events) {
    var eventlist = sortEvents(events);
    console.log(eventlist);
    $("#index-event-box-right").html('<table id="index-event-table" border="0"></table>');
    $("#index-event-box-bottom").html('');


    for (var i = 0; i < eventlist.length; i++) {
        console.log(eventlist[i]);
        var event = eventlist[i];
        var box = "";

        /* list right */

        var eventPage = 'location.href="/event:' + event.order + '"';

        box += "<button class='draw' onclick='" + eventPage + "'>";

        box += "<div>";
        box += "<h3>" + event.button_line_1 + "</h3>";
        box += "<h3>" + event.button_line_2 + "</h3>";
        box += "<h3>" + event.button_line_3 + "</h3>";
        box += "</div>";

        box += "</button>";


        $( "#index-event-table" ).append("<tr><td>" + box + "</td></tr>");



        /* list bottom */

        box = "";

        box += "<button class='draw' onclick='" + eventPage + "'>";

        box += "<div>";
        box += "<h3>" + event.button_line_1 + "</h3>";
        box += "<h3>" + event.button_line_2 + "</h3>";
        box += "<h3>" + event.button_line_3 + "</h3>";
        box += "</div>";

        box += "</button>";

        $("#index-event-box-bottom").append("<div class='event-btn-box col-xs-12 col-sm-6'>" + box + "</div>");
    }

    $("#index-event-box-right").addClass("onPage");
    $("#index-event-box-bottom").addClass("onPage");
}

