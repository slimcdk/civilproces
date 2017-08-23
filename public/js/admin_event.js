/**
 * Created by chris on 18-08-2017.
 */

function createTaps(){
    getData("length", function(response){
        var output = "";
        for(i = 1; i <= response.length; i++) {
            output += '<li><a onclick="drawLists('+i+')">Event '+i+'</a></li>';
        }
        $('#event_menu').find("ul").append(output);
    });
}

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

function drawLists(id) {
    $('#data_insert').find("tr").remove();
    $('#delete_event_btn').find("button").remove();
    getData(id, function(response){
        console.log(response.length);
        if(response.length > 0){
            var output = "";
            for(i = 0; i < response.length; i++) {
                output += "<tr>";
                output += '<td>' + response[i].name + '</td>';
                output += '<td>' + response[i].company + '</td>';
                output += '<td>' + response[i].working_title + '</td>';
                output += '<td>' + response[i].email + '</td>';
                output += "</tr>";
            }
            $('#data_insert').append(output);
            // $('#delete_event_btn').find("button").removeClass("disabled");
            $('#delete_event_btn').append('<button class="btn btn-danger" onclick="deleteList('+id+')">Slet listen til dette event</button>');
        } else {
            alert("Der er ingen tilmeldte til dette event");
        }
    });
}

function deleteList(id){
    if(confirm("Er du sikker på, at listen til event "+id+" skal slettes")){
        $.ajax({
            type: "POST",
            url: "/delete:" + id
        });
    }
}