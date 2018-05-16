$(document).ready(() => {
  console.log('Running');

  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: 'habitStats',
    type: 'POST',
    data: {
      habitid: localStorage.getItem('habitid')
    },
    success: (data) => {
      console.log('You received some data!', data);

        if (data.title && data.description && data.due) {
          console.log('Received valid data');
          // Fill in the habit data on the page (list and modal)
          $('#title').text(data.title);
          $('#description').text(data.description);
          $('#date').text(data.due);
          $('#input-title').val(data.title);
          $('#input-description').val(data.description);
          $('#input-date').val(data.due);
          // $('#current-streak')
          // $('#longest-streak')
          // $('#setbacks')
        } else {
          document.querySelector('.habit-list').content = "<h5 class='text-center'>Click the (+) to add a new habit</h5>";
        }
    },
  });

  $('#updateHabit').click(() => {
    $.ajax({
      url: 'updateHabit',
      type: 'POST',
      data: {
        title: $('#input-title').val(),
        description: $('#input-description').val(),
        date: $('#input-date').val(),
        habitid: localStorage.getItem('habitid')
      },
      success: (data) => {
        location.reload();
      }
    });
  });
});
