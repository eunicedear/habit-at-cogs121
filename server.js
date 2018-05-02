const express = require('express');
const app = express();

app.use(express.static('static'));

console.log('Your Directory Name: ' + __dirname);

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('habits.db');

// Track login status
var currentUser = null;
var currentChild = null;


app.get('/', (req, res) => {
  if (currentUser == null) {
    res.redirect('login.html');
  } else {
    console.log('User' + currentUser + ' already logged in')
    res.redirect('accounts.html');
  }
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

app.get('/accounts', (req, res) => {
  db.all(
    'SELECT * FROM children_to_user WHERE userid=$userid', {
      $userid: currentUser
    },
    (err, rows) => {
      if(rows.length > 0) {
        res.send(rows);
      } else {
        res.send({});
      }
    }
  );
});

app.get('/home/:childid', (req, res) => {
  const childToLookup = req.params.childid;
  db.all(
    'SELECT * FROM children_to_user WHERE childid=$childid',
    {
      $childid: childToLookup
    },
    (err, rows) => {
      console.log(rows);
      if(rows.length > 0) {
        res.send(rows[0]);
        currentChild = rows[0].chlidid;
      } else {
        res.send({});
      }
    }
  );
});

//POST request is for logging inspect to the Server
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/login', (req, res) => {
  console.log(req.body);
  db.all('SELECT * from users_to_accounts WHERE username=$username', {
    $username: req.body.username
  }, (err, rows) => {
    if (rows[0]) {
      console.log('User Found:', rows[0]);
      if (req.body.password == rows[0].password) {
        console.log('Correct Password Entered!');
        currentUser = rows[0].userid;
        res.send({
          message: 'Success!'
        });
      } else {
        console.log('Incorrect Password Entered!');
        res.sendStatus(401);
      }
    } else {
      console.log('User Not Found');
      res.sendStatus(401);
    }
  });
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
      $userid: currentUser,
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
