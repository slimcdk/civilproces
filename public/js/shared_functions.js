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

