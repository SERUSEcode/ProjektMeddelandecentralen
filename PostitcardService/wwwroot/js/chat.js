"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", async function (room, message) {

    

    let data = await GetAllCards();

    var newDiv = document.createElement("div");
    newDiv.className = "card";

    var newP = document.createElement("p");
    var node = document.createTextNode(`ID: ${room} och ${message}.`);
    newP.appendChild(node);
    newDiv.appendChild(newP);

    document.getElementById("printText").prepend(newDiv);
    SavePostitcard(room, message);

    // const data = await GetAllCards();

    // const dataLength = data.length;

    // console.log(dataLength);
    // console.log(data[dataLength].room);


    // const newButton = document.createElement('button');
    // newButton.innerHTML = 'Remove';
    // newButton.onclick = function() {
    //     RemoveCard(thisID);
    // }

    // const newDiv = document.createElement("div");
    // newDiv.className = "card";

    // const newP = document.createElement("p");
    // const node = document.createTextNode(`ID: ${room} , ${message} }.`);

    // newP.appendChild(node);
    // newDiv.appendChild(newP);
    // newDiv.appendChild(newButton);
    

    // document.getElementById("printText").prepend(newDiv);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var room = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    

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
    
    let data = await GetAllCards();
    
    console.log(data)
    for (let i = data.length - 1; i >= 0; i--) {

        const newButton = document.createElement('button');
        newButton.innerHTML = 'Remove';
        newButton.onclick = function() {
            RemoveCard(data[i].id);
        }

        const newDiv = document.createElement("div");
        newDiv.className = "card";

        const newP = document.createElement("p");
        const node = document.createTextNode(`Rum: ${data[i].room} Meddelande: ${data[i].message} }.`);

        newP.appendChild(node);
        newDiv.appendChild(newP);
        newDiv.appendChild(newButton);
        

        document.getElementById("printText").appendChild(newDiv);
    }
}

async function GetAllCards() {
    const respons = await fetch('https://localhost:7237/api/Postitcard');
    let data = await respons.json();

    return data;
}

async function RemoveCard (id) {

    const options = {
        method: 'Delete'
    };
    fetch(`https://localhost:7237/api/Postitcard/${id}`, options);

    console.log(`The card ${id} was pressed`);
} 