var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var EntrySchema = require("./todoentry_module.js");

mongoose.connect('mongodb://localhost/ToDoListDB',{ useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log('Connected to DB'))
.catch(err => {
console.log('Error connecting to DB, exiting now.');
process.exit(0);
});
app.listen(3000);
console.log('Listening on port 3000...');

var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ping', function(req, res) {
    res.send({ping:'Server UP!'});
});


app.get('/list', function(req, res) {
EntrySchema.find(function(err, data) {
  res.send(JSON.stringify(data));
});

});

app.post('/add', function(req, res) {
    var title = req.body.title

    // check if title is set correctly
    if ( typeof title === 'undefined' || title.length<1){
      res.status(400);
      res.send('Title Required');
      res.end
    }
    else {
      // creating a model and saving it to the db
      var newEntry = new EntrySchema({
        title: title
      });

      newEntry.save(function(err) {
        if (err) throw err;

        res.send('Entry added successfully!');
      });
    }


});
