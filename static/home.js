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

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

function viewHome() {
  var key = "users/" + userId + "/children/" + childId;

  database.ref(key).once("value", (snapshot) => {
    const data = snapshot.val();
    if (data.name && data.pet) {
      console.log("You received some data", data);
      $("#pet-img").attr("src", data.pet);
      $("#greeting").text("Hi, " + data.name + "!");
      $("#points").text(data.points + " Pts");
      $("#level").text("Lvl " + data.level);
      if (data.habits) {
        console.log("Child has habits: ", data.habits);
        database.ref(key + "/habits").once("value", (snapshot) => {
          snapshot.forEach((habit) => {
            habitId = habit.key;
            var habitData = habit.val();
            console.log("Child habit found: ", habitData);
            var date = getCurrentDate();
            if (habitData.log && habitData.log.hasOwnProperty(date)) {
              console.log("Log", habitData.log);
              console.log("data for today logged");
            } else {
              $("#habit-title").text(habitData.title);
              $('#log-modal').modal('show');
            }
          });
        });
      } else {
        console.log("Child has no habits");
      }
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

$('#open-log').click(() => {
  var key = "users/" + userId + "/children/" + childId;
  database.ref(key).once("value", (snapshot) => {
    const data = snapshot.val();
    if (data.habits) {
      console.log("Child has habits: ", data.habits);
      database.ref(key + "/habits").once("value", (snapshot) => {
        snapshot.forEach((habit) => {
          habitId = habit.key;
          var habitData = habit.val();
          console.log("Child habit found: ", habitData);
          var date = getCurrentDate();
          if (habitData.log && habitData.log.hasOwnProperty(date)) {
            console.log("Log", habitData.log);
            console.log("data for today logged");
            $("#status").text("You've logged all your activity for today!");
            $('#info-modal').modal('show');
          } else {
            $("#habit-title").text(habitData.title);
            $('#log-modal').modal('show');
          }
        });
      });
    } else {
      console.log("Child has no habits");
      $("#status").text("You don't have any habits to log, create a new one!");
      $('#info-modal').modal('show');
    
    }
  });
});

$('#input-yes').click(() => {
  var date = getCurrentDate();
  console.log(date);

  database.ref("users/" + userId + "/children/" + childId + "/habits/" + habitId + "/log/" + date).set(
    1
  ).then(() => {
    console.log("Log Written:", date);
    location.reload();
  });
});

$('#input-no').click(() => {
  var date = getCurrentDate();
  console.log(date);

  database.ref("users/" + userId + "/children/" + childId + "/habits/" + habitId + "/log/" + date).set(
    0
  ).then(() => {
    console.log("Log Written:", date);
    location.reload();
  });
});

window.addEventListener('load', function() {
  childId = localStorage.getItem('childid');
  initApp();
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
