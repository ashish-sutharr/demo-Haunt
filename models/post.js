const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment.js")
// const Review = require("./review.js")

let postSchema = new Schema({
    owner : {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    description : String,
    image: {
        url: String,
        filename: String,
      },
    likes : [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],
      
    createdAt:{
        type: Date,
        default: Date.now()
    },
});

// listingSchema.post("findOneAndDelete", async(listing) =>{
//   if(listing){
//     await Review.deleteMany({  _id : {$in: listing.reviews}})
//   }
// })

const Post = mongoose.model("Post", postSchema);
module.exports = Post;