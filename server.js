const express = require('express');
const app = express();

var currentUser = null;

app.use(express.static('static'));

console.log('Your Directory Name: ' + __dirname);

const fakeUserDatabase = {
  'sam': {userid: '1', name: 'Sam', email: 'sam@gmail.com', pet: 'cat.png'},
  'john': {userid: '2', name: 'John', email: 'john@gmail.com',   pet: 'dog.png'},
  'eunice': {userid: '3', name: 'Eunice', email: 'euk046@ucsd.edu',  pet: 'deer.png'},
  'shelly': {userid: '3', name: 'Shelly', email: 'shellyjbae@gmail.com', pet: 'raccoon.png'},
  'kellie': {userid:'4', name: 'Kellie', email: 'kkhiga@ucsd.edu', pet:'cat.png'}
};

const fakeHabitsDatabase = {
    '1': {title:'Sleep Earlier', description:'Sleep by 8pm every day', due:'09-14-2018', status:'complete'},
    '2': {title:'Eat Vegetables', description:'Eat a serving of vegetables every day', due:'10-10-2019', status:'incomplete'},
    '4': {title:'Read More', description:'Read 10 pages or more a day', due:'12-12-2020', status:'complete'}
};

app.get('/', (req,res) => {
  if(currentUser == null) {
    res.redirect('login.html');
  } else {
    console.log('User' + currentUser + ' already logged in')
    res.redirect('home.html');
  }
});

app.get('/habits', (req,res) => {
  const val = fakeHabitsDatabase[currentUser];
  console.log(currentUser, '->', val);
  if(val) {
    res.send(val);
  } else {
    res.send({});
  }
});

app.get('/login/:userid', (req,res) => {
  const userid = req.params.userid;
  const val = fakeUserDatabase[userid];
  console.log(userid, '->', val.userid);
  if(val) {
    currentUser = val.userid;
    res.send(val.userid);
  } else {
    res.send({});
  }
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
