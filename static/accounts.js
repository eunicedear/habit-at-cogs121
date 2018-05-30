var userId, database;
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

function viewChildren(currentUser) {
  database.ref("users/" + userId + "/children").orderByKey().once("value", snapshot => {
    const userData = snapshot.val();
    if (userData) {
      console.log("User has children", userData);
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        console.log("key:", key);
        console.log("Child data: ", childData);
        var accountTpl = document.querySelector('.accountTemplate');
        // Select the Habit Inner Content Template
        var accountContent = accountTpl.content.querySelector("a");
        var accountName = accountTpl.content.querySelector("h5");
        // Edit Template, parse the data in
        accountName.innerHTML = childData.name;
        accountContent.setAttribute('data-childid', key);
        // Clone the Template
        var clone = document.importNode(accountTpl.content, true);
        // Append the clone to the habit list container
        $('.account-list').append(clone);
      });

    } else {
      console.log("User has no children");
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
      viewChildren();
    } else {
      // User is signed out.
      console.log("User is signed out.");
      location.href = "login.html";
    }
  }, function(error) {
    console.log(error);
  });
};

function handleChildClick(element) {
  let childid = element.getAttribute("data-childid");
  console.log('child ', childid, ' clicked');
  localStorage.setItem('childid', childid);
  location.href = 'home.html';
}

function writeChild(name, pet) {
  database.ref("users/" + userId + "/children/").push({
    name: name,
    pet: pet,
    points: 0,
    level: 0
  }).then(() => {
    console.log("Child Written:", name);
    location.reload();
  });
};

$('#createChild').click(() => {
  const name = $("#input-name").val();
  const pet = "assets/pet_" + $("#input-pet").val() + ".png";
  console.log("Pet URL: ", pet);
  writeChild(name, pet);
});

$('#logout-btn').click(() => {
  localStorage.clear();
  firebase.auth().signOut();

});

window.addEventListener('load', function() {
  initApp()
});
