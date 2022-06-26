const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  displayName: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  image: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model('Users', userSchema);
module.exports = User;
