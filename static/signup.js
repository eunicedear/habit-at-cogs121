$(document).ready(() => {
  $('#submitButton').click(() => {
    $.ajax({
      url: 'createAccount',
      type: 'POST',
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
      },
      success: (data) => {
        // $('.signup-form').html(data.message);
        location.href = "accounts.html";
      }
    });
  });
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
