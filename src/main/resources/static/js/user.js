$(document).ready(function () {
    const email = $("#email").val();
    $.ajax({
        type: "GET",
        url: '/api/user/users/email/' + email,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (user) {

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

            if (Object.is(firstName, null)) {
                firstName = '';
            }
            if (Object.is(lastName, null)) {
                lastName = '';
            }
            if (Object.is(age, null)) {
                age = '';
            }
            let tbody = `
                 <tr>
                 <td> Имя </td>
                 <td>${firstName}</td>
                 </tr>
                 <tr>
                 <td> Фамилия </td>
                 <td>${lastName}</td>
                 </tr>
                 <tr>
                 <td> Возраст </td>
                 <td>${age}</td>
                 </tr>
                 <tr>
                 <td> Email </td>
                 <td>${email}</td>
                 </tr>               
                 <tr>
                 <td> Роли </td>
                 <td>${roles}</td>
                 </tr>`;

            $("#getUser").html(tbody);
        }
    })
});