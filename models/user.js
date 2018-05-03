const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  imageURL: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
