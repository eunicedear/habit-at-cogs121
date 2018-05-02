$(document).ready(() => {
    const requestURL = 'habits';
    console.log('making ajax request to:', requestURL);
    
    $('#createHabit').click(() => {
       $.ajax({
           url: 'habits',
           type: 'POST',
           data: {
               habit: $('#habitName').val(),
               description: $('#habitDesc').val(),
               date: $('#habitDate').val(),
           },
           success: (data) => {
               $('.habit-list').html(data.message);
           }
       });
    });

    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        console.log('You received some data!', data);

        // Loop through all the habits in the array
        for(i = 0; i < data.length; i++) {
          // If the data is valid, has a title and date
          if(data[i].title && data[i].due) {
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
          }
          else {
            document.querySelector('.habit-list').innerHTML = "<h5>Click the (+) to add a new habit</h5>";
          }
        }
      },
    });

  // Error Handler
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
