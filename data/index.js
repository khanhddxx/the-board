// index.js
(function (data) {

  var seedData = require('./seedData');
  var database = require('./database');

  data.addUser = function (user, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err);
      } else {
        db.users.insert(user, next);
      }
    });
  };

  data.getUser = function(username, next){
    database.getDb(function(err,db){
      if(err){
        next(err);
      }
      else{
        db.users.findOne({username:username}, next);
      }
    });
  };

  data.getNoteCategories = function (next) {
    database.getDb(function (err, db) {
      if (err) {
        console.log('Failed to retrieve database count');
        next(err, null);
      }
      else {
        db.notes.find({ name: { $nin: [""] } }).sort({ name: 1 }).toArray(function (err, results) {
          if (err) {
            console.log('Failed to retrieve database count');
            next(err, null);
          } else {
            next(null, results);
          }
        });
      }
    });
  };

  data.createNewCategory = function (categoryName, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err, null);
      }
      else {
        db.notes.find({ name: categoryName }).count(function (err, count) {
          if (err) {
            next(err);
          } else {
            if (count === 0) {
              var category = {
                name: categoryName,
                notes: []
              };
              db.notes.insert(category, function (err) {
                if (err) {
                  next(err);
                }
              });
            }
            else {
              next('Category is exist');
            }
          }
        });
      }
    });
  };

  data.getNotes = function (categoryName, next) {
    database.getDb(function (err, db) {
      if (err) {
        console.log('Failed to retrieve database count');
        next(err);
      } else {
        db.notes.findOne({ name: categoryName }, next); // if a callback function have same signatures with callback func here -> no need to handle a callback 
      }
    });
  };

  data.addNote = function (categoryName, noteToInsert, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err);
      } else {
        db.notes.update({ name: categoryName }, { $push: { notes: noteToInsert } }, next);
      }
    });
  };

  function seedDatabase() {
    database.getDb(function (err, db) {
      if (err) {
        console.log('Failed to seed database: ' + err);
      }
      else {
        //test to see if data exists
        db.notes.count(function (err, count) {
          if (err) {
            console.log('Failed to retrieve database count');
          }
          else {
            if (count === 0) {
              console.log('Sedding the database');
              seedData.initialNotes.forEach(function (item) {
                db.notes.insert(item, function (err) {
                  if (err) console.log('Failed to insert note into database');
                });
              });
            }
            else {
              console.log('Database already seeded...');
            }
          }
        });
      }
    });
  }

  seedDatabase();

}(module.exports));