const express = require('express');
const app = express();

app.use(express.static('static'));

console.log('Your Directory Name: ' + __dirname);

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('habits.db');

// Track login status
let currentUser = null;

let currentChild = null;


app.get('/', (req,res) => {
  if(currentUser == null) {
    res.redirect('login.html');
  } else {
    console.log('User' + currentUser + ' already logged in')
    res.redirect('home.html');
  }
});

app.get('/habits', (req,res) => {
  db.all(
    'SELECT * FROM habits_to_child WHERE childid=$child',
    {
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

//POST request is for posting new data to the Server
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/login', (req,res) => {
  console.log(req.body);
  const username = req.params.userid;
  db.run(
    'SELECT * from users_to_accounts WHERE username=$username', {
      $username: req.body.username
    },
    (err) => {
      if(err) {
        res.send({
          message: 'error in app.post(/login)'
        });
      } else {
        res.send({
          message: 'successfully run app.post(/login)'
        });
      }
    }
  );
});

// POST request for habits
app.post('/habits', (req, res) => {
    console.log(req.body);
    
    db.run(
        'INSERT INTO habits_to_child (title, description, due) VALUES ($habit, $description, $date)',
        {
            $habit: req.body.habit,
            $description: req.body.description,
            $date: req.body.date
        },
        (err) => {
            if (err) {
                res.send({message: 'Error in app.post(/habits)'});
            } else {
                res.send({message: 'Successfully run app.post(/habits)'});
            }
        }
    );
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
