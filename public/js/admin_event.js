/**
 * Created by chris on 18-08-2017.
 */

// ask for number of events available and process response
getData("length", function(response){

    for( var i = 1; i <= response.length; i++){
        readPage(i, function(data, id){
            var title = template_to_json(data).title;
            var output = '<li><a onclick="drawLists('+id+')"><b>'+title+'</b></a></li>';
            $('#event_menu').find("ul").append(output);
        });
    }
});
function readPage(id, handleData) {
    $.get('/event:'+id).then(function(responseData) {
        handleData(responseData, id);
    });
}


function drawLists(id) {
    $('#data_insert').find("tr").remove();
    $('#delete_event_btn').find("button").remove();
    getData(id, function(response){
        if(response.length > 0){
            var output = "";
            for(var i = 0; i < response.length; i++) {
                output += "<tr>";
                output += '<td>' + (i+1) + '</td>';
                output += '<td>' + response[i].name + '</td>';
                output += '<td>' + response[i].company + '</td>';
                output += '<td>' + response[i].working_title + '</td>';
                output += '<td class="email_list">' + response[i].email + '</td>';
                output += "</tr>";
            }
            $('#data_insert').append(output);
            $('#delete_event_btn').append('<button class="btn btn-success" onclick="copyToClipboard('+id+')">Kopiér listen til udklipsholderen</button>');
            $('#delete_event_btn').append('<button class="btn btn-danger" onclick="deleteList('+id+')">Slet listen til dette event</button>');
            $('#delete_event_btn').append('<button class="btn btn-default" href="mailto:'+collectMails(response)+'">Send mail til alle</button>');

        } else {
            $('#data_insert').append('<tr><td><b>Der er ingen tilmeldte på nuværende tidspunkt</b></td></td>');
            //$('#event_table').remove();
        }
    });
}

function collectMails (data) {
    console.log("data ",data);
    var mail_list = "";

    for(var i = 0; i < data.length; i++){
        mail_list += data[i].email;
        mail_list += ",";
    }
    mail_list = mail_list.substring(0, mail_list.length - 1);
    console.log(mail_list);
    return mail_list;
}


function getData(id, handleData) {
    $.ajax({
        type: "GET",
        url: "/data:" + id,
        dataType: 'json',
        success: function(data) {
            handleData(data);
        }
    });
}


function deleteList(id){
    if(confirm("Er du sikker på, at listen skal slettes?")){
        $.ajax({
            type: "POST",
            url: "/delete:" + id,
            success: location.reload(true)
        });
    }
}