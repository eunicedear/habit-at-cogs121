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

function displayCloset() {
  database.ref('users/' + userId + '/children/' + childId + '/accessories').orderByKey().once('value', snapshot => {
    const accessories = snapshot.val();
    console.log(accessories);
    if (accessories) {
      console.log('displayCloset()');
      snapshot.forEach((itemSnapshot) => {
        console.log('item', itemSnapshot);
        var data = itemSnapshot.val();
        console.log('item data', data);
        var key = itemSnapshot.key;
        console.log('key', key);
        var accessoryid = data.accessoryid;
        console.log('accessoryid', accessoryid);
        var template = document.querySelector('#item-template');
        console.log('template', template);
        var placeholder = template.content.querySelector('.item-placeholder');
        var image = template.content.querySelector('#item-image');
        console.log('item-image', image);
        var url;

        database.ref('accessories/'+accessoryid+'/itemURL').once('value', snapshot => {
          url = 'assets/accessories/'+snapshot.val();
          console.log('imageURL',url);
        }).then(()=> {
          image.setAttribute('src', url);
          placeholder.setAttribute('accessoryid', accessoryid);
          var clone = document.importNode(template.content, true);
          $('.wrapper').append(clone);
        });
      });
    } else {
      $('#status-accessories').html("<p class='text-center'>No accessories,<br/> buy some from the store!</p>")
    }
  })
}

// Matches with items with attribute -- onclick="handleItemClick(this)"
function updatePetImage(accessoryid) {
  var key = "accessories/" + accessoryid;
  // console.log(key)
  database.ref(key).once("value", (snapshot) => {
    const data = snapshot.val();
    if (data.dogURL) {
      console.log("Data received, url: ", data.dogURL);
      $("#pet-img").attr("src", "assets/accessories_on/" + data.dogURL);
    } else {
      console.log("Child has no accessories");
    }
  });
};

$("#save").click(() => {
  var key = "accessories/" + localStorage.getItem("accessoryid");
  var pet = "users/" + userId + "/children/" + childId + "/pet";

  database.ref(key).once("value", (snapshot) => {
    const data = snapshot.val();
    if (data.dogURL) {
      database.ref(pet).set("assets/accessories_on/" + data.dogURL).then(() => {
        console.log("Saved accessory: ", data);
        location.href = "home.html";
      });
    } else {
      console.log("Child has no accessories to save");
    }
  });
});

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      userId = user.uid;
      database = firebase.database();
      childId = localStorage.getItem("childid");
      console.log("User is signed in.", userId);
      console.log("Current child: ", childId)
      displayCloset();
    } else {
      // User is signed out.
      console.log("User is signed out.");
      location.href = "login.html";
    }
  }, function(error) {
    console.log(error);
  });
};


window.addEventListener('load', function() {
  initApp()
});
