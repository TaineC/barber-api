const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    id: Number,
    name: String,
    photo: String,
    status: Boolean,
    shop_id: Number,
  },
  { 
  	timestamps: true,
  	toJSON: { virtuals: true }
  }
);

// StaffSchema.virtual('shop',{
//   ref: 'Shop',
//   localField: 'shop_id',
//   foreignField: 'id',
// });

module.exports = mongoose.model('Staff', StaffSchema);