const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load User and Profile model;
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// load the validators
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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

/**
 * @route               POST api/profile/experience
 * @description         add experience to user's profile
 * @access              private
 */
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }
            // add to experience array (at start)
            profile.experience.unshift(newExp);
            profile
                .save()
                .then(updated_profile => res.json(updated_profile))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

/**
 * @route               POST api/profile/education
 * @description         add education to user's profile
 * @access              private
 */
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }
            // add to eduction array (at start)
            profile.education.unshift(newEdu);
            profile
                .save()
                .then(updated_profile => res.json(updated_profile))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

/**
 * @route               DELETE api/profile/experience/:exp_id
 * @description         delete the experience from profile
 * @access              private
 */
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // filter the experience on the basis of exp_id param
            profile.experience = profile.experience.filter(exp => exp.id !== req.params.exp_id);

            /**
             * alternative:
             * const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);
             * profile.experience.splice(removeIndex, 1);
             */
            profile
                .save()
                .then(updated_profile => res.json(updated_profile))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

/**
 * @route               DELETE api/profile/education/:edu_id
 * @description         delete the education from profile
 * @access              private
 */
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // filter the education on the basis of edu_id param
            profile.education = profile.education.filter(exp => exp.id !== req.params.edu_id);

            /**
             * alternative:
             * const removeIndex = profile.education.map(exp => exp.id).indexOf(req.params.edu_id);
             * profile.education.splice(removeIndex, 1);
             */
            profile
                .save()
                .then(updated_profile => res.json(updated_profile))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

/**
 * @route               DELETE api/profile
 * @description         delete user and profile
 * @access              private
 */
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }))
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;
