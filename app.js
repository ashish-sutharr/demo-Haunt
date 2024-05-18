const express = require("express")
const app = express()
const port = 8000;
const path = require("path");
const {isLoggedIn, isProfileOwner} = require("./middleware.js");
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require("express-session");
const flash = require("connect-flash");
const { log } = require("console");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Post =  require("./models/post.js")
const User = require("./models/user.js")
const Like = require("./models/like.js")

const postsRouter = require("./routes/post.js")
const commentsRouter = require("./routes/comment.js")
const usersRouter = require("./routes/user.js")
const profileRouter = require("./routes/profile.js")


const MONGO_URL = "mongodb://127.0.0.1:27017/WTF";

main()
    .then(() =>{
         console.log("Database connect successfully")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname, "views"));    
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));




const sessionOptions ={
    secret:  "Mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() +  7 * 24 * 60 * 60 * 1000 ,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  };
  
  
  app.use(session(sessionOptions));
  app.use(flash());

// passport start
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next()
  });

  app.use("/posts", postsRouter);
  app.use("/posts/:id/comments", commentsRouter);
  app.use("/", usersRouter);
  app.use("/profile", profileRouter)






app.post("/posts/:id/like", isLoggedIn, async (req, res) =>{
  let {id} = req.params;
  const postData = await Post.findById(id)

  let newLike = new Like;
  newLike.author = req.user._id;
  postData.likes.push(newLike)
  
  await newLike.save();
  await postData.save();
  console.log(postData);
  res.redirect("/posts")
})





app.get("/search", (req, res) =>{
  res.send("succes")
})
app.post("/search", async(req, res) =>{
  let {search} = req.body;
  const user = await User.find({username: search})
  // console.log(user[0]._id);
  if(!user[0]){
    req.flash("error", "User Not found in DataBase");
    res.redirect("/posts")
  }
  else{
    res.redirect(`/profile/${user[0]._id}`)
  } 
});




// app.get("/demoUser", async (req, res) =>{
//     let fakeUser = new User({
//       name: "Ashish Suthar",
//       username: "asus", 
//       email: "ashish10suthar@gmail.com",
      
//     });
  
//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser)
  
//   })



// comments routes start

//###############################################################################################


// ###############################################################################################
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});
  
app.use((err, req, res, next) =>{
    let{ statusCode= 500, message = "Some thing Went wrong"} = err;
    // res.status(statusCode).send(meassage);
    res.render("error.ejs", {message})
});


app.listen(port, () =>{
    console.log("listening on 8000")
})
