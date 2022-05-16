const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('technology'), {user:req.user};
});
module.exports = router;