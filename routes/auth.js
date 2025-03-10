const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

router.get("/register", (req, res) => {
    res.render("signup");
});

router.post("/register", async (req, res) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
    });

    try {
        await User.register(newUser, req.body.password);
        req.flash('success', 'User registered successfully');
        res.redirect("/login");
    } catch (err) {
        req.flash('error', 'Error registering user');
        res.redirect("/register");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect("/login");
    });
});

module.exports = router;