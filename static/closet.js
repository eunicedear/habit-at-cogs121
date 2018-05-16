$(document).ready(() => {

  // $('.items').click(() => {
  //   console.log("clicked");
  //   $(this).toggleClass("selected_btn");
  // });

  $(document).on('click', '.items', function() {
    // toggles selection when clicked
    $(this).toggleClass("selected_btn");
    console.log("clicked");

    $.ajax({
      url: 'tryAccessories',
      type: 'POST',
      data: {
        accessoryid: localStorage.getItem('accessoryid')
      },
      success: (data) => {
        console.log('Received accessoryid data', data);

      }
    })

  });





})
