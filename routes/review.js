const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
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
//post review route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    //edited
    console.log("POST /listings/:id/reviews - Adding a review");
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await  listing.save();
    res.redirect(`/listings/${listing._id}`);
    })); 
//delete review route
    router.delete("/:reviewId",wrapAsync(async (req,res)=>{
        //edited
        console.log("DELETE /listings/:id/reviews/:reviewId - Deleting a review");
        console.log(`DELETE request received for Listing ID: ${req.params.id}, Review ID: ${req.params.reviewId}`);
  
        let{id,reviewId}=req.params;
        //edited
        console.log(`Listing ID: ${id}, Review ID: ${reviewId}`); // Log the received params

        if (!id || !reviewId) {
            throw new ExpressError(400, "Invalid IDs provided");
        }
    
        // console.log(`Listing ID: ${id}, Review ID: ${reviewId}`);
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/listings/${id}`);}));
module.exports=router;