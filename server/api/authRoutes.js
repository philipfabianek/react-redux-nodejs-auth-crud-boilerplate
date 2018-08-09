import express from "express";
import passport from "passport";

import bcrypt from "bcryptjs";
import keys from "./../config/keys";

const router = express.Router();

import User from "./../mongodb/user-model";

router.post("/register", (req, res) => {
    const { username, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) { console.log(err) }

        bcrypt.hash(password, salt, (err, passwordHash) => {
            if (err) { console.log(err) }
            new User({ username, passwordHash }).save().then((user) => {
                console.log("New user created:", user);
                res.send("You are registered!");
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err)
            });
        });
    });
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(400).send(info);
        }

        if (!user) {
            res.status(401).send(info);
        } else {
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                    res.status(401).send(info);
                } else {
                    res.send(info);
                }
            });
        }
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    req.logout();
    res.send("Succesfully logged out!");
});

export default router;
