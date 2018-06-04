// Grabs child's data from database for number of points available to spend,
// accessories not purchased yet to display in the store, and update database
// when selected item is purchased. When a user clicks on an accessory to buy,
// their number of points go down and it is added to their closet.

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

function purchaseItem(id, cost){
  console.log('Users current points:', points);
  if( points >= cost ) {
    console.log("User has enough points to purchase!");
    points = points - cost;
    database.ref('users/'+userid+'/children/'+childid+'/points').set(points).then(() => {
      console.log("Updated user points in database: ", points);
    });
    database.ref('users/'+userid+'/children/'+childid+'/accessories').push(
      {
        'accessoryid': id
      }
    ).then(() => {
      console.log("Accessory Written to child:", name);
      // location.reload();
    });
  } else {
    console.log("User doesn't have enough points!");
    alert("You don't have enough points to buy this yet");
  }

}

$('#purchase-btn').click(()=> {
  console.log('Purchase button clicked!');
  console.log('Attempting to purchase item: ');
  var accessoryid = localStorage.getItem('accessoryid');
  console.log('accessoryid', accessoryid);
  var accessoryPoints = localStorage.getItem('accessoryPoints');
  console.log('accessoryPoints', accessoryPoints);
  purchaseItem(accessoryid, accessoryPoints);
});

function selectedAccessory(element) {
  console.log('element ', element);
  var accessoryid = element.getAttribute("accessoryid");
  console.log('accessory ', accessoryid, ' clicked');
  var accessoryPoints = element.getAttribute('accessoryPoints');
  localStorage.setItem('accessoryid', accessoryid);
  localStorage.setItem('accessoryPoints', accessoryPoints);
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
        // console.log('item', itemSnapshot);
        var data = itemSnapshot.val();
        // console.log('item data', data);
        var key = itemSnapshot.key;
        // console.log('key', key);
        var url = 'assets/accessories/'+data.itemURL;
        // console.log('url', url);
        var itemPoints = data.points;
        // console.log('points', points);

        var template = document.querySelector('#item-template');
        // console.log('template', template);

        var templatePoints = template.content.querySelector('#item-points');
        // console.log('points', templatePoints);

        templatePoints.textContent = itemPoints + " pts";
        // console.log('points', templatePoints);

        var image = template.content.querySelector('#item-image');
        // console.log('item-image', image);

        image.setAttribute('src', url);
        image.setAttribute('accessoryid', key);
        image.setAttribute('accessoryPoints', itemPoints);

        var clone = document.importNode(template.content, true);
        $('.wrapper').append(clone);

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



});
