const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
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
    res.render('profile', {user:req.user});
});
module.exports = router;