let employeesModel = [];

$(function () {
    initializeEmployeesModel();
    $("employee-search").on("keyup", () =>{
        let search = getFilteredEmployeesModel(this.value);
        console.log(search);
        refreshEmployeeRows();
    });

    $("body-row").on("click", () => {
        let returnedEmp = getEmployeeModelById($(this).attr("data-id"));
        returnedEmp.HireDate = moment(returnedEmp.HireDate).format("ll");
        let template = _.template(
            '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
            '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
            '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
        );
        let content = template(({'employees': returnedEmp}));
        showGenericModalfunction(returnedEmp.FirstName + " " + returnedEmp.LastName, content);
    });
});

function initializeEmployeesModel(){
    $.ajax({
        type: "GET",
        url: "https://young-chamber-27642.herokuapp.com/employees",
        contentType: "application/json",
    })
    .done((response) =>{
        employeesModel = response;
        refreshEmployeeRows(employeesModel);
    })
    .fail(() =>{
        showGenericModal('Error', 'Unable to get Employees');
    })
}

function showGenericModal(title,message){
    $("#genericModal .modal-tile").empty().append(title);
    $("#genericModal .modal-body").empty().append(message);
    $("#genericModal").modal('show');
}

function refreshEmployeeRows(employees){
    $("#employees-table").empty();
    let template= _.template('<% _.forEach(employees, function(employee){%>' 
                                +'<div class="row body-row" data-id="<% employee._id%>">'
                                    +'<div class="col-xs-4 body-column"><%_.escape(employee.firstName)%></div>'
                                    +'<div class="col-xs-4 body-column"><%_.escape(employee.lastName)%></div>'
                                    +'<div class="col-xs-4 body-column"><%_.escape(employee.positionName)%></div>'
                                +'</div>'
                                +'<% }); %>');
    $("#employees-table").append(template(({'employees': employees})));
}

function getFilteredEmployeesModel(filterString) {
    let filteredArray = _.filter(employeesModel, function(empModel){
        return (empModel.LastName.toUpperCase().includes(filterString) || 
                empModel.FirstName.toUpperCase().includes(filterString) ||
                empModel.Position.PositionName.toUpperCase().includes(filterString));
    });
    return filteredArray;
}

function getEmployeeModelById(id){
    let employeesReturn = null;
    $.grep(employeesModel, function(employee, i) {
        if(employee._id == id) {
            employeesReturn = _.cloneDeep(employee);
        }
        return false;
    });
    return employeesReturn;
}

