"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (room, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);


    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${room} says ${message}`;

    localStorage.setItem('msg', room)
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var room = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    const options = {
        method: 'POST'
    };
    fetch(`https://localhost:7108/api/Postitcard/AddCard`, options);

    connection.invoke("SendMessage", room, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
