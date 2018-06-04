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



function viewHabitStats() {
  var key = "users/" + userId + "/children/" + childId + "/habits/";
  console.log(key);
  database.ref(key + habitId).once("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log("Habit has data ", data);
      // key will be "ada" the first time and "alan" the second time
      var key = snapshot.key;
      // childData will be the actual contents of the child
      console.log("key:", key);
      console.log("Habit data: ", data);

      if (data.title && data.description && data.date) {
        console.log('Received valid data');
        // Fill in the habit data on the page (list and modal)
        $('#title').text(data.title);
        $('#description').text(data.description);
        $('#date').text(data.date);
        $('#input-title').val(data.title);
        $('#input-description').val(data.description);
        $('#input-date').val(data.date);
        var dataLog = [];
        Object.keys(data.log).forEach(function(k) {
          console.log(k + ' - ' + data.log[k]);
          dataLog.push([k,data.log[k]]);
        });
        console.log(dataLog);

        // $('#current-streak')
        // $('#longest-streak')
        // $('#setbacks')
        //Calendar chart
        var myConfig = {
          type: 'calendar',
          options: {
            year: {
              text: '2018',
              visible: false
            },
            startMonth: 6,
            endMonth: 6,
            palette: ['none', '#4CAF50'],
            month: {
              item: {
                fontColor: 'gray',
                fontSize: 20
              }
            },
            values: dataLog,
            weekday: {
              values: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
              item: {
                fontColor: 'gray',
                fontSize: 9
              }
            }
          },
          labels: [{ //Lefthand Label (container portion)
              borderColor: 'gray',
              borderWidth: 1,
              x: '27%',
              y: '60%',
              width: '40%',
              height: '30%'
            },
            { //Lefthand Label (top portion)
              text: 'Completed Habit?\n 1 = Yes, 0 = No',
              fontColor: '#212121',
              textAlign: 'center',
              x: '29%',
              y: '65%',
              width: '36%'
            },
            { //Lefthand Label (middle portion)
              text: '%plot-value',
              fontColor: '#4CAF50',
              fontFamily: 'Montserrat',
              fontSize: 30,
              textAlign: 'center',
              padding: 15,
              x: '29%',
              y: '68%',
              width: '36%'
            },
            // Note: the bottom portion of the Bottom-Left Label is the fixed tooltip, below.

            // { //Rightside Label (container portion)
            //   borderColor: 'gray',
            //   borderWidth: 1,
            //   x: '52%',
            //   y: '60%',
            //   width: '40%',
            //   height: '30%',
            // },
            // { //Rightside Label (top portion)
            //   text: 'Total Days Completed',
            //   fontColor: '#212121',
            //   textAlign: 'center',
            //   x: '54%',
            //   y: '65%',
            //   width: '36%'
            // },
            // { //Rightside Label (middle portion)
            //   text: '2',
            //   fontColor: '#4CAF50',
            //   fontFamily: 'Georgia',
            //   fontSize: 35,
            //   textAlign: 'center',
            //   x: '54%',
            //   y: '68%',
            //   width: '36%'
            // },
            // { //Rightside Label (bottom portion)
            //   text: 'May',
            //   fontColor: '#212121',
            //   padding: 2,
            //   textAlign: 'center',
            //   x: '54%',
            //   y: '80%',
            //   width: '36%'
            // }
          ],

          tooltip: { //Lefthand Label (bottom portion)
            text: '%data-day',
            backgroundColor: 'none',
            borderColor: 'none',
            fontColor: '#212121',
            padding: 2,
            //textAlign: 'center',
            align: 'center',
            sticky: true,
            timeout: 30000,
            x: '29%',
            y: '80%',
            width: '36%'
          },

          plotarea: {
            marginTop: '15%',
            marginBottom: '55%',
            marginLeft: '8%',
            marginRight: '8%'
          }
        };
        zingchart.loadModules('calendar', function() {
          zingchart.render({
            id: 'myChart',
            data: myConfig,
            height: '100%',
            width: '100%'
          });
        });
      }

    } else {
      console.log("No habit data ", habitId);
    }
  });
}


function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userId = user.uid;
      database = firebase.database();
      console.log("User is signed in.");
      viewHabitStats();
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
  childId = localStorage.getItem('childid');
  habitId = localStorage.getItem('habitid');
  initApp()
});

function writeHabit(title, description, date, childid) {
  database.ref("users/" + userId + "/children/" + childId + "/habits/" + habitId).set({
    title: title,
    description: description,
    date: date,
  }).then(() => {
    console.log("Habit Written:", name);
    location.reload();
  });
};

$('#updateHabit').click(() => {
  const title = $('#habitName').val();
  const description = $('#habitDesc').val();
  const date = $('#habitDate').val();
  writeHabit(title, description, date, childId);
});
