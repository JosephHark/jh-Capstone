const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//contacts
const contactSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    googleId:String
}, {
    timestamps: true
});

const Contacts = mongoose.model('Contact', contactSchema);

module.exports = Contacts;