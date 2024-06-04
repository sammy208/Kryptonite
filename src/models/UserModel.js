const { hashPassword } = require('../utils/tools.js')
const mongoose = require('mongoose');
//const Schema = new mongoose.Schema;


const User = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  apiKey: { type: String, unique: true },
  images: [{ type: String }],
  created_at: { type: Date, immutable: true, default: Date.now },
  updated_at: { type: Date, immutable: false, default: () => Date.now }
});

User.pre('save', function(next) {
  const hashed = hashPassword(this.password);
  this.password = hashed;
  next();
});


User.methods.compare = function(pass = "") {
  return this.password == hashPassword(pass);
}

module.exports = mongoose.model('User', User);