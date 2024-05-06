let Post = require("./models/post.js");
let Comment = require("./models/comment.js");
const ExpressError = require('./utils/ExpressError.js');
const User = require("./models/user.js");


module.exports.isLoggedIn  = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!")
         return res.redirect("/login")
      }
      next()
};


module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next(); 
};


module.exports.isOwner = async(req, res, next) =>{
    const {id} =  req.params;
    let post = await Post.findById(id);
    if(!post.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this Post");
        return res.redirect(`/posts/${id}`);
    }
    next()
};
module.exports.isProfileOwner = async(req, res, next) =>{
    const {id} =  req.params;
    let user = await User.findById(id);
    if(!user._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this Profile");
        return res.redirect(`/profile`);
    }
    next()
};

module.exports.isReviewAuthor = async(req, res, next) =>{
    const {id, commentId} =  req.params;
    let comment = await Comment.findById(commentId);
    if(!comment.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this comment");
        return res.redirect(`/posts/${id}`);
    }
    next()
  };