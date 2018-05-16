const express = require('express');
const app = express();

app.use(express.static('static'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('habits.db');
const bodyParser = require('body-parser');

// Navigate to 'localhost:3000/'
app.get('/', (req, res) => {
    res.redirect('accounts.html');
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/login', (req, res) => {
  console.log(req.body);
  db.all('SELECT * from users_to_accounts WHERE username=$username', {
    $username: req.body.username
}, (err, data) => {
    //
    if (data) {
      console.log('User Found:', data[0]);
      // Check if password sent matches password in database
      if (req.body.password == data[0].password) {
        console.log('Correct Password Entered, Logging in User');
        console.log('Sending Data', data[0]);
        // Sends the result of the query
        res.send(data[0]);
      } else {
        console.log('Incorrect Password Entered!');
        // Sends an error status
        res.sendStatus(401);
      }
    } else {
      console.log('User Not Found');
      // Sends an error status
      res.sendStatus(401);
    }
  });
});


app.get('/habits', (req, res) => {
  db.all(
    'SELECT * FROM habits_to_child WHERE childid=$child', {
      $child: currentChild
    },
    (err, rows) => {
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.send({});
      }
    }
  );
});

// Request for user's child data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/accounts', (req, res) => {
    console.log('Request at /accounts body: ', req.body);
    if(req.body.userid == null) {
        // Redirect to Login if no userid
        res.redirect('login.html');
    } else {
        // Query user's children accounts and send data (if any)
        db.all(
          'SELECT * FROM children_to_user WHERE userid=$userid', {
            $userid: req.body.userid
          },
          (err, rows) => {
            if(rows.length > 0) {
              res.send(rows);
            } else {
              res.send({});
            }
          }
        );
    }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/home', (req, res) => {
  db.all(
    'SELECT * FROM children_to_user WHERE childid=$childid',
    {
      $childid: req.body.childid
    },
    (err, data) => {
      if(data.length > 0) {
          console.log('Sending data about child', data[0]);
          res.send(data[0]);
          // res.redirect('home.html');
      } else {
          console.log('No data, sending empty {}');
        res.send({});
      }
    }
  );
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/verifyChild', (req, res) => {
  db.all(
    'SELECT * FROM children_to_user WHERE childid=$childid',
    {
      $childid: req.body.childid
    },
    (err, data) => {
      if(data.length > 0) {
          console.log('Redirecting to homepage or child', data[0]);
          res.redirect('home.html');
      } else {
          console.log('Child does not exist, sending empty {}');
        res.send({});
      }
    }
  );
});



app.post('/createAccount', (req, res) => {
  console.log(req.body);
  db.run("INSERT INTO users_to_accounts(username, email, password, name) VALUES ($username, $email, $password, $name)", {
      $username: req.body.username,
      $email: req.body.email,
      $password: req.body.password,
      $name: req.body.name
    },
    (err) => {
      if (err) {
        res.sendStatus(401);
      } else {
        res.send({
          message: 'Success!!'
        });
      }
    }
  );
});

// POST request for habits
app.post('/habits', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO habits_to_child (title, description, due) VALUES ($habit, $description, $date)', {
      $habit: req.body.habit,
      $description: req.body.description,
      $date: req.body.date
    },
    (err) => {
      if (err) {
        res.send({
          message: 'Error in app.post(/habits)'
        });
      } else {
        res.send({
          message: 'Successfully run app.post(/habits)'
        });
      }
    }
  );
});

app.post('/createChild', (req, res) => {
  console.log('body', req.body);
  db.run(
    'INSERT INTO children_to_user (userid, name, pet, points) VALUES ($userid, $name, $pet, 0)', {
      $userid: req.body.userid,
      $name: req.body.name,
      $pet: req.body.pet
    },
    (err) => {
      if (err) {
        res.send({
          message: 'Error in app.post(/createChild)'
        });
      } else {
        res.send({
          message: 'Successfully run app.post(/createChild)'
        });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
