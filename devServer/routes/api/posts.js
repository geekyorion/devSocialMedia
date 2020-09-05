const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load post and profile model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// load validators
const validatePostInput = require('../../validation/post');

/**
 * @route               GET api/post/test
 * @description         test posts route
 * @access              public
 */
router.get("/test", (req, res) => {
    res.json({ message: "Posts test API" });
});

/**
 * @route               GET api/post/
 * @description         fetch posts
 * @access              public
 */
router.get('/', (req, res) => {
    Post
        .find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noposts: "No post is available" }));
});

/**
 * @route               GET api/post/:post_id
 * @description         fetch a single post
 * @access              public
 */
router.get('/:post_id', (req, res) => {
    Post
        .findById(req.params.post_id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopost: `No post is associated with ID ${req.params.post_id}` }));
});

/**
 * @route               POST api/post/
 * @description         create new post
 * @access              private
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

/**
 * @route               DELETE api/post/:post_id
 * @description         delete a post
 * @access              private
 */
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check whether user is available or not
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    // check for the owner of the post
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notAuthorised: "User not authorized" });
                    }

                    // delete the post
                    post
                        .remove()
                        .then(() => res.json({ success: true }))
                        .catch(err => res.status(400).json({ unableToDelete: "Unable to delete the post" }));
                })
                .catch(err => res.status(404).json({ nopost: "Post is not available" }));
        })
});

module.exports = router;
