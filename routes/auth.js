const router = require('express').Router();
const passport = require('passport');
const express = require('express');
const UserGModel = require('../models/google');
//const UserFModel = require('../models/facebook');

const registerNewUser = require('../controllers/user');

router.use(express.urlencoded({
    extended: true
}));

//login
router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user
    });
});

router.get('/emaillogin', (req, res) => {
    res.render('emaillogin', {
        user: req.user
    });
});

router.post('/registerUser', (req, res) => {
    registerNewUser.registerUser(req, res);
});

router.get('/register', (req, res) => {
    res.render('register', {
        user: req.user
    });
});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//router with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google
router.get('/google/redirect', passport.authenticate('google'),  (req, res) => {
    //res.send(req.user);
    res.redirect('/profile');
});

router.get('/facebook',
  passport.authenticate('facebook'));

  router.get('/facebook/callback',
  passport.authenticate('facebook'),(req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
module.exports = router;