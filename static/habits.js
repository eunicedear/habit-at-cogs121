$(document).ready(() => {

  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: requestURL,
    type: 'POST',
    data: {
      childid: localStorage.getItem('childid');
    },
    success: (data) => {
      console.log('You received some data!', data);
      // Loop through all the habits in the array
      for (i = 0; i < data.length; i++) {
        // If the data is valid, has a title and date
        if (data[i].title && data[i].due) {
          console.log('Received valid data');
          // Select Habit Template
          var habitTpl = document.querySelector('.habitTemplate');
          // Select the Habit Inner Content Template
          var habitContent = habitTpl.content.querySelector("a");
          // Edit Template, parse the data in
          habitContent.innerHTML = "<h5>" + data[i].title + "</h5>by " + data[i].due;
          // Clone the Template
          var clone = document.importNode(habitTpl.content, true);
          // Append the clone to the habit list container
          $('.habit-list').append(clone);
        } else {
          document.querySelector('.habit-list').content = "<h5>Click the (+) to add a new habit</h5>";
        }
      }
    },
  });

  $('#createHabit').click(() => {
    $.ajax({
      url: 'createHabit',
      type: 'POST',
      data: {
        title: $('#habitName').val(),
        description: $('#habitDesc').val(),
        date: $('#habitDate').val(),
      },
      success: (data) => {
        location.reload();
      }
    });
  });

  // Error Handler
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
