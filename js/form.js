
//update this with your js_form selector
var form_id_js = "contact-form ";

var data_js = {
    "access_token": "4dcdg87nxyfcr0ixutcg1zi3"
};

function js_onSuccess() {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function js_onError(error) {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = document.getElementById("contact-form-submit");

function js_send() {
    sendButton.value = 'Sending…';
    sendButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
            if (request.readyState == 4) {
                js_onError(request.response);
            }
    };

    var name = document.querySelector("#" + form_id_js + " [name='name']").value;
    var email = document.querySelector("#" + form_id_js + " [name='email']").value;
    var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
    var message = document.querySelector("#" + form_id_js + " [name='message']").value;
    var formattedMessage = `Name: ${name}\nEmail: ${email}\n\n\n\nMessage: ${message}`;
    data_js['subject'] = subject;
    data_js['text'] = formattedMessage;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

// sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);

js_form.addEventListener("submit", function (e) {
    if (js_form.checkValidity) {
        e.preventDefault();
        js_send();
    }
});