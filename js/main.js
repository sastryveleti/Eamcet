var data;
$(document).ready(function () {
    if(sessionStorage.getItem("log")==null)
    {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", "data/day1.json", true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4 && rawFile.status == 0) {
            data = JSON.parse(rawFile.responseText);
            var template = $('#handlebars-demo').html();
            var templateScript = Handlebars.compile(template);
            var html = templateScript(data);
            var submitbutton = '<div class="center"><button class="btn waves-effect waves-light" type="submit" name="action" onclick="submitHandler()">Submit</button></div>'
            $(document.body).append(html);
            $(document.body).append(submitbutton);
        }
    }
    rawFile.send(null);
    var time = 60 * 60,
    display = document.querySelector('#time');
    startTimer(time, display);
    }
    else{
        document.write("You have already written the exam");
    }
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if(timer == 0){
            alert("Time Up");
            window.location="End.html"
        }
    }, 1000);
}


$("input:checkbox").on('click', function () {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
});



function submitHandler() {
    var checkedValue;
    var datak;
    var rawFile1 = new XMLHttpRequest();
    rawFile1.overrideMimeType("application/json");
    rawFile1.open("GET", "data/day1k.json", true);
    rawFile1.onreadystatechange = function () {
        if(rawFile1.readyState == 4 && rawFile1.status == 0){
        datak = JSON.parse(rawFile1.responseText);
        correct(datak);
        }
    }
    rawFile1.send(null);

}

function correct(datak) {
    var countval = 0;
    var questionAns=0;
    console.log(datak);
    for (var i in data["questions"]) {
        checkedValue = $('.' + data["questions"][i]["questionId"] + ':checked').val();
        if(checkedValue== undefined){
            questionAns++;
        }
        if (datak["key"][i]["keyVal"] == checkedValue) {
            countval++;
        }
    }
    alert("Bo of questions answered : "+questionAns+"\n"+"No of questions Correct is : "+countval);
    sessionStorage.setItem("log","ended");
    window.location="End.html"
}