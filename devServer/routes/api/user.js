const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/User');

/**
 * @route               GET api/user/test
 * @description         test user route
 * @access              public
 */
router.get('/test', (req, res) => {
    res.json({ message: 'User test API' });
});

/**
 * @route               POST api/user/register
 * @description         to register the user
 * @access              public
 */
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json({ email: 'Email already exists' });
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

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

module.exports = router;
