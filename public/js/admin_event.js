/**
 * Created by chris on 18-08-2017.
 */


function getData (event){
    $.ajax({
        type: "GET",
        url: "event_" + event + "_json",
        dataType: 'json',
        success: function (data){
            console.log("Get data: ", data);
        }
    });
}
