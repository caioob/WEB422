let employeesModel = [];

$(function () {
    initializeEmployeesModel();
    $("#employee-search").on("keyup", (data) =>{
        let employee = getFilteredEmployeesModel(data.target.value);
        refreshEmployeeRows(employee);
    });

    $(document.body).on('click', '.body-row' ,function(empl){
        let employee = getEmployeeModelById($(this).attr("data-id"));
        if(employee != null){
            employee.HireDate = moment(employee.HireDate).format('L');
            
            let modalTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
                '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
              );

              let modalValues = modalTemplate({'employee':employee});
   
              showGenericModal(employee.FirstName + ' ' + employee.LastName, modalValues);
        }
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
};

function showGenericModal(title,message){
    $("#genericModal .modal-tile").empty().append(title);
    $("#genericModal .modal-body").empty().append(message);
    $("#genericModal").modal('show');
};

function refreshEmployeeRows(employees){
    $("#employees-table").empty();
    let template= _.template('<% _.forEach(employees, function(employee){%>' 
                                +'<div class="row body-row" data-id="<%- employee._id%>">'
                                    +'<div class="col-xs-4 body-column" style="text-align: center"><%- _.escape(employee.FirstName)%></div>'
                                    +'<div class="col-xs-4 body-column" style="text-align: center"><%- _.escape(employee.LastName)%></div>'
                                    +'<div class="col-xs-4 body-column" style="text-align: center"><%- _.escape(employee.Position.PositionName)%></div>'
                                +'</div>'
                                +'<% }); %>');
    $("#employees-table").append(template(({'employees': employees})));
};


function getFilteredEmployeesModel(filterString){
    let filteredEmployeesModel = _.filter(employeesModel, (employee) => {
        return employee.FirstName.toUpperCase().includes(filterString.toUpperCase())
            || employee.LastName.toUpperCase().includes(filterString.toUpperCase())
            || employee.Position.PositionName.toUpperCase().includes(filterString.toUpperCase());          
    });
    return filteredEmployeesModel;        
};

function getEmployeeModelById(id){
    let copy;
    $.grep(employeesModel, (employee) => {
        if(employee._id == id) {
            copy = _.cloneDeep(employee);
        }
        return false;
    });
    
    return copy;
};