const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CuttingSchema = new Schema(
  {
    id: Number,
    name: String,
    shop_id: Number,
  },
  { 
  	timestamps: true,
  	toJSON: { virtuals: true }
  }
);

module.exports = mongoose.model('Cutting', CuttingSchema);