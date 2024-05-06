const express = require("express")
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const User = require("../models/user.js")
const { saveRedirectUrl} = require("../middleware.js");
const passport = require("passport");







router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs")
});
router.post("/signup", async(req, res) =>{
    try{
        let {name, username,profilePic, email, password} = req.body;
        const newUser = new User({name,profilePic, email ,username});
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
               return next(err);
            } 
            req.flash("success", "Welcome to Haunt");
            res.redirect("/posts")
        })
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup")
    }
})



router.get("/login", (req, res) =>{
    res.render("users/login.ejs")
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate('local', { 
       failureRedirect: '/login',
       failureFlash: true,
    }), async(req,res) =>{
        req.flash("success", "Welcome back to Haunt")
        let redirectUrl = res.locals.redirectUrl || "/posts"
        res.redirect(redirectUrl)
    });

    
    router.get("/logout", (req, res) =>{
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/posts");
    });
    })

module.exports = router;