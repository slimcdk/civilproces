var data = JSON.parse($("template").html());

window.onload = function(){

    getData("part_length"+data.event_id, function(response){
        var free_seats = data.seats_available - response.length;

        $("#heading").text(data.title);
        $("#price").text("Pris: " + data.price + " DKK");
        $("#time_date").text("Dato: " + data.time);
        $("#seats").text("Pladser tilbage: " + free_seats + " ud af " + data.seats_available);
    });

    $('#signupform').find('#name').val(sessionStorage.getItem(data.event_id + "_name"));
    $('#signupform').find('#email').val(sessionStorage.getItem(data.event_id + "_email"));
    $('#signupform').find('#email_confirm').val(sessionStorage.getItem(data.event_id + "_email_confirm"));
    $('#signupform').find('#company').val(sessionStorage.getItem(data.event_id + "_company"));
    $('#signupform').find('#working_title').val(sessionStorage.getItem(data.event_id + "_working_title"));
};

// save values from input fields
function saveInputValues() {
    sessionStorage.setItem(data.event_id + "_name", $('#signupform').find('#name').val());
    sessionStorage.setItem(data.event_id + "_email", $('#signupform').find('#email').val());
    sessionStorage.setItem(data.event_id + "_email_confirm", $('#signupform').find('#email_confirm').val());
    sessionStorage.setItem(data.event_id + "_company", $('#signupform').find('#company').val());
    sessionStorage.setItem(data.event_id + "_working_title", $('#signupform').find('#working_title').val());

    $('#signupform').append(
        "<div class='form-group hidden'>" +
        "<input id='seats_available' type='number' value='"+ data.seats_available +"' name='seats_available'>" +
        "<input id='event_id' value='"+ data.event_id +"' name='event_id'>" +
        "</div>"
    );
}