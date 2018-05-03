const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  city: String,
  imageURL: String,
  month: String,
  lowTemp: Number,
  highTemp: Number
});

module.exports = mongoose.model('Review', ReviewSchema);
