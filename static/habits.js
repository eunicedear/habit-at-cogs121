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

function viewHabits() {
  database.ref("users/" + userId + "/children/" + childId + "/habits").orderByKey().once("value", snapshot => {
    const userData = snapshot.val();
    if (userData) {
      console.log("Child has habits", userData);
      snapshot.forEach(function(habitSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = habitSnapshot.key;
        // childData will be the actual contents of the child
        var habitData = habitSnapshot.val();
        console.log("key:", key);
        console.log("Habit data: ", habitData);
        // Select Habit Template
        var habitTpl = document.querySelector('.habitTemplate');
        // Select the Habit Inner Content Template
        var habitContent = habitTpl.content.querySelector("a");
        // Edit Template, parse the data in
        habitContent.innerHTML = "<h5>" + habitData.title + "</h5>by " + habitData.date;
        habitContent.setAttribute('data-habitid', key);

        // Clone the Template
        var clone = document.importNode(habitTpl.content, true);
        // Append the clone to the habit list container
        $('.habit-list').append(clone);
      });

    } else {
      console.log("Child has no habits");
    }
  });
}

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // displayName = user.displayName;
      // email = user.email;
      // emailVerified = user.emailVerified;
      // photoURL = user.photoURL;
      userId = user.uid;
      // phoneNumber = user.phoneNumber;
      // providerData = user.providerData;
      database = firebase.database();
      console.log("User is signed in.");
      viewHabits();
    } else {
      // User is signed out.
      console.log("User is signed out.");
      location.href = "login.html";
    }
  }, function(error) {
    console.log(error);
  });
};

function handleHabitClick(element) {
  let habitid = element.getAttribute("data-habitid");
  console.log('Habit ', habitid, ' clicked');
  localStorage.setItem('habitid', habitid);
  location.href = 'habit_stats.html';
};

function writeHabit(title, description, date, childid) {
  database.ref("users/" + userId + "/children/" + childId + "/habits").push({
    title: title,
    description: description,
    date: date,
    log: null
    // childid: childid
  }).then(() => {
    console.log("Habit Written:", name);
    location.reload();
  });
};

$('#createHabit').click(() => {
      const title = $('#habitName').val();
      const description = $('#habitDesc').val();
      const date= $('#habitDate').val();
      writeHabit(title, description, date, childId);
});

$('#logout-btn').click(() => {
  firebase.auth().signOut();
});

window.addEventListener('load', function() {
  childId = localStorage.getItem('childid');
  initApp()
});






// $(document).ready(() => {
//   $.ajax({
//     // all URLs are relative to http://localhost:3000/
//     url: 'habits',
//     type: 'POST',
//     data: {
//       childid: localStorage.getItem('childid')
//     },
//     success: (data) => {
//       console.log('You received some data!', data);
//       // Loop through all the habits in the array
//       for (i = 0; i < data.length; i++) {
//         // If the data is valid, has a title and date
//         if (data[i].title && data[i].due) {
//           console.log('Received valid data');
//           // Select Habit Template
//           var habitTpl = document.querySelector('.habitTemplate');
//           // Select the Habit Inner Content Template
//           var habitContent = habitTpl.content.querySelector("a");
//           // Edit Template, parse the data in
//           habitContent.innerHTML = "<h5>" + data[i].title + "</h5>by " + data[i].due;
//           habitContent.setAttribute('data-habitid', data[i].habitid);
//
//           // Clone the Template
//           var clone = document.importNode(habitTpl.content, true);
//           // Append the clone to the habit list container
//           $('.habit-list').append(clone);
//         } else {
//           document.querySelector('.habit-list').content = "<h5 class='text-center'>Click the (+) to add a new habit</h5>";
//         }
//       }
//     },
//   });
