const express = require("express")
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const Post = require("../models/post.js");
const Comment = require("../models/comment.js")
const {isLoggedIn,  isReviewAuthor} = require("../middleware.js");




router.post("/",isLoggedIn, wrapAsync(async(req, res) =>{
    console.log("############",req.params.id);
    let post = await Post.findById(req.params.id)
    .populate({path: "comments",
     populate: {
      path: "author"
    }
    })
    .populate("owner")
    let newComment  = new Comment(req.body.comment);
    newComment.author = req.user._id;   
    post.comments.push(newComment);
  
    await newComment.save();
    await post.save();
    // console.log(post);
    req.flash("success", "Comment Added");
    res.redirect(`/posts/${post._id}`)

}));
//cmnt destroy route
router.delete("/:commentId",isLoggedIn, isReviewAuthor, wrapAsync(async(req, res) =>{
    let {id, commentId} = req.params;
    console.log("Id is __________",id);
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}})
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Comment Deleted");
    res.redirect(`/posts/${id}`)
}))



module.exports = router;
