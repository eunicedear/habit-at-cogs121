function handleChildClick(element) {
  let childid = element.getAttribute("childid");
  console.log('child ', childid, ' clicked');
  localStorage.setItem('childid', childid);
  location.href = 'home.html';
}

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
          var accountContent = accountTpl.content.querySelector("a");
          var accountName = accountTpl.content.querySelector("h5");
          // Edit Template, parse the data in
          accountName.innerHTML = data[i].name;
          accountContent.setAttribute('childid', data[i].childid);
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

  $('#logout-btn').click(() => {
    localStorage.clear();
    location.href = 'login.html';
  });

  // Error Handler
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
