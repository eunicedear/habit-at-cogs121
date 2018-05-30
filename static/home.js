var userId, database, childId;
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

function viewHome() {
  var key = "users/" + userId + "/children/" + childId;

  database.ref(key).once("value", (snapshot) => {
    const data = snapshot.val();
    if(data.name && data.pet) {
      console.log("You received some data", data);
      $("#greeting").text("Hi, " + data.name +"!");
      $("#points").text(data.points + " Pts");
      $("#level").text("Lvl " + data.level)
    } else {
      console.log("No child data!");
      // $("body").html("");
    }
  });
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

$('#logout-btn').click(() => {
  firebase.auth().signOut();
});

window.addEventListener('load', function() {
  childId = localStorage.getItem('childid');
  initApp()
});




// $(document).ready(() => {
//   $.ajax({
//     url: 'home',
//     type: 'POST',
//     data: {
//         childid: localStorage.getItem('childid')
//     },
//     success: (data) => {
//       console.log('You received some data!', data);
//       if (data.name && data.pet) {
//         $('#points').html(data.points + " Pts");
//       } else {
//           console.log("Child info not received");
//       }
//     },
//   });
// });
