var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema(
  {
    id: Number,
    name: String,
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

ShopSchema.virtual('staff',{
  ref: 'Staff',
  localField: 'id',
  foreignField: 'shop_id',
  justOne: false,
});

module.exports = mongoose.model('Shop', ShopSchema);