const router = require('express').Router();
const { render } = require('express/lib/response');
const Contacts = require('../models/contacts-model');
const contacts = require('../models/contacts-model');
const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user is not logined in
        res.redirect('/auth/login');
    } else {
        //if logged in
        next();
    }
};
app.use(express.urlencoded({extended : true}));
router.get('/', authCheck, (req, res) => {
    contacts.find()
        .then((result) => {
            console.log(contacts)
            res.render('profile', {user: req.user}, {contacts: result});
        })
        .catch((err) => {
            console.log(err)
        })
});
app.post('/', authCheck, (req, res) => {
    const contact = new Contact(req.body)
    contact.save()
    .then =((result)=>{
        res.redirect('profile', {user: req.user}, {contacts: result});
    });
});

app.get('/', authCheck, (req, res) => {
    const id = req.params.id;
    console.log(id)
    Contacts.findById(id)
    .then(result=>{
        render('profile', {user: req.user});
    })
})

app.get('/', authCheck, (req, res) => {
    const id = req.params.id;
    console.log(id)
    Contacts.findById(id)
    .then(result=>{
        render('profile', {user: req.user});
    })
})
module.exports = router;