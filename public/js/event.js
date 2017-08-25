

window.onload = function(){
    var data = JSON.parse($("template").html());

    $("form").each(function(){
        $(this).attr("action", $(this).attr("action")+data.index);
    });

    getData("part_length"+data.index, function(response){
        var free_seats = data.seats_available - response.length;

        $("#heading").text(data.title);
        $("#price").text("Pris: " + data.price + " DKK");
        $("#time_date").text("Dato: " + data.time);
        $("#seats").text("Pladser tilbage: " + free_seats + " ud af " + data.seats_available);

    });
};


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
