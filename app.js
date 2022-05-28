const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const recoveryRoutes = require('./routes/recovery-routes');
const passportSetup = require('./config/passport-setup');
const mongodb = require('./connect');
const cookie = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

//view engine
app.set('view engine', 'ejs');

app.use(cookie({
    maxAge: 12 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initailize passport
app.use(passport.initialize());
app.use(passport.session());

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
    }
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/recovery', recoveryRoutes);

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


//home route
app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    });
});

app.listen(8080, () => {
    console.log('Capstone project loads into port 8080')
})