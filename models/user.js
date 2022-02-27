const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
        // minlength: 3,
        // maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        // minlength: 5,
        // maxlenght: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    resetToken: String,
    expireToken:Date,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/adaisha/image/upload/v1645342671/blank-profile-picture-g3dbc83ad3_1280_mnlood.png"
    },
    
    followers: [{type: ObjectId, ref: "User"}],
    following: [{type: ObjectId, ref: "User"}]
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const Schema = {
        name: Joi.string().max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(100).required(),
        pic:Joi.optional()
    }
    return Joi.validate(user, Schema)
}

module.exports.User = User;
module.exports.validate = validateUser;
