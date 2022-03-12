const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

// router.get('/me', auth, async(req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     req.send(user);
// })
//SG.tJnGSBAtQVGcubVmZX1z - Q.- nC7DeNEnFESb_1hwFVwrebBvOrWGBLBFMpu052YSEI
// SG.76vkkHmITW - or1gfQ9Fv0Q.pzhX_pPZQJCl0I4lvqWa1PjVdRJYodIFvK3r7g5UMHw

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: ""
    }
}))
router.post('/', async (req, res) => {
    const { name, email, password} = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ error: "User already registered" });
    user = await User.findOne({ name: name });
    if (user) return res.status(400).json({ error: "Username already taken" });

    user = new User({
        name,
        email,
        password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    await transporter.sendMail({
        to: user.email,
        from: "noreply.talenthubmedia@gmail.com",
        subject: "Signup Success",
        html: "<h1>Welcome to TalentHub</h1>"
    })
    const token = user.generateAuthToken();
    const { _id, name:names, email:mail, followers, following, pic } = user
   
    res.json({ token, user: { _id, names, mail, followers, following, pic } });
})

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) return res.status(400).json({ error: "User doesn't exist" });
                user.resetToken = token
                user.expireToken = Date.now() + 9000000
                user.save().then(result => {
                    transporter.sendMail({
                        to: user.email,
                        from: "noreply.talenthubmedia@gmail.com",
                        subject: "Password reset",
                        html: `<p>Reset Your password</p>
                        <h5>Click in this <a href=" https://talenthub--1.herokuapp.com/reset/${token}">link</a> to reset password</h5>`
                    })
                    res.json({ message: "Check your registered email" })
                })
            })
    })
})

router.post('/newpassword', async (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    const user = await User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    if (!user) return res.status(422).json({ error: "Session expired" })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt)
    user.resetToken = undefined
    user.expireToken = undefined
    await user.save()
    res.json({ message: "password update successfully" })
    //     })
    // .catch(err => console.log(err))
})

module.exports = router;
