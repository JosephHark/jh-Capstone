const router = require('express').Router();
const passport = require('passport');
//login
router.get('/login', (req, res) => {
    res.render('login', {user:req.user});
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
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
    //res.send(req.user);
    res.redirect('/profile/');
});
module.exports = router;