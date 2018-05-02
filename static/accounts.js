$(document).ready(() => {
    const requestURL = 'accounts';
    console.log('making ajax request to:', requestURL);

    $('#createChild').click(() => {
       $.ajax({
           url: 'createChild',
           type: 'POST',
           data: {
               name: $('#input-name').val(),
               pet: $('#input-pet').val(),
           },
           success: (data) => {
               $('.habit-list').html(data.message);
               location.reload();
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
          if(data[i].name && data[i].pet) {
            console.log('Received valid data');
            // Select Habit Template
            var habitTpl = document.querySelector('.accountTemplate');
            // Select the Habit Inner Content Template
            var habitContent = habitTpl.content.querySelector("a");
            var ref = "home.html?childid=" + data[i].childid;
            console.log('href SET TO: ', ref);
            habitContent.setAttribute("href", ref);
            // Edit Template, parse the data in
            habitContent.innerHTML = "<h5>" + data[i].name + "</h5>";

            // Clone the Template
            var clone = document.importNode(habitTpl.content, true);
            // Append the clone to the habit list container
            $('.account-list').append(clone);
          }
          else {
            document.querySelector('.habit-list').innerHTML = "<h5>Click the (+) to add a new habit</h5>";
          }
        }
      },
    });


    $('#child-btn').click(() => {
      console.log("CLICK EVENT");
      const childURL = $('#child-btn').getAttribute("childid");
      const routeURL = "home/" + childURL;
      $.ajax({
        url: routeURL,
        type: 'GET',
        success: (data) => {
          location.href="home.html";
        }
      });
    });

  // Error Handler
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
