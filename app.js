var express = require('express');
var app = express();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var EntrySchema = require("./todoentry_module.js");


app.get('/ping', function(req, res) {
    res.send({ping:'Server UP!'});
});

mongoose.connect('mongodb://localhost/ToDoListDB',{ useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log('Connected to DB'))
.catch(err => {
console.log('Error connecting to DB, exiting now.');
process.exit(0);
});
var db = mongoose.connection;


var newEntry = new EntrySchema({
  title: 'Test Entry'
});

newEntry.save(function(err) {
  if (err) throw err;

  console.log('Entry added successfully!');
});


app.listen(3000);
console.log('Listening on port 3000...');
