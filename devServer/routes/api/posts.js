const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load post model
const Post = require('../../models/Post');

// load validators
const validatePostInput = require('../../validation/post');

/**
 * @route               GET api/posts/test
 * @description         test posts route
 * @access              public
 */
router.get("/test", (req, res) => {
    res.json({ message: "Posts test API" });
});

/**
 * @route               POST api/posts/
 * @description         create new post
 * @access              public
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost
        .save()
        .then(post => res.json(post))
        .catch(err => {
            errors.postSave = "Unable to save post";
            res.status(400).json(errors);
        });
});

module.exports = router;
