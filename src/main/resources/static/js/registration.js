//js for registration html

addUserForm = $("#addUserForm");

document.getElementById('submitAddUser').onclick = function (e) {
    e.preventDefault();
    if (validateForm()) {
        const email = $("#email").val();
        $.ajax({
            type: "GET",
            url: '/api/registration/users/email/' + email,
            contentType: "application/json; charset=utf-8",
            error: function () {
                $.ajax({
                    type: "POST",
                    url: "/api/registration/users",
                    dataType: "json",
                    data: JSON.stringify(formToJSON(addUserForm)),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        window.location.replace("/?success");
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