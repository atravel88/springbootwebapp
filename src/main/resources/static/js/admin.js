addUserForm = $("#addUserForm");

document.getElementById('reload').onclick = function (e) {
    e.preventDefault();
    getUserList()
};

document.getElementById('addUserPanel').onclick = function (e) {
    e.preventDefault();
    $("label", $('#roles')).removeClass("active");
    $(":input", $('#addUserForm')).not(":submit").val('');
    validationMessageBlock.hide();
};

// script for adding users

document.getElementById('submitAddUser').onclick = function (e) {
    e.preventDefault();
    if (validateForm()) {
        const email = $("#email").val();
        $.ajax({
            type: "GET",
            url: '/api/admin/users/email/' + email,
            contentType: "application/json; charset=utf-8",
            error: function () {
                $.ajax({
                    type: "POST",
                    url: "/api/admin/users",
                    dataType: "json",
                    data: JSON.stringify(formToJSON(addUserForm)),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        $("label", $('#roles')).removeClass("active");
                        $(":input", addUserForm)
                            .not(":button, :submit, :reset, :hidden")
                            .val("");
                        ValidationMessage.text("User successfully added");
                        validationMessageBlock.removeClass("alert-danger").addClass("alert-success").show();
                        getRoleList()
                    },
                })
            }
        }).done(function () {
            ValidationMessage.text("User with such email is already registered");
            validationMessageBlock.removeClass("alert-success").addClass("alert-danger").show();
            $("#email").val('');
            getRoleList()
        })
    }
};

// script for getting all roles

$(document).ready(getRoleList());

function getRoleList() {
    $.ajax({
        type: "GET",
        url: '/api/admin/roles',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (allRoles) {
            let checkboxBlock = ``;
            for (let i = 0; i < allRoles.length; i++) {
                const roleId = allRoles[i].id;
                const role = allRoles[i].role;
                checkboxBlock +=
                    `<label class="btn btn-outline-secondary">
                     <span>${role}</span>
                     <input class='userRoles' type="checkbox" id=${roleId} value="${role}">
                     </label>`;
            }
            $("#roles").html(checkboxBlock);
        }
    })
}

// script for deleting users

deleteModal = $('#deleteModal');

deleteModal.on('shown.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const modal = $(this);
    const id = button.data('id');
    let firstName = button.data('name');

    if (Object.is(firstName, "")) {
        firstName = "this user";
    }
    modal.find('.modal-body label').text("Do you want to remove " + firstName + "?");
    modal.find('.modal-footer button').val(id)
});

deleteModal.on('submit', function (e) {
    e.preventDefault();
    const id = $("button#id").val();
    $.ajax({
        url: '/api/admin/users/' + id,
        method: "DELETE",
        contentType: 'application/json',
        dataType: 'text',
        success: function () {
            deleteModal.trigger("click");
            getUserList()
        }
    });
});

// script for editing user

editUserform = $("#editUserForm");
editModal = $('#editModal');

editModal.on('show.bs.modal', function (event) {
    const modal = $(this);
    const id = $(event.relatedTarget).data('id');
    $.ajax({
        url: '/api/admin/users/' + id,
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
                url: '/api/admin/roles',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (allRoles) {
                    let checkboxBlock = ``;
                    for (let i = 0; i < allRoles.length; i++) {
                        const roleId = allRoles[i].id;
                        const role = allRoles[i].role;
                        let notActive = true;
                        for (let j = 0; j < user.roles.length; j++) {
                            if (user.roles[j].id === roleId) {
                                checkboxBlock +=
                                    `<label class="btn btn-outline-secondary active">
                                     <span>${role}</span>
                                     <input class='userRoles' type="checkbox" id="${roleId}" value="${role}" checked>
                                     </label>`;
                                notActive = false;
                            }
                        }
                        if (notActive) {
                            checkboxBlock +=
                                `<label class="btn btn-outline-secondary">
                                 <span>${role}</span>
                                 <input class='userRoles' type="checkbox" id="${roleId}" value="${role}">
                                 </label>`;
                        }
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
        url: '/api/admin/users',
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: JSON.stringify(formToJSON(editUserform)),
        success: function () {
            $(".userRoles", $('#rolesForEdit')).prop('checked', false);
            $("label", $('#rolesForEdit')).removeClass("active");
            $(":input", editUserform)
                .not(":button, :submit, :reset, :hidden")
                .val("");
            editModal.trigger("click");
            getUserList();
        }
    })
});

editModal.on('hide.bs.modal', function (event) {
    $(".userRoles", $('#rolesForEdit')).prop('checked', false);
    $("label", $('#rolesForEdit')).removeClass("active");
    $(":input", editUserform)
        .not(":button, :submit, :reset, :hidden")
        .val("");
});

// script for list of users

$(document).ready(getUserList());
function getUserList() {
    $.ajax({
        type: "GET",
        url: '/api/admin/users',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (allUsers) {
            let tbody = ``;
            for (let i = 0; i < allUsers.length; i++) {
                let id = allUsers[i].id;
                let firstName = allUsers[i].firstName;
                let lastName = allUsers[i].lastName;
                let age = allUsers[i].age;
                let email = allUsers[i].email;
                let roles = [];

                for (let j = 0; j < allUsers[i].roles.length; j++) {
                    if (j > 0) {
                        roles.push(" " + allUsers[i].roles[j].role)
                    } else {
                        roles.push(allUsers[i].roles[j].role)
                    }
                }

                if (Object.is(firstName, null)) {
                    firstName = '';
                }
                if (Object.is(lastName, null)) {
                    lastName = '';
                }
                if (Object.is(age, null)) {
                    age = '';
                }
                tbody += `<tr class=\"table-striped\">
                         <td>${firstName}</td>
                         <td>${lastName}</td>
                         <td>${age}</td>
                         <td>${email}</td>
                         <td>${roles}</td>`;
                if (id > 0) {
                    tbody += `
                            <td>
                                 <button
                                        type="button"
                                        class="btn btn-primary btn-block-my"
                                        data-toggle="modal"
                                        data-target= "#deleteModal"
                                        data-id="${id}"
                                        data-name="${firstName}">
                                        DELETE
                                </button>
                            </td>
                            <td>
                                <button
                                        type="button"
                                        class="btn btn-primary btn-block-my"
                                        data-toggle="modal"
                                        data-target= "#editModal"
                                        data-id="${id}">                             
                                        EDIT
                                </button>
                            </td>`;
                } else {
                    tbody += `<td></td>
                              <td></td>`;
                }
                tbody += '</tr>';
                $("#userList").html(tbody);
            }
        }
    })
}
