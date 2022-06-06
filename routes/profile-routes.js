const router = require('express').Router();
const express = require('express')
const {render} = require('express/lib/response');
const contactController = require('../controllers/contact');

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
    router.get('/', contactController.getAll);
    router.get('/:id', contactController.getSingle);
    router.post('/', contactController.create_contact);
    router.put('/:id', contactController.update_contact);
    router.delete('/:id', contactController.delete_contact);
    res.render('profile', {user: req.user});

});

module.exports = router;