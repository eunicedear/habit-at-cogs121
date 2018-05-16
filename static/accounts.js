$(document).ready(() => {
  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: 'children',
    type: 'POST',
    data: {
      userid: localStorage.getItem('userid')
    },
    success: (data) => {
      console.log('You received some data!', data);

      // Loop through all the habits in the array
      for (i = 0; i < data.length; i++) {
        // If the data is valid, has a title and date
        if (data[i].name && data[i].pet) {
          console.log('Received valid data');
          // Select Habit Template
          var accountTpl = document.querySelector('.accountTemplate');
          // Select the Habit Inner Content Template
          var accountContent = accountTpl.content.querySelector("#child-name");
          // Edit Template, parse the data in
          accountContent.innerHTML = data[i].name;
          // Clone the Template
          var clone = document.importNode(accountTpl.content, true);
          // Append the clone to the habit list container
          $('.account-list').append(clone);
        } else {
          document.querySelector('.account-list').innerHTML = "<h5>Click the (+) to add a new habit</h5>";
        }
      }
    },
  });

  $('#child-btn').click(() => {
    let childid = $('#child-btn').getAttribute("childid");
    localStorage.setItem('childid', childid);
    // Redirect to pet page
    location.href('home.html');
  });

  $('#createChild').click(() => {
    $.ajax({
      url: 'createChild',
      type: 'POST',
      data: {
        userid: localStorage.getItem('userid'),
        name: $('#input-name').val(),
        pet: $('#input-pet').val(),
      },
      success: (data) => {
        // $('.habit-list').html(data.message);
        // Reload the page to show new child
        location.reload();
      }
    });
  });

  // Error Handler
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
