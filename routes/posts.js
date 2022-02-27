const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Post, validate } = require("../models/post");
const { User } = require('../models/user')
const auth = require('../middleware/auth');


router.get('/mypost', auth, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json(mypost)
        })
        .catch(err => console.log(err))

})

router.get("/allpost", auth, async (req, res) => {
    const post = await Post.find()
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .sort("-createdAt");
    res.json(post)
})
router.get("/popular", auth, async (req, res) => {
    const post = await Post.find()
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .sort("likes");
    res.json(post)
})

router.get("/posts/:title", auth, async (req, res) => {
    const post = await Post.find({ title: req.params.title })
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .sort("-createdAt");

    res.json(post)
})

router.get("/followpost", auth, async (req, res) => {
    const post = await Post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic");
    res.json(post)
})

router.post('/', auth, async (req, res) => {
    const { title, body, url } = req.body;
    req.user.password = undefined;
    const { error } = validate(req.body);
    if (error) return res.status(401).json({ error: error });
    const post = new Post({
        title,
        body,
        url,
        postedBy: req.user
    });
    post.save()
        .then(res.json(post))
        .catch((err) => console.log(err));

})

router.get('/:postId', auth, async (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id pic name")
        .populate("comments.postedBy", "_id name pic")
        .exec((err, post) => {
            if (err || !post) return res.status(422).json({ error: err })
            res.json(post)

        })
})

// router.get('/mypost',auth, async(req,res) => {
//     console.log(postedBy)
//     const post = await Post.find({postedBy: req.user._id})
//         .populate("postedBy", "_id name");
//     res.json(post);
// })


router.put('/like', auth, (req, res) => {
    Post.findByIdAndUpdate(req.body.PostId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id pic name")
        .populate("comments.postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
})
router.put('/unlike', auth, (req, res) => {
    Post.findByIdAndUpdate(req.body.PostId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id pic name")
        .populate("comments.postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
})
router.put('/comment', auth, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.PostId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name pic")
        .populate("postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
})


router.delete('/deletePost/:postId', auth, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) return res.status(422).json({ error: err })
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    }).catch(err => {
                        console.log(err)
                    })

            }
        })
})
router.delete('/deletePost/:postId/:commentId', auth, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .exec((err, post) => {
            if (err || !post) return res.status(422).json({ error: err })
            new_comments = post.comments.filter((comment) => comment._id.toString() !== req.params.commentId)
            post.comments = new_comments
            post.save()
                .then(
                    res.json(post)
                )
        })
})

router.post('/search-users', async (req, res) => {
    let userPattern = new RegExp("^" + req.body.query)
    const user = await User.find({ name: { $regex: userPattern } })
        .select("_id name pic")
    res.json({ user })

})
// router.delete('/:postId/deleteComment/:commentId', auth, (req, res)=>{
//
//     Post.findOne({_id: req.params.postId})
//     .populate("postedBy", "_id")
//      .populate("comments.postedBy", "_id name pic")
//     .exec((err, post) => {
//         if(err || !post) return res.status(422).json({error:err})
//         if(post.postedBy._id.toString() === req.user._id.toString()){
//             if(post.comments.postedBy._id.toString() === req.params.commentId)
//             .then(result =>{
//                 res.json(result)
//             }).catch(err=>{
//                 console.log(err)
//             })

//         }
//     })
// })


module.exports = router;