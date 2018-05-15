// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the habits.db file
//   node create_database.js

// to clear the database, simply delete the habits.db file:
//   rm habits.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('habits.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create new database tables:
  console.log("Creating Databases");
  //Create table for user accounts
  db.run("CREATE TABLE users_to_accounts (userid INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, name TEXT, phone TEXT)");
  // Create table for child accounts
  db.run("CREATE TABLE children_to_user (childid INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, name TEXT, pet TEXT, points INTEGER, FOREIGN KEY(userid) REFERENCES users_to_accounts(userid))");
  // Create table for habits
  db.run("CREATE TABLE habits_to_child (habitid INTEGER PRIMARY KEY AUTOINCREMENT, childid INTEGER, title TEXT, description TEXT, due TEXT, status INTEGER, FOREIGN KEY(childid) REFERENCES children_to_user(childid))");
  // Create table for Accessories
  db.run("CREATE TABLE accessories (accessoryid INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, points INTEGER)");



  //Initialize Database
  console.log("Initializing Databases");
  db.run("INSERT INTO users_to_accounts(username, email, password, name, phone) VALUES ('eunicedear', 'euk046@ucsd.edu', 'help', 'Eunice Kim', '1234567891')");
  console.log("SUCCESS: Insert into users_to_accounts");
  db.run("INSERT INTO children_to_user (userid, name, pet, points) VALUES (1, 'Dear Child', 'dear.png', 0)");
  console.log("SUCCESS: Insert into children_to_user");
  db.run("INSERT INTO habits_to_child (childid, title, description, due, status) VALUES (1, 'Sleep Earlier', 'Sleep by 8pm every day', '10-10-18', 1)");
  console.log("SUCCESS: Insert into habits_to_child");


  db.all("SELECT * FROM users_to_accounts", (err, row) => {
    console.log(row);
  });

  db.all("SELECT * FROM children_to_user", (err, row) => {
    console.log(row);
  });

  db.all("SELECT * FROM habits_to_child", (err, row) => {
    console.log(row);
  });
});

db.close();
