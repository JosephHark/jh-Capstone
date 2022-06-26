const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
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
const User = mongoose.model('Users', googleUserSchema);
module.exports = User;
