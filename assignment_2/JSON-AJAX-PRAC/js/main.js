$(function(){
    $("#tableButton").on("click", () =>{
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/", //I was not able to request the local file, so I made a simple server to send the JSON file. The source code for the server is included in the "a2_server" folder
            contentType: "application.json",
            success: function (data) {
                
                $.each(data, function(i, value){
                    var tr = $("<tr>");
                    tr.append("<td>"+value.school_id+"</th>");
                    tr.append("<td>"+value.school_name+"</th>");
                    tr.append("<td>"+value.address+"</th>");
                    tr.append("<td>"+value.school_type+"</th>");
                    $("#body").append(tr);
                });
            }
        });
    });
    $("#tableButton2").on("click", () =>{
        $("#body").empty(); 
    });
});