﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



async function GetPostitcardLog() {
    const respons = await fetch('https://localhost:7237/api/Postitcard');
    let data = await respons.json();

    return data;
}