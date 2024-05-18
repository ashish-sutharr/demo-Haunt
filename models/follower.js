const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let followerSchema = new Schema({
    followerUser: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Follower", followerSchema)