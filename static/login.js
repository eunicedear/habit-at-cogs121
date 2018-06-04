// Accesses Firebase to allow user login and account authentication. Grabs
// data about their name, email, if their email was verified, their photo,
// user ID, and phone number.

// Initialize Firebase
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


initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      console.log("User is signed in.");
      // location.href="accounts.html";
    } else {
      // User is signed out.
      console.log("No user signed in.");
      // location.href = "login.html";
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});
