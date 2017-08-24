//string = "hello world"
//string.indexOf("o")   = 4
//string.slice(1, 4)    = "ell"
//string.split("o")     = ["hell", " w", "rld"]
//array1.concat(array2) = array1 + array2
//string.charCodeAt(2)  = 108
//string.trim()

function template_to_json(text) {
    var i;
    var temp = text.slice(text.indexOf("<template>") + 12, text.indexOf("</template>") - 1);

    temp = temp.split("\n");

    for (i = 0; i < temp.length; i++) {
        temp[i] = temp[i].trim();
    }

    var result = "{";
    for (i = 0; i < temp.length; i++) {
        result += temp[i];
    }
    result += "}";

    result = JSON.parse(result);

    return result;
}


// save values from input fields
function saveInputValues() {
    sessionStorage.setItem("name", $('#signupform').find('#name').val());
    sessionStorage.setItem("email", $('#signupform').find('#email').val());
    sessionStorage.setItem("email_confirm", $('#signupform').find('#email_confirm').val());
    sessionStorage.setItem("company", $('#signupform').find('#company').val());
    sessionStorage.setItem("working_title", $('#signupform').find('#working_title').val());
}

// load values from session storage to display in input fields
window.onload = function() {
    // If values are not blank, restore them to the fields
    var name = sessionStorage.getItem('name');
    if(name !== null || name !== "undefined") $('#signupform').find('#name').val(name);

    var email = sessionStorage.getItem('email');
    $('#signupform').find('#email').val(email);

    var email_confirm = sessionStorage.getItem('email_confirm');
    $('#signupform').find('#email_confirm').val(email_confirm);

    var company = sessionStorage.getItem('company');
    $('#signupform').find('#company').val(company);

    var working_title = sessionStorage.getItem('working_title');
    $('#signupform').find('#working_title').val(working_title);
};


// used for warping time space into understandable text for human species
var monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function convertTimeNoYear(time){
    if (typeof time === "number"){
        if(time === 1 || time === 0.1) {
            return time+" time";
        } else {
            return time+" timer";
        }
    } else if (typeof time !== "number") {
        var month = monthNames[new Date(time).getMonth()];
        var day = new Date(time).getDate();
        var hour = new Date(time).getHours();
        if (hour < 10){
            hour = "0" + hour;
        }
        var min = new Date(time).getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        time = day +". " + month +" kl: " + hour + ":" + min;
        return time;
    }
}