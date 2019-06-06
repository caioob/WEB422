/************************************************************************************************************************
 *  *  WEB422 –Assignment 1 *I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  *  No part of this assignment has been copied manually or electronically from any other source 
 *  (including web sites) or distributed to other students. 
 *  *Name:Caio Basaglia Student ID: 152593174 Date: 06/06/2019 
 *  
 ************************************************************************************************************************/ 


$(function() {
    console.log("jQuery working");
    
    //Teams menu
    $("#teams-menu").on("click", () => {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/teams",
            contentType: "application/json",
            success: function (data) {
                $("#data").empty();
                var h3 = $('<h3>');
                h3.text("Teams");
                $("#data").append(h3);
                $("#data").append(JSON.stringify(data));
            }
        });
    });

    //Employees menu
    $("#employees-menu").on("click", () => {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/employees",
            contentType: "application/json",
            success: function (data) {
                $("#data").empty();
                var h3 = $('<h3>');
                h3.text("Employees");
                $("#data").append(h3);
                $("#data").append(JSON.stringify(data));
            }
        });
    });

    //Projects menu
    $("#projects-menu").on("click", () => {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/projects",
            contentType: "application/json",
            success: function (data) {
                $("#data").empty();
                var h3 = $('<h3>');
                h3.text("Projects");
                $("#data").append(h3);
                $("#data").append(JSON.stringify(data));
            }
        });
    });

    //Positions menu
    $("#positions-menu").on("click", () => {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/positions",
            contentType: "application/json",
            success: function (data) {
                $("#data").empty();
                var h3 = $('<h3>');
                h3.text("Positions");
                $("#data").append(h3);
                $("#data").append(JSON.stringify(data));
            }
        });
    });

    

});