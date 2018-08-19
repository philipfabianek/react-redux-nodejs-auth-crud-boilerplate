import path from "path";
import express from "express";
import passport from "passport";
import reload from "reload";

import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import keys from "./config/keys";

import "./config/passport-setup";

const app = express();
const port = process.env.PORT || 3000;

// Static
app.use("/dist", express.static(path.join(__dirname, "..", "dist")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// Cookie session, Body parser and Passport
app.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 Week
    keys: [keys.session.cookieKey]
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// MongoDB
import "./mongodb/setup";

// Specific routes
import authRoutes from "./api/authRoutes";
app.use("/auth", authRoutes);

import apiRoutes from "./api/apiRoutes";
app.use("/api", apiRoutes);

// Rendering service
import renderPage from "./render/render";

app.use((req, res, next) => {
    if (req.url === "/" && req.user) {
        res.redirect("/dashboard");
    } else {
        if (req.url === "/login" && req.user) {
            res.redirect("/dashboard");
        } else {
            if (req.url === "/dashboard" && !req.user) {
                res.redirect("/");
            } else {
                next();
            }
        }
    }
});

app.get("*", renderPage);

reload(app);

app.listen(port);
console.log("Running on port " + port);
