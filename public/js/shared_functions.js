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


function saveInputValues() {
    sessionStorage.setItem("name", $('#signupform').find('#name').val());
    sessionStorage.setItem("email", $('#signupform').find('#email').val());
    sessionStorage.setItem("company", $('#signupform').find('#company').val());
    sessionStorage.setItem("working_title", $('#signupform').find('#working_title').val());
}

window.onload = function() {
    // If values are not blank, restore them to the fields
    var name = sessionStorage.getItem('name');
    if(name !== null || name !== "undefined") $('#signupform').find('#name').val(name);

    var email = sessionStorage.getItem('email');
    $('#signupform').find('#email').val(email);

    var company = sessionStorage.getItem('company');
    $('#signupform').find('#company').val(company);

    var working_title = sessionStorage.getItem('working_title');
    $('#signupform').find('#working_title').val(working_title);
};
