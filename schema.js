///to validate schema 

const joi=require("joi");

module.exports.listingSchema=joi.object({
    listing:joi.object({ //listing is model
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.allow('',null)

    }).required()
});

module.exports.reviewSchema=joi.object({
    review:joi.object({ //review is model
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required(),

});
