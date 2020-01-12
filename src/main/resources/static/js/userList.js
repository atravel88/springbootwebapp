$(document).ready(getUserList());

function getUserList() {
    $.ajax({
        type: "GET",
        url: '/api/users',
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
                tbody += '<tr class=\"table-striped\">';
                tbody += "<td>" + firstName + "</td>";
                tbody += "<td>" + lastName + "</td>";
                tbody += "<td>" + age + "</td>";
                tbody += "<td>" + email + "</td>";
                tbody += "<td>" + roles + "</td>";
                if ((window.location.pathname === "/admin")) {
                    if (id > 0) {
                        tbody += "<td>";
                        // ниже зелененький блок какой-то хрени, по-другому добавить id, firstName в таблицу не могу
                        // возможно есть более элегантный способ
                        tbody += `<button
                                        type="button"
                                        class="btn btn-primary btn-block-my"
                                        data-toggle="modal"
                                        data-target= "#deleteModal"
                                        data-id="${id}"
                                        data-name="${firstName}">
                                        DELETE
                                </button>`;
                        tbody += "</td>";
                        tbody += "<td>";

                        tbody += `<button
                                        type="button"
                                        class="btn btn-primary btn-block-my"
                                        data-toggle="modal"
                                        data-target= "#editModal"
                                        data-id="${id}">                             
                                        EDIT
                                </button>`;
                        tbody += "</td>";
                    } else {
                        tbody += "<td></td>";
                        tbody += "<td></td>";
                    }
                }
                tbody += "</tr>";
                $("#userList").html(tbody);
            }
        }
    })
}
