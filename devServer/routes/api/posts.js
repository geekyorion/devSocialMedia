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

/**
 * @route               POST api/post/like/:post_id
 * @description         like a post
 * @access              private
 */
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check whether user is available or not
    Profile.findOne({ user: req.user.id })
        .then(_profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    // check whether post is already there
                    // indexOf may give errors so should use filter
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length) {
                        return res.status(400).json({ alreadyLiked: "YOu already liked this post" });
                    }
                    // add like to likes array and then save
                    post.likes.unshift({ user: req.user.id });

                    post
                        .save()
                        .then(post => res.json(post))
                        .catch(err => res.status(400).json({ likeError: "Unable to like" }));
                })
                .catch(err => res.status(404).json({ nopost: "Post is not available" }));
        })
});

/**
 * @route               POST api/post/unlike/:post_id
 * @description         unlike a post
 * @access              private
 */
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check whether user is available or not
    Profile.findOne({ user: req.user.id })
        .then(_profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    // check whether post is already there
                    // indexOf may give errors so should use filter
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notLiked: "You have not liked this post yet" });
                    }

                    // remove like from likes array and then save
                    // get like index from the likes array
                    const removeIndex = post.likes
                        .map(like => like.user.toString())
                        .indexOf(req.user.id);

                    // splice the likes array
                    post.likes.splice(removeIndex, 1);

                    post
                        .save()
                        .then(post => res.json(post))
                        .catch(err => res.status(400).json({ unlikeError: "Unable to unlike" }));
                })
                .catch(err => res.status(404).json({ nopost: "Post is not available" }));
        })
});

/**
 * @route               POST api/post/comment/:post_id
 * @description         add comment to user's post
 * @access              private
 */
router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            // add comment to comments array
            post.comments.unshift(newComment)

            post
                .save()
                .then(post => res.json(post))
                .catch(err => res.status(400).json({ commentError: "Unable to save comment" }));
        })
        .catch(err => res.status(404).json({ nopost: "Post is not available" }));
});

/**
 * @route               DELETE api/post/comment/:post_id/:comment_id
 * @description         remove a comment from post
 * @access              private
 */
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => {
            // check whether comment is available or not
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentNotExists: "Comment does not exist" });
            }

            // get the index of comment in comments array
            const removeIndex = post.comments
                .map(comment => comment._id.toString())
                .indexOf(req.params.comment_id);

            // check for the owner of the post
            if (post.user.toString() === req.user.id || post.comments[removeIndex].user.toString() === req.user.id) {
                // splice the comments array
                post.comments.splice(removeIndex, 1);

                post
                    .save()
                    .then(post => res.json(post))
                    .catch(err => res.status(400).json({ commentDeleteError: "Unable to delete the comment" }));
            } else {
                return res.status(401).json({ notAuthorised: "You can not delete this comment" });
            }
        })
        .catch(err => res.status(404).json({ nopost: "Post is not available" }));
});

router.all('*', (req, res) => {
    res.status(404).json({ routeError: 'Not a valid route' });
});

module.exports = router;
