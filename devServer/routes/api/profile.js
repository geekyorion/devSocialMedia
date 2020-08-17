const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load User and Profile model;
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * @route               GET api/profile/test
 * @description         test profile route
 * @access              public
 */
router.get('/test', (req, res) => {
    res.json({ message: 'Profile test API' });
});

/**
 * @route               GET api/profile/
 * @description         returns current user's profile
 * @access              public
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'Profile is not available for the user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

/**
 * @route               POST api/profile/
 * @description         saves or update the user's profile
 * @access              public
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;

    // skills will be in the array (csv)
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // social links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.handle = req.body.handle;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    // education and experience will be handled sepately
    // as user will be giving different forms for both

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // update the profile
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                // create the profile
                // check for profile handle
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'Handle already exists';
                            return res.status(400).json(errors);
                        }

                        // save profile
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile));
                    })

            }
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;
