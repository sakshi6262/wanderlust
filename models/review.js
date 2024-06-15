const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema=new Schema(
    {
        comment:String,
        rating:{
            type:Number,
            min:1,
            max:5
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
          },
        created_at:{
            type:Date,
            default:Date.now()
        }
       
        
    });


    // mongoose.model('review', reviewSchema); 
    // // i have edited here added this line 

module.exports= mongoose.model("review",reviewSchema);