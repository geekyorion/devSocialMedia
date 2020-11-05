const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sanitize = require('mongo-sanitize');

// fetch secret key for generating the token
const keys = require('../../config/keys');

// Load user model
const User = require('../../models/User');

// load custom validators
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/**
 * @route               GET api/user/test
 * @description         test user route
 * @access              public
 */
router.get('/test', (req, res) => {
    res.json({ msg: 'User test API' });
});

/**
 * @route               POST api/user/register
 * @description         to register the user
 * @access              public
 */
router.post('/register', (req, res) => {
    // custom validation of the registration values
    req.body = sanitize(req.body);
    let errors = {}, isValid = false;
    try {
        const result = validateRegisterInput(req.body);
        errors = result.errors;
        isValid = result.isValid;
    } catch (e) {
        return res.status(401).json({ invalid: 'Invalid data' });
    }

    if (!isValid) {
        return res.status(400).json(errors);
        // do not remove return from here as res.send doesn't kill HTTP thread immediately
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'This email already exists';
                res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',           // Size
                    r: 'pg',            // Rating
                    d: 'mm',            // default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (errS, salt) => {
                    if (errS) {
                        errors.password = 'Unable to register'
                        return res.status(500).json(errors);
                    }
                    bcrypt.hash(newUser.password, salt, (errH, hash) => {
                        if (errH) {
                            errors.password = 'Unable to register'
                            return res.status(500).json(errors);
                        }
                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => {
            errors.password = 'Unable to sign-in';
            return res.status(404).json(errors);
        });
});

/**
 * @route               POST api/user/login
 * @description         login api for user and returns the JWT Token
 * @access              public
 */
router.post('/login', (req, res) => {
    // custom validation of the login data
    req.body = sanitize(req.body);
    let errors = {}, isValid = false;
    try {
        const result = validateLoginInput(req.body);
        errors = result.errors;
        isValid = result.isValid;
    } catch (e) {
        return res.status(401).json({ invalid: 'Invalid data' });
    }

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find the user by using the email sent by the FE
    User.findOne({ email })
        .then(user => {
            // when user is not registered with the email
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // check for the password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // create the JWT token when user is logged in

                        // payload for token sign
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                        };

                        // signing the token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: '2d' },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        );
                    } else {
                        errors.password = 'Incorrect password'
                        res.status(400).json(errors);
                    }
                })
                .catch(err => {
                    errors.password = 'Unable to sign-in';
                    return res.status(404).json(errors);
                });
        })
        .catch(err => {
            errors.password = 'Unable to sign-in';
            return res.status(404).json(errors);
        });
});

/**
 * @route               GET api/user/current
 * @description         Send the data about current user
 * @access              private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // req.user -> it contains the user details sent by passport

    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
});

/**
 * @route               GET api/user/verify
 * @description         Verify the Token
 * @access              private
 */
router.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
    User
        .findById(req.user.id)
        .then(user => {
            if (user && (user.id.toString() === req.user.id.toString())) {
                return res.json({ verified: true })
            } else {
                return res.status(401).json({ verified: 'false' });
            }
        })
        .catch(_err => {
            return res.status(401).json({ verified: 'false' });
        });
});

/**
 * @route               GET api/user/gravatar
 * @description         Refresh the associated gravatar
 * @access              private
 */
router.get('/gravatar', passport.authenticate('jwt', { session: false }), (req, res) => {
    const avatar = gravatar.url(req.user.email, {
        s: '200',           // Size
        r: 'pg',            // Rating
        d: 'mm',            // default
    });
    User.findById(req.user.id)
        .then(profile => {
            profile.avatar = avatar;
            profile
                .save()
                .then(_sucess => res.json({ gravatar: 'Gravatar refreshed successfully' }))
                .catch(_err => res.status(400).json({ gravatar: 'Unable to refresh gravatar ' }));
        })
        .catch(_err => res.status(400).json({ gravatar: 'Unable to find the user ' }));
});

router.all('*', (req, res) => {
    res.status(404).json({ routeError: 'Not a valid route' });
});

module.exports = router;
