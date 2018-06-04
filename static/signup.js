// Accesses Firebase to allow user to signup using email, Google account,
// or phone number.

$(document).ready(() => {
  // const database = firebase.database();

  $('#submitButton').click(() => {
    console.log('Submit Button Clicked');
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      // ...
    });
    // const name = $('#name').val();
    // database.ref('users/' + name).set({
    //   email: $('#email').val(),
    //   username: $('#username').val(),
    //   password: $('#password').val()
    // });

    //   $.ajax({
    //     url: 'createAccount',
    //     type: 'POST',
    //     data: {
    //       name: $('#name').val(),
    //       email: $('#email').val(),
    //       username: $('#username').val(),
    //       password: $('#password').val()
    //     },
    //     success: (data) => {
    //       console.log('New user added, ', data);
    //       localStorage.setItem('userid', data.userid);
    //       // Redirect to accounts page
    //       location.href = "accounts.html";
    //     }
    //   });
    // });
    // $(document).ajaxError(() => {
    //   console.log("AJAX Error in signup.js");
    //   // $('#status').html('Error: unknown ajaxError!');
    // });
  });
});

// TODO: Add form validation checking!!
