const router = require('express').Router();

router.get('/technology', (req, res) => {
    res.render('technology', {user:req.user});
});
router.get('/gambling', (req, res) => {
    res.render('gambling',{user:req.user});
});
router.get('/sexual', (req, res) => {
    res.render('sexual', {user:req.user});
});
router.get('/substance', (req, res) => {
    res.render('substance', {user:req.user});
});
module.exports = router;