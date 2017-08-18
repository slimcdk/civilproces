/**
 * Created by chris on 18-08-2017.
 */

$.ajax({
    type: "PUT",
    url: "/users/userupdate"/* + username + "/" + email + "/" + age + "/" + studie + "/" + fakultet + "/" + steam + "/" + bnet*/,
    dataType: 'json',
    data: data,
    success: function (data){
        if (typeof data.redirect === 'string'){
            window.location = data.redirect
        }
    }
});


function sendData() {

    $.ajax({
        type: "PUT",
        url: "/users/userupdate"/* + username + "/" + email + "/" + age + "/" + studie + "/" + fakultet + "/" + steam + "/" + bnet*/,
        dataType: 'json',
        data: data,
        success: function (data){
            if (typeof data.redirect === 'string'){
                window.location = data.redirect
            }
        }
    });
}