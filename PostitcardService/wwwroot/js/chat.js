"use strict";
var messages;
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("RemoveMessage", async function (id) {

    messages = messages.filter(x => {
        return x.id != id;
    })
    
    await PrintAllPostitcards();
})

connection.on("ReceiveMessage", async function (room, message) {

    await SaveLocalPostitcard(room, message);
    
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", async function (event) {
    var room = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;


   await SaveDBPostitcard(room, message);

    connection.invoke("SendMessage", room, message).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});

async function PrintAllPostitcards() {

    if (messages == undefined) {
        await GetAllCards();
    }

    document.getElementById("printText").innerHTML = ``;
    
    console.log(messages)
    for (let i = messages.length - 1; i >= 0; i--) {

        const newButton = document.createElement('button');
        newButton.innerHTML = 'Remove';
        newButton.className = `removeCardButton`;
        newButton.id = messages[i].id;
        newButton.onclick = function() {
            connection.invoke("RemoveMessage", messages[i].id).catch(function (err) {
                return console.error(err.toString());
            });;
        }

        const newDiv = document.createElement("div");
        newDiv.className = "card";

        const newP = document.createElement("p");
        const node = document.createTextNode(`Rum: ${messages[i].room} Meddelande: ${messages[i].message} }.`);

        newP.appendChild(node);
        newDiv.appendChild(newP);
        newDiv.appendChild(newButton);
        
        document.getElementById("printText").appendChild(newDiv);
    }
}

async function SaveLocalPostitcard(room, message) {

    messages = messages.concat({"room":room, "message": message})

    await PrintAllPostitcards();
}

async function SaveDBPostitcard(room, message) {
    const options = {
        method: 'POST'
    };
    await fetch(`https://localhost:7237/api/Postitcard/AddCard?room=${room}&msg=${message}`, options);
}

async function GetAllCards() {
    const respons = await fetch('https://localhost:7237/api/Postitcard');
    let data = await respons.json();

    messages = data;
}

// async function RemoveCard (position) {

//     let data = GetAllCards();

//     const index = data.indexOf(position);

//     console.log(index);

//     const options = {
//         method: 'Delete'
//     };
//     fetch(`https://localhost:7237/api/Postitcard/${id}`, options);

//     console.log(`The card ${id} was pressed`);
// } 