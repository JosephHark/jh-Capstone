const router = require('express').Router();

router.get('/technology', (req, res) => {
    console.log("joseph", req.user);
    res.render('technology', {user:req.user});
});
router.get('/gambling', (req, res) => {
    res.render('gambling',info, {user:req.user});
});
router.get('/sexual', (req, res) => {
    res.render('sexual',info, {user:req.user});
});
router.get('/substance', (req, res) => {
    res.render('substance',info, {user:req.user});
});
module.exports = router;