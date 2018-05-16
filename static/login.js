$(document).ready(() => {
  // When Submit Button is clicked make AJAX request
  $('#submit-button').click(() => {
    // $('#login-alert').addClass('d-none');
    console.log('Making AJAX request to: ', 'login');
    $.ajax({
      url: 'login',
      type: 'POST',
      data: {
              username: $('#input-username').val(),
              password: $('#input-password').val()
      },
      success: (data) => {
        console.log('Signed In: ', data);
        console.log('userid: ', data.userid);
        window.localStorage.setItem('userid', data.userid);
        // Redirect to accounts page
        location.href = "accounts.html";
      },

    });
  });

  $(document).ajaxError(() => {
      console.log('AJAX ERROR');
      $('#login-alert').removeClass('d-none');
  });
});

// TODO: Add form validation!!
