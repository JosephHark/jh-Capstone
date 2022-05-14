const mongoose = require('mongoose');
let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  mongoose.connect('mongodb+srv://Joseph:adJ2YIPio1vtx76Q@cluster0.oc51x.mongodb.net/toDoFinal');
  var db = mongoose.connection;
  db.on('error', console.log.bind(console, "connection error"));
  db.once('open', function (callback) {
    console.log("connection succeeded");
  })
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};