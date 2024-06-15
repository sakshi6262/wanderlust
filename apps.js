const path = require('path');
const express = require('express');
const app = express();
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/expressError.js");
const mongoose = require("mongoose");
const { listingSchema, reviewSchema } = require("./schema.js");
//listing
//.js hona chahiye and file name listing.js 
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
};
main().then(() => {
    console.log("connected to db");
}).catch(() => {

    console.log("cant connect to db");
});
//end of creating mongoose database
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//creating only server
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
//to use static files
app.use(express.static(path.join(__dirname,"/public")));
app.listen(8080, () => {
    console.log("server is listenning;on 8080 port")
});
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
    res.send("Hi, I am root");
  });
// const validateListing=(req,res,next)=>{
//     let {error}
//    = listingSchema.validate(req.body);
   
// if(error){
//     let errMsg=error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,errMsg);
// }
// else{
//     next();
// }
// }
// const validateReview=(req,res,next)=>{
//     let {error}
//    = reviewSchema.validate(req.body);
   
// if(error){
//     let errMsg=error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,errMsg);
// }
// else{
//     next();
// }
// }
app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page Not Found!"));
});
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
     res.status(statusCode).render("error.ejs",{message});
    // rea.render("error.ejs",{message});
});


// SGHIKtgHVUQnITmO
// sakshipateljhy9889

// mongodb+srv://sakshipateljhy9889:SGHIKtgHVUQnITmO@cluster0.s9sv58c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



///2nd gid in atlas
//username=sakshipatel6262
//pass=vOv9NLzegXPm36dz

//mongodb+srv://sakshipatel6262:vOv9NLzegXPm36dz@cluster0.3jnfmj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// okk

//i will spaak a sentence and you have to correct it daily and provide valid reason for incorrectness/