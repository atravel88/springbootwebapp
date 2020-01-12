addUserForm = $("#addUserForm");

document.getElementById('submitAddUser').onclick = function (e) {
    e.preventDefault();
    if (validateForm()) {
        const email = $("#email").val();
        $.ajax({
            type: "GET",
            url: '/api/users/email/' + email,
            contentType: "application/json; charset=utf-8",
            error: function () {
                $.ajax({
                    type: "POST",
                    url: "/api/users",
                    dataType: "json",
                    data: JSON.stringify(formToJSON(addUserForm)),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        if (window.location.pathname === "/registration") {
                            window.location.replace("/?success");
                        } else {
                            $("label", $('#roles')).removeClass("active");
                            $(":input", addUserForm)
                                .not(":button, :submit, :reset, :hidden")
                                .val("");
                            ValidationMessage.text("User successfully added");
                            validationMessageBlock.removeClass("alert-danger").addClass("alert-success").show();
                        }
                    },
                })
            }
        }).done(function () {
            ValidationMessage.text("User with such email is already registered");
            validationMessageBlock.removeClass("alert-success").addClass("alert-danger").show();
            $("#email").val('');
        })
    }
};


