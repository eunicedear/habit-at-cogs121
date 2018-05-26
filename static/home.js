$(document).ready(() => {
  $.ajax({
    url: 'home',
    type: 'POST',
    data: {
        childid: localStorage.getItem('childid')
    },
    success: (data) => {
      console.log('You received some data!', data);
      if (data.name && data.pet) {
        $('#points').html(data.points + " Pts");
      } else {
          console.log("Child info not received");
      }
    },
  });

  $('#log-modal').modal('show');
});
