const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//contacts
const contactSchema = new Schema({
    name:String,
    email:String,
    phone:Number
});

const Contacts = mongoose.model('contact', contactSchema);

module.exports = Contacts;