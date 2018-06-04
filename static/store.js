var userId, database, childId, points;
var config = {
  apiKey: "AIzaSyANhXaRoHHK8S06Y54SU_lqwmzDMBpiGfI",
  authDomain: "tycho-habit-at.firebaseapp.com",
  databaseURL: "https://tycho-habit-at.firebaseio.com",
  projectId: "tycho-habit-at",
  storageBucket: "tycho-habit-at.appspot.com",
  messagingSenderId: "879811116990"
};

firebase.initializeApp(config);

function selectedAccessory(element) {
  console.log('element ', element);
  var accessoryid = element.getAttribute("accessoryid");
  console.log('accessory ', accessoryid, ' clicked');
  localStorage.setItem('accessoryid', accessoryid);
}

function getPoints(userid, childid) {
  var data;
  database.ref('users/' + userid + '/children/' + childid + '/points').once('value', (snapshot) => {
    data = snapshot.val();
    console.log('userid = ' + userid + ' childid = ' + childid);
    console.log('data = ' + data);
    points = data;
    console.log('points = ', points);
    $("#ptsTotal").text(points + " pts");
  })
}

function displayStore() {
  database.ref('accessories').orderByKey().once('value', snapshot => {
    const accessories = snapshot.val();
    console.log(accessories);
    if (accessories) {
      console.log('displayStore()');
      snapshot.forEach((itemSnapshot) => {
        console.log('item', itemSnapshot);
        

        // var key = element.key;
        // var accessoryid = element.val();
        // var accessoryurl = database.ref('accessories/' + key + '/itemURL');
        // console.log('accessoryid = ' + accessoryid);
        // console.log('accessoryurl = ' + accessoryurl);
        //
        // var selectedTemplate = $('#item-placeholder');
        // console.log('selectedTemplate ' + selectedTemplate.text);
        // var selectedImage = $("#accessory-img");
        // console.log('selectedImage ' + selectedImage.html);
        // selectedImage.attr("src", 'assets/accessories/' + accessoryurl);
        // var wrapper = $('.wrapper');
        //
        // selectedImage.clone().appendTo(wrapper);
      });
    }
  })
}

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('user.uid = ' + user.uid);
      // var userid;
      localStorage.setItem('userid', user.uid);
      database = firebase.database();
      // viewChildren();
      userid = localStorage.getItem('userid');
      childid = localStorage.getItem('childid');
      getPoints(userid, childid);
      displayStore();
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
  initApp();

  console.log('points = ' + points);
});


$(document).ready(() => {
  // database = firebase.database();
  // initApp();
  // console.log('pg loaded');
  //
  // displayStore();
  //
  // var userid = localStorage.getItem('userid');
  // console.log('56: userid = ' + userid);
  // var childid = localStorage.getItem('childid');
  // getPoints(userid, childid);
  // console.log('points = ' + points);

  // upon clicked accessory, save id to local storage
  // $('.items').click(() => {
  //   var accessoryid = this.getAttribute("accessoryid");
  //   localStorage.setItem('accessoryid', accessoryid);
  //
  //   // $.ajax({
  //   //   url: 'toPurchase',
  //   //   type: 'POST',
  //   //   data: {
  //   //
  //   //   }
  //   // })
  // })

});
