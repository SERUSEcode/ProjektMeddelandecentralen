"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (room, message) {

    var newP = document.createElement("p");
    var node = document.createTextNode(`ID: ${room} och ${message}.`);
    newP.prepend(node);

    document.getElementById("printText").prepend(newP);

    // var li = document.createElement("li");
    // document.getElementById("messagesList").appendChild(li);


    // // We can assign user-supplied strings to an element's textContent because it
    // // is not interpreted as markup. If you're assigning in any other way, you 
    // // should be aware of possible script injection concerns.
    // li.textContent = `${room} says ${message}`;

    // const newP = document.createElement("p");
    // const node = document.createTextNode(`ID: ${data[i].id}.`);
    // newP.appendChild(node);

});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var room = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    SavePostitcard(room, message);

    connection.invoke("SendMessage", room, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

async function SavePostitcard(room, message) {
    const options = {
        method: 'POST'
    };
    fetch(`https://localhost:7237/api/Postitcard/AddCard?room=${room}&msg=${message}`, options);
}

async function PrintAllPostitcards() {
    
    const respons = await fetch('https://localhost:7237/api/Postitcard');
    let data = await respons.json();

    console.log(data);
    console.log(data[0].id);

    // data.forEach(card => {
    //     console.log(card);
    // });
    
    for (let i = data.length - 1; i >= 0; i--) {
        console.log(data.length);
        const newP = document.createElement("p");
        const node = document.createTextNode(`ID: ${data[i].room} , ${data[i].message} }.`);
        newP.appendChild(node);
        
        document.getElementById("printText").appendChild(newP);
    }
}