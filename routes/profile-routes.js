const router = require('express').Router();
const express = require('express')

const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user is not logined in
        res.redirect('/auth/login');
    } else {
        //if logged in
        next();
    }
};

router.use(express.urlencoded({
    extended: true
}));
router.get('/', authCheck, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});
router.get('/addcontact', authCheck, (req, res) => {
    res.render('addcontact', {
        user: req.user
    });
});

module.exports = router;