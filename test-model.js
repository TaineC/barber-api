var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema(
  {
    id: Number,
    name: String,
  },
  { 
  	timestamps: true,
  	toJSON: { virtuals: true }
  }
);

module.exports = mongoose.model('Test', TestSchema);