/**
 * Created by chris on 18-08-2017.
 */

getAdminData("length", function(response){
    var events = [];

    for(var i = 1; i <= response.length; i++){
        readPage(i, function(data){
            events.push(slot_to_json(data));

            if (events.length === response.length) {
                // drawTaps(events);
                dataReady(events);
            }
        });
    }
});

function dataReady(events) {
    events = sortEvents(events);

    createMenu(events);

    for (var i = 0; i < events.length; i++) {
        createTabel(events[i]);
    }
}

function createMenu(events) {
    var tabs = "";

    tabs += "<table><tr>";

    for (var i = 0; i < events.length; i++) {
        tabs += "<td>";
        tabs += "<button class='eventbutton' id='eventbutton_" + events[i].event_id + "' onclick='adminShowTabel(" + events[i].event_id + ")'>" + events[i].title + "</button>";
        tabs += "</td>"
    }

    tabs += "</tr></table>";

    $("#tabs_box").html(tabs);
}

function adminShowTabel(id) {
    console.log(id);

    $(".eventlist_item").hide(200);
    $(".eventbutton").removeClass("chosen_event");
    $("#eventbutton_" + id).addClass("chosen_event");
    $("#eventlist_" + id).show(200);
}

function createTabel(event) {
    console.log(event);

    getAdminData(event.event_id, function(response){
        console.log(response);
        var table = "";

        if(response.length > 0){
            table += "<table border='1'>";

            table += tableHead();

            for (var i = 0; i < response.length; i++) {
                table += createTabelRow(response[i], i);
            }

            table += "</table>";

            table += "<a href='mailto:" + collectMails(response) + "'><b>Send mail til alle</b></a>";
            table += "<button onclick='deleteList(" + response[0].event_id + ")'>Slet listen til dette event</button>";
        } else {
            table += "<h4>Ingen tilmeldte</h4>";
        }

        //"<h2>" + event.title + ", order: " + event.order + ", event_id: " + event.event_id + "</h2>"

        $("#table_box").append("<div class='eventlist_item' id='eventlist_" + event.event_id + "'><h2>" + event.title + "</h2>" + table + "</div>");
    });
}

function tableHead() {
    var head = "";

    head += "<thead>";
    head += "<th>#</th>";
    head += "<th>Navn</th>";
    head += "<th class='hidden-xs'>Firma</th>";
    head += "<th class='hidden-xs'>Titel</th>";
    head += "<th>E-mail</th>";
    head += "<th class='hidden-xs'>Tilmeldt</th>";
    head += "<th class='hidden-xs'>Afmeld</th>";
    head += "</thead>";

    return head;
}

function createTabelRow(user, index) {
    var item = "";

    item += "<tr>";
    item += '<td>' + (index + 1) + '</td>';
    item += "<td>" + user.name + "</td>";
    item += "<td class='hidden-xs'>" + user.company + "</td>";
    item += "<td class='hidden-xs'>" + user.working_title + "</td>";

    item += "<td class='hidden-xs'><a href='mailto:" + user.email + "'>" + user.email + "</a></td>";
    item += "<td class='visible-xs'><a href='mailto:" + user.email + "'>Send mail</a></td>";

    item += "<td class='hidden-xs'>" + convertTimeNoYear(user.signup_date) + "</td>";
    item += "<td class='hidden-xs'><button onclick='removePart(" + user.event_id + ',' + JSON.stringify(user.email) + ")'>Afmeld deltager</button></td>";
    item += "<tr>";

    return item;
}










/*function drawTaps(events) {
    events = sortEvents(events);
    for(var i = 0; i < events.length; i++){
        var title = events[i].title;
        var id = events[i].event_id;

        var output = '<li><a onclick="drawLists('+id+')"><b>' + title+'</b></a></li>';
        $('#event_menu').find("ul").append(output);
    }

    // if session storage has event_id from previous selection, use that
    if (sessionStorage.getItem("adminpage_eventid") !== "null") {
        drawLists(sessionStorage.getItem("adminpage_eventid"));
    }
}


function drawLists(id) {
    sessionStorage.setItem("adminpage_eventid", id);
    $('#data_insert').find("tr").remove();
    $('#delete_event_btn').find("button").remove();

    getAdminData(id, function(response){
        if(response.length > 0){
            var output = "";
            for(var i = 0; i < response.length; i++) {
                output += "<tr>";
                output += '<td>' + (i+1) + '</td>';
                output += '<td>' + response[i].name + '</td>';
                output += '<td>' + response[i].company + '</td>';
                output += '<td>' + response[i].working_title + '</td>';
                output += '<td><a href="mailto:'+response[i].email+'">' + response[i].email + '</a></td>';
                output += '<td>' + convertTimeNoYear(response[i].signup_date) + '</td>';
                output += "<td><button class='btn btn-danger' onclick='removePart("+ response[i].event_id + ',' + JSON.stringify(response[i].email) +")'>Afmeld deltager</button></td>";
                output += '</tr>';
            }
            output += '<tr>';
                output += '<td></td>';
                output += '<td></td>';
                output += '<td></td>';
                output += '<td></td>';
                output += '<td><a href="mailto:'+collectMails(response)+'"><b>Send mail til alle</b></a></td>';
                output += '<td></td>';
                output += '<td><button class="btn btn-danger" onclick="deleteList('+response[0].event_id+')">Slet listen til dette event</button></td>';
            output += '</tr>';

            $('#data_insert').append(output);
            //$('#delete_event_btn').append('<button class="btn btn-danger" onclick="deleteList('+id+')">Slet listen til dette event</button>');
        } else {
            $('#data_insert').append('<tr><td><b>Der er ingen tilmeldte på nuværende tidspunkt</b></td></td>');
        }
    });
}*/

function collectMails (data) {
    var mail_list = "";
    for(var i = 0; i < data.length; i++){
        mail_list += data[i].email;
        mail_list += ",";
    }
    mail_list = mail_list.substring(0, mail_list.length - 1);
    return mail_list;
}






















function deleteList(id){
    if(confirm("Er du sikker på, at listen skal slettes?")){
        $.ajax({
            type: "POST",
            url: "/delete:" + id,
            success: location//drawLists(id)
        });
    }
}

function removePart(id, participant){
    if(confirm("Er du sikker på, at personen skal afmeldes?")){
        $.ajax({
            type: "POST",
            url: "/remove",
            data: {id, participant},
            success: location//drawLists(id)
        });
    }
}

function getAdminData(id, handleData) {
    $.ajax({
        type: "GET",
        url: "/opdata:" + id,
        dataType: 'json',
        success:function(data) {
            handleData(data);
        }
    });
}