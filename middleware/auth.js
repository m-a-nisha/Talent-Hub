const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const { User } = require('../models/user');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error:"Access denied. no token provided"});

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const {_id} = decoded;
        User.findById(_id)
            .then(userdata =>{
                req.user = userdata;
                next();
            })
    } catch (error) {
        res.status(400).json({error: 'Invalid token'});
    }
}