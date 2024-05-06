const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    comment: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Comment", commentSchema)