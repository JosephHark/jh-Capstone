const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('technology'), {user:req.user};
});
router.get('/', (req, res) => {
    res.render('gambling'), {user:req.user};
});
router.get('/', (req, res) => {
    res.render('sexual'), {user:req.user};
});
router.get('/', (req, res) => {
    res.render('substance'), {user:req.user};
});
module.exports = router;