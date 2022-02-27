const mongoose = require('mongoose');
const Joi = require('joi');
// require('mongoose-type-url');
// Joi.image = require("joi-image-extension");
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    },
    url: {
        type: String,
        required:true
    },
    likes: [
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    comments:[{
        text: String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy: {
        type:ObjectId,
        ref: "User"
    }
},{timestamps:true})

Post = new mongoose.model('Post', postSchema);

function validatePost(post) {
    schema = {
        title: Joi.string().max(50).required(),
        body: Joi.string().max(550).required(),
        url: Joi.string().required()
        // photo: Joi.required()
        // photo: Joi.image().allowTypes(['png', 'jpg']).required()
    }
    return Joi.validate(post,schema);
}




module.exports.Post =  Post;
module.exports.validate = validatePost;