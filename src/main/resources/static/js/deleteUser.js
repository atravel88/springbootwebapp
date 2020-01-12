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
        url: '/api/users/' + id,
        method: "DELETE",
        contentType:'application/json',
        dataType: 'text',
        success: function () {
            deleteModal.trigger("click");
            getUserList()
        }
    });
});

