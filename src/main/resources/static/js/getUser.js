$(document).ready(function () {
    const email = $("#email").val();
    $.ajax({
        type: "GET",
        url: '/api/users/email/' + email,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (user) {

            let tbody = "";
                let firstName = user.firstName;
                let lastName = user.lastName;
                let age = user.age;
                let email = user.email;
                let roles = [];

                for (let j = 0; j < user.roles.length; j++) {
                    if (j > 0) {
                        roles.push(" " + user.roles[j].role)
                    } else {
                        roles.push(user.roles[j].role)
                    }
                }

                if (Object.is(firstName, null)){
                    firstName = '';
                }
                if (Object.is(lastName, null)){
                    lastName = '';
                }
                if (Object.is(age, null)){
                    age = '';
                }

            tbody += '<tr>';
            tbody += "<td>" + "Имя" + "</td>";
            tbody += "<td>" + firstName + "</td>";
            tbody += '</tr>';

            tbody += '<tr>';
            tbody += "<td>" + "Фамилия" + "</td>";
            tbody += "<td>" + lastName + "</td>";
            tbody += '</tr>';

            tbody += '<tr>';
            tbody += "<td>" + "Возраст" + "</td>";
            tbody += "<td>" + age + "</td>";
            tbody += '</tr>';

            tbody += '<tr>';
            tbody += "<td>" + "E-mail" + "</td>";
            tbody += "<td>" + email + "</td>";
            tbody += '</tr>';

            tbody += '<tr>';
            tbody += "<td>" + "Твои роли" + "</td>";
            tbody += "<td>" + roles + "</td>";
            tbody += '</tr>';

            $("#getUser").html(tbody);
        }
    })
});