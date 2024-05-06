const mongoose = require("mongoose");
const initData = require("./data.js");
const Post = require("../models/post.js");

// start mongoose
const MONGO_URL = "mongodb://127.0.0.1:27017/WTF";

main()
    .then(() =>{
         console.log("Database conect succefully")
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Post.deleteMany({});
    // initData.data  =  initData.data.map((obj) => ({ ...obj, owner: "65f9353e4ec0819bde3d9cca"}))
    await Post.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
