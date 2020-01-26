$(document).ready(getUserList());

function getUserList() {
    $.ajax({
        type: "GET",
        url: '/api/manager/users',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (allUsers) {
            let tbody = "";
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
                tbody += `<tr class="table-striped">
                         <td>${firstName}</td>
                         <td>${lastName}</td>
                         <td>${age}</td>
                         <td>${email}</td>
                         <td>${roles}</td>
                         </tr>`;

                $("#userList").html(tbody);
            }
        }
    })
}
