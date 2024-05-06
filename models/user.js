const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")
const Post = require("./post")

const userSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, 
        default: 'https://img.freepik.com/free-photo/medium-shot-guy-with-raised-eyebrow_23-2148227962.jpg?t=st=1714741268~exp=1714744868~hmac=3d83eedecb52ca2dcd4650a7e6cc41aa024f94738cad2699159c10a328b67004&w=740' 
    },
    posts:  [
        {
          type: Schema.Types.ObjectId,
          ref: "Post"
        }
      ],
    
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);