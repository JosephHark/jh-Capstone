const mongoose = require('mongoose');

const facebookUserSchema = new mongoose.Schema({
    facebookid: { type: String },
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
const User = mongoose.model('Users', facebookUserSchema);
module.exports = User;
