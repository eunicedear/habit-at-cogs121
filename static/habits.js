$(document).ready(() => {
    const requestURL = 'habits';
    console.log('making ajax request to:', requestURL);

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

        // if (data.title && data.description && data.due && data.status) {
        //   $('#status').html('Successfully fetched data at URL: ' + requestURL);
        //   $('#habitTitle').html('My habit is ' + data.title);
        //   $('#habitDescription').html('My habit description is ' + data.description);
        // } else {
        //   $('#status').html('Error: could not find user at URL: ' + requestURL);
        //   // clear the display
        //   $('#habitTitle').html('');
        //   $('#habitDescription').html('');
        // }
        for(i = 0; i < data.length; i++) {
          // console.log(data[i].title);
          if(data[i].title && data[i].due) {
            console.log('Received valid data');
            // Select Template
            var habitTpl = document.querySelector('.habitTemplate');
            // console.log(habitTpl);
            var habitContent = habitTpl.content.querySelector("a");
            // console.log(habitContent);


            // Edit Template
            habitContent.innerHTML = "<h5>" + data[i].title + "</h5>by " + data[i].due;

            console.log(habitTpl);


            var clone = document.importNode(habitTpl.content, true);
            $('.habit-list').append(clone);
          }
          else {
            document.querySelector('.habit-list').innerHTML = "<h5>Click the (+) to add a new habit</h5>";
          }
        }
      },
    });



  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
