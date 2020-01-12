$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: '/api/roles',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (allRoles) {
            let checkboxBlock = "";
            for (let i = 0; i < allRoles.length; i++) {
                const roleId = allRoles[i].id;
                const role = allRoles[i].role;
                checkboxBlock += '<label class=\"btn btn-outline-secondary\">';
                checkboxBlock += "<span>" + role + "</span>";
                checkboxBlock += "<input class='userRoles' type=\"checkbox\" id=\"" + roleId + "\" value=\"" + role + "\">";
                checkboxBlock += "</label>";
            }
            $("#roles").html(checkboxBlock);
        }
    })
});

