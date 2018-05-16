$(document).ready(() => {
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
               $('.habit-list').html(data.message);
               location.reload();
           }
       });
    });

    console.log('User ID in localStorage is: ', localStorage.getItem('userid'));
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: 'accounts',
      type: 'POST',
      data: {
          userid: localStorage.getItem('userid')
      },
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
      console.log("Clicked on child button");
      let childid = $('#child-btn').getAttribute("childid");
      localStorage.setItem('childid', childid);
      $.ajax({
        url: 'home',
        type: 'POST',
        data: {
            childid: childid
        },
        success: (data) => {
          // location.href="home.html";
        }
      });
    });

  // Error Handler
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });
});
