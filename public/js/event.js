var data = JSON.parse($("template").html());

window.onload = function(){

    $("form").each(function(){
        $(this).attr("action", $(this).attr("action") + data.index);
    });

    getData("part_length"+data.index, function(response){
        var free_seats = data.seats_available - response.length;

        $("#heading").text(data.title);
        $("#price").text("Pris: " + data.price + " DKK");
        $("#time_date").text("Dato: " + data.time);
        $("#seats").text("Pladser tilbage: " + free_seats + " ud af " + data.seats_available);
    });



    $('#signupform').find('#name').val(sessionStorage.getItem(data.index + "_name"));
    $('#signupform').find('#email').val(sessionStorage.getItem(data.index + "_email"));
    $('#signupform').find('#email_confirm').val(sessionStorage.getItem(data.index + "_email_confirm"));
    $('#signupform').find('#company').val(sessionStorage.getItem(data.index + "_company"));
    $('#signupform').find('#working_title').val(sessionStorage.getItem(data.index + "_working_title"));
};


// save values from input fields
function saveInputValues() {
    sessionStorage.setItem(data.index + "_name", $('#signupform').find('#name').val());
    sessionStorage.setItem(data.index + "_email", $('#signupform').find('#email').val());
    sessionStorage.setItem(data.index + "_email_confirm", $('#signupform').find('#email_confirm').val());
    sessionStorage.setItem(data.index + "_company", $('#signupform').find('#company').val());
    sessionStorage.setItem(data.index + "_working_title", $('#signupform').find('#working_title').val());
}
