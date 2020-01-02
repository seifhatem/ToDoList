var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
  title: { type: String, required: true},
  status: { type: Boolean, required: true, default:false},
  owner: { type: String, required: true}
});

var entry = mongoose.model('entry', entrySchema);


module.exports = entry;
