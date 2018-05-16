const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('habits.db');

db.serialize(() => {
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('boots-yellow.png', 'dog-boots.png' 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('bow-tie.png', 'dog-bowtie.png', 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('cap-yellow.png', 'dog-yellowcap.png', 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('carnival-mask.png', 'dog-mask.png', 4)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('earmuffs.png', 'dog-earmuffs.png', 7)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('headband-bunny.png', 'dog-bunnyears.png', 7)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('necklace.png', 'dog-necklace.png', 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('necktie.png', 'dog-bluetie.png', 6)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('polo-shirt.png', 'dog-blueshirt.png', 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('red-winter-hat.png', 'dog-redhat.pmg', 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('redtie.png', 'dog-redtie.png', 3)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('scarf-red.png', 'dog-scarf.png', 7)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('shirt-pink.png', 'dog-redshirt.png', 4)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('sunglasses-red.png', 'dog-sunglasses1.png', 3)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('sunglasses.png', 'dog-sunglasses3.png', 4)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('sunglasses2.png', 'dog-sunglasses2.png', 4)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('sweater-green.png', 5)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('tshirt-blue.png', '.png', 3)");
  db.run("INSERT INTO accessories-store (url, dogUrl, points) VALUES ('vest.png', 'dog-vest.png', 3)");
  console.log("Inserted all accessories into database!");
});

db.close();
