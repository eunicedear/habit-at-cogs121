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
        console.log('New user added, ', data);
        localStorage.setItem('userid', data.userid);
        // Redirect to accounts page
        location.href = "accounts.html";
      }
    });
  });
  $(document).ajaxError(() => {
    console.log("AJAX Error in signup.js");
    // $('#status').html('Error: unknown ajaxError!');
  });
});

// TODO: Add form validation checking!!
