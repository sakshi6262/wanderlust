
require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const session=require("express-session");

const MongoStore=require("connect-mongo");

const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const listingRouter=require("./routes/listing.js");
const userRouter=require("./routes/user.js");
//added
const reviewController=require("./controllers/reviews.js");
//we require listing.js from models add data inside listing class
const Listing=require("./models/listing.js");
//setting database mongoose 
const mongoose = require("mongoose");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


const dbUrl=`mongodb+srv://${process.env.ATLASDB_URL}`;

console.log("MongoDB URL:",dbUrl);
console.log("Secret:", process.env.SECRET)

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Can't connect to DB:", err);
    }
};

main();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//creating only server
app.use(express.urlencoded({extended:true}));

app.engine("ejs",ejsMate);

//to use static files
app.use(express.static(path.join(__dirname,"/public")));




//edited

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});



const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },

};





// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
//   });

  app.use(flash());
  app.use(passport.initialize());
app.use(session(sessionOptions));



app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(8080, () => {
    console.log("server is listenning on 8080 port")
});

app.use(methodOverride("_method"));
    app.use((req,res,next)=>{
        res.locals.success=req.flash("success");
       res.locals.error=req.flash("error");
       res.locals.currUser=req.user;
         next();

    })


  app.use("/listings",listingRouter);

  app.use("/",userRouter);
const validateReview=(req,res,next)=>{
    let {error}
   = reviewSchema.validate(req.body);
   
if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
}
else{
    next();
}
};
//reviews 
//post review route
app.post("/listings/:id/review",validateReview,wrapAsync(reviewController.createReview));
//delet review route

app.delete("/listings/:id/reviews/:reviewId",wrapAsync(reviewController.destroyReview));

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page Not Found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
     res.status(statusCode).render("error.ejs",{message});
    // rea.render("error.ejs",{message});
});