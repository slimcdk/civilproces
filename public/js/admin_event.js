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
            $('#delete_event_btn').removeClass("disabled").attr('onclick="deleteList('+ id +')"');
        } else {
            $('#delete_event_btn').addClass("disabled");
        }
    });
}

function deleteList(id){
    if(prompt("Er du sikker på, at listen skal slettes")){
        console.log("bekræftet");
    }
}