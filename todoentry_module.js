var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
  title: { type: String, required: true},
  status: { type: Boolean, required: true, default:false}
});

var entry = mongoose.model('entry', entrySchema);


module.exports = entry;
