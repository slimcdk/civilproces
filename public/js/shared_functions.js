
function template_to_json(text){
    var result = JSON.parse($(text).find("template").html());
    /*
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
    */
    return result;
}



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


function sortEvents(events) {
    var result = [];

    for (var i = 1; i <= events.length; i++) {
        for (var j = 0; j < events.length; j++) {
            if (events[j].index == i) {
                result.push(events[j]);
            }
        }
    }

    return result;
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

function readPage(id, handleData) {
    $.get('/event:'+id).then(function(responseData) {
        handleData(responseData);
    });
}
