import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;

import bcrypt from "bcryptjs";

import User from "./../mongodb/user-model";
import keys from "./keys";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        // console.log(username);
        // console.log(password);

        User.findOne({ username }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Such user doesn't exist"});
            }

            bcrypt.compare(password, user.passwordHash, (err, equals) => {
                if (err) { console.log(err) };
                if (equals) {
                    return done(null, user, { id: user.id, username: user.username });
                } else {
                    return done(null, false, { message: "Wrong password" });
                }
            });
        }).catch((err) => {
            return done(err, false, { message: "Something went wrong, this is not your fault" });
        });
    })
);
