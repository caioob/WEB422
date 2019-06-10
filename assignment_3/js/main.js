/************************************************************************************************************************
 *  *  WEB422 –Assignment 3 *I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  *  No part of this assignment has been copied manually or electronically from any other source 
 *  (including web sites) or distributed to other students. 
 *  *Name:Caio Basaglia Student ID: 152593174 Date: 09/06/2019 
 *  
 ************************************************************************************************************************/ 

var myViewModel  = {
    teams:     ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
}

function showGenericModal(title,message){
    $("#genericModal .modal-tile").empty().append(title);
    $("#genericModal .modal-body").empty().append(message);
    $("#genericModal").modal('show');
}

function initializeTeams(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/teams-raw",
            contentType: "application/JSON",
        })
        .done((response) => {
            myViewModel.teams = ko.mapping.fromJS(response);
            resolve();
        })
        .fail(() => {
            reject("Error loading the team data.");
        })
    });
}

function initializeEmployees(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/employees",
            contentType: "application/JSON",
        })
        .done((response) => {
            myViewModel.employees = ko.mapping.fromJS(response);
            resolve();
        })
        .fail(() => {
            reject("Error loading the employee data.");
        })
    });
}

function initializeProjects(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "https://young-chamber-27642.herokuapp.com/projects",
            contentType: "application/JSON",
        })
        .done((response) => {
            myViewModel.projects = ko.mapping.fromJS(response);
            resolve();
        })
        .fail(() => {
            reject("Error loading the project data.");
        })
    });
}



$(function (){
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(() => {
        ko.applyBindings(myViewModel);
        $("#multiple").multipleSelect({ filter: true });
        $("#single").multipleSelect({ single: true, filter: true });
    })
    .catch((err) => showGenericModal("Error", err))
})

function saveTeam(){
    var currentTeam = this;
    $.ajax({
        type: "PUT",
        url: "https://young-chamber-27642.herokuapp.com/team/:"+currentTeam._id(),
        data: JSON.stringify({
            Projects: currentTeam.Projects(),
            Employees: currentTeam.Employees(),
            TeamLead: currentTeam.TeamLead()
        }) 
    })
    .done((response) =>{
        showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully");
    })
    .fail((err) => {showGenericModal("Error", " Error updating the team information"); console.log("oi")})
}