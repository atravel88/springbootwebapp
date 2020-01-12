editUserform = $("#editUserForm");
editModal = $('#editModal');

editModal.on('show.bs.modal', function (event) {
    const modal = $(this);
    const id = $(event.relatedTarget).data('id');
    $.ajax({
        url: '/api/users/' + id,
        method: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (user) {
            modal.find('.modal-title').text("Edit " + user.email);
            modal.find('.modal-body #firstNameForEdit').val(user.firstName);
            modal.find('.modal-body #lastNameForEdit').val(user.lastName);
            modal.find('.modal-body #ageForEdit').val(user.age);
            modal.find('.modal-body #emailForEdit').val(user.email);
            modal.find('.modal-body #idForEdit').val(id);
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
                        let notActive = true;
                        for (let j = 0; j < user.roles.length; j++) {
                            if (user.roles[j].id === roleId) {
                                checkboxBlock += '<label class=\"btn btn-outline-secondary active\">';
                                checkboxBlock += "<span>" + role + "</span>";
                                checkboxBlock += "<input class='userRoles' type=\"checkbox\" id=\"" + roleId + "\" value=\"" + role + "\" checked>";
                                notActive = false;
                            }
                        }
                        if (notActive) {
                            checkboxBlock += '<label class=\"btn btn-outline-secondary\">';
                            checkboxBlock += "<span>" + role + "</span>";
                            checkboxBlock += "<input class='userRoles' type=\"checkbox\" id=\"" + roleId + "\" value=\"" + role + "\">";
                        }
                        checkboxBlock += "</label>";
                    }
                    $("#rolesForEdit").html(checkboxBlock);
                }
            });
        }
    });
});

editModal.on('submit', function (e) {
    e.preventDefault();
    if ($("#ageForEdit").val() === '' || $("#ageForEdit").val() < 0) {
        $("#ageForEdit").val(0);
    }
    $.ajax({
        url: '/api/users',
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: JSON.stringify(formToJSON(editUserform)),
        success: function () {
            editModal.trigger("click");
            getUserList()
        }
    })
});
