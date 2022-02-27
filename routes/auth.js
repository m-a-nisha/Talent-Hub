const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req,res) => {
    const {email, password} = req.body;

    const {error} = validateAuth(req.body);
    if(error) return res.status(400).json({error:error.details[0].message});

    let user = await User.findOne({email : email})
    if(!user) return res.status(400).send({error:"Invalid Email and password"});

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send({error:"Invalid Email and password"});
    const { _id, name, email: mail, followers, following, pic } = user
    
    const token = user.generateAuthToken();
    res.json({token, user: {_id,name,mail, followers, following, pic}});

});

function validateAuth(auth_user) {
    const Schema = {
        email : Joi.string().required().email(),
        password : Joi.string().min(8).max(100).required()
    }
    return Joi.validate(auth_user, Schema);
}

module.exports = router;