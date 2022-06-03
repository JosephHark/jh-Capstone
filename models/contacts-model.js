const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//contacts
const contactSchema = new Schema({
    firstname: String,
    lastname: String,
    email:String,
    phone:Number,
    userId: String
});

const Contacts = mongoose.model('contact', contactSchema);

module.exports = Contacts;