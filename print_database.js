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
