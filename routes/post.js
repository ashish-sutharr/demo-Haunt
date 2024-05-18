const express = require("express")
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const mongoose = require('mongoose');
const {isLoggedIn, isOwner} = require("../middleware.js");
const Post = require("../models/post.js");
const User = require("../models/user.js")



// router.get("/", (req, res) =>{
//     res.send("success")
// });

router.get("/", async(req, res, next) =>{
    const allPost =  await Post.find({})
    .populate({path: "comments",
     populate: {
      path: "author"
    }
    })
    .populate({path: "likes",
     populate: {
      path: "author"
    }
    })
    .populate("owner")
    const allUsers = await User.find({})
    let commentCount = 0;
    for(post of allPost){
        if(commentCount < Object.keys(post.comments).length ){
            commentCount = Object.keys(post.comments).length;
            // [13, 8, 2, 7, 6, 4] its need in order 
                
        }
    }
    // console.log(commentCount);
    // console.log(allUsers);
    res.render("posts/index.ejs", {allPost, allUsers, commentCount})
});



router.get("/new",  isLoggedIn, (req, res) =>{
    res.render("posts/new.ejs")
});
// new post route
router.post("/new",  isLoggedIn, async(req, res) =>{
    const newData = new Post(req.body.post)
    newData.owner = req.user._id;
    const user = await User.findById(req.user._id)
    // console.log(user);
    user.posts.push(newData);
     await newData.save();
    let savedData = await user.save();
    console.log("saved data", savedData);
    req.flash("success", "New Listing Created!");
    res.redirect("/posts");
});
// show route
router.get("/:id", wrapAsync(async(req, res, next) =>{
    let {id} = req.params;
    const postData = await Post.findById(id)
    .populate({path: "comments",
     populate: {
      path: "author"
    }
    })
    .populate("owner")
    if(!postData){
        req.flash("error", "Listing you requested for does not exist!");
        next(new ExpressError(500, "post not found"))
    }
    res.render("posts/show.ejs", {postData})
}));
// updateing post
router.put("/:id",  isLoggedIn, isOwner, wrapAsync(async(req, res) =>{
    let {id} = req.params; 
    let post = await Post.findByIdAndUpdate(id, {...req.body.post});
    req.flash("success", "Post Updated");
    res.redirect(`/posts/${id}`)
}));
// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async(req,res) =>{
    const {id} = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    console.log(deletedPost);
    req.flash("success", "Post Deleted");
    res.redirect("/Posts")
}));

// edit page route
router.get("/:id/edit",  isLoggedIn, isOwner, wrapAsync(async(req,res) =>{
    let {id} = req.params; 
    const postData = await Post.findById(id); 
    if(!postData) {
        req.flash("error", "Post you requested for does not exist!");
        res.redirect("/posts") ;
      }
    res.render("posts/edit.ejs", {postData})
}));

module.exports = router;