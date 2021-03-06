const express = require('express');
const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3');

// Initialize express instance
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Initialize database instance using habits.db
// const db = new sqlite3.Database('habits.db');



// GET request, run when user navigates to "root" URL (localhost:3000)
// Redirects user to accounts page as res(ponse)
// Note: Accounts page handles redirecting user if not logged in
app.get('/', (req, res) => {
  res.redirect('accounts.html');
});


// POST request, run when user presses 'Login' Button
// Receives username and password in req(uest) body
// Returns user data from database as res(ponse)
// app.post('/login', (req, res) => {
//   console.log('Request body at /login: ', req.body);
  // Database query for user with matching username
  // db.all('SELECT * from users_to_accounts WHERE username=$username', {
  //   $username: req.body.username
  // }, (err, data) => {
  //   // IF database query finds a user with a matching username
  //   if (data) {
  //     console.log('User Found: ', data[0]);
  //     // IF password sent matches password in database
  //     if (req.body.password == data[0].password) {
  //       console.log('Correct Password Entered, Logging in User');
  //       console.log('Sending Data: ', data[0]);
  //       // Send response = the result of the query
  //       res.send(data[0]);
  //       // ELSE password sent did not match password in database
  //     } else {
  //       console.log('Incorrect Password Entered!');
  //       // Send response = error status
  //       res.sendStatus(401);
  //     }
  //     // ELSE database query did not find a user with matching username
  //   } else {
  //     console.log('User Not Found');
  //     // Send response = error status
  //     res.sendStatus(401);
  //   }
  // });
// });

// POST request, run when user submits "Sign Up" form
// Receives username, email, password, and name in req(uest) body
// Returns status (success OR error)
// app.post('/createAccount', (req, res) => {
//   console.log('Request body at /createAccount: ', req.body);
  // TODO: Add error checking for request body
  // Database query to add user to user table
  // db.run('INSERT INTO users_to_accounts(username, email, password, name) VALUES ($username, $email, $password, $name)', {
  //   $username: req.body.username,
  //   $email: req.body.email,
  //   $password: req.body.password,
  //   $name: req.body.name
  // }, (err) => {
  //   // IF unsucessful inserting new user
  //   if (err) {
  //     // Send response = error status
  //     console.log('ERROR');
  //     res.sendStatus(500);
  //   } else {
  //     // Database query for user just added
  //     db.all('SELECT * from users_to_accounts WHERE username=$username', {
  //       $username: req.body.username
  //     }, (err, data) => {
  //       // IF user just added not found...
  //       if (err) {
  //         // Send response = error status
  //         res.sendStatus(500);
  //         // ELSE user added found
  //       } else {
  //         // Send response = user data of user just registerd
  //         res.send(data[0]);
  //       }
  //     });
  //   }
  // });
// });


// POST request, run when navigating to accounts homepage
// Receives userid in req(uest) body (WHEN AVAILABLE)
// Returns array of all user's children from database as res(ponse)
// app.post('/children', (req, res) => {
//   console.log('Request body at /children: ', req.body);
//   if (!req.body.userid) {
//     // Redirect to Login if no userid
//     res.redirect('login.html');
//   } else {
//     // Query user's children accounts and send data (if any)
//     db.all('SELECT * FROM children_to_user WHERE userid=$userid', {
//       $userid: req.body.userid
//     }, (err, data) => {
//       // IF database query finds children with matching userid
//       if (data.length > 0) {
//         // Send response = the result of the query
//         res.send(data);
//         // ELSE database query did not find any children with userid
//       } else {
//         // Send response = empty {}
//         console.log('User has no children, sending {}...');
//         res.send({});
//       }
//     });
//   }
// });


// POST request, run when user submits "Create Child" form
// Receives userid, name, pet in req(uest) body
// Returns status (Success or Error)
// app.post('/createChild', (req, res) => {
//   console.log('Request body at /createChild: ', req.body);
//   // TODO: Add error checking for request body
//   // Database query to add child to children table
//   db.run('INSERT INTO children_to_user (userid, name, pet, points) VALUES ($userid, $name, $pet, 0)', {
//     $userid: req.body.userid,
//     $name: req.body.name,
//     $pet: req.body.pet
//   }, (err) => {
//     // IF unsuccessful inserting new child
//     if (err) {
//       res.send({
//         message: 'Error in app.post(/createChild)'
//       });
//       // ELSE successful inserting new child
//     } else {
//       res.send({
//         message: 'Successfully added new child to database!'
//       });
//     }
//   });
// });


// POST request, run when navigating to home page (child's pet page)
// Receives childid in req(uest) body
// Returns the child's data from database as res(ponse)
// app.post('/home', (req, res) => {
//   console.log('Request body at /home: ', req.body);
//   if (!req.body.childid) {
//     // Redirect to accounts if no childid
//     res.redirect('accounts.html');
//   } else {
//     // Database query for child with matching childid
//     db.all('SELECT * FROM children_to_user WHERE childid=$childid', {
//       $childid: req.body.childid
//     }, (err, data) => {
//       // IF database query finds child with matching childid
//       if (data.length > 0) {
//         console.log('Sending data about child', data[0]);
//         // Send response = the result of the query
//         res.send(data[0]);
//         // res.redirect('home.html');
//       } else {
//         // Send response = empty {}
//         console.log('No child with that childid, sending {}...');
//         res.send({});
//       }
//     });
//   }
// });


// POST request, run when navigating to habits page
// Receives childid in req(uest) body
// Returns array of child's habits as res(ponse)
// app.post('/habits', (req, res) => {
//   console.log('Request body at /habits: ', req.body);
//   if (!req.body.childid) {
//     // Redirect to accounts if no childid
//     res.redirect('accounts.html');
//   } else {
//     // Database query for habits with matching childid
//     db.all('SELECT * FROM habits_to_child WHERE childid=$child', {
//       $child: req.body.childid
//     }, (err, data) => {
//       // IF database query finds habits with matching childid
//       if (data.length > 0) {
//         // Send response = the result of the query
//         res.send(data);
//         // ELSE database query did not find any habits with childid
//       } else {
//         // Send response = empty {}
//         console.log('Child has no habits, sending {}...');
//         res.send({});
//       }
//     });
//   }
// });

// POST request, run when user submits "Create Habit" form
// Receives title, description, and date in req(uest) body
// Returns status (Success OR Error)
// app.post('/createHabit', (req, res) => {
//   console.log('Request body at /createHabit: ', req.body);
//   // TODO: Add error checking for request body
//   // Database query to add habit to habits table
//   db.run('INSERT INTO habits_to_child (title, description, due, childid) VALUES ($title, $description, $date, $childid)', {
//     $title: req.body.title,
//     $description: req.body.description,
//     $date: req.body.date,
//     $childid: req.body.childid
//   }, (err) => {
//     // IF unsuccessful inserting new habit
//     if (err) {
//       // Send response = error status
//       res.sendStatus(500);
//     } else {
//       // Send response = success status
//       res.send({
//         message: 'Successfully added new habit to database!'
//       });
//     }
//   });
// });

// POST request, run when user submits "Edit Habit" form
// Receives title, description, and date in req(uest) body
// Returns status (Success OR Error)
// app.post('/updateHabit', (req, res) => {
//   console.log('Request body at /updateHabit: ', req.body);
//   // TODO: Add error checking for request body
//   // Database query to add habit to habits table
//   db.run('UPDATE habits_to_child SET title=$title, description=$description, due=$date WHERE habitid=$habitid', {
//     $title: req.body.title,
//     $description: req.body.description,
//     $date: req.body.date,
//     $habitid: req.body.habitid
//   }, (err) => {
//     // IF unsuccessful inserting new habit
//     if (err) {
//       // Send response = error status
//       res.sendStatus(500);
//     } else {
//       // Send response = success status
//       res.send({
//         message: 'Successfully added new habit to database!'
//       });
//     }
//   });
// });

// POST request, run when navigating to habits page
// Receives childid in req(uest) body
// Returns array of child's habits as res(ponse)
// app.post('/habitStats', (req, res) => {
//   console.log('Request body at /habitStats: ', req.body);
//   if (!req.body.habitid) {
//     // Redirect to accounts if no childid
//     res.redirect('habits.html');
//   } else {
//     // Database query for habits with matching childid
//     db.all('SELECT * FROM habits_to_child WHERE habitid=$habitid', {
//       $habitid: req.body.habitid
//     }, (err, data) => {
//       // IF database query finds habits with matching childid
//
//       if (data.length > 0) {
//         console.log('found: ', data);
//         // Send response = the result of the query
//         res.send(data[0]);
//         // ELSE database query did not find any habits with childid
//       } else {
//         // Send response = empty {}
//         console.log('No habit data for that habit id, sending {}...');
//         res.send({});
//       }
//     });
//   }
// });




// app.post('/verifyChild', (req, res) => {
//   db.all(
//     'SELECT * FROM children_to_user WHERE childid=$childid', {
//       $childid: req.body.childid
//     },
//     (err, data) => {
//       if (data.length > 0) {
//         console.log('Redirecting to homepage or child', data[0]);
//         res.redirect('home.html');
//       } else {
//         console.log('Child does not exist, sending empty {}');
//         res.send({});
//       }
//     }
//   );
// });


// app.post('/pet-preview', (req, res) => {
//   db.all('SELECT dogUrl FROM accessories_store WHERE accessoryid=$accessoryid', {
//     $accessoryid: req.body.accessoryid
//   }, (err, data) => {
//     console.log('pet-preview url ' + data);
//     if( data.length > 0 ) {
//       res.send( data );
//     } else {
//       console.log( 'No url' );
//       res.sendStatus(500);
//     }
//   });
// });
//
// app.post('/childAccessories', (req, res) => {
//   db.all('SELECT * FROM child_to_accessories WHERE childid=$childid', {
//     $childid: req.body.childid
//   }, (err, data) => {
//     if(data.length > 0) {
//       console.log('Childs accessories found: ', data);
//       res.send(data);
//     } else {
//       console.log('Child has no accessories');
//       res.send({});
//     }
//   })
// });

// app.post('/updatePet', (req, res) => {
//   db.run();
// });




// SHELLY'S DUMMY SCRATCH WORK BELOW THIS LINE

app.post( '/store', ( req, res ) => {
  db.all( 'SELECT points FROM children_to_user WHERE childid=$childid' ), {
    $childid: req.body.childid
  }, ( err, data ) => {
    console.log( 'total points ' + data );
    if( data.length > 0 ) {
      res.send( data );
    } else {
      console.log( 'error' );
      res.sendStatus( 500 );
    }
  }
});



// AND ABOVE THIS LINE

app.listen(app.get('port'), function() {
  listenForNotificationRequests();
});

// app.listen(3000, () => {
//   console.log('Server started at http://localhost:3000/');
// });
