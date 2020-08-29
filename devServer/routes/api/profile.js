const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load User and Profile model;
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// load the validator
const validateProfileInput = require('../../validation/profile');

/**
 * @route               GET api/profile/test
 * @description         test profile route
 * @access              public
 */
router.get('/test', (req, res) => {
    res.json({ message: 'Profile test API' });
});

/**
 * @route               GET api/profile/all
 * @description         get all profiles
 * @access              public
 */

router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({ noprofile: 'There are no profiles' }));
});

/**
 * @route               GET api/profile/handle/:handle
 * @description         get user's profile by handle
 * @access              public
 */

router.get('/handle/:handle', (req, res) => {
    const handle = req.params.handle;
    const errors = {};

    Profile.findOne({ handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'Profile is not available for the user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ noprofile: 'Profile is not available for the user' }));
});

/**
 * @route               GET api/profile/user/:user_id
 * @description         get user's profile by user ID
 * @access              public
 */

router.get('/user/:user_id', (req, res) => {
    const user = req.params.user_id;
    const errors = {};

    Profile.findOne({ user })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'Profile is not available for the user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ noprofile: 'Profile is not available for the user' }));
});

/**
 * @route               GET api/profile/
 * @description         returns current user's profile
 * @access              private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
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
 * @access              private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

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
        profileFields.skills = req.body.skills.split(',').map(data => data.trim());
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
                    .catch(err => res.status(404).json(err));
            }
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;
