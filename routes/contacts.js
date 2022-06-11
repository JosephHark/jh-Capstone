const router = require('express').Router();
const ContactsModel = require('../controllers/contacts');

router.post('/', ContactsModel.create_contact);

module.exports = router;
