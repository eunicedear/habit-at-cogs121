function handleItemClick(element) {
  let accessoryid = element.getAttribute("accesoryid");
  console.log('accessory ', accessoryid, ' clicked');
  localStorage.setItem('accessoryid', accessoryid);
  // Untoggle any buttons that have been toggled has to be the second cuz if it doesnt exist its created
  $(".selected_btn").toggleClass("selected_btn");
  // Toggle the button that was clicked
  element.classList.add("selected_btn");
  updatePetImage(accessoryid);
}

// Matches with items with attribute -- onclick="handleItemClick(this)"
function updatePetImage(accessoryid) {
  // get url from child-to-accessories table using id from localStorage? Can u push your code
  $.ajax({ 
    url: 'pet-preview',
    type: 'POST',
    data: {
      accessoryid: accessoryid
    },
    success: (data) => {
      console.log('Data received, url: ', data);
      $('.pet-img').setAttribute('src', "assets/accessories_on/" + data);
    }
  });
}

// LOL im dum
// $('.items').click(() => {
//   console.log("clicked");
//   $(this).toggleClass("selected_btn");
// });

// User clicks on an accessory

// $(document).on('click', '.items', function() {
//   // toggles selection when clicked, makes selected item grey
//   $(this).toggleClass("selected_btn");
//
//   // Store in localStorage the id of the accessory clicked
//   $('.items').click( () => {
//     let accessoryid = $(this).getAttribute('accessoryid'); // getattribute not a fucntion? wait we dont need this anymoreO at all?
//     // store id in localStorage
//     localStorage.setItem('accessoryid', accessoryid);
//
//
//   });
// });
