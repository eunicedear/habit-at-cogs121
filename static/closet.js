var userId, database, childId, habitId;
var config = {
  apiKey: "AIzaSyANhXaRoHHK8S06Y54SU_lqwmzDMBpiGfI",
  authDomain: "tycho-habit-at.firebaseapp.com",
  databaseURL: "https://tycho-habit-at.firebaseio.com",
  projectId: "tycho-habit-at",
  storageBucket: "tycho-habit-at.appspot.com",
  messagingSenderId: "879811116990"
};

firebase.initializeApp(config);
console.log("Initializing Firebase");

function handleItemClick(element) {
  let accessoryid = element.getAttribute("accessoryid");
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
  // $.ajax({
  //   url: 'pet-preview',
  //   type: 'POST',
  //   data: {
  //     accessoryid: accessoryid
  //   },
  //   success: (data) => {
  //     console.log('Data received, url: ', data);
  //     $('#pet-img').attr('src', "assets/accessories_on/" + data[0].dogUrl);
  //   }
  // });
}

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      userId = user.uid;
      database = firebase.database();
      childId = localStorage.getItem("childid");
      console.log("User is signed in.", userId);
      console.log("Current child: ", childId)
      viewHome();
    } else {
      // User is signed out.
      console.log("User is signed out.");
      location.href = "login.html";
    }
  }, function(error) {
    console.log(error);
  });
};
