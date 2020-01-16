validationMessageBlock = $(".validationMessageBlock").hide();
ValidationMessage = $(".validationMessage");

function formToJSON(form) {
    const user = {
        roles: []
    };
    $(".userRoles").each(function () {
        if ($(this).is(':checked')) {
            user.roles.push({id: $(this).attr('id'), role: $(this).attr('value')});
        }
    });
    $.each(form.serializeArray(), function () {
        if (user[this.name] !== undefined) {
            if (!user[this.name].push) {
                user[this.name] = [user[this.name]];
            }
            user[this.name].push(this.value || '');
        } else {
            user[this.name] = this.value || '';
        }
    });
    return user;
}

function validateEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}

function validateForm() {
    if ($("#age").val() < 0) {
        ValidationMessage.text("Age can't be less then zero");
        validationMessageBlock.removeClass("alert-success").addClass("alert-danger").show();
        $("#age").val('');
        return false;
    }
    if (!validateEmail($("#email").val())) {
        ValidationMessage.text("Incorrect email");
        validationMessageBlock.removeClass("alert-success").addClass("alert-danger").show();
        $("#email").val('');
        return false;
    }
    if ($("#password").val() === '') {
        ValidationMessage.text("Password can't be empty");
        validationMessageBlock.removeClass("alert-success").addClass("alert-danger").show();
        return false;
    }
    if ($("#age").val() === '') {
        $("#age").val(0);
    }
    return true;
}
