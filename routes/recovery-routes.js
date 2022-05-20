const router = require('express').Router();
const info = (req, res, next) => {
    if (req.user) {
        //if user is  logined in
        next();
    }
};
router.get('/technology', (req, res) => {
    res.render('technology'), info, {user:req.user};
});
router.get('/gambling', (req, res) => {
    res.render('gambling'),info, {user:req.user};
});
router.get('/sexual', (req, res) => {
    res.render('sexual'),info, {user:req.user};
});
router.get('/substance', (req, res) => {
    res.render('substance'),info, {user:req.user};
});
module.exports = router;