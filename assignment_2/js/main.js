let employeesModel = [];

$(function () {
    initializeEmployeesModel();
});

function initializeEmployeesModel() {
    $.ajax({
        type: "GET",
        url: "https://young-chamber-27642.herokuapp.com/employees",
        contentType: "application/json",
        success: function (response) {
            console.log("API Connected");
            employeesModel = response;
            refreshEmployeeRows(employeesModel);
        }
    })
    .fail(() => {
        showGenericModal("Error", "Unable to get Employees");
    })
}

function showGenericModal(title,message){
    $("#genericModal .modal-tile").empty().append(title);
    $("#genericModal .modal-body").empty().append(message);
    $("#genericModal").modal('show');
}

function refreshEmployeeRows(employees){
    $("#employees-table").empty();
    
    let template = _.template(
                    '<% _.forEach(employees, function(employee){ %>'
                        +'<% console.log("template/_.forEach working") %>'
                        +' <div class="row body-row" data-id=" <% employee._id %> ">'
                        +'      <div class="col-xs-4 body-column"> <% employee.FirstName %> </div>'
                        +'      <div class="col-xs-4 body-column"> <% employee.LastName %> </div>'
                        +'      <div class="col-xs-4 body-column"> <% employee.Position %> </div>'
                        +'</div>'
                    +'<% }); %>');
    let populatedTemplate = template({'employees': employees });
    console.log(employees[0]._id);
    $("#employees-table").append(populatedTemplate);
}