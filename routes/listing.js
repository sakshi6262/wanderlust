const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
// const Listing=require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");

const listingController=require("../controllers/listings.js");

const validateListing=(req,res,next)=>{
    let {error}
   = listingSchema.validate(req.body);
   
if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
}
else{
    next();
}
}


const multer  = require('multer');
const{storage}=require("../cloudConfig.js");

const upload = multer({storage});




router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single('listing[image]'),wrapAsync(listingController.createListing)
);


//new route
//i have edited here different from shradhhas code
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,  upload.single('listing[image]'),validateListing,
  wrapAsync(listingController.updateListings))
.delete(isLoggedIn,wrapAsync(listingController.destroyListing));

module.exports=router;

  //edit route
  router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));
  
  
module.exports=router;
