const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//contacts
const contactSchema = new Schema({
    fullname: String,
    email:String,
    phone:Number
}, {timestamps: true});

const Contacts = mongoose.model('Contact', contactSchema);

module.exports = Contacts;