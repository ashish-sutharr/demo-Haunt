const express = require("express")
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isProfileOwner} = require("../middleware.js");
const User = require("../models/user.js")

// Profile route
router.get("/",isLoggedIn, async(req, res) =>{
    let userData = req.user;
    let userPosts = await User.findById(userData._id).populate("posts")
    // console.log(userPosts);
   
    res.render("profiles/profile.ejs" , {userData, userPosts} )
});
router.get("/:id", async(req, res) =>{
  let {id} = req.params;
  let userProfile = await User.findById(id).populate("posts")
  console.log(userProfile);
  res.render("profiles/show.ejs", {userProfile})
  
})
router.get("/:id/edit", isLoggedIn, isProfileOwner, async(req, res) =>{
  let {id} = req.params;
  let userData = await User.findById(id)
  console.log(userData);
  res.render("profiles/edit.ejs", {userData})
})

router.put("/:id/edit", isLoggedIn,  async(req, res) =>{
  let {id} = req.params;
  let userData = await User.findByIdAndUpdate(id, {...req.body.profile});
  // console.log(userData);
  req.flash("success", "Profile Updated");
  res.redirect("/profile")
})


module.exports = router;
