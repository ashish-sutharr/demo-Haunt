const express = require("express")
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isProfileOwner} = require("../middleware.js");
const User = require("../models/user.js");
const Following = require("../models/following.js")
const Follower = require("../models/follower.js");
const follower = require("../models/follower.js");

// Profile route
router.get("/",isLoggedIn, async(req, res) =>{
    let userData = req.user;
    let userPosts = await User.findById(userData._id)
    .populate({path: "follower",
     populate: {
      path: "followerUser"
    }
    })
    .populate({path: "following",
     populate: {
      path: "followedUser"
    }
    })
    .populate("posts")
    // console.log(userPosts);
   
    res.render("profiles/profile.ejs" , {userData, userPosts} )
});

router.get("/followings", isLoggedIn, async(req, res) =>{
  let userData = req.user;
  let UserData = await User.findById(userData._id)
  .populate({path: "following",
     populate: {
      path: "followedUser"
    }
    })
  // console.log(UserData.following.followedUser);
  res.render("profiles/followings.ejs", {UserData})
})
router.get("/followers", isLoggedIn, async(req, res) =>{
  let userData = req.user;
  let UserData = await User.findById(userData._id)
  .populate({path: "follower",
     populate: {
      path: "followerUser"
    }
    })
  // console.log(UserData.following.followedUser);
  res.render("profiles/followers.ejs", {UserData})
})

router.get("/:id", async(req, res) =>{
  let {id} = req.params;
  let userProfile = await User.findById(id).populate("posts")
  // console.log(userProfile);
  res.render("profiles/show.ejs", {userProfile})
  
})

router.get("/:id/edit", isLoggedIn, isProfileOwner, async(req, res) =>{
  let {id} = req.params;
  let userData = await User.findById(id)
  // console.log(userData);
  res.render("profiles/edit.ejs", {userData})
})


router.put("/:id/edit", isLoggedIn,  async(req, res) =>{
  let {id} = req.params;
  let userData = await User.findByIdAndUpdate(id, {...req.body.profile});
  // console.log(userData);
  req.flash("success", "Profile Updated");
  res.redirect("/profile")
})

router.post("/:id/follow", isLoggedIn, async(req, res) =>{
  let {id} = req.params;
  let userData = await User.findById(id)
  let currUser = req.user;

  let newFollowing = new Following;
  newFollowing.followedUser = userData._id;
  let savedUser = currUser.following.push(newFollowing)
  await newFollowing.save();
  await currUser.save();

  let newFollower = new Follower;
  newFollower.followerUser = currUser._id;
  
  userData.follower.push(newFollower);

  await newFollower.save();
  await userData.save();

  // console.log(userData);

  res.redirect(`/profile/${id}`)
})

module.exports = router;
