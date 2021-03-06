const passport = require("passport");
const googleStrat = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");

const keys = require('./keys');
const User = require('../models/google');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id);
    });
});

passport.use(
    new googleStrat({
        //google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({
            googleid: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                //already havea a user
                done(null, currentUser);
            } else {
                //create a new user
                new User({
                    username: profile.displayName,
                    googleid: profile.id
                }).save().then((newUser) => {
                    done(null, newUser);
                })
            }
        })
    })
)

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
        googleid: profile.id
    }).then((currentUser) => {
        if (currentUser) {
            //already havea a user
            done(null, currentUser);
        } else {
            //create a new user
            new User({
                username: profile.displayName,
                facebookId: profile.id
            }).save().then((newUser) => {
                done(null, newUser);
            })
        }
    })
}));