const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let followingSchema = new Schema({
    followedUser: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: "User"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Following", followingSchema)