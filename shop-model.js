var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema(
	{
        id: Number,
        name: String,
        staff: Array,
        opening: Array,
        location: String,
        photo: String,
        username: String,
        password: String,
        pin: Number,
        cutting: Number,
        waiting: Number,
   	},
  	{
	  	timestamps: true,
	  	toJSON: { virtuals: true }
  	}
);

module.exports = mongoose.model('Shop', ShopSchema);