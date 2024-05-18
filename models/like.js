const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let likeSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Like", likeSchema)