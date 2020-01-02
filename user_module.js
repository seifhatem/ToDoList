var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userScema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
});

var user = mongoose.model('user', userScema);


module.exports = user;
