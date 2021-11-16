var chatRoomId;
var baseUrl =  window.location + "get/";
var userId;
var clock;
var online = false;

$(document).ready(function () {

    $("#connect").click(function () {
        connect();
    })
    $("#disconnect").click(function () {
        disconnect();
    })

    $("#send").click(function () {
        send();
    })
})

function connect() {
    if (!online) {
        var usernameId = $("#username").val();
        $("#username").val("");
        console.log(usernameId);
        if (usernameId == "") {
            $('#inbox').empty();
            $("#inbox").append("<p>Invalid username</p>");
        } else {
            $.ajax({
                method: "POST",
                url: baseUrl,
                data: usernameId,
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (data) {
                if (data.chatRoomId == null || data.chatRoomId == undefined) {
                    $('#inbox').empty();
                    $("#inbox").append("<p>Repeated user</p>");
                    online = false;
                } else {
                    chatRoomId = data.chatRoomId;
                    userId = data.id;
                    console.log("ChatRoom id: " + chatRoomId + " Player id: " + userId);
                    clock = setInterval(function () {
                        checkConnection();
                    }, 1000);
                    online = true;
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                disconnect();
                $('#inbox').empty();
                $("#inbox").append("<p>The server has disconnected</p>");
            });

        }
    }
}

function disconnect() {
    if (online) {
        clearInterval(clock);
        online = false;
        $('#users').empty();
        $('#users').append("<p>Disconnected<p>");
        $('#inbox').empty();
    }
}
function send() {
    var currentDate = new Date();
    var localDate = currentDate.toLocaleTimeString();
    if (online) {
        var textMessage = $("#messageInput").val();
        $("#messageInput").val("");
        $("#messageInput").val("");
        var message = {
	        date: localDate,
            username: "" + userId + "",
            textMessage: textMessage
        }
        $.ajax({
            method: "POST",
            url: baseUrl + chatRoomId,
            data: JSON.stringify(message),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
        // $('#info').append("<div>" + message + "</div>");
        console.log("Item created: " + JSON.stringify(message));
    }
}

function checkConnection() {
    $.ajax({
        url: baseUrl + chatRoomId + "/" + userId,
    }).done(function (data) {
        $('#users').empty();
        $('#users').append("<p>ChatRoom id: " + chatRoomId + "</p>");
        $('#users').append("<p>User id: " + userId + "</p>");
        $('#users').append("<p>Users online: " + data.users.length + ":</p>");
        for (var i = 0; i < data.users.length; i++) {
            $("#users").append("<p>-" + data.users[i] + "</p>");
        }
        $('#inbox').empty();
        for (var i = 0; i < data.messages.length; i++) {
            var value = data.messages[i];
            console.log("[" + value.date + "] (" + value.username + "): " + value.textMessage);
            $("#inbox").append("<p>[" + value.date + "] (" + value.username + "): " + value.textMessage + "</p>")
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        disconnect();
        $('#inbox').empty();
        $("#inbox").append("<p>The server has disconnected</p>");
    });

}