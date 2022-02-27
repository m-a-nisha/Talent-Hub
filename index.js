const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const {MOGOURI} = require('./config/key');
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts')
const profiles = require('./routes/profiles')
// var cors = require('cors')
var app = express()
// app.use(cors())


mongoose
    .connect(MOGOURI)
    .then(() => console.log('Connected to the mongoDB'))
    .catch((err) => console.log("can not connect to mongodb"))

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login',auth)
app.use('/api/post', posts);
app.use('/api/profile', profiles);
var port = process.env.PORT || 5000
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('instagram/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'instagram', 'build', 'index.html'))
    })
}
app.listen(port, () => console.log(`Listening on port ${port}`));