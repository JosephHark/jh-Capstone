const router = require('express').Router();
const contacts = require('../models/contacts-model');
const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user is not logined in
        res.redirect('/auth/login');
    } else {
        //if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    contacts.find()
        .then((result) => {
            res.render('profile', {user: req.user}, {contacts: result});
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;