var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var md5 = require('md5');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var EntrySchema = require("./todoentry_module.js");
var UserSchema = require("./user_module.js");

var session = require('express-session')
app.use(session({
  secret: 'kjgsjkdfhjfdhijhdfijd',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 24*60*60*1000}
}))


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ToDoListDB',{ useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log('Connected to DB'))
.catch(err => {
console.log('Error connecting to DB, exiting now.');
process.exit(0);
});
app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');


var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ping', function(req, res) {
    res.send({ping:'Server UP!'});
});

app.post('/signup', function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.passwordconf


    if ( typeof username === 'undefined' || username.length<1){
      res.status(400);
      res.send(JSON.stringify({error: "Username Required"}));

    }
    else if (typeof password === 'undefined' || password.length<1) {
      res.status(400);
      res.send(JSON.stringify({error: "Password Required"}));

    }
    else if (typeof password2 === 'undefined' || password2.length<1) {
      res.status(400);
      res.send(JSON.stringify({error: "Password Confirmation Required"}));

    }
    else if(password!==password2) {
      res.status(400);
      res.send(JSON.stringify({error: "Passwords do not match"}));

    }
    else {
      // creating a model and saving it to the db
      var newUser = new UserSchema({
        username: username,
        password: md5(password)
      });

      newUser.save(function(err) {
        if (err) {
          res.status(500);
          res.send(JSON.stringify({error: "Signup Failed"}));

        }
        else{
        res.send(JSON.stringify({data: "User created successfully!"}));
      }
      });
    }

});

app.post('/login', function(req, res) {
  req.session.regenerate(function(){
  });

    var username = req.body.username
    var password = req.body.password


    if ( typeof username === 'undefined' || username.length<1){
      res.status(400);
      res.send(JSON.stringify({error: "Username Required"}));

    }
    else if (typeof password === 'undefined' || password.length<1) {
      res.status(400);
      res.send(JSON.stringify({error: "Password Required"}));

    }
    else {

      password = md5(password);

    UserSchema.findOne({ username: username, password: password }, function(err, user) {
          if (!user){
            res.status(403);
            res.send(JSON.stringify({error: "Authentication Failed"}));
            ;
          }
          else if (password != user.password){
              res.status(403);
              res.send(JSON.stringify({error: "Authentication Failed"}));
              ;
            }
            else{

              req.session.user = user._id;
              req.session.save();


                res.send(JSON.stringify({data: "success"}));
                ;
            }

        });

    }

});



app.get('/list', function(req, res) {

  if (typeof req.session.user === 'undefined') {
    res.status(401);
    res.send(JSON.stringify({error: "Authentication Failed"}));
    ;
  }
else {



EntrySchema.find({owner: req.session.user },function(err, data) {
  res.send(data);
});
}
});

app.post('/add', function(req, res) {
  if (typeof req.session.user === 'undefined') {
    res.status(401);
    res.send(JSON.stringify({error: "Authentication Failed"}));
    ;
  }
else{
    var title = req.body.title

    // check if title is set correctly
    if ( typeof title === 'undefined' || title.length<1){
      res.status(400);
      res.send(JSON.stringify({error: "Title Required"}));

    }
    else {
      // creating a model and saving it to the db
      var newEntry = new EntrySchema({
        title: title,
        owner: req.session.user
      });

      newEntry.save(function(err) {
        if (err) throw err;
        res.send(JSON.stringify({data: "Entry added successfully!"}));
      });
    }
}
});

app.post('/switch', function(req, res) {
  if (typeof req.session.user === 'undefined') {
    res.status(401);
    res.send(JSON.stringify({error: "Authentication Failed"}));
    ;
  }
  else{

    var id = req.body.id

    // check if id is set correctly
    if ( typeof id === 'undefined' || id.length<1){
      res.status(400);
      res.send(JSON.stringify({error: "id Required"}));

    }
    else {

      EntrySchema.findOne({ _id: id,owner: req.session.user }, function(err, entry) {
    entry.status = !entry.status;
    entry.save(function(err, updatedEntry) {
        res.send(JSON.stringify({data: "Entry updated successfully!"}));
    });
});

}
}
});
